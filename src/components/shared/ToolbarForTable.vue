<template lang="pug">
  div
    p {{ filterBy( localInstanceObjects, textPrincipalFilterMutated).length }} Reg.
    .field.has-addons
      .control
        paginators.is-medium(:pagination="pagination", @navigate="$parent.navigate")
      .control
        //* Cantidad a paginar **/
        .tooltip(data-tooltip="Seleccionar cantidad a paginar")
          .select.is-small.is-light
            select.is-small(
              v-model="pagination.per_page", 
              @change.prevent="$parent.navigateCustom"
            )
              option(selected="", disabled="") {{ pagination.per_page }}
              option(v-for="n in numberItemsToPaginate", :value="n" v-if="pagination.per_page <= 5000") {{ n }}

      .control(
        @click.prevent="isPrincipalTextFilterEnabledMutated = !isPrincipalTextFilterEnabledMutated"
      )
        .tooltip(data-tooltip="Filtrar en la tabla")
          button.button.is-small.is-light(
            @click.prevent="textPrincipalFilterMutated = null"
          )
            v-icon(
              name="search", 
              v-if="isPrincipalTextFilterEnabledMutated == false"
            )
            a(v-else) &times;

      .control(v-show="isPrincipalTextFilterEnabledMutated == true")
        input.input.is-small.is-light(
          type="text", 
          placeholder="Filtro general en la tabla", 
          v-model="textPrincipalFilterMutated"
        )

      .control
        //* BOTON EXCEL *//
        //
          .tooltip(data-tooltip="Descargar excel: todo lo seleccionado")
            download-excel.button.is-small.is-light(
              :data="filterBy($parent.$data['excelJsonData'], $parent.$data['textPrincipalFilter'])",
              :fields="$parent.getExcelFieldsJson()",
              :labels="$parent.getExcelLabelsJson()",
              :name="`${$parent.$data['localInstanceName']}.xls`",
              :class="'dropdown'",
            )
              v-icon(name="file-excel")

      .control
        .tooltip(data-tooltip="Reiniciar la tabla")
          a.button.is-small.is-light(
            @click.prevent="restartTable()",
            :disabled="localInstanceObjectsMutated.length==0?true:false" 
          ) &#8635;
            
</template>
<script>
  import Paginators from '@/components/shared/Paginators.vue'
  import DownloadExcel from '@/components/shared/DownloadExcel.vue'

  export default {
    mixins: [],
    name:'toolbar-for-table',
    components:{ Paginators, DownloadExcel },
    props:[
      'localInstanceName',
      'numberItemsToPaginate',
      'pagination',
      'localInstanceObjects',//mutated
      'textPrincipalFilter',//mutated
      'isPrincipalTextFilterEnabled',//mutated
    ],
    data(){
      /*
      * Para evitar usar el $parent o $parent.$data => se puede instanciar en local y luego $emit
      */
      return {
        localInstanceObjectsMutated:{},
        textPrincipalFilterMutated:'',
        isPrincipalTextFilterEnabledMutated:false,
      }
    },
    created(){},
    watch: {
      localInstanceObjectsMutated(localInstanceObjectsMutated) {  
        //console.log(localInstanceObjectsMutated)
        this.$emit('update:localInstanceObjects', localInstanceObjectsMutated)
      },
      textPrincipalFilterMutated(textPrincipalFilterMutated) {
        //console.log(textPrincipalFilterMutated)
        this.$emit('update:textPrincipalFilter', textPrincipalFilterMutated)
      },
      isPrincipalTextFilterEnabledMutated(isPrincipalTextFilterEnabledMutated) {
        this.$emit('update:isPrincipalTextFilterEnabled', isPrincipalTextFilterEnabledMutated)
      },
    },
    methods:{},
  }
</script>