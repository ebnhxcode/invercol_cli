<template lang="pug" id="top">
    //div(style="padding-top:50px;")
    //https://mdbootstrap.com/docs/vue/content/icons-list/? 
    nav.navbar(role='navigation', aria-label='main navigation')
      //style="position: sticky;top: 0;display: flex;"
      .navbar-brand
        a.navbar-item(href='#!')
          img(src='http://invercol.cl/web/assets/img/logo.png') 
          |&nbsp;InverCol
          //img(src='@/assets/images/hotels.jpg', style="height:240px;width:320px;")
          //img(src='https://bulma.io/images/bulma-logo.png', width='112', height='28')
        //a.navbar-burger.burger(role='button', aria-label='menu', aria-expanded='false', data-target='navbarBasicExample')
          span(aria-hidden='true')
          span(aria-hidden='true')
          span(aria-hidden='true')
      //#navbarBasicExample.navbar-menu
        .navbar-start
          a.navbar-item
            | Home
          a.navbar-item
            | Documentation
          .navbar-item.has-dropdown.is-hoverable
            a.navbar-link
              | More
            .navbar-dropdown
              a.navbar-item
                | About
              a.navbar-item
                | Jobs
              a.navbar-item
                | Contact
              hr.navbar-divider
              a.navbar-item
                | Report an issue
        .navbar-end
          .navbar-item
            .buttons
              a.button.is-primary
                strong Sign up
              a.button.is-light
                | Log in

    //div.navbar.is-fixed-top.tabs.is-centered.is-small.is-toggle.is-toggle-rounded(style="border-radius: 2px 2px 5px 5px;")

      ul
        router-link(to="/", tag="li", exact)
          a 
            v-icon(name="home")
            p &nbsp;
            p Home
            

        router-link(to="/books", tag="li", exact) 
          a 
            v-icon(name="book-open")
            p &nbsp;
            p Libros

        router-link(to="/users", tag="li", exact) 
          a 
            v-icon(name="user-alt")
            p &nbsp;
            p Usuarios

        router-link(to="/#!", tag="li", exact) 
          a 
            p &nbsp;

        router-link(to="/notifications", tag="li", exact) 
          a 
            v-icon(name="inbox")
            p &nbsp;
            p Notificaciones

        router-link(to="/#!", tag="li", exact) 
          a 
            p &nbsp;

        router-link(to="/graphs", tag="li", exact) 
          a 
            v-icon(name="chart-pie")
            p &nbsp;
            p Gráficos

        router-link(to="/reports", tag="li", exact) 
          a 
            v-icon(name="file-contract")
            p &nbsp;
            p Reportes

        router-link(to="/monitoring", tag="li", exact) 
          a 
            v-icon(name="history")
            p &nbsp;
            p Monitoreo y Logs

            //
              ul.menu-list
                li
                  a Team Settings
                li
                  a.is-active Manage Your Team
                  ul
                    li
                      a Members
                    li
                      a Plugins
                    li
                      a Add a member
                li
                  a Invitations
                li
                  a Cloud Storage Environment Settings
                li
                  a Authentication


</template>
<script>
  
  export default {

    data() {
      return {
        
      }
    },
  }

</script>