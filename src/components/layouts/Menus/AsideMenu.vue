<template lang="pug">
  div(style="position: sticky;padding-top: 10px;top: 0;display: flex;")
    aside.menu 
      p.menu-label
        | Home
      ul.menu-list
        router-link(to="/", tag="a", exact) 
          v-icon(name="home")
          |&nbsp;Home

      p.menu-label
        | Libros
      ul.menu-list

      p.menu-label
        | Administración
      ul.menu-list
        router-link(to="/usuarios", tag="a", exact) 
          v-icon(name="user-alt")
          |&nbsp;Usuarios
        router-link(to="/notificaciones", tag="a", exact) 
          v-icon(name="inbox")
          |&nbsp;Notificaciones


      p.menu-label
        | Mantenedores
      input(type="checkbox")
      ul.menu-list


        router-link(to="/paises", tag="a", exact) 
          v-icon(name="flag")
          |&nbsp;País
        router-link(to="/regiones", tag="a", exact) 
          v-icon(name="flag")
          |&nbsp;Región
        router-link(to="/comunas", tag="a", exact) 
          v-icon(name="flag")
          |&nbsp;Comunas

        router-link(to="/fichastrabajadores", tag="a", exact) 
          v-icon(name="book-open")
          |&nbsp;Fichas Trabajadores
        router-link(to="/contratos", tag="a", exact) 
          v-icon(name="book-open")
          |&nbsp;Contratos
        router-link(to="/libros", tag="a", exact) 
          v-icon(name="book-open")
          |&nbsp;Libros
        router-link(to="/cuentas", tag="a", exact) 
          v-icon(name="file-invoice-dollar")
          |&nbsp;Plan de Cuentas
        router-link(to="/establecimientos", tag="a", exact) 
          v-icon(name="file-invoice-dollar")
          |&nbsp;Establecimientos
        router-link(to="/remuneraciones", tag="a", exact) 
          v-icon(name="file-invoice-dollar")
          |&nbsp;Remuneraciones
        router-link(to="/rbd", tag="a", exact) 
          v-icon(name="file-invoice-dollar")
          |&nbsp;RBD


      p.menu-label
        | Reportería
      ul.menu-list
        router-link(to="/graficos", tag="a", exact) 
          v-icon(name="chart-pie")
          |&nbsp;Gráficos
        router-link(to="/reportes", tag="a", exact) 
          v-icon(name="file-contract")
          |&nbsp;Reportes
        router-link(to="/monitoreos", tag="a", exact) 
          v-icon(name="history")
          |&nbsp;Monitoreo y Logs


</template>
<script>

export default {
  name:'aside-menu',
  mixins: [  ],

  components: {

  },
  created(){
  },
  data() {
    return {
    }
  },

  watch: {

  },
  methods: {

  },

}
</script>
<style lang="css">
  input:not(:checked) + ul {
    display: none;
  }
</style>