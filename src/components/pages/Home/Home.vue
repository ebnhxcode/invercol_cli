<template lang="pug">
  section.section
    nav.nav.has-shadow
      .container

        .tile.is-ancestor
          .tile.is-vertical.is-12

            .tile
              .tile.is-parent.is-vertical
                article.tile.is-child.notification.is-info
                  p.title Usuarios
                  p.subtitle App para la gestión de usuarios, creaciones, modificaciones y anulaciones.
              .tile.is-parent
                article.tile.is-child.notification.is-success
                  .content
                    p.title Hoteles
                    p.subtitle Búsqueda y mantenimiento de operaciones relacionadas a hoteles
                    .content
              .tile.is-parent
                article.tile.is-child.notification.is-link
                  p.title Reservas
                  p.subtitle App para la gestión de reservas, extensiones, modificaciones y anulaciones.
                  // figure.image.is-16by9
                    img(src='http://h2o.distantis.com/h2o/hoteleria_2/dist/img/logo-distantis.png')
              .tile.is-parent
                article.tile.is-child.notification.is-danger
                  p.title Tarifas
                  p.subtitle Gestión, consulta y mantenimiento de tarifa para todos los clientes.
                  .content
                    // Content

            .tile

              .tile.is-parent
                article.tile.is-child.notification.is-light
                  p.title Inventario
                  p.subtitle Gestiones de inventario para distintos touroperadores.

              .tile.is-parent
                article.tile.is-child.notification.is-dark
                  p.title Habitaciones
                  p.subtitle Gestiones de habitaciones para distintos touroperadores.

              .tile.is-parent
                article.tile.is-child.notification.is-warning
                  p.title Mailing
                  p.subtitle Gestiones de email para distintos touroperadores.
              .tile.is-parent
              
                article.tile.is-child.notification.is-primary
                  p.title Reportería y Búsqueda
                  p.subtitle App para la gestión de reportería, búsqueda de datos masivos, descarga de planillas, gestiones menores, entre otras.






</template>
<script>

export default {
  data() {
    return {
      searchQuery: "",
    }
  }
}
</script>