<template lang="pug">
  div
    .section.hero.is-info.is-small.is-bold(v-show="isVisibleOptionsBanner==true")
      .hero-head.header.nav.container.nav-left.nav-item.nav-right.nav-menu.content.has-text-centered
      .hero-body
        //.has-text-centered
        h5.title Más opciones · Módulo de Subvenciones por Cuenta
        h6 Invercol IO

    .hero.is-light.hero-head
      .content

        .columns
          .column.is-12
            div.box(style="border-radius: 2px 2px 5px 5px;")
              .buttons

                button.button.is-small(
                  @click.prevent="isVisibleOptionsBanner=!isVisibleOptionsBanner",
                  :class="isVisibleOptionsBanner==true?'is-danger':'is-primary'",
                  href="/#top"
                )
                  small Más Opciones &nbsp;
                  v-icon(name="arrow-up",v-if="isVisibleOptionsBanner==true")
                  v-icon(name="arrow-down",v-if="isVisibleOptionsBanner==false")

                button.button.is-small() Nueva Subvención
                
                modal-new-book

        .columns
          .column.is-2.section(style="padding-right: 0px;")
            aside-menu

          .column.is-10.section

            .columns
              .column.is-6
                div.box
                  h2 Nueva Subvención
                  .field
                    .field
                      label Campo 1
                      input.input.is-fullwidth(type='text', v-model='nueva_subvencion.campo_1')
                    .field
                      label Campo 2
                      input.input.is-fullwidth(type='text', v-model='nueva_subvencion.campo_2')
                    .field
                      label Campo 3
                      .select.is-fullwidth
                        select(v-model='nueva_subvencion.campo_3')
                          option(value='')
                          option(value='Tipo1') Tipo 1
                          option(value='Tipo2') Tipo 2
                          option(value='Tipo3') Tipo 3
                    .field
                      label Campo 4
                      input.input.is-fullwidth(type="date", v-model='nueva_subvencion.campo_4')

                  .field.is-grouped
                    button.button.is-primary.is-small(
                        @click.prevent="guardar_subvencion()"
                    ) Guardar Subvención

              .column.is-6

            div.box
               h2 Subvenciones               
               table
                  thead
                     tr
                        th Acciones 
                        th Subvención ID
                        th Nombre
                        th Descripción
                  tbody
                     tr(v-for="a in 5")
                        th 
                           .button.is-small.tooltip.is-light(data-tooltip="Opciones")
                              v-icon(name="cogs")
                           .button.is-small.tooltip.is-light(data-tooltip="Eliminar")
                              v-icon(name="times")
                        td dato1
                        td dato2
                        td dato3


</template>

<script>

import AsideMenu from '@/components/layouts/Menus/AsideMenu.vue'

export default {
  mixins: [  ],
  components: {
    AsideMenu,
  },
  created(){
    this.instanceTableWithLocalObjects()
  },
  data() {
    return {
        /* Variables y Setup del Componente */
        subvenciones:[], // lista de libros
        localInstanceNameDetail:'Subvenciones', // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
        isVisibleOptionsBanner:false,
        isLoading: false,
        nueva_subvencion: {

        },


    }
  },

  watch: {},
  methods: {
    instanceTableWithLocalObjects(){


    },

    guardar_subvencion: function () {

    },



    modalNewBook: function () {
      console.log('si estoy llegando al modal')
      //this.$modal.show('modal-new-book')
    }
  }

}
</script>