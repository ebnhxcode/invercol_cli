<template lang="pug" id="top">
  div(style="padding-top:50px;")

    div.navbar.is-fixed-top.tabs.is-centered.is-small.is-toggle.is-toggle-rounded(style="border-radius: 2px 2px 5px 5px;")
      //ul Distantis
      ul
        router-link(to="/", tag="li", exact)
          a 
            v-icon(name="home")
            p &nbsp;
            p Home
        //router-link(to="/tour-operadores", tag="li", exact): a Tour Operadores
        //router-link(to="/users", tag="li", exact)
          a 
            v-icon(name="user")
            p &nbsp;
            p Usuarios
        router-link(to="/bookings", tag="li", exact) 
          a 
            v-icon(name="archive")
            p &nbsp;
            p Reservas
        router-link(to="/hotels", tag="li", exact) 
          a 
            v-icon(name="hotel")
            p &nbsp;
            p Hoteles
        router-link(to="/rates", tag="li", exact) 
          a 
            v-icon(name="list")
            p &nbsp;
            p Tarifas
        router-link(to="/services", tag="li", exact) 
          a 
            v-icon(name="shopping-cart")
            p &nbsp;
            p Servicios
        router-link(to="/about", tag="li", exact)
          a 
            v-icon(name="info")
            p &nbsp;
            p Help
      //ul
        a.button(
          @click.prevent="isVisibleBanner=!isVisibleBanner",
          :class="isVisibleBanner==true?'is-danger':'is-primary'",
          href="/#top"
        )
          v-icon(name="arrow-up",v-if="isVisibleBanner==true")
          v-icon(name="arrow-down",v-if="isVisibleBanner==false")
          
    


</template>
<script>
  
  export default {

    data() {
      return {
        
      }
    },
  }

</script>