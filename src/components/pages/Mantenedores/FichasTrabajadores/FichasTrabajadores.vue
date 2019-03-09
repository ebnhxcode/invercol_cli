<template lang="pug">
  div
    .section.hero.is-info.is-small.is-bold(v-show="isVisibleOptionsBanner==true")
      .hero-head.header.nav.container.nav-left.nav-item.nav-right.nav-menu.content.has-text-centered
      .hero-body
        //.has-text-centered
        h5.title Más opciones · Módulo de Fichas
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
                modal-ficha-trabajadores
                button.button.is-small(@click.prevent="modalGestionarFichasTrabajadores()") Nueva Ficha
                
                

        .columns
          .column.is-2.section(style="padding-right: 0px;")
            aside-menu

          .column.is-10.section

            div.box
               h2 Fichas Trabajadores
               table
                  thead
                     tr
                        th Acciones 
                        th Ficha ID
                        th Rut
                        th Dv
                        th Genero
                        th Nombre
                        th Apellido Paterno
                        th Apellido Materno
                        th Fecha Nacimiento
                        th Fecha Ingreso
                        th Id Establecimiento
                        th Id Cargo
                        th Sueldo Base
                        th Horas Semanales
                        th Horas Extras
                        th Bono
                  tbody
                     tr(v-for="ft in fichas_trabajadores")
                        th 
                           .button.is-small.tooltip.is-light(data-tooltip="Opciones")
                              v-icon(name="cogs")
                           .button.is-small.tooltip.is-light(data-tooltip="Eliminar")
                              v-icon(name="times")

                        td {{ ft.ficha_trabajador_id }}
                        td {{ ft.ficha_rut }}
                        td {{ ft.ficha_dv }}
                        td {{ ft.ficha_genero }}
                        td {{ ft.ficha_nombre }}
                        td {{ ft.ficha_apellido_paterno }}
                        td {{ ft.ficha_apellido_materno }}
                        td {{ ft.ficha_fecha_nacimiento }}
                        td {{ ft.ficha_fecha_ingreso }}
                        td {{ ft.establecimiento_id }}
                        td {{ ft.cargo_id }}
                        td {{ ft.sueldo_base }}
                        td {{ ft.horas_semanales }}
                        td {{ ft.horas_extras }}
                        td {{ ft.bono }}


</template>

<script>

import AsideMenu from '@/components/layouts/Menus/AsideMenu.vue'
import ModalFichaTrabajadores from "@/components/pages/Mantenedores/FichasTrabajadores/Modals/ModalFichaTrabajadores.vue"

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from '@/services/environments/environment-config'

export default {
  mixins: [ InvercolCoreFunctionsMixin ],
  components: {
    AsideMenu,
    ModalFichaTrabajadores
  },
  created(){
    this.instanceTableWithLocalObjects()
  },
  data() {
    return {
        /* Variables y Setup del Componente */
        fichas_trabajadores:[], // lista de libros
        localInstanceNameDetail:'Fichas', // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
        isVisibleOptionsBanner:false,
        isLoading: false,



    }
  },

  watch: {},
  methods: {
    instanceTableWithLocalObjects(){
      this.obtenerFichasTrabajadores()

    },

    obtenerFichasTrabajadores: function () {
      this.isLoading = true
      this.$http.get(`${environmentConfig.invercolProd.apiUrl}/frontend/fichas_trabajadores`)
        .then(response => { // success callback
          if (response.status = 200) {
            this.fichas_trabajadores = {}
            this.fichas_trabajadores = response.body
          }
          this.isLoading = false
      }, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
    },



    modalGestionarFichasTrabajadores: function () {
      console.log('si estoy llegando al modal')
      this.$modal.show("modal-ficha-trabajadores")
    }
  }

}
</script>