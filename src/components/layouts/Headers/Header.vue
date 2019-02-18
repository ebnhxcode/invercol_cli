<template lang="pug" id="top">
  div(style="padding-top:50px;")
    //https://mdbootstrap.com/docs/vue/content/icons-list/? 

    div.navbar.is-fixed-top.tabs.is-centered.is-small.is-toggle.is-toggle-rounded(style="border-radius: 2px 2px 5px 5px;")

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



</template>
<script>
  
  export default {

    data() {
      return {
        
      }
    },
  }

</script>