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
        h5.title Menú · Menú Principal
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
            h1 Lo principal de cada módulo

            .tile.is-ancestor
              .tile.is-vertical.is-8
                .tile
                  .tile.is-parent.is-vertical
                    article.tile.is-child.notification.is-primary
                      p.title Invercol IO
                      p.subtitle Sistema de Ingresos y Egresos
                    article.tile.is-child.notification.is-warning
                      p.title Usuarios
                      p.subtitle Administre y gestione sus usuarios
                      .content
                        p La administración de usuarios está sujeta a configuración de los usuarios a través de su administración local
                  .tile.is-parent
                    article.tile.is-child.notification.is-info
                      p.title Libros
                      p.subtitle Cree, edite o administre libros
                      figure.image.is-4by3
                        img(src='https://bulma.io/images/placeholders/640x480.png')
                      .content
                        p La administración de libros está sujeta a configuración de los usuarios a través de su administración local
                .tile.is-parent
                  article.tile.is-child.notification.is-danger
                    p.title Monitoreo y Logs
                    p.subtitle El sistema de monitoreo tendrá información acerca de la navegación del sitio, respaldos, detalle de transacciones y más.
                    figure.image.is-16by10
                      img(src='http://www.panoramanica.com/wp-content/uploads/2016/05/seo-featured-image-2.png')
                    .content
                      // Content
              .tile.is-parent.is-vertical
                article.tile.is-child.notification.is-success
                  //.content
                  p.title Gráficos
                  p.subtitle Visualice sus ingresos y egresos en la sección de gráficos, explore sus opciones de búsqueda y descargue los datos que necesita respaldar
                  figure.image.is-4by3
                    img(src='https://bulma.io/images/placeholders/640x480.png')
                  .content
                    p La visualizacion de reportes está sujeta a configuración de los usuarios a través de su administración local
                    // Content
                          
                article.tile.is-child.notification.is-success
                  //.content
                  p.title Notificaciones
                  p.subtitle Para eventos del sistema
                  figure.image.is-16by10
                    img(
                      src='http://gestron.es/wp-content/uploads/2017/11/aeat-notificaciones-060-1.png',
                      style="border-radius: 5px 5px;"
                    )
                  .content
                    p La notificaciones se visualizan segun el perfil de usuario para cada gestion asociada.
                    // Content
                  figure.image.is-16by10
                    img(
                      src='https://marketing4ecommerce.mx/wp-content/uploads/2016/08/NotificacionesWebOk.jpg',
                      style="border-radius: 5px 5px;"
                    )


</template>
<script>

import AsideMenu from '@/components/layouts/Menus/AsideMenu.vue'

export default {
  components: {
    AsideMenu
  },
  data() {
    return {
      searchQuery: "",
      /* Variables y Setup del Componente */
      localInstanceNameDetail:'Home', // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
      isVisibleOptionsBanner:false,
    }
  }
}
</script>