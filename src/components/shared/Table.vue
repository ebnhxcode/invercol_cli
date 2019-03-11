<template lang="pug">
  div
    .is-narrow(
        v-show="!$parent.$data['isLoading']", 
        style="overflow-x: scroll;font-size: 0.8rem;display:block;white-space: nowrap;max-width: 100%;user-select:text !important;"
      )             
      table
        thead(v-show="$parent.$data['groupedMarkedElements'].length > 0")
          tr.is-text-centered(v-if="$parent.$data['groupedMarkedElements'].length > 0")
            td(:colspan="filterBy($parent.$data['modelInstance'], true).length+1") 
              p(v-show="$parent.$data['groupedMarkedElements'].length > 0") Tabla Comparativa de elementos agrupados 
                v-icon(name="thumbtack")
          tr
            th Acciones
            th(v-for="m in $parent.$data['modelInstance']", v-if="m.isVisible")
              span {{ m.label }}

          tr.is-text-centered(v-for="elem in $parent.$data['groupedMarkedElements']") 
            td
              .button.is-small.tooltip.is-light(data-tooltip="Opciones",@click.prevent="$parent.modalConfig(elem)")
                v-icon(name="cogs")
              .button.is-small.is-danger.tooltip(data-tooltip="Quitar", @click.prevent="$parent.removeMarkedElement(elem)") ❌           

            td(
              v-for="m in $parent.$data['modelInstance']", 
              v-if="m.isVisible"
            ) {{ elem[m.field] | checkRelationFilter(m) }}
          tr

        thead

          tr.is-text-centered(v-show="$parent.$data[$parent.$data['localInstanceName']].length>0")
            td(:colspan="filterBy($parent.$data['modelInstance'], true).length+1") 
              p Filtros y ordenamiento de elementos seleccionados en el tablero
          tr
            th
              .tooltip(data-tooltip=".u.")
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
                //.control
                    .tooltip.is-small(
                      data-tooltip="Limpiar tags",
                      @click.prevent="$parent.limpiarFiltrosModel()"
                    )
                      span.button.is-small
                        v-icon(name="trash")

                //.control
                  .tooltip.is-small(data-tooltip="Sobre el tag, clic para restringir.")
                    span.button.is-small
                      v-icon(name="info-circle")

                //.control
                  .tooltip.is-small(
                    data-tooltip="Quitar restricciones.",
                    @click.prevent="$parent.restartAllTagRestrictions()"
                  )
                    span.button.is-small
                      v-icon(name="eraser")

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
            td(:colspan="filterBy($parent.$data['modelInstance'], true).length") 
              p(style="float:right;") Click Aqui para recargar
                a.button.is-light(@click="$parent.restartTable()") &#8635;
              p No hay datos a mostrar
          tr( 
            v-for="objInstance in filterBy($parent.$data[$parent.$data['localInstanceName']], $parent.$data['textPrincipalFilter'])",
          )
            td
              .button.is-small.tooltip.is-light(data-tooltip="Opciones",@click.prevent="$parent.modalConfig(objInstance)")
                v-icon(name="cogs")
              .button.is-small.tooltip(data-tooltip="Marcar",
                @click.prevent="$parent.groupMarkedElement(objInstance)", 
                :class="$parent.$data['groupedMarkedElements'].indexOf(objInstance) === -1 ?'is-light':'is-info'"
              )
                v-icon(name="thumbtack")
                //.field.has-addons                
                  .control
                    .button.is-small.tooltip(data-tooltip="Modificar")
                      v-icon(name="edit",@click.prevent="$parent.show")
                  .control
                    .button.is-small.tooltip(data-tooltip="Ver")
                      v-icon(name="info")
                  .control
                    .button.is-small.tooltip(data-tooltip="Eliminar")
                      v-icon(name="trash")

            td(
              v-for="m in $parent.$data['modelInstance']", 
              v-if="m.isVisible"
            ) {{ objInstance[m.field] | checkRelationFilter(m) }}
</template>
<script>
  export default {
    name:'table',

    data() {
      return {
        mx:null,
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
<style lang="scss">
  .box {
    overflow-x: auto;
    overflow-y: hidden;

    -webkit-touch-callout: none;
    -webkit-user-select: none;  
    -moz-user-select: none;   
    -ms-user-select: none;     
    user-select: none; 
  }
  
  .wmd-view-topscroll, .wmd-view {
      overflow-x: scroll;
      overflow-y: hidden;
      width: 300px;
      border: none 0px RED;
  }

  .wmd-view-topscroll { height: 20px; }
  .wmd-view { height: 200px; }
  .scroll-div1 { 
      width: 1000px; 
      overflow-x: scroll;
      overflow-y: hidden;
      height:20px;
  }
  .scroll-div2 { 
      width: 1000px; 
      height:20px;
  }
</style>