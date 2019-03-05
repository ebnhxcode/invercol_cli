<template lang="pug">
  div
    .section.hero.is-small.is-danger.is-bold(v-show="isVisibleOptionsBanner==true")
      .hero-head
        .header.nav
          .container
            .nav-left
              .nav-item
              .nav-right.nav-menu
                .content.has-text-centered

      .hero-body
        .has-text-centered
          h5.title Más opciones · Módulo de Tarifas
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
                button.button.is-small(@click.prevent="modalup") Nueva Tarifa

            .columns
              .column.is-2.section(style="padding-right: 0px;")
                div.box
                  h2.has-text-centered {{ $data['localInstanceNameDetail'] }}
                  
                  selection-tour-operator
                  hr
                  header-board-columns
                  hr
                  advanced-search(
                    :rate="rateDetail",

                    :areas="areas",
                    :rateTypes="rateTypes",
                    :roomTypes="roomTypes",
                    :cities="cities",
                    :communes="communes",
                    :categories="categories",
                    :currencies="currencies",

                    :localInstanceName="localInstanceName",
                    :operatorName="operatorName",
                    :environmentConfig="environmentConfig"

                    :pagination.sync="pagination",
                    :isLoading.sync="isLoading",
                    :rates.sync="rates",
                    :ratesStorage.sync="ratesStorage",
                  )

              .column.is-10.section
                div.box
                  h2 Items
                    span(v-if="isLoadingModal || isLoading",style="float:right;padding-left:5px;font-size:1.5rem;") cargando
                    spinner(v-if="isLoadingModal || isLoading",style="float:right;")
                    
                  toolbar-box-for-table(v-if="!isLoading && operatorName!=null")

                  loader(v-show="isLoading")

                  table-board
              
    modal-rate(
      :rate="rateDetail",
      :areas="areas",
      :rateTypes="rateTypes",
      :roomTypes="roomTypes",
      :cities="cities",
      :communes="communes",
      :categories="categories",
      :currencies="currencies"
    )
        
</template>
<script>

  /* Config, model */
  import { environmentConfig } from '@/services/environments/environment-config'
  import { rateModel } from '@/models/Rate'

  /* Component Dependency's */
  import Loader from '@/components/shared/Loader.vue'
  import SelectionTourOperator from '@/components/shared/SelectionTourOperator.vue'
  import HeaderBoardColumns from '@/components/shared/HeaderBoardColumns.vue'
  //import AdvancedSearch from '@/components/shared/AdvancedSearch.vue'
  import ToolbarBoxForTable from '@/components/shared/ToolbarBoxForTable.vue'
  import TableBoard from '@/components/shared/TableBoard.vue'

  import AdvancedSearch from '@/components/pages/Rates/Forms/AdvancedSearch/AdvancedSearch.vue'
  import ModalRate from '@/components/pages/Rates/Modals/ModalRate/ModalRate.vue'


  /* Mixins: additional methods */
  import { DistantisCoreFunctionsMixin } from '@/mixins/DistantisCoreFunctions.js'

  /* Complementos */
  import Spinner from '@/components/shared/Spinner.vue';

export default {
  mixins: [ DistantisCoreFunctionsMixin ],
  components: {
    Loader,
    SelectionTourOperator,
    HeaderBoardColumns,
    AdvancedSearch,
    ToolbarBoxForTable,
    TableBoard,
    ModalRate,
    Spinner,
  },
  created(){
     // Aqui se instancia todo
    this.loadParametricFormData() // Carga los datos de los combos
    this.instanceTableWithLocalObjects(this.operatorName) // Carga los datos de la grilla
    
  },
  data() {
    return {
        /* 
         Variables y Setup del Componente 
         En cada componente se deben setear los parametros para crear la interfaz de tablas
         Las dependencias importadas mas arriba serán señaladas con (+) para identificar que no se deben eliminar
        */
        environmentConfig:environmentConfig, // instancia para uso local
        modelInstance: rateModel, // instancia de uso local
        rates:[], // objetos de la lista
        ratesStorage:[], // objetos de la lista
        localInstanceName:'rates', // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName] debe tener el nombre de los objetos
        localInstanceNameDetail:'Tarifas', // nombre de la instancia local por la page que hace ref. a titulos -> hotel o a $data[this.localInstanceName]
        operatorName:'distantis', // v-model var para seleccion de touroperador
        isVisibleOptionsBanner:false,

        /* Variables generales */
        textPrincipalFilter:"", // filtro global de la tabla
        excelJsonData:[], // array para procesamiento de datos a exportar en excel, se completa en un watch -> hoteles
        isPrincipalTextFilterEnabled:false, // v-model para filtrar sobre los filtros del datatable
        isLoading:false, //boolean para validar spinners y loaders
        isLoadingModal:false, //boolean para validar spinners y loaders de despliegue de los modals
        orderList: 'asc', // orden por defecto en la tabla

        rateDetail: {}, //Objeto que se incorpora al modal
        object_id:'id_hotdet', //Id del objeto por registro en la grilla dinamico para gestiones sobre el dato

        groupedMarkedElements: [], // Array con objetos marcados desde la grilla

        /* Datos parametricos del componente */
        areas: [],
        rateTypes: [],
        roomTypes: [],
        cities: [],
        communes: [],
        categories: [],
        currencies: [],


        /* Variables de paginacion */
        pagination: { 'per_page':null }, // objeto requerido para paginacion
        numberItemsToPaginate: [ 250,500,750,1000,1500,2000,3000,4000,5000 ],
    }
  },

  watch: {
    usuarios: function (instanteObjectsData) {
      this.processExcelDataWithObjectsOfLocalInstance(instanteObjectsData)
    },
  },
  methods: {

    getRate: async function (rate) {
      //console.log('buscando tarifa')
      this.isLoadingModal = true
      await this.$http.get(`${this.environmentConfig.distantisPreprod.apiUrl}/${this.operatorName}/rates/byIdRate/${rate.id_hotdet}`)
      .then(response => { // success callback
          if (response.status = 200) { //console.log(response.body.rates)
            this.rateDetail = response.body.rates
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
      this.rateDetail = this.getRate(objInstance).then(() => {
        this.$modal.show('modal-rate')
      })
      
    },

    loadParametricFormData: function () {
      const self = this
      this.$http.get(`${this.environmentConfig.distantisPreprod.apiUrl}/${this.operatorName}/rates/dataToParametricForms`)
        .then(response => { // success callback
          if (response.status = 200) {
            //console.log(response)
            self.areas = response.body.areas
            self.rateTypes = response.body.rateTypes
            self.roomTypes = response.body.roomTypes
            self.cities = response.body.cities
            self.communes = response.body.communes
            self.categories = response.body.categories
            self.currencies = response.body.currencies
          }
      }, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
    },

  },

}
</script>