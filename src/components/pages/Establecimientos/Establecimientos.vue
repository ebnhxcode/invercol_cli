<template lang="pug">
  div
    .section.hero.is-info.is-small.is-bold(v-show="isVisibleOptionsBanner==true")
      .hero-head.header.nav.container.nav-left.nav-item.nav-right.nav-menu.content.has-text-centered
      .hero-body
        //.has-text-centered
        h5.title Más opciones · Módulo de Establecimientos
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

                button.button.is-small() Nuevo Libro
                button.button.is-small() Asociar Libro a Cuenta
                
                modal-new-book

        .columns
          .column.is-2.section(style="padding-right: 0px;")
            aside-menu

          .column.is-10.section

            .columns
              .column.is-6
                div.box
                  h2 Nuevo Establecimiento
                  .field
                    .field
                      label Rbd
                      input.input.is-fullwidth(type='text', v-model='nuevo_establecimiento.establecimiento_rbd')
                    .field
                      label Nombre
                      input.input.is-fullwidth(type='text', v-model='nuevo_establecimiento.establecimiento_nombre')
                    .field
                      label Direccion
                      input.input.is-fullwidth(v-model='nuevo_establecimiento.establecimiento_direccion')
                    .field
                      label Descripción
                      input.textarea.is-fullwidth(v-model='nuevo_establecimiento.establecimiento_descripcion', rows="1")
                    .field
                      label Región
                      .select.is-fullwidth
                        select(v-model='nuevo_establecimiento.region_id')
                          option(value='')
                          option(v-for='r in regiones', :value='r.region_id') {{ r.region_nombre }}
                          
                    .field
                      label Comuna
                      .select.is-fullwidth
                        select(v-model='nuevo_establecimiento.comuna_id')
                          option(value='')
                          option(v-for='c in comunas', :value='c.comuna_id', v-if="nuevo_establecimiento.region_id == c.region_id ||  nuevo_establecimiento.region_id == null || !nuevo_establecimiento.region_id") {{ c.comuna_nombre }}
                          

                  .field.is-grouped
                    button.button.is-primary.is-small(
                        @click.prevent="guardar_establecimiento()"
                    ) Guardar Establecimiento

              .column.is-6
                div.box



            div.box
               h2 Establecimientos               
               table
                  thead
                     tr
                        th Acciones 
                        th Establecimiento ID
                        th Rbd
                        th Nombre
                        th Dirección
                        th Descripción
                        th Region
                        th Comuna
                  tbody
                     tr(v-for="establecimiento in establecimientos")
                        th 
                           .button.is-small.tooltip.is-light(data-tooltip="Opciones")
                              v-icon(name="cogs")
                           .button.is-small.tooltip.is-light(data-tooltip="Eliminar")
                              v-icon(name="times")
                        td {{ establecimiento.establecimiento_id }}
                        td {{ establecimiento.establecimiento_rbd }}
                        td {{ establecimiento.establecimiento_nombre }}
                        td {{ establecimiento.establecimiento_direccion }}
                        td {{ establecimiento.establecimiento_descripcion }}


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
        establecimientos:[], // lista de libros
        libros:[], // lista de libros
        cuentas:[], // lista de cuentas
        regiones:[], // lista de cuentas
        comunas:[], // lista de cuentas
        localInstanceNameDetail:'Establecimientos', // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
        isVisibleOptionsBanner:false,
        isLoading: false,
        nuevo_establecimiento: {
          establecimiento_rbd:'',
          establecimiento_nombre:'',
          establecimiento_direccion:'',
          establecimiento_descripcion:'',
        },


    }
  },

  watch: {},
  methods: {
    instanceTableWithLocalObjects(){
      this.getEstablecimientos()
      this.getBooks()
      this.getAccounts()
      this.getRegions()
      this.getCommunes()

    },

    getEstablecimientos: function () {
      this.isLoading = true

      this.$http.get(`http://invercolbackend.publicidadorigen.cl/frontend/establecimientos`)
        .then(response => { // success callback
          if (response.status = 200) {
            this.establecimientos = response.body
          }
          this.isLoading = false
      }, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
    },
    getBooks: function () {
      this.isLoading = true

      this.$http.get(`http://invercolbackend.publicidadorigen.cl/frontend/libros`)
        .then(response => { // success callback
          if (response.status = 200) {
            this.libros = response.body
          }
          this.isLoading = false
      }, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
    },
    getAccounts: function () {
      this.isLoading = true

      this.$http.get(`http://invercolbackend.publicidadorigen.cl/frontend/cuentas`)
        .then(response => { // success callback
          if (response.status = 200) {
            this.cuentas = response.body
          }
          this.isLoading = false
      }, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
    },
    getRegions: function () {
      this.isLoading = true

      this.$http.get(`http://invercolbackend.publicidadorigen.cl/frontend/regiones`)
        .then(response => { // success callback
          if (response.status = 200) {
            this.regiones = response.body
          }
          this.isLoading = false
      }, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
    },
    getCommunes: function () {
      this.isLoading = true

      this.$http.get(`http://invercolbackend.publicidadorigen.cl/frontend/comunas`)
        .then(response => { // success callback
          if (response.status = 200) {
            this.comunas = response.body
          }
          this.isLoading = false
      }, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
    },
    guardar_establecimiento: function () {

    },

    modalNewBook: function () {
      console.log('si estoy llegando al modal')
      //this.$modal.show('modal-new-book')
    }
  }

}
</script>