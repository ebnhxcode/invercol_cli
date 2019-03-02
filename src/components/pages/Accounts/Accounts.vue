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

                button.button.is-small(@click.prevent="modalup") Nueva Cuenta
                button.button.is-small(@click.prevent="modalup") Asociar Cuenta a Libro

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
                      label Nombre
                      input.input.is-fullwidth(type='text', v-model='nueva_cuenta.libro_nombre')
                    .field
                      label Descripción
                      input.textarea.is-fullwidth(v-model='nueva_cuenta.libro_descripcion', rows="1")

                  .field.is-grouped
                    button.button.is-primary.is-small(
                        @click.prevent="guardar_nueva_cuenta()"
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
                          option(v-for='c in cuentas', :value='a.cuenta_id') {{ `${c.cuenta_id} - ${c.cuenta_nombre}` }}


                    .field
                      label Seleccione Libro
                      .select.is-fullwidth
                        select(v-model='nueva_cuenta_libro.libro_id')
                          option(value='')
                          option(v-for='l in libros', :value='l.libro_id') {{ l.libro_nombre }}


                  .field.is-grouped
                    button.button.is-primary.is-small(
                        @click.prevent="saveNewBook()"
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
                        th En Libros
                  tbody
                     tr(v-for="cuenta in cuentas")
                        th 
                           .button.is-small.tooltip.is-light(data-tooltip="Opciones")
                              v-icon(name="cogs")
                           .button.is-small.tooltip.is-light(data-tooltip="Eliminar")
                              v-icon(name="times")
                        td {{ cuenta.cuenta_id }}
                        td {{ cuenta.cuenta_codigo || 'Sin codigo adicional incorporado' }}
                        td {{ cuenta.cuenta_nombre }}
                        td {{ cuenta.cuenta_descripcion }}
                        td {{ cuenta.cuenta_titular == 0 ? 'Cuenta Titular' : 'Normal' }}
                        td {{ cuenta.cuenta_dependencia_id ? cuenta.cuenta_dependencia.cuenta_dependencia_nombre : 'Sin dependencia' }}
                        td {{ cuenta.libros_cuentas ? cuenta.libros_cuentas.length : 0 }}
            
            
              
        
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
        cuentas:[], // objetos de la lista
        libros:[], // libros
        localInstanceNameDetail:'Cuentas', // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
        isVisibleOptionsBanner:false,
        nueva_cuenta:{},
        nueva_cuenta_libro:{},

    }
  },

  watch: {

  },
  methods: {
    instanceTableWithLocalObjects(){
      this.isLoading = true

      this.$http.get(`http://invercolbackend.publicidadorigen.cl/frontend/cuentas`)
        .then(response => { // success callback
          if (response.status = 200) {
            this.cuentas = response.body
            
          }
          this.isLoading = false
      }, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
      this.$http.get(`http://invercolbackend.publicidadorigen.cl/frontend/libros`)
        .then(response => { // success callback
          if (response.status = 200) {
            this.libros = response.body
          
          }
          this.isLoading = false
      }, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
    },

  


  },

}
</script>