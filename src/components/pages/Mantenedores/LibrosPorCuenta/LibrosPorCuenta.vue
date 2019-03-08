<template lang="pug">
  div
    .section.hero.is-info.is-small.is-bold(v-show="isVisibleOptionsBanner==true")
      .hero-head.header.nav.container.nav-left.nav-item.nav-right.nav-menu.content.has-text-centered
      .hero-body
        //.has-text-centered
        h5.title Más opciones · Módulo de Libros
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

                button.button.is-small(@click.prevent="modalNuevoLibro()") Nuevo Libro
                button.button.is-small(@click.prevent="false") Asociar Libro a Cuenta
                
                //modal-new-book

        .columns
          .column.is-2.section(style="padding-right: 0px;")
            aside-menu

          .column.is-10.section

            .columns
              .column.is-6
                div.box
                  h2 Nuevo Libro
                  .field
                    .field
                      label Libro Código
                      input.input.is-fullwidth(type='text', v-model='nuevo_libro.libro_codigo')
                    .field
                      label Libro Nombre
                      input.input.is-fullwidth(type='text', v-model='nuevo_libro.libro_nombre')
                    .field
                      label Libro Descripción
                      input.textarea.is-fullwidth(v-model='nuevo_libro.libro_descripcion', rows="1")

                  .field.is-grouped
                    button.button.is-primary.is-small(
                        @click.prevent="guardarNuevoLibro(nuevo_libro)"
                    ) Guardar Libro

              .column.is-6
                div.box
                  h2 Asociar Libro a Cuenta
                  .field
                    .field
                      label Seleccione Libro
                      .select.is-fullwidth
                        select(v-model='nuevo_libro_cuenta.libro_id')
                          option(value='')
                          option(v-for='l in libros', :value='l.libro_id') {{ l.libro_nombre }}

                    .field
                      label Seleccione Cuenta
                      .select.is-fullwidth
                        select(v-model='nuevo_libro_cuenta.cuenta_id')
                          option(value='')
                          option(v-for='c in cuentas', :value='c.cuenta_id') {{ `${c.cuenta_id} - ${c.cuenta_nombre}` }}

                  .field.is-grouped
                    button.button.is-primary.is-small(
                        @click.prevent="guardarNuevoLibroCuenta()"
                    ) Guardar Asociacion

            div.box
               h2 Libros               
               table
                  thead
                     tr
                        th Acciones 
                        th Libro ID
                        th Libro Código
                        th Libro Nombre
                        th Libro Descripción
                        th Cuentas
                  tbody
                     tr(v-for="l in libros")
                        th
                          .buttons.has-addons
                           .button.is-small.tooltip.is-light(
                              data-tooltip="Editar", 
                              @click.prevent="editarLibro(l.libro_id)",
                              v-if="id_libro_edicion == null || id_libro_edicion != l.libro_id"
                            )
                              v-icon(name="edit")
                           .button.is-small.tooltip.is-primary(
                              data-tooltip="Actualizar", 
                              @click.prevent="actualizarLibro(l)",
                              v-if="id_libro_edicion != null && id_libro_edicion == l.libro_id"
                            )
                              v-icon(name="check")
                           //.button.is-small.tooltip.is-light(data-tooltip="Opciones")
                              v-icon(name="cogs")
                           .button.is-small.tooltip.is-danger(data-tooltip="Eliminar", @click.prevent="eliminarLibro(l.libro_id)")
                              v-icon(name="times")
                        td {{ l.libro_id }}

                        td(v-if="id_libro_edicion!=l.libro_id") {{ l.libro_codigo }}
                        td(v-else)
                          input.input.is-fullwidth(type='text', v-model='l.libro_codigo')

                        td(v-if="id_libro_edicion!=l.libro_id") {{ l.libro_nombre }}
                        td(v-else)
                          input.input.is-fullwidth(type='text', v-model='l.libro_nombre')

                        td(v-if="id_libro_edicion!=l.libro_id") {{ l.libro_descripcion }}
                        td(v-else)
                          input.textarea.is-fullwidth(v-model='l.libro_descripcion', rows='1')

                        td {{ l.libros_cuentas ? l.libros_cuentas.length : 0 }}


</template>
<script>

import AsideMenu from '@/components/layouts/Menus/AsideMenu.vue'
  import { environmentConfig } from '@/services/environments/environment-config'
//import ModalNewBook from '@/components/pages/Books/Modals/ModalNewBook/Modalnuevo_libro.vue'

export default {
  mixins: [  ],
  components: {
    AsideMenu,
    //ModalNewBook
  },
  created(){
    this.instanceTableWithLocalObjects()
  },
  data() {
    return {
        /* Variables y Setup del Componente */
        localInstanceNameDetail:'Libros', // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
        isVisibleOptionsBanner:false,
        isLoading: false,

        libros:[], // lista de libros
        cuentas:[], // lista de cuentas
        nuevo_libro: {
          libro_id:'',
          libro_codigo:'',
          libro_nombre:'',
          libro_descripcion:'',
        },
        nuevo_libro_cuenta: {
          libro_id:'',
          cuenta_id:'',
        },
        id_libro_edicion:null,

    }
  },

  watch: {},
  methods: {
    instanceTableWithLocalObjects(){
      this.obtenerLibros()
      this.obtenerCuentas()

    },

    limpiarNuevoLibro: function () {
      this.nuevo_libro = {
        libro_codigo:'',
        libro_nombre:'',
        libro_descripcion:'',
      }
    },

    obtenerLibros: function () {
      this.isLoading = true
      this.$http.get(`${environmentConfig.invercolProd.apiUrl}/frontend/libros`)
        .then(response => { // success callback
          if (response.status = 200) {
            this.libros = {}
            this.libros = response.body
          }
          this.isLoading = false
      }, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
    },
    obtenerCuentas: function () {
      this.isLoading = true
      this.$http.get(`${environmentConfig.invercolProd.apiUrl}/frontend/cuentas`)
        .then(response => { // success callback
          if (response.status = 200) {
            this.cuentas = {}
            this.cuentas = response.body
          }
          this.isLoading = false
      }, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
    },
    guardarNuevoLibro: function (nuevo_libro) {
      var formData = new FormData();
      //Conforma objeto paramétrico para solicitud http
      formData.append(`libro_codigo`, nuevo_libro.libro_codigo || 'Null');
      formData.append(`libro_nombre`, nuevo_libro.libro_nombre || 'Null');
      formData.append(`libro_descricion`, nuevo_libro.libro_descripcion || 'Null');
      this.$http.post(`${environmentConfig.invercolProd.apiUrl}/frontend/libros`, formData).then(response => { // success callback
        if (response.status == 200 || response.status == 201) {
          console.log(response)
          this.obtenerLibros()
          this.limpiarNuevoLibro()
            
              
        }
      }, response => { // error callback
      });

    },
    eliminarLibro: function (libro_id) {
      //var formData = new FormData();
      //Conforma objeto paramétrico para solicitud http
      //formData.append(`libro_id`, libro_id);
      this.$http.delete(`${environmentConfig.invercolProd.apiUrl}/frontend/libros/${libro_id}`).then(response => { // success callback
        if (response.status == 200) {
          console.log(response)
          this.obtenerLibros()
            
              
        }
      }, response => { // error callback
      });
    },
    editarLibro: function (libro_id) {
      this.id_libro_edicion = libro_id
    },
    actualizarLibro: function (libro) {
      this.$http.put(`${environmentConfig.invercolProd.apiUrl}/frontend/libros/${libro.libro_id}`, libro).then(response => { // success callback
        if (response.status == 200 || response.status == 201) {
          console.log(response)
          this.obtenerLibros()
          this.id_libro_edicion = null
            
              
        }
      }, response => { // error callback
      });
    },
    guardarNuevoLibroCuenta: function () {

    },

    modalNuevoLibro: function () {
      console.log('si estoy llegando al modal')
      //this.$modal.show('modal-new-book')
    }
  }

}
</script>