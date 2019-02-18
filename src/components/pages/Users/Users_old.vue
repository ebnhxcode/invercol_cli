<template lang="pug">
  div
    .section.hero.is-info.is-small.is-bold(v-show="isVisibleOptionsBanner==true")
      .hero-head
        .header.nav
          .container
            .nav-left
              .nav-item
              .nav-right.nav-menu
                .content.has-text-centered
      .hero-body
        .has-text-centered
          h5.title Más opciones · Módulo de Usuarios
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

                button.button.is-small(@click.prevent="modalup") Nuevo Usuario

        .columns
          .column.is-2.section(style="padding-right: 0px;")
            div.box
              h2.has-text-centered {{ $data['localInstanceNameDetail'] }}
              selection-tour-operator
              hr
              header-board
              hr
              advanced-search

          .column.is-10.section
            div.box
              toolbar-box-for-table(v-if="!isLoading && operatorName!=null")
              loader(v-show="isLoading")
            
              table-board      
        
    modal-header
</template>
<script>

  /* Config, model */
  import { environmentConfig } from '@/services/environments/environment-config'
  import { userModel } from '@/models/User'

  /* Component Dependency's */
  import Loader from '@/components/shared/Loader.vue'
  import SelectionTourOperator from '@/components/shared/SelectionTourOperator.vue'
  import HeaderBoardColumns from '@/components/shared/HeaderBoardColumns.vue'
  import AdvancedSearch from '@/components/shared/AdvancedSearch.vue'
  import ToolbarBoxForTable from '@/components/shared/ToolbarBoxForTable.vue'
  import TableBoard from '@/components/shared/TableBoard.vue'

  import ModalHeader from '@/components/shared/ModalHeader.vue'

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
    ModalHeader,
  },
  created(){
    this.instanceTableWithLocalObjects(this.operatorName)
  },
  data() {
    return {
        /* Variables y Setup del Componente */
        environmentConfig:environmentConfig, // instancia para uso local
        modelInstance: userModel, // instancia de uso local
        usuarios:[], // objetos de la lista
        usuariosStorage:[], // objetos de la lista
        localInstanceName:'usuarios', // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName] debe tener el nombre de los objetos
        localInstanceNameDetail:'Usuarios', // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
        operatorName:'distantis', // v-model var para seleccion de touroperador
        isVisibleOptionsBanner:false,

        /* Variables generales */
        textPrincipalFilter:"", // filtro global de la tabla
        excelJsonData:[], // array para procesamiento de datos a exportar en excel, se completa en un watch -> hoteles
        isPrincipalTextFilterEnabled:false, // v-model para filtrar sobre los filtros
        isLoading:false, //boolean para validar spinners y loaders
        orderList: 'asc', // orden por defecto en la tabla

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
    modalConfig: function () {
      this.$modal.show('modal-header')
    }
  },

}
</script>