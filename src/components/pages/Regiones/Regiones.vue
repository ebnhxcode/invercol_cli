<template lang="pug">
  div
    .section.hero.is-info.is-small.is-bold(v-show="isVisibleOptionsBanner==true")
      .hero-head.header.nav.container.nav-left.nav-item.nav-right.nav-menu.content.has-text-centered
      .hero-body
        //.has-text-centered
        h5.title Más opciones · Mantenedor de Regiones
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

                button.button.is-small() Nueva Region

        .columns
          .column.is-2.section(style="padding-right: 0px;")
            aside-menu

          .column.is-10.section
            div.box
               h2 Regiones               
               table
                  thead
                     tr
                        th Acciones 
                        th Región ID
                        th Region Nombre
                  tbody
                     tr(v-for="region in regions")
                        th 
                           .button.is-small.tooltip.is-light(data-tooltip="Opciones")
                              v-icon(name="cogs")
                           .button.is-small.tooltip.is-light(data-tooltip="Eliminar")
                              v-icon(name="times")
                        td {{ region.region_id }}
                        td {{ region.region_nombre }}
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
        regions:[], // objetos de la lista
        localInstanceNameDetail:'Regiones', // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
        isVisibleOptionsBanner:false,
        isLoading: false,

    }
  },

  watch: {},
  methods: {
    instanceTableWithLocalObjects(){
      this.isLoading = true

      this.$http.get(`http://invercolbackend.publicidadorigen.cl/frontend/regiones`)
        .then(response => { // success callback
          if (response.status = 200) {
            this.regions = response.body
            //console.log(this.regions)
          }
          this.isLoading = false
      }, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
    },
  }

}
</script>