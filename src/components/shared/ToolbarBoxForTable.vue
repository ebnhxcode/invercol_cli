<template lang="pug">
  div
    p(style="float:right;") {{ filterBy( $parent.$data[$parent.$data['localInstanceName']], $parent.$data['textPrincipalFilter']).length }} Reg.
    div: h4(v-show="$parent.$data['operatorName']")
      .field.has-addons

        .control
          paginators.is-medium(:pagination="$parent.$data['pagination']", @navigate="$parent.navigate")            

        .control
          //* Cantidad a paginar **/
          .tooltip(data-tooltip="Seleccionar cantidad a paginar")
            .select.is-small.is-light
              select.is-small(
                v-model="$parent.$data['pagination'].per_page", 
                @change="$parent.navigateCustom"
              )
                option(selected="", disabled="") {{ $parent.$data['pagination'].per_page }}
                option(v-for="n in $parent.$data['numberItemsToPaginate']", :value="n" v-if="$parent.$data['pagination'].per_page <= 5000") {{ n }}

        .control(
          @click.prevent="$parent.$data['isPrincipalTextFilterEnabled'] = !$parent.$data['isPrincipalTextFilterEnabled']"
        )
          .tooltip(data-tooltip="Filtrar en la tabla")
            button.button.is-small.is-light(
              @click.prevent="$parent.$data['textPrincipalFilter'] = null"
            )
              v-icon(
                name="search", 
                v-if="$parent.$data['isPrincipalTextFilterEnabled'] == false"
              )
              a(v-else) &times;

        .control(v-show="$parent.$data['isPrincipalTextFilterEnabled'] == true")
          input.input.is-small.is-light(
            type="text", 
            placeholder="Filtro general en la tabla", 
            v-model="$parent.$data['textPrincipalFilter']"
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
              @click="$parent.restartTable()",
              :disabled="$parent.$data[$parent.$data['localInstanceName']].length==0?true:false" 
            ) &#8635;
            
</template>
<script>
  import Paginators from '@/components/shared/Paginators.vue'
  import DownloadExcel from '@/components/shared/DownloadExcel.vue'
  export default {
    name:'toolbar-box-for-table',
    components:{ Paginators, DownloadExcel },
    props:[],
    data(){
      /*
      * Para evitar usar el $parent o $parent.$data => se puede instanciar en local y luego $emit
      */
      return {}
    },
    created(){},
    mixins: [],
    watch: {},
    methods:{},
  }
</script>