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
        //.has-text-centered
        h5.title Más opciones · Módulo de Usuarios
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

                button.button.is-small(@click.prevent="modalup") Nuevo Usuario

        .columns
          .column.is-2.section(style="padding-right: 0px;")
            aside-menu

          .column.is-10.section


            .column.is-6
              div.box
                h2 Nuevo Usuario
                .field
                  .field
                    label Campo 1
                    input.input.is-fullwidth(type='text', v-model='nuevo_usuario.campo_1')
                  .field
                    label Campo 2
                    input.input.is-fullwidth(type='text', v-model='nuevo_usuario.campo_2')
                  .field
                    label Campo 3
                    .select.is-fullwidth
                      select(v-model='nuevo_usuario.campo_3')
                        option(value='')
                        option(value='Tipo1') Tipo 1
                        option(value='Tipo2') Tipo 2
                        option(value='Tipo3') Tipo 3
                  .field
                    label Campo 4
                    input.input.is-fullwidth(type="date", v-model='nuevo_usuario.campo_4')

                .field.is-grouped
                  button.button.is-primary.is-small(
                      @click.prevent="guardar_usuario()"
                  ) Guardar Usuario

            .column.is-6

            div.box
               h2 Lista de Usuarios
               table
                  thead
                     tr
                        th Acciones 
                        th Campo 1
                        th Campo 2
                        th Campo 3
                        th Campo 4
                        th Campo 5
                        th Campo 6
                  tbody
                     tr(v-for="a in 10")
                        th 
                           .button.is-small.tooltip.is-light(data-tooltip="Opciones")
                              v-icon(name="cogs")
                           .button.is-small.tooltip.is-light(data-tooltip="Eliminar")
                              v-icon(name="times")
                        td Dato 1
                        td Dato 2
                        td Dato 3
                        td Dato 4
                        td Dato 5
                        td Dato 6
            
              
        
</template>
<script>

import AsideMenu from '@/components/layouts/Menus/AsideMenu.vue'

export default {
  mixins: [  ],
  components: {
    AsideMenu
  },
  created(){
    this.instanceTableWithLocalObjects()
  },
  data() {
    return {
        /* Variables y Setup del Componente */
        usuarios:[], // objetos de la lista
        localInstanceNameDetail:'Usuarios', // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
        isVisibleOptionsBanner:false,
        nuevo_usuario: {

        }

    }
  },

  watch: {

  },
  methods: {

    instanceTableWithLocalObjects(){

    },

    guardar_usuario: function () {},



  },

}
</script>