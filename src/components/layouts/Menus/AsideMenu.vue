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
        | General
      ul.menu-list
        router-link(to="/books", tag="a", exact) 
          v-icon(name="book-open")
          |&nbsp;Libros

      p.menu-label
        | Administración
      ul.menu-list
        router-link(to="/users", tag="a", exact) 
          v-icon(name="user-alt")
          |&nbsp;Usuarios
        router-link(to="/notifications", tag="a", exact) 
          v-icon(name="inbox")
          |&nbsp;Notificaciones

      p.menu-label
        | Transacciones
      ul.menu-list
        router-link(to="/graphs", tag="a", exact) 
          v-icon(name="chart-pie")
          |&nbsp;Gráficos

        router-link(to="/reports", tag="a", exact) 
          v-icon(name="file-contract")
          |&nbsp;Reportes

        router-link(to="/monitoring", tag="a", exact) 
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