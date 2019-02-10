<template lang="pug">
  div
    .section.hero.is-link.is-small.is-bold(v-show="isVisibleOptionsBanner==true")
      .hero-head
        .header.nav
          .container
            .nav-left
              .nav-item
              .nav-right.nav-menu
                .content.has-text-centered
      .hero-body
        .has-text-centered
          h5.title Más opciones · Módulo de Reservas
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

                button.button.is-small(@click.prevent="modalup") Nueva Reserva

        .columns
          .column.is-2.section(style="padding-right: 0px;")
            div.box
              h2.has-text-centered {{ $data['localInstanceNameDetail'] }}
              selection-tour-operator
              hr
              header-board-columns
              hr
              advanced-search(
                :booking="bookingDetail",
 
                :areas="areas",
                :cities="cities",
                :currencies="currencies",
                :tracings="tracings",
                :hotelsOperators="hotelsOperators",
                :hotels="hotels",
                
                :localInstanceName="localInstanceName",
                :operatorName="operatorName",
                :environmentConfig="environmentConfig"

                :pagination.sync="pagination",
                :isLoading.sync="isLoading",
                :bookings.sync="bookings",
                :bookingsStorage.sync="bookingsStorage",
              )

          .column.is-10.section
            div.box
              h2 Items
                span(v-if="isLoadingModal || isLoading",style="float:right;padding-left:5px;font-size:1.5rem;") cargando
                spinner(v-if="isLoadingModal || isLoading",style="float:right;")
                
              toolbar-box-for-table(v-if="!isLoading && operatorName!=null")

              loader(v-show="isLoading")

              table-board   
         
    //modal-booking
    
</template>
<script>

  /* Config, model */
  import { environmentConfig } from '@/services/environments/environment-config'
  import { bookingModel } from '@/models/Booking'

  /* Component Dependency's */
  import Loader from '@/components/shared/Loader.vue'
  import SelectionTourOperator from '@/components/shared/SelectionTourOperator.vue'
  import HeaderBoardColumns from '@/components/shared/HeaderBoardColumns.vue'
  import ToolbarBoxForTable from '@/components/shared/ToolbarBoxForTable.vue'
  import TableBoard from '@/components/shared/TableBoard.vue'

  import AdvancedSearch from '@/components/pages/Bookings/Forms/AdvancedSearch/AdvancedSearch.vue'
  //import ModalHeader from '@/components/shared/ModalHeader.vue'

    /* Complementos */
  import Spinner from '@/components/shared/Spinner.vue';

  /* Mixins: additional methods */
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
    //ModalBooking,
    Spinner
  },
  created(){
     // Aqui se instancia todo
    //this.loadParametricFormData() // Carga los datos de los combos
    this.loadParametricFormData() // Carga los datos de los combos
    this.instanceTableWithLocalObjects(this.operatorName)
  },
  data() {
    return {
        /* 
         Variables y Setup del Componente 
         En cada componente se deben setear los parametros para crear la interfaz de tablas
         Las dependencias importadas mas arriba serán señaladas con (+) para identificar que no se deben eliminar
        */
        environmentConfig:environmentConfig, // instancia para uso local
        modelInstance: bookingModel, // instancia de uso local
        bookings:[], // objetos de la lista
        bookingsStorage:[], // objetos de la lista
        localInstanceName:'bookings', // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName] debe tener el nombre de los objetos
        localInstanceNameDetail:'Reservas', // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
        operatorName:'distantis', // v-model var para seleccion de touroperador
        isVisibleOptionsBanner:false,

        /* Variables generales */
        textPrincipalFilter:'', // filtro global de la tabla
        excelJsonData:[], // array para procesamiento de datos a exportar en excel, se completa en un watch -> hoteles
        isPrincipalTextFilterEnabled:false, // v-model para filtrar sobre los filtros
        isLoading:false, //boolean para validar spinners y loaders
        isLoadingModal:false, //boolean para validar spinners y loaders de despliegue de los modals
        orderList: 'asc', // orden por defecto en la tabla

        bookingDetail: {},
        object_id: 'id_cot',

        groupedMarkedElements: [], // Array con objetos marcados desde la grilla

        /* Datos parametricos del componente */
        areas: [],
        cities: [],
        currencies: [],
        tracings: [],
        hotelsOperators: [],
        hotels: [],
        //continents: [],
        //countries: [],
        //communes: [],
        //categories: [],

        /* Variables de paginacion */
        pagination: { 'per_page':null }, // objeto requerido para paginacion
        numberItemsToPaginate: [ 250,500,750,1000,1500,2000,3000,4000,5000 ],
    }
  },

  watch: {},
  methods: {

    getBooking: async function (booking) {
      //console.log('buscando tarifa')
      this.isLoadingModal = true
      await this.$http.get(`${this.environmentConfig.distantisPreprod.apiUrl}/${this.operatorName}/bookings/byIdBooking/${booking.id_cot}`)
      .then(response => { // success callback
          if (response.status = 200) { //console.log(response.body.rates)
            this.bookingDetail = response.body.bookings
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

    modalConfig: function (objInstance) {
      this.bookingDetail = this.getBooking(objInstance).then(() => {
        this.$modal.show('modal-booking')
      })
    },

    loadParametricFormData: function () {
      const self = this
      this.$http.get(`${this.environmentConfig.distantisPreprod.apiUrl}/${this.operatorName}/bookings/dataToParametricForms`)
        .then(response => { // success callback
          if (response.status = 200) {
            //console.log(response)
            self.areas = response.body.areas
            self.cities = response.body.cities
            self.currencies = response.body.currencies
            self.tracings = response.body.tracings
            self.hotelsOperators = response.body.operators
            self.hotels = response.body.hotels
          }
      }, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
    },
  },

}
</script>