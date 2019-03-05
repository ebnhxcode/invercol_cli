<template lang="pug">
   modal(
      style="z-index:2000 !important;padding-top: 20px;"
      name="modal-service"
      :reset="true"
      width="95%"
      :min-width="320"
      :height="'auto'"
      :min-height="600"
      :adaptive="true"
      :resizable="true"
      :scrollable="true"
      :draggable="true"
   )
   
      button.button.is-small.is-danger(style="float:right;", @click.prevent="$modal.hide('modal-service')") ❌

      div.section
         h3 Cotizar tarifas del Hotel {{ hotel.hot_nombre }}
         .columns
            .column.is-3
               .card
                  .card-image
                     figure.image.is-4by3
                        img(src='@/assets/images/hotels.jpg')
                        //style="height:180px;width:240px;"
                  .card-content
                     //.media
                        .media-left
                           figure.image.is-48x48
                              img(src='@/assets/images/hotels.jpg', alt='Placeholder image')
                        .media-content
                           a(href="#!").title.is-4 {{ hotel.hot_nombre }}
                           p.subtitle.is-6
                     .content
                        dl
                           dt {{ hotel.hot_razon }}
                           dt Categoría {{ hotel.cat ? hotel.cat.cat_des:'Sin categoría' }}
                           dt {{ hotel.ciudad ? hotel.ciudad.ciu_nombre:'Sin ciudad' }}, {{ hotel.comuna ? hotel.comuna.com_nombre : 'Sin comuna' }}
                           small {{ hotel.hot_direccion }}
                           br
                        //time(datetime='2016-1-1') 11:09 PM - 1 Jan 2016
                  footer.card-footer
                     .card-footer-item 123
                     .card-footer-item 123
                     .card-footer-item 123
               hr      
               .box
                  h3 Servicios
                  dl
                     dt Servicio 1
                     dt Servicio 2
                     dt Servicio 3
            .column.is-9
               .box
                  .is-narrow(style='overflow-x: scroll;font-size: 0.8rem;display:block;white-space: nowrap;max-width: 100%;user-select:text !important;')
                  table
                     thead
                        tr
                        th Id Tarifa
                        th Hotel
                        th Categoría
                        th Localidad
                        th Tarifa
                        th Habitacion
                        th Valor
                        th Acción
                     tbody
                        tr(v-for='rate in hotel.hotdet')                        
                           td {{ rate.id_hotdet }}
                           td {{ hotel.hot_nombre }}
                           td {{ hotel.cat.cat_nombre }}
                           td {{ `${hotel.ciudad.ciu_nombre }, ${hotel.comuna.com_nombre }` }}
                           td {{ rate.tipotarifa.tt_nombre }}
                           td {{ rate.tipohabitacion.th_nombre }}
                           td Valor por hab
                           th                              
                              button.button.is-primary Seleccionar
                        tr(v-if="hotel.hotdet && hotel.hotdet.length == 0")
                           td(colspan="8") Aún no hay datos para mostrar




                  pre {{ hotel }}

</template>
<script src="./ModalService.js"></script>
<style src="./ModalService.css"></style>
