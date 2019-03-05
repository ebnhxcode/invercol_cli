<template lang="pug">
   div
      h6.has-text-centered(style="font-size: .83rem;") Búsqueda avanzada


      .field
         label Fecha desde
         input.input.is-small(type='date', v-model='advancedSearchForm.from')
         
      .field
         label Fecha hasta
         input.input.is-small(type='date', v-model='advancedSearchForm.to')

      .field
         label Área
         .select.is-fullwidth.is-small
            select(v-model='advancedSearchForm.area_id')
               option(value='')
               option(v-for='a in areas', :value='a.id_area') {{ a.area_nombre }}

      //.field
         label País
         .select.is-fullwidth.is-small
            select(v-model='advancedSearchForm.country_id')
               option(value='')
               option(v-for='c in countries', :value='c.id_pais') {{ c.pai_nombre }}

      .field
         label Ciudad
         .select.is-fullwidth.is-small
            select(v-model='advancedSearchForm.city_id')
               option(value='')
               option(v-for='c in cities', :value='c.id_ciudad') {{ c.ciu_nombre }}

      //.field
         label Comuna
         .select.is-fullwidth.is-small
            select(v-model='advancedSearchForm.commune_id')
               option(value='')
               option(v-for='c in communes', :value='c.id_comuna') {{ c.com_nombre }}

      .field
         label Moneda
         .select.is-fullwidth.is-small
            select(v-model='advancedSearchForm.currency_id')
               option(value='')
               option(v-for='c in currencies', :value='c.id_mon') {{ c.mon_nombre }}

      .field
         label Estado
         .select.is-fullwidth.is-small
            select(v-model='advancedSearchForm.tracing_id')
               option(value='')
               option(v-for='t in tracings', :value='t.id_seg') {{ t.seg_nombre }}

      .field
         label Operador
         .select.is-fullwidth.is-small
            select(v-model='advancedSearchForm.operator_id')
               option(value='')
               option(v-for='h in hotelsOperators', :value='h.id_hotel') {{ h.hot_nombre }}

      .field
         label Hotel
         .select.is-fullwidth.is-small
            select(v-model='advancedSearchForm.hotel_id')
               option(value='')
               option(v-for='h in hotels', :value='h.id_hotel') {{ h.hot_nombre }}




      // Acá van los filtros que son referenciales mediante texto

      .field
         label Nro Reserva
         input.input.is-small(type='number', v-model='advancedSearchForm.booking_id')
      .field
         label Nro File
         input.input.is-small(type='number', v-model='advancedSearchForm.file_number')

      .field
         label Nro Pasajeros
         input.input.is-small(type='number', v-model='advancedSearchForm.pax_numbers')

      .field
         label Pasajero
         input.input.is-small(type='text', v-model='advancedSearchForm.pax_name')

      .field
         label Observación
         input.input.is-small(type='text', v-model='advancedSearchForm.booking_obs')




      .field.is-grouped
         button.button.is-primary.is-small(
         @click.prevent="bookingsAdvancedSearch()"
         ) Nueva Búsqueda
</template>
<script src="./AdvancedSearch.js"></script>
<style src="./AdvancedSearch.css"></style>