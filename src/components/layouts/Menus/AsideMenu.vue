<template lang="pug">
  div.box(style="max-height:650px;position:sticky;padding-top:10px;top: 0;display:flex;overflow-y:scroll;")
    //
    aside.menu.is-small
      p.menu-label
        | Home
      ul.menu-list
        router-link(to="/", tag="a", exact) 
          v-icon(name="home")
          |&nbsp;Home


      p.menu-label
        | Mantenedores
      //input(type="checkbox", style="float:right;")
      ul.menu-list
        router-link(to="/mantenedores/fichastrabajadores", tag="a", exact) 
          v-icon(name="book-open")
          |&nbsp;Fichas Trabajadores
        router-link(to="/mantenedores/cargos", tag="a", exact) 
          v-icon(name="book-open")
          |&nbsp;Cargos
        router-link(to="/mantenedores/funciones", tag="a", exact) 
          v-icon(name="book-open")
          |&nbsp;Funciones
        router-link(to="/mantenedores/contratos", tag="a", exact) 
          v-icon(name="book-open")
          |&nbsp;Contratos

        router-link(to="/mantenedores/establecimientos", tag="a", exact) 
          v-icon(name="file-invoice-dollar")
          |&nbsp;Establecimientos
        router-link(to="/mantenedores/rbds", tag="a", exact) 
          v-icon(name="file-invoice-dollar")
          |&nbsp;Rbds
        router-link(to="/mantenedores/libros", tag="a", exact) 
          v-icon(name="book-open")
          |&nbsp;Libros
        router-link(to="/mantenedores/usuarios", tag="a", exact) 
          v-icon(name="book-open")
          |&nbsp;Usuarios

        //router-link(to="/mantenedores/paises", tag="a", exact) 
          v-icon(name="flag")
          |&nbsp;País
        //router-link(to="/mantenedores/regiones", tag="a", exact) 
          v-icon(name="flag")
          |&nbsp;Región
        //router-link(to="/mantenedores/comunas", tag="a", exact) 
          v-icon(name="flag")
          |&nbsp;Comunas

        p.menu-label Plan de Cuentas
        ul.menu-list
          router-link(to="/mantenedores/plandecuentas/cuentas", tag="a", exact) 
            v-icon(name="file-invoice-dollar")
            |&nbsp;Cuentas
          router-link(to="/mantenedores/plandecuentas/subvenciones", tag="a", exact) 
            v-icon(name="file-invoice-dollar")
            |&nbsp;Subvenciones


      p.menu-label
        | Perfil de Usuarios
      ul.menu-list
        router-link(to="/perfildeusuarios/perfilusuario", tag="a", exact) 
          v-icon(name="user-alt")
          |&nbsp;Perfil Usuario
        router-link(to="/perfildeusuarios/notificaciones", tag="a", exact) 
          v-icon(name="inbox")
          |&nbsp;Notificaciones
        router-link(to="/perfildeusuarios/rbd", tag="a", exact) 
          v-icon(name="file-invoice-dollar")
          |&nbsp;RBD Usuario
          
      p.menu-label
        | Libros
      ul.menu-list
        router-link(to="/libros/remuneraciones", tag="a", exact) 
          v-icon(name="file-invoice-dollar")
          |&nbsp;Remuneraciones
        router-link(to="/libros/otrosingresos", tag="a", exact) 
          v-icon(name="file-invoice-dollar")
          |&nbsp;Otros Ingresos
        router-link(to="/libros/honorarios", tag="a", exact) 
          v-icon(name="file-invoice-dollar")
          |&nbsp;Honorarios
        router-link(to="/libros/compras", tag="a", exact) 
          v-icon(name="file-invoice-dollar")
          |&nbsp;Compras
        router-link(to="/libros/ficom", tag="a", exact) 
          v-icon(name="file-invoice-dollar")
          |&nbsp;Ficom

      p.menu-label
        | Reportería
      ul.menu-list
        router-link(to="/reporteria/graficos", tag="a", exact) 
          v-icon(name="chart-pie")
          |&nbsp;Gráficos
        router-link(to="/reporteria/reportes", tag="a", exact) 
          v-icon(name="file-contract")
          |&nbsp;Reportes
        router-link(to="/reporteria/monitoreos", tag="a", exact) 
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