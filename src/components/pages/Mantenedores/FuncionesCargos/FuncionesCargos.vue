<template lang="pug">
  div
    .section.hero.is-info.is-small.is-bold(v-show="isVisibleOptionsBanner==true")
      .hero-head.header.nav.container.nav-left.nav-item.nav-right.nav-menu.content.has-text-centered
      .hero-body
        //.has-text-centered
        h5.title Más opciones · Módulo de Funciones (Cargos)
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

                modal-gestionar-cargos
                button.button.is-small(@click.prevent="modalGestionarCargos()") Nueva Función
                
                

        .columns
          .column.is-2.section(style="padding-right: 0px;")
            aside-menu

          .column.is-10.section



            div.box
               h2 Funciones
               table
                  thead
                     tr
                        th Acciones 
                        th Cargo ID
                        th Nombre
                        th Código
                        th Descripción
                        th Tipo Cargo
                  tbody
                     tr(v-for="c in cargos")
                        th 
                           .button.is-small.tooltip.is-light(data-tooltip="Opciones")
                              v-icon(name="cogs")
                           .button.is-small.tooltip.is-light(data-tooltip="Eliminar")
                              v-icon(name="times")
                        td {{ c.cargo_id }}
                        td {{ c.cargo_nombre }}
                        td {{ c.cargo_codigo }}
                        td {{ c.cargo_descripcion }}
                        td {{ c.tipo_cargo_id == 1 ? 'RBD' : 'AC' }}


</template>

<script>

import AsideMenu from '@/components/layouts/Menus/AsideMenu.vue'
import ModalGestionarCargos from "@/components/pages/Mantenedores/FuncionesCargos/Modals/ModalGestionarCargos.vue"

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from '@/services/environments/environment-config'

export default {
  mixins: [ InvercolCoreFunctionsMixin ],
  components: {
    AsideMenu,
    ModalGestionarCargos
  },
  created(){
    this.instanceTableWithLocalObjects()
  },
  data() {
    return {
        /* Variables y Setup del Componente */
        cargos:[], // lista de libros
        localInstanceNameDetail:'Funciones', // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
        isVisibleOptionsBanner:false,
        isLoading: false,



    }
  },

  watch: {},
  methods: {
    instanceTableWithLocalObjects(){
      this.obtenerCargos()

    },
    obtenerCargos: function () {
      this.isLoading = true
      this.$http.get(`${environmentConfig.invercolProd.apiUrl}/frontend/cargos`)
        .then(response => { // success callback
          if (response.status = 200) {
            this.cargos = {}
            this.cargos = response.body
          }
          this.isLoading = false
      }, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
    },


    guardar_funcion: function () {},



    modalGestionarCargos: function () {
      console.log('si estoy llegando al modal')
      this.$modal.show("modal-gestionar-cargos")
    }
  }

}
</script>