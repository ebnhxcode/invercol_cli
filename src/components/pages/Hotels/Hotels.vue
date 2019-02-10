<template lang="pug">
  div
    .section.hero.is-small.is-success.is-bold(v-show="isVisibleOptionsBanner==true")
      .hero-head
        .header.nav
          .container
            .nav-left
              .nav-item
              .nav-right.nav-menu
                .content.has-text-centered
      .hero-body
        .has-text-centered
          h5.title Más opciones · Módulo de Hoteles
          h6 Distantis

    .hero.is-light.hero-head
      .content
        .columns
          .column.is-12
            div.box(style="border-radius: 2px 2px 5px 5px;")

              .buttons(style="float:right;")

                button.button.is-small(
                  @click.prevent="isVisibleOptionsBanner=!isVisibleOptionsBanner",
                  :class="isVisibleOptionsBanner==true?'is-danger':'is-primary'",
                  href="/#top"
                )
                  small Más Opciones &nbsp;
                  v-icon(name="arrow-up",v-if="isVisibleOptionsBanner==true")
                  v-icon(name="arrow-down",v-if="isVisibleOptionsBanner==false")

                button.button.is-small(@click.prevent="") Nuevo Hotel

        .columns
          .column.is-2.section(style="padding-right: 0px;")
            div.box
              h2.has-text-centered {{ $data['localInstanceNameDetail'] }}
              selection-tour-operator
              hr
              header-board-columns
              hr
              advanced-search(
                :hotel="hotelDetail",
 
                :areas="areas",
                :continents="continents",
                :countries="countries",
                :cities="cities",
                :communes="communes",
                :categories="categories",
                
                :localInstanceName="localInstanceName",
                :operatorName="operatorName",
                :environmentConfig="environmentConfig"

                :pagination.sync="pagination",
                :isLoading.sync="isLoading",
                :hotels.sync="hotels",
                :hotelsStorage.sync="hotelsStorage",
              )

          .column.is-10.section
            div.box
              h2 Items
                span(v-if="isLoadingModal || isLoading",style="float:right;padding-left:5px;font-size:1.5rem;") cargando
                spinner(v-if="isLoadingModal || isLoading",style="float:right;")
                
              toolbar-box-for-table(v-if="!isLoading && operatorName!=null")

              loader(v-show="isLoading")

              table-board  


    //modal-hotel

       
       

</template>
<script>
  /* 
  * Setup:
  * Config, model 
  */
  import { environmentConfig } from '@/services/environments/environment-config'
  import { hotelModel } from '@/models/Hotel'

  /* Component Dependency's */
  import Loader from '@/components/shared/Loader.vue'
  import SelectionTourOperator from '@/components/shared/SelectionTourOperator.vue'
  import HeaderBoardColumns from '@/components/shared/HeaderBoardColumns.vue'
  import ToolbarBoxForTable from '@/components/shared/ToolbarBoxForTable.vue'
  import TableBoard from '@/components/shared/TableBoard.vue'

  import AdvancedSearch from '@/components/pages/Hotels/Forms/AdvancedSearch/AdvancedSearch.vue'
  //import ModalHotel from '@/components/pages/Hotels/Modals/ModalHotel/ModalHotel.vue'

  /* Complementos */
  import Spinner from '@/components/shared/Spinner.vue';

  import { DistantisCoreFunctionsMixin } from '@/mixins/DistantisCoreFunctions.js'

  export default {
    mixins: [ DistantisCoreFunctionsMixin ],
    components: {
      Loader,
      SelectionTourOperator,
      HeaderBoardColumns,
      AdvancedSearch,
      ToolbarBoxForTable,
      TableBoard,
      //ModalHotel,
      Spinner
    },
    created () { //localStorage.clear() //localStorage.removeItem(`${this.localInstanceName}`)
      /* Activacion de la tabla al comienzo */
      /* Al refactorizar aqui deberia ir el id del operador que corresponda segun la sesion */
      this.loadParametricFormData() // Carga los datos de los combos
      this.instanceTableWithLocalObjects(this.operatorName)
    },
    data() {
      return {
        /* Variables y Setup del Componente */
        environmentConfig:environmentConfig, // instancia para uso local
        modelInstance: hotelModel, // instancia de uso local
        hotels:[], // objetos de la lista
        hotelsStorage:[], // objetos de la lista
        localInstanceName:'hotels', // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName] debe tener el nombre de los objetos
        localInstanceNameDetail:'Hoteles', // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
        operatorName:'distantis', // v-model var para seleccion de touroperador
        isVisibleOptionsBanner:false,

        /* Variables generales */
        textPrincipalFilter:"", // filtro global de la tabla
        excelJsonData:[], // array para procesamiento de datos a exportar en excel, se completa en un watch -> hoteles
        isPrincipalTextFilterEnabled:false, // v-model para filtrar sobre los filtros
        isLoading:false, //boolean para validar spinners y loaders
        isLoadingModal:false, //boolean para validar spinners y loaders de despliegue de los modals
        orderList: 'asc', // orden por defecto en la tabla

        hotelDetail: {},
        object_id: 'id_hotel',

        groupedMarkedElements: [], // Array con objetos marcados desde la grilla

        /* Datos parametricos del componente */
        areas: [],
        continents: [],
        countries: [],
        cities: [],
        communes: [],
        categories: [],


        /* Variables de paginacion */
        pagination: { 'per_page':null }, // objeto requerido para paginacion
        numberItemsToPaginate: [ 250,500,750,1000,1500,2000,3000,4000,5000 ],
      }
    },
    filters: {},
    watch: {
      /*
      hotels: function (instanteObjectsData) {
        this.processExcelDataWithObjectsOfLocalInstance(instanteObjectsData)
      },
      */
    },
    methods: {

    getHotel: async function (hotel) {
      //console.log('buscando tarifa')
      this.isLoadingModal = true
      await this.$http.get(`${this.environmentConfig.distantisPreprod.apiUrl}/${this.operatorName}/hotels/byIdHotel/${hotel.id_hotel}`)
      .then(response => { // success callback
          if (response.status = 200) { //console.log(response.body.rates)
            this.hotelDetail = response.body.hotels
            this.isLoadingModal = false
          }
      }, response => {});

    },

    /* objInstance lo envia la grilla · Requerido en este componente */
    groupMarkedElement: function (objInstance) {
      if (this.groupedMarkedElements.indexOf(objInstance) === -1) {
        this.groupedMarkedElements.push(objInstance)  
      } else {
        this.removeMarkedElement(objInstance)
      }
    },

    removeMarkedElement: function (elem) {
      this.groupedMarkedElements.splice(this.groupedMarkedElements.indexOf(elem), 1)
    },

    /* objInstance lo envía la grilla */
    modalConfig: function (objInstance) {
      /*
      this.hotelDetail = this.getHotel(objInstance).then(() => {
        this.$modal.show('modal-hotel')
      })
      */
      
    },

    loadParametricFormData: function () {
      const self = this
      this.$http.get(`${this.environmentConfig.distantisPreprod.apiUrl}/${this.operatorName}/hotels/dataToParametricForms`)
        .then(response => { // success callback
          if (response.status = 200) {
            //console.log(response)
            self.areas = response.body.areas
            self.continents = response.body.continents
            self.countries = response.body.countries
            self.cities = response.body.cities
            self.communes = response.body.communes
            self.categories = response.body.categories
          }
      }, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
    },
    }
  }
</script>
<style>
  .espacio-izquierdo {
    margin: 4px;
    margin-left: 10px;
    /*padding: 2px;*/
  } 
  .espacio-derecho {
    margin: 0px;
    margin-right: 10px;
    /*padding: 2px;*/
  } 
</style>
