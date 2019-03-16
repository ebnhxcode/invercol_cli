<template lang="pug">
	div
		.section.hero.is-info.is-small.is-bold(v-show="isVisibleOptionsBanner==true")
			.hero-head.header.nav.container.nav-left.nav-item.nav-right.nav-menu.content.has-text-centered
			.hero-body
				//.has-text-centered
				h5.title {{ moduleName }}
				h6 Invercol IO
		.hero.is-light.hero-head
				//.content
				.columns
					.column.is-12
						div.box(style="border-radius: 2px 2px 5px 5px")
							.buttons
								button.button.is-small(
									@click.prevent="isVisibleOptionsBanner=!isVisibleOptionsBanner",
									:class="isVisibleOptionsBanner==true?'is-danger':'is-primary'",
									href="/#top"
								)
									small Más Opciones &nbsp
									v-icon(name="arrow-up",v-if="isVisibleOptionsBanner==true")
									v-icon(name="arrow-down",v-if="isVisibleOptionsBanner==false")

								//modal-gestionar-cuentas(:cuentas="cuentas",:libros="libros",:cuenta_dependencias="cuenta_dependencias")
								//button.button.is-small(@click.prevent="modalGestionarCuentas()") Gestionar Cuentas
								
				.columns.section(style="padding-top: 0px;")
					.column.is-2(style="padding-right: 0px")
						aside-menu
					.column.is-10.content
						.box(style="position: sticky;padding-top: 1px;padding-bottom: 4px;top: 0;display: flex;z-index:10;margin-bottom: -0.5rem;")
							.tabs.is-boxed(style="border-radius:5px 5px 5px 5px;")
								ul(style="margin:0px;")
									li
									li(:class="[tabActive==='tab1' ? 'is-active' : '']", @click.prevent="tabActive='tab1'")
										a Lista de Establecimientos
									li(:class="[tabActive==='tab2' ? 'is-active' : '']", @click.prevent="tabActive='tab2'")
										a Crear Establecimiento

						.box(v-show="tabActive != null")
							div(v-show="tabActive==='tab1'")
								modal-gestionar-cuentas(
									:cuenta_dependencias="cuenta_dependencias",
									:cuenta="cuenta"
								)

								// Cabecera de los campos de la tabla
								table-columns(:modelInstance="modelInstance")

								toolbar-for-table(
									v-show="!isLoading", 
									:localInstanceName="localInstanceName",
									:numberItemsToPaginate="numberItemsToPaginate",
									:pagination="pagination",
									:localInstanceObjects.sync="cuentas",
									:textPrincipalFilter.sync="textPrincipalFilter",
									:isPrincipalTextFilterEnabled.sync="isPrincipalTextFilterEnabled",
								)
								
								table-pro(
									v-show="!isLoading"
								)

								loader(v-show="isLoading")
														
							div(v-show="tabActive==='tab2'")
								.columns
									.column.is-6
										crear-cuenta(:cuenta_dependencias="cuenta_dependencias")
							div(v-show="tabActive==='tab3'")
								.columns
									.column.is-6
										asociar-cuenta-libro(:cuentas="cuentas",:libros="libros")


						

							
				
</template>
<script>

import AsideMenu from '@/components/layouts/Menus/AsideMenu.vue'

export default {
  mixins: [  ],
  components: {
    AsideMenu,
  },
  created(){
    this.instanceTableWithLocalObjects()
  },
  data() {
    return {
        /* Variables y Setup del Componente */
        establecimientos:[], // lista de libros
        libros:[], // lista de libros
        cuentas:[], // lista de cuentas
        regiones:[], // lista de cuentas
        comunas:[], // lista de cuentas
        localInstanceNameDetail:'Establecimientos', // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
        isVisibleOptionsBanner:false,
        isLoading: false,
        nuevo_establecimiento: {
          establecimiento_rbd:'',
          establecimiento_nombre:'',
          establecimiento_direccion:'',
          establecimiento_descripcion:'',
        },


    }
  },

  watch: {},
  methods: {
    instanceTableWithLocalObjects(){
      this.getEstablecimientos()
      this.getBooks()
      this.getAccounts()
      this.getRegions()
      this.getCommunes()

    },

    getEstablecimientos: function () {
      this.isLoading = true

      this.$http.get(`http://invercolbackend.publicidadorigen.cl/frontend/establecimientos`)
        .then(response => { // success callback
          if (response.status = 200) {
            this.establecimientos = response.body
          }
          this.isLoading = false
      }, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
    },
    getBooks: function () {
      this.isLoading = true

      this.$http.get(`http://invercolbackend.publicidadorigen.cl/frontend/libros`)
        .then(response => { // success callback
          if (response.status = 200) {
            this.libros = response.body
          }
          this.isLoading = false
      }, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
    },
    getAccounts: function () {
      this.isLoading = true

      this.$http.get(`http://invercolbackend.publicidadorigen.cl/frontend/cuentas`)
        .then(response => { // success callback
          if (response.status = 200) {
            this.cuentas = response.body
          }
          this.isLoading = false
      }, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
    },
    getRegions: function () {
      this.isLoading = true

      this.$http.get(`http://invercolbackend.publicidadorigen.cl/frontend/regiones`)
        .then(response => { // success callback
          if (response.status = 200) {
            this.regiones = response.body
          }
          this.isLoading = false
      }, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
    },
    getCommunes: function () {
      this.isLoading = true

      this.$http.get(`http://invercolbackend.publicidadorigen.cl/frontend/comunas`)
        .then(response => { // success callback
          if (response.status = 200) {
            this.comunas = response.body
          }
          this.isLoading = false
      }, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
    },
    guardar_establecimiento: function () {

    },

    modalNewBook: function () {
      console.log('si estoy llegando al modal')
      //this.$modal.show('modal-new-book')
    }
  }

}
</script>