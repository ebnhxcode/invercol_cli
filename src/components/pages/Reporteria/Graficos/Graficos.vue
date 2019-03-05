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
        h5.title Más opciones · Módulo de Gráficos
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


        .columns
          .column.is-2.section(style="padding-right: 0px;")
            aside-menu

          .column.is-10.section
            div.box
               h2 Sección de la Tabla
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
            
            
            .tile.is-ancestor
              .tile.is-vertical.is-8
                .tile
                  .tile.is-parent.is-vertical
                    article.tile.is-child.notification.is-danger
                      p.title Visualizacion 1
                      p.subtitle Datos visualización 1
                    article.tile.is-child.notification.is-success
                      p.title Visualizacion 2
                      p.subtitle Datos Visualizacion 2
                      .content
                  .tile.is-parent
                    article.tile.is-child.notification.is-warning
                      p.title Visualizacion 3
                      p.subtitle Datos Visualizacion 2
                      figure.image.is-16by10
                        img(src='http://www.panoramanica.com/wp-content/uploads/2016/05/seo-featured-image-2.png')
                      .content
                .tile.is-parent
                  article.tile.is-child.notification.is-danger
                    p.title Visualizacion 4
                    p.subtitle Datos Visualizacion 4
                    figure.image.is-16by10
                      img(src='http://www.panoramanica.com/wp-content/uploads/2016/05/seo-featured-image-2.png')
                    .content
                      // Content
              .tile.is-parent.is-vertical
                article.tile.is-child.notification.is-primary
                  //.content
                  p.title Visualizacion 5
                  p.subtitle Datos Visualizacion 5
                  figure.image.is-16by10
                    img(src='http://www.panoramanica.com/wp-content/uploads/2016/05/seo-featured-image-2.png')
                  .content
                    // Content
                          
                article.tile.is-child.notification.is-primary
                  //.content
                  p.title Visualizacion 6
                  p.subtitle Datos Visualizacion 6
                  figure.image.is-16by10
                    img(
                      src='http://www.panoramanica.com/wp-content/uploads/2016/05/seo-featured-image-2.png',
                      style="border-radius: 5px 5px;"
                    )
                  .content
                    p Visualizacion
                    // Content
                  figure.image.is-16by10
                    img(
                      src='http://www.panoramanica.com/wp-content/uploads/2016/05/seo-featured-image-2.png',
                      style="border-radius: 5px 5px;"
                    )
              
        
</template>
<script>

import AsideMenu from '@/components/layouts/Menus/AsideMenu.vue'

export default {
  mixins: [  ],
  components: {
    AsideMenu
  },
  created(){
  },
  data() {
    return {
        /* Variables y Setup del Componente */
        books:[], // objetos de la lista
        localInstanceNameDetail:'Graficos', // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
        isVisibleOptionsBanner:false,

    }
  },

  watch: {

  },
  methods: {

  },

}
</script>