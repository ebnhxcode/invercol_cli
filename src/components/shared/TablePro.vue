<template lang="pug">
  div
    .is-narrow(style="overflow-x: scroll;overflow-y: hidden;font-size: 1rem;display:block;max-width: 100%;user-select:text !important;")
      //h4 Tabla
      table
        thead
          tr.is-text-centered(v-if="$parent.$data['groupedMarkedElements'].length > 0")
            td(:colspan="filterBy($parent.$data['modelInstance'], true).length+1") 
              p(v-show="$parent.$data['groupedMarkedElements'].length > 0") Tabla Comparativa de elementos agrupados 
                v-icon(name="thumbtack")
          tr
            th Acciones 
            th(v-for="m in $parent.$data['modelInstance']", v-if="m.isVisible") {{ m.label }}

          tr.is-text-centered(v-for="elem in $parent.$data['groupedMarkedElements']") 
            td
              .button.is-small.tooltip.is-light(data-tooltip="Opciones",@click.prevent="$parent.modalGestionarElemento(elem)")
                v-icon(name="cogs")
              .button.is-small.is-danger.tooltip(data-tooltip="Quitar", @click.prevent="$parent.removeMarkedElement(elem)") ❌

            td(
              v-for="m in $parent.$data['modelInstance']", 
              v-if="m.isVisible"
            ) {{ elem[m.field] | checkRelationFilter(m) }}
          tr

        thead

          tr.is-text-centered(v-show="$parent.$data['localInstanceName'].length>0")
            td(:colspan="filterBy($parent.$data['modelInstance'], true).length+1") 
              p Filtros y ordenamiento de elementos seleccionados en el tablero
          tr
            th
              .tooltip(data-tooltip="Acciones")
                span.button.is-small.is-light
                  p Acciones
            th(v-for="m in $parent.$data['modelInstance']", v-if="m.isVisible")
              .field.has-addons
                .control
                  .tooltip(data-tooltip="Ordenar la lista")
                    span.button.is-small.is-light(
                      @click.prevent="$parent.switchListOrder(m)"
                    ) 
                      span {{ m.label }}
                      span &nbsp;
                      v-icon(name="sort")
                    
                  
                .control(v-show="m.isFilterActive == false")
                  .tooltip(data-tooltip="Buscar dentro de la columna")
                    span.button.is-small.is-light(@click.prevent="m.isFilterActive = !m.isFilterActive")
                      v-icon(name="search", 
                        v-show="m.isVisible==true"
                      )

                .control(v-show="m.isFilterActive == true").is-fullwidth
                  .tooltip( data-tooltip="Nuevo tag" )
                    input.input.is-small.is-light(
                      style="min-width:150px;",
                      type="text", 
                      v-model="m.searchTextInField",
                      placeholder="filtrar aquí",
                      v-show="$parent.$data[$parent.$data['localInstanceName']].length > 0",
                      @change.prevent="$parent.filterInTable()"
                    )
                .control(v-show="m.isFilterActive == true")
                  a.button.is-small.is-light(
                    @click="m.isFilterActive=!m.isFilterActive", 
                    :disabled="$parent.$data[$parent.$data['localInstanceName']].length==0?true:false" 
                  ) &times;
          tr
            td
              .field.has-addons
                .control
                  span Tags&nbsp;
                    v-icon(name="hand-point-right")

            td(v-for="m in $parent.$data['modelInstance']", v-if="m.isVisible")
              .tags
                span.tag(
                  v-if="m.arrayTextsInSearch.length > 0",
                  v-for="tag in m.arrayTextsInSearch",
                  :class="tag.isRestrictiveFilter==true?'is-primary':'is-light'"
                )
                  .tooltip(data-tooltip="Restringir búsqueda")
                    a(@click.prevent="$parent.filterInTableValidatingRestrictions(tag)") {{ tag.text }} 
                    button.delete.is-rounded.is-small(@click.prevent="$parent.deteleTagInTable(m.arrayTextsInSearch, tag.text)")

        tbody
          tr.is-text-centered(v-show="$parent.$data[$parent.$data['localInstanceName']].length==0")
            td(:colspan="filterBy($parent.$data['modelInstance'], true).length+1") 
              p(style="float:right;") Click Aqui para recargar
                a.button.is-light(@click.prevent="$parent.restartTable()") &#8635;
              p No hay datos a mostrar
          tr(v-for="elem in filterBy($parent.$data[$parent.$data['localInstanceName']], $parent.$data['textPrincipalFilter'])")
            td 
              .buttons.has-addons
                .button.is-small.tooltip.is-link(data-tooltip="Opciones", @click.prevent="$parent.modalGestionarElemento(elem)")
                  v-icon(name="cogs")
                .button.is-small.tooltip(data-tooltip="Marcar",
                  @click.prevent="$parent.groupMarkedElement(elem)", 
                  :class="$parent.$data['groupedMarkedElements'].indexOf(elem) === -1 ?'is-light':'is-info'"
                )
                  v-icon(name="thumbtack")
            td(v-for="m in $parent.$data['modelInstance']", v-if="m.isVisible") {{ elem[m.field] | checkRelationFilter(m) }}
</template>
<script>
  export default {
    mixins:[],
    name:'table-pro',
    components:{ },
    props:[
    ],
    watch: {

    },
    data() {
      return {
      }
    },
    filters: {},
    methods: {

      mousemove: function(e) {
        
        var mx2 = e.pageX - this.offsetLeft;
        if(this.mx) this.scrollLeft = this.sx + this.mx - mx2;
      },
      mousedown: function(e) {
        
        this.sx = this.scrollLeft;
        this.mx = e.pageX - this.offsetLeft;
      },
      mouseup: function () {
        this.mx = 0;
      },

    },
  }
</script>