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
                     tr(v-for="account in accounts")
                        th 
                           .button.is-small.tooltip.is-light(data-tooltip="Opciones")
                              v-icon(name="cogs")
                           .button.is-small.tooltip.is-light(data-tooltip="Eliminar")
                              v-icon(name="times")
                        td {{ account.cuenta_id }}
                        td {{ account.cuenta_codigo || 'Sin codigo adicional incorporado' }}
                        td {{ account.cuenta_nombre }}
                        td {{ account.cuenta_descripcion }}
                        td {{ account.cuenta_titular == 0 ? 'Cuenta Titular' : 'Normal' }}
                        td {{ account.cuenta_dependencia_id ? account.cuenta_dependencia.cuenta_dependencia_nombre : 'Sin dependencia' }}
                        td {{ account.libros_cuentas ? account.libros_cuentas.length : 0 }}
            
            
              
        
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
        accounts:[], // objetos de la lista
        localInstanceNameDetail:'Cuentas', // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
        isVisibleOptionsBanner:false,

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
            this.accounts = response.body
            //console.log(this.books)
          }
          this.isLoading = false
      }, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
    },

  


  },

}
</script>