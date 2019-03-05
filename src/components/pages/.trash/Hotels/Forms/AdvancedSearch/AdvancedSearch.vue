<template lang="pug">
   div
      h6.has-text-centered(style="font-size: .83rem;") Búsqueda avanzada

      .field
         label Área
         .select.is-fullwidth
            select(v-model='advancedSearchForm.area_id')
               option(value='')
               option(v-for='a in areas', :value='a.id_area') {{ a.area_nombre }}
      //.field
         label Continente
         .select.is-fullwidth
            select(v-model='advancedSearchForm.cont_id')
               option(value='')
               option(v-for='c in continents', :value='c.continent_id') {{ c.cont_nombre }}
      .field
         label País
         .select.is-fullwidth
            select(v-model='advancedSearchForm.country_id')
               option(value='')
               option(v-for='c in countries', :value='c.id_pais') {{ c.pai_nombre }}
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
         label Categoría
         .select.is-fullwidth
            select(v-model='advancedSearchForm.category_id')
               option(value='')
               option(v-for='c in categories', :value='c.id_cat') {{ c.cat_nombre }}

      .field.is-grouped
         button.button.is-primary.is-small(
         @click.prevent="hotelsAdvancedSearch()"
         ) Nueva Búsqueda
</template>
<script src="./AdvancedSearch.js"></script>
<style src="./AdvancedSearch.css"></style>