<template lang="pug">
   modal(
      style="z-index:2000 !important;padding-top: 20px;"
      name="modal-rate"
      :reset="true"
      width="85%"
      :min-width="320"
      :height="'auto'"
      :min-height="600"
      :adaptive="true"
      :resizable="true"
      :scrollable="true"
      :draggable="false"
   )
   
      button.button.is-small.is-danger(style="float:right;", @click.prevent="$modal.hide('modal-rate')") ❌
      div.section
         h3 Detalle de la Tarifa:
         .content.columns
            .column.is-4.section(style='padding-right: 0px;')
               .box
                  h4 Tarifa # {{ rate.id_hotdet }} 
                  div
                     .field.is-grouped.columns
                        .column.is-half
                           label Desde
                           input.input(type='date', v-model='rate.hd_fecdesde')
                           small Actual {{ rate.hd_fecdesde | formatDateDesde }}
                        .column.is-half
                           label Hasta
                           input.input(type='date', v-model='rate.hd_fechasta')
                           small Actual {{ rate.hd_fechasta | formatDateHasta }}
                     
                     .field.is-grouped.columns
                        .column
                           label Area
                           .select.is-fullwidth
                              select(v-model='rate.id_area')
                                 option(value='')
                                 option(v-for='a in areas', :value='a.id_area') {{ a.area_nombre }}
                        .column
                           label Tipo de Moneda
                           .select.is-fullwidth
                              select(v-model='rate.hd_mon')
                                 option(value='')
                                 option(v-for='c in currencies', :value='c.id_mon') {{ c.mon_nombre }}

                     .field.is-grouped.columns
                        .column
                           label Tipo de Tarifa
                           .select.is-fullwidth
                              select(v-model='rate.id_tipotarifa')
                                 option(value='')
                                 option(v-for='r in rateTypes', :value='r.id_tipotarifa') {{ r.tt_nombre }}
                        .column
                           label Tipo de Habitación
                           .select.is-fullwidth
                              select(v-model='rate.id_tipohabitacion')
                                 option(value='')
                                 option(v-for='r in roomTypes', :value='r.id_tipohabitacion') {{ r.th_nombre }}

                     .field.is-grouped.columns
                        .column
                           label $ SGL
                           input.input(type='number', v-model='rate.hd_sgl')
                        .column
                           label $ TWN
                           input.input(type='number', v-model='rate.hd_dbl')
                        .column
                           label $ MAT
                           input.input(type='number', v-model='rate.hd_tpl')
                        .column
                           label $ TPL
                           input.input(type='number', v-model='rate.hd_qua')

                     .field.is-grouped
                        button.button.is-primary.is-small(
                           @click.prevent="updateRate()"
                        ) Guardar Cambios

               .box
                  h4 Debug Tarifa
                  pre {{ rate }}

            .column.is-8.section
               div
                  //.is-fullwidth
                  .tabs.is-boxed.is-centered
                     ul(style="margin:0px;")
                        li
                        li(:class="[tabActive==='availabilityDetail' ? 'is-active' : '']", @click.prevent="tabActive='availabilityDetail'")
                           a Detalle Disponibilidad
                        li(:class="[tabActive==='transactions' ? 'is-active' : '']", @click.prevent="tabActive='transactions'")
                           a Transacciones
                        li(:class="[tabActive==='hotelInfo' ? 'is-active' : '']", @click.prevent="tabActive='hotelInfo'")
                           a Información del Hotel
                        li(v-if="rate.det_hot",:class="[ (tabActive==='soptur') ? 'is-active' : '']", @click.prevent="tabActive='soptur'")
                           a Soptur
                     
                  .box(v-if="tabActive != null")
                     p(v-if="tabActive==='availabilityDetail'")
                        | Detalle Disponibilidad
                     p(v-if="tabActive==='transactions'")
                        | Transacciones
                     p(v-if="tabActive==='hotelInfo'")
                        | Información del Hotel
                     p(v-if="tabActive==='soptur' && rate.det_hot")
                        | Soptur


</template>
<script src="./ModalRate.js"></script>
<style src="./ModalRate.css"></style>
