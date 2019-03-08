<template lang="pug">
  div
    .section.hero.is-info.is-small.is-bold(v-show="isVisibleOptionsBanner==true")
      .hero-head.header.nav.container.nav-left.nav-item.nav-right.nav-menu.content.has-text-centered
      .hero-body
        //.has-text-centered
        h5.title Más opciones · Módulo de Cuentas
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

                button.button.is-small(@click.prevent="modalNuevaCuenta()") Nueva Cuenta
                button.button.is-small(@click.prevent="false") Asociar Cuenta a Libro

        .columns
          .column.is-2.section(style="padding-right: 0px;")
            aside-menu




          .column.is-10.section


            .columns
              .column.is-6
                div.box
                  h2 Nueva Cuenta
                  .field
                    .field
                      label Código
                      input.input.is-fullwidth(type='text', v-model='nueva_cuenta.cuenta_id')
                    .field
                      label Código Adicional
                      input.input.is-fullwidth(type='text', v-model='nueva_cuenta.cuenta_codigo')
                    .field
                      label Nombre
                      input.input.is-fullwidth(type='text', v-model='nueva_cuenta.libro_nombre')
                    .field
                      label Descripción
                      input.textarea.is-fullwidth(v-model='nueva_cuenta.libro_descripcion', rows="1")
                    .field
                      label Cuenta Titular
                        .select.is-fullwidth
                          select(v-model='nueva_cuenta.cuenta_titular')
                            option(value='')
                            option(value='0') Si
                            option(value='1') No
                    .field
                      label Cuenta Dependencia
                        .select.is-fullwidth
                          select(v-model='nueva_cuenta.cuenta_titular')
                              option(value='')
                              option(value='1') PS
                              option(value='2') M-CM
                              option(value='3') M-CM-PS

                  .field.is-grouped
                    button.button.is-primary.is-small(
                        @click.prevent="guardarNuevaCuenta(nueva_cuenta)"
                    ) Guardar Cuenta

              .column.is-6
                div.box
                  h2 Asociar Cuenta a Libro
                  .field


                    .field
                      label Seleccione Cuenta
                      .select.is-fullwidth
                        select(v-model='nueva_cuenta_libro.cuenta_id')
                          option(value='')
                          option(v-for='c in cuentas', :value='c.cuenta_id') {{ `${c.cuenta_id} - ${c.cuenta_nombre}` }}


                    .field
                      label Seleccione Libro
                      .select.is-fullwidth
                        select(v-model='nueva_cuenta_libro.libro_id')
                          option(value='')
                          option(v-for='l in libros', :value='l.libro_id') {{ l.libro_nombre }}


                  .field.is-grouped
                    button.button.is-primary.is-small(
                    ) Guardar Asociacion

            div.box
               h2 Cuentas
               table
                  thead
                     tr
                        th Acciones 
                        th Cuenta ID
                        th Cuenta Código
                        th Cuenta Nombre
                        th Cuenta Descripción
                        th Cuenta Titular
                        th Cuenta Dependencia
                        th Libros
                  tbody
                     tr(v-for="c in cuentas")
                        th 
                          .buttons.has-addons
                           .button.is-small.tooltip.is-light(
                              data-tooltip="Editar", 
                              @click.prevent="editarCuenta(c.cuenta_id)",
                              v-if="id_cuenta_edicion == null || id_cuenta_edicion != c.cuenta_id"
                            )
                              v-icon(name="edit")
                           .button.is-small.tooltip.is-primary(
                              data-tooltip="Actualizar", 
                              @click.prevent="actualizarCuenta(c)",
                              v-if="id_cuenta_edicion != null && id_cuenta_edicion == c.cuenta_id"
                            )
                              v-icon(name="check")
                           //.button.is-small.tooltip.is-light(data-tooltip="Opciones")
                              v-icon(name="cogs")
                           .button.is-small.tooltip.is-danger(data-tooltip="Eliminar", @click.prevent="eliminarCuenta(c.cuenta_id)")
                              v-icon(name="times")
                        td(v-if="id_cuenta_edicion!=c.cuenta_id") {{ c.cuenta_id }}
                        td(v-else)
                          input.input.is-fullwidth(type='text', v-model='c.cuenta_id')

                        td(v-if="id_cuenta_edicion!=c.cuenta_id") {{ c.cuenta_codigo || 'Sin codigo adicional incorporado' }}
                        td(v-else)
                          input.input.is-fullwidth(type='text', v-model='c.cuenta_codigo')

                        td(v-if="id_cuenta_edicion!=c.cuenta_id") {{ c.cuenta_nombre }}
                        td(v-else)
                          input.input.is-fullwidth(type='text', v-model='c.cuenta_nombre')

                        td(v-if="id_cuenta_edicion!=c.cuenta_id") {{ c.cuenta_descripcion }}
                        td(v-else)
                          input.textarea.is-fullwidth(v-model='c.cuenta_descripcion', rows='1')

                        td(v-if="id_cuenta_edicion!=c.cuenta_id") {{ c.cuenta_titular == 0 ? 'Cuenta Titular' : 'Normal' }}
                        td(v-else)
                          .select.is-fullwidth
                            select(v-model='c.cuenta_dependencia_id')
                              option(value='')
                              option(value='0') Si
                              option(value='1') No

                        td(v-if="id_cuenta_edicion!=c.cuenta_id") {{ c.cuenta_dependencia_id ? c.cuenta_dependencia.cuenta_dependencia_nombre : 'Sin dependencia' }}
                        td(v-else)
                          .select.is-fullwidth
                            select(v-model='c.cuenta_dependencia_id')
                              option(value='')
                              option(value='1') PS
                              option(value='2') M-CM
                              option(value='3') M-CM-PS

                        td {{ c.libros_cuentas ? c.libros_cuentas.length : 0 }}
            
            
              
        
</template>
<script>

import AsideMenu from '@/components/layouts/Menus/AsideMenu.vue'
import { environmentConfig } from '@/services/environments/environment-config'

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
        cuentas:[], // objetos de la lista
        libros:[], // libros
        cuenta_dependencias:[], // libros
        localInstanceNameDetail:'Cuentas', // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
        isVisibleOptionsBanner:false,
        nueva_cuenta:{
          cuenta_id:null,
          cuenta_codigo:null,
          cuenta_nombre:null,
          cuenta_descripcion:null,
          cuenta_titular:null,
          cuenta_dependencia_id:null,
        },
        nueva_cuenta_libro:{
          cuenta_id:null,
          libro_id:null,
        },
        id_cuenta_edicion:null,

    }
  },

  watch: {

  },
  methods: {
    instanceTableWithLocalObjects(){
      this.obtenerLibros()
      this.obtenerCuentas()

    },

    limpiarNuevaCuenta: function () {
      this.nueva_cuenta = {
        cuenta_id:'',
        cuenta_codigo:'',
        cuenta_nombre:'',
        cuenta_descripcion:'',
        cuenta_titular:'',
        cuenta_dependencia_id:'',
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
    obtenerDependencias: function () {
      this.isLoading = true
      this.$http.get(`${environmentConfig.invercolProd.apiUrl}/frontend/cuenta_dependencias`)
        .then(response => { // success callback
          if (response.status = 200) {
            this.cuenta_dependencias = {}
            this.cuenta_dependencias = response.body
          }
          this.isLoading = false
      }, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
    },


    guardarNuevaCuenta: function (nueva_cuenta) {
      var formData = new FormData();
      //Conforma objeto paramétrico para solicitud http
      formData.append(`cuenta_id`, nueva_cuenta.cuenta_id || 'Null');
      formData.append(`cuenta_codigo`, nueva_cuenta.cuenta_codigo || 'Null');
      formData.append(`cuenta_nombre`, nueva_cuenta.cuenta_nombre || 'Null');
      formData.append(`cuenta_descripcion`, nueva_cuenta.cuenta_descripcion || 'Null');
      formData.append(`cuenta_titular`, nueva_cuenta.cuenta_titular || 1);
      formData.append(`cuenta_dependencia_id`, nueva_cuenta.cuenta_dependencia_id || 0);
      this.$http.post(`${environmentConfig.invercolProd.apiUrl}/frontend/cuentas`, formData).then(response => { // success callback
        if (response.status == 200 || response.status == 201) {
          console.log(response)
          this.obtenerCuentas()
          this.limpiarNuevaCuenta()
            
              
        }
      }, response => { // error callback
      });
    },

    eliminarCuenta: function (cuenta_id) {
      //var formData = new FormData();
      //Conforma objeto paramétrico para solicitud http
      //formData.append(`libro_id`, libro_id);
      this.$http.delete(`${environmentConfig.invercolProd.apiUrl}/frontend/cuentas/${cuenta_id}`).then(response => { // success callback
        if (response.status == 200) {
          console.log(response)
          this.obtenerCuentas()
            
              
        }
      }, response => { // error callback
      });
    },
    editarCuenta: function (cuenta_id) {
      this.id_cuenta_edicion = cuenta_id
    },
    actualizarCuenta: function (cuenta) {
      this.$http.put(`${environmentConfig.invercolProd.apiUrl}/frontend/cuentas/${cuenta.cuenta_id}`, cuenta).then(response => { // success callback
        if (response.status == 200 || response.status == 201) {
          console.log(response)
          this.obtenerCuentas()
          this.id_cuenta_edicion = null
            
              
        }
      }, response => { // error callback
      });
    },
    guardarNuevoLibroCuenta: function () {

    },
    modalNuevaCuenta: function () {

    },

  },

}
</script>