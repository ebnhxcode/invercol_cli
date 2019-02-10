<template lang="pug">
   div
      h6.has-text-centered(style="font-size: .83rem;") Búsqueda avanzada
      .field
         label Fecha desde
         input.input(type='date', v-model='advancedSearchForm.from')
      .field
         label Fecha hasta
         input.input(type='date', v-model='advancedSearchForm.to')
      .field
         label Area
         .select.is-fullwidth
            select(v-model='advancedSearchForm.area_id')
               option(value='')
               option(v-for='a in areas', :value='a.id_area') {{ a.area_nombre }}
      .field
         label Ciudad
         .select.is-fullwidth
            select(v-model='advancedSearchForm.city_id')
               option(value='')
               option(v-for='c in cities', :value='c.id_ciudad') {{ c.ciu_nombre }}
      .field
         label Comuna
         .select.is-fullwidth
            select(v-model='advancedSearchForm.commune_id')
               option(value='')
               option(v-for='c in communes', :value='c.id_comuna') {{ c.com_nombre }}
      .field
         label Categoria
         .select.is-fullwidth
            select(v-model='advancedSearchForm.category_id')
               option(value='')
               option(v-for='c in categories', :value='c.id_cat') {{ c.cat_nombre }}
      .field
         label Tipo de Tarifa
         .select.is-fullwidth
            select(v-model='advancedSearchForm.rate_type_id')
               option(value='')
               option(v-for='r in rateTypes', :value='r.id_tipotarifa') {{ r.tt_nombre }}
      .field
         label Tipo de Habitación
         .select.is-fullwidth
            select(v-model='advancedSearchForm.room_type_id')
               option(value='')
               option(v-for='r in roomTypes', :value='r.id_tipohabitacion') {{ r.th_nombre }}
      .field
         label Tipo de Moneda
         .select.is-fullwidth
            select(v-model='advancedSearchForm.currency_id')
               option(value='')
               option(v-for='c in currencies', :value='c.id_mon') {{ c.mon_nombre }}

      .field.is-grouped
         button.button.is-primary.is-small(
         @click.prevent="doAdvancedSearch()"
         ) Nueva Búsqueda
</template>
<script src="./AdvancedSearch.js"></script>
<style src="./AdvancedSearch.css"></style>