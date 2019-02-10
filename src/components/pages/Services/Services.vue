<template lang="pug">
div
  .section.hero.is-link.is-small.is-bold(v-show='isVisibleOptionsBanner==true')
    .hero-head
      .header.nav
        .container
          .nav-left
            .nav-item
            .nav-right.nav-menu
              .content.has-text-centered
    .hero-body
      .has-text-centered
        h5.title Más opciones · Módulo de Servicios
        h6 Distantis
  .hero.is-light.hero-head
    .content
      .columns
        .column.is-12
          div.box(style='border-radius: 2px 2px 5px 5px;')
            .buttons(style='float:right;')
              button.button.is-small(@click.prevent='isVisibleOptionsBanner=!isVisibleOptionsBanner', :class="isVisibleOptionsBanner==true?'is-danger':'is-primary'", href='/#top')
                small Más Opciones  
                v-icon(name='arrow-up', v-if='isVisibleOptionsBanner==true')
                v-icon(name='arrow-down', v-if='isVisibleOptionsBanner==false')
              button.button.is-small Nuevo Servicio Individual
      .columns
        .column.is-2.section(style='padding-right: 0px;')
          div.box
            h2.has-text-centered Servicios

            selection-tour-operator
            hr
            h6.has-text-centered(style='font-size: .83rem;') Seleccione Servicio
            .field.control
              label.radio
                input(type='radio', name='service', value='individual', v-model='service.typename')
                |  Individual
              //br
              //label.radio
                input(type='radio', name='service', value='program', v-model='service.typename')
                |  Crea tu Programa
            div(v-if='service.typename')
              hr
              label Area
              .field.control
                label.radio
                  input(type='radio', name='area', value='1', v-model='service.area_id')
                  | Receptivo
                br
                label.radio
                  input(type='radio', name='area', value='2', v-model='service.area_id')
                  | Nacional
              .field
                label N° Pasajeros
                input.input.is-fullwidth.is-small(type='number', v-model='service.passengers')
              .field
                label Fecha desde
                input.input.is-fullwidth.is-small(type='date', v-model='service.from')
              .field
                label Fecha hasta
                input.input.is-fullwidth.is-small(type='date', v-model='service.to')
              .field
                label Ciudad
                .select.is-fullwidth.is-small
                  select(v-model='service.city_id')
                    option(value='')
                    option(v-for='c in cities', :value='c.id_ciudad') {{ c.ciu_nombre}}
              .field
                label Comuna
                .select.is-fullwidth.is-small
                  select(v-model='service.commune_id')
                    option(value='')
                    option(v-for='c in communes', :value='c.id_comuna', v-show='c.id_ciudad==service.city_id') {{ c.com_nombre}}
                    option(v-if="filterBy(communes, service.city_id, 'id_ciudad').length==0 || !service.city_id") Sin comunas
              .field
                label Categoria
                .select.is-fullwidth.is-small
                  select(v-model='service.category_id')
                    option(value='')
                    option(v-for='c in categories', :value='c.id_cat') {{ c.cat_nombre}}
              .field.is-grouped
                .control
                  button.button.is-primary(@click.prevent='getHotels()') Buscar
                //.control
                  button.button.is-text(@click.prevent='clean_service()') Cancelar

        .column.is-8.section

          div.box(v-if="hotels.length > 0 || isLoading")
            h2 Disponibilidad de Hoteles
              span(v-if="isLoadingModal || isLoading",style="float:right;padding-left:5px;font-size:1.5rem;") cargando
              spinner(v-if="isLoadingModal || isLoading",style="float:right;")
              loader(v-show="isLoading")
            div(style='overflow-y: scroll;display:block;white-space: nowrap;max-width: 100%;user-select:text !important;height:1000px;')
              .columns(v-for='h in hotels')
                  //.column.is-2.has-text-centered
                  .column.is-12

                    article.media(v-show="!isLoading && operatorName!=null")
                      figure.media-left
                        .image
                          img(src='@/assets/images/hotels.jpg', style="height:240px;width:320px;")

                      .media-content
                        .content
                          p
                            dl
                              dd 
                                strong {{ h.hot_nombre }}                            
                              dd {{ h.ciudad.ciu_nombre }}, {{ h.comuna.com_nombre }}
                              dd {{ h.hot_direccion }}
                              dd Tarifas {{ h.hotdet_count }}

                        nav.level.is-mobile
                          .level-left
                            a.level-item
                              span.icon.is-small
                                i.fas.fa-reply
                            a.level-item
                              span.icon.is-small
                                i.fas.fa-retweet
                            a.level-item
                              span.icon.is-small
                                i.fas.fa-heart

                        //nav.level
                          .level-item.has-text-centered
                            div
                              p.heading SGL
                              p.title 123
                          .level-item.has-text-centered
                            div
                              p.heading TWN
                              p.title 123
                          .level-item.has-text-centered
                            div
                              p.heading MAT
                              p.title 123
                          .level-item.has-text-centered
                            div
                              p.heading TPL
                              p.title 123

                      .media-right
                        //button.delete
                        button.button.is-primary.tooltip(data-tooltip='Ver detalles', @click.prevent='modalConfig(h)') Cotizar
            
            //.is-narrow(style='overflow-x: scroll;font-size: 0.8rem;display:block;white-space: nowrap;max-width: 100%;user-select:text !important;', 
              v-show="!isLoading && operatorName!=null")
              table
                thead
                  tr
                    th Acción
                    th Hotel
                    th Ciudad
                    th Comuna
                    th Categoria
                    th Area
                    th Tarifas Vigentes
                tbody
                  tr(v-for='h in hotels')
                    td
                      .button.is-small.tooltip(data-tooltip='Abrir', @click.prevent='modalConfig(h)')
                        v-icon(name='hotel')
                    td {{ h.hot_nombre || 'Nombre hotel sin ingresar' }}
                    td {{ h.ciudad.ciu_nombre || 'Ciudad sin ingresar' }}
                    td {{ h.comuna.com_nombre || 'Comuna sin ingresar' }}
                    td {{ h.cat.cat_nombre || 'Categoria sin ingresar' }}
                    td {{ h.area.area_nombre || 'Area sin ingresar' }}
                    td {{ h.hotdet_count }}
                  tr(v-if="hotels && hotels.length == 0")
                    td(colspan="7") Aún no hay datos para mostrar


        //.column.is-5.section
          .box
            article.media
              figure.media-left
                p.image.is-64x64
                  img(src='https://bulma.io/images/placeholders/128x128.png')
              .media-content
                .content
                  p
                    strong John Smith
                    small @johnsmith
                    small 31m
                    br
                    |         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                nav.level.is-mobile
                  .level-left
                    a.level-item
                      span.icon.is-small
                        i.fas.fa-reply
                    a.level-item
                      span.icon.is-small
                        i.fas.fa-retweet
                    a.level-item
                      span.icon.is-small
                        i.fas.fa-heart
              .media-right
                button.delete







        modal-service(:hotel="hotelDetail", :service="service")

</template>
<script>

  /* Config, model */
  import { environmentConfig } from '@/services/environments/environment-config'


    /* Component Dependency's */
  import Loader from '@/components/shared/Loader.vue'
  import SelectionTourOperator from '@/components/shared/SelectionTourOperator.vue'


  /* Complementos */
  import Spinner from '@/components/shared/Spinner.vue'

  import Swal from 'sweetalert2'

  /* Import del Modal */
  import ModalService from '@/components/pages/Services/Modals/ModalService/ModalService.vue'

  export default {
    mixins: [

    ],
    components: {
      ModalService,
      Loader,
      SelectionTourOperator,
      Spinner
    },
    created(){
      this.loadParametricFormDataServices() // Carga los datos de los combos
    },
    data() {
        return {
          /* 
          Variables y Setup del Componente 
          En cada componente se deben setear los parametros para crear la interfaz de tablas
          Las dependencias importadas mas arriba serán señaladas con (+) para identificar que no se deben eliminar
          */
          environmentConfig:environmentConfig,

          /*
          * General vars page config
          */
          localInstanceName:'services', // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName] debe tener el nombre de los objetos
          localInstanceNameDetail:'Servicios', // nombre de la instancia local por la page que hace ref. a titulos -> hotel o a $data[this.localInstanceName]
          operatorName:'distantis', // v-model var para seleccion de touroperador
          isVisibleOptionsBanner:false,

          /* Variables generales */
          textPrincipalFilter:"", // filtro global de la tabla
          excelJsonData:[], // array para procesamiento de datos a exportar en excel, se completa en un watch -> hoteles
          isPrincipalTextFilterEnabled:false, // v-model para filtrar sobre los filtros
          isLoading:false, //boolean para validar spinners y loaders
          isLoadingModal:false, //boolean para validar spinners y loaders de despliegue de los modals
          orderList: 'asc', // orden por defecto en la tabla

          /*
          * Page form objects
          */
          service: {
              typename: '',
              passengers: '',
              from: '',
              to: '',
              area_id: '',
              city_id: '',
              category_id: '',
              commune_id: ''
          },

          /*
          * Parametric objs
          */
          cities: [],
          communes: [],
          categories: [],
          hotels: [],

          /*
          * Obj modal
          */
          hotelDetail:{},

        }
    },

    watch: {

    },
    methods: {
      clean_service: function () {
        this.service = {
          typename: '',
          passengers: '',
          area_id: '',
          city_id: '',
          category_id: '',
          commune_id: '',

          from: '',
          to: '',
        }
      },

      getHotels: function () {
        this.isLoading = true
        var formData = new FormData();
        for (let column in this.service) {
            //Conforma objeto paramétrico para solicitud http
            if (this.service[column] !== null) {
              formData.append(column, this.service[column])
            }
            formData.append('db_operator', this.operatorName)
        }
        this.$http.post(`${this.environmentConfig.distantisPreprod.apiUrl}/hotelsForServices`, formData).then(response => { // success callback
            if (response.status == 200) {
              this.hotels = response.body.hotels
              this.isLoading = false
            }
        }, response => {});
      },

      getHotel: async function (hotel) {

        console.log('buscando hotel')
        this.isLoadingModal = true

        await this.$http.get(`${this.environmentConfig.distantisPreprod.apiUrl}/${this.operatorName}/hotels/byIdHotelInRange/${hotel.id_hotel}`)
          .then(response => { // success callback
              if (response.status = 200) {
                console.log(response.body)
                this.hotelDetail = response.body
                this.isLoadingModal = false
              }
          }, response => {});
      },


        
      loadParametricFormDataServices: function () {
        const self = this
        this.$http.get(`${this.environmentConfig.distantisPreprod.apiUrl}/${this.operatorName}/rates/loadParametricFormDataServices`)
        .then(response => { // success callback
          if (response.status = 200) {
            //console.log(response)
            //self.hotels = response.body.hotels
            self.cities = response.body.cities
            self.communes = response.body.communes
            self.categories = response.body.categories
          }
        }, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
      },


      modalConfig: function (hotel) {

        if (!this.service.from || !this.service.to) {
          return Swal.fire({
            type: 'error',
            title: 'Error en fechas',
            text: 'Debes incluir fecha desde y hasta',
          })
        }

        this.hotelDetail = this.getHotel(hotel).then(() => {
          this.$modal.show('modal-service')
        })
      }
    },

  }
</script>