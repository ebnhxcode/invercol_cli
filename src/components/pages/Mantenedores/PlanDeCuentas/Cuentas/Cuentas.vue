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
										a Lista de Cuentas
									li(:class="[tabActive==='tab2' ? 'is-active' : '']", @click.prevent="tabActive='tab2'")
										a Crear Cuenta
									li(:class="[tabActive==='tab3' ? 'is-active' : '']", @click.prevent="tabActive='tab3'")
										a Asociar Cuenta

						.box(v-show="tabActive != null")
							div(v-show="tabActive==='tab1'")
								modal-gestionar-cuentas(
									:cuenta_dependencias="api_cuenta_dependencias",
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
										crear-cuenta(:cuenta_dependencias="api_cuenta_dependencias")
							div(v-show="tabActive==='tab3'")
								.columns
									.column.is-6
										asociar-cuenta-libro(:cuentas="api_cuentas",:libros="api_libros")


						

							
				
</template>
<script>

import AsideMenu from "@/components/layouts/Menus/AsideMenu.vue"
import Loader from '@/components/shared/Loader.vue'
import Spinner from '@/components/shared/Spinner.vue';
import ModalGestionarCuentas from "@/components/pages/Mantenedores/PlanDeCuentas/Cuentas/Modals/ModalGestionarCuentas.vue"
import CrearCuenta from "@/components/pages/Mantenedores/PlanDeCuentas/Cuentas/Forms/CrearCuenta.vue"
import AsociarCuentaLibro from "@/components/pages/Mantenedores/PlanDeCuentas/Cuentas/Forms/AsociarCuentaLibro.vue"
import TableColumns from '@/components/shared/TableColumns.vue'
import TablePro from '@/components/shared/TablePro.vue'
import ToolbarForTable from '@/components/shared/ToolbarForTable.vue'

import { Cuenta } from '@/models/Cuenta'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	components: {
		AsideMenu,
		Spinner,
		Loader,
		ModalGestionarCuentas,
		TableColumns,
		ToolbarForTable,
		TablePro,
		CrearCuenta,
		AsociarCuentaLibro,
	},
	created() {
		this.instanceTableWithLocalObjects()
		// Tipo de notificacion , Titulo de los mensajes , Mensajes , Grupo
	},
	data() {
		return {
			/* Setup del Framework · Todos son requeridos */

			isVisibleOptionsBanner: false, // variable de estado que indica si se visualiza o no el banner adicional superior
			isLoading: false, // variable de estado que indica si algo dentro de la pagina está cargando
			isLoadingModal:false, //boolean para validar spinners y loaders de despliegue de los modals
			isPrincipalTextFilterEnabled:false, // v-model para filtrar sobre los filtros	
			textPrincipalFilter:"", // filtro global de la tabla
			excelJsonData:[], // array para procesamiento de datos a exportar en excel, se completa en un watch -> hoteles
			groupedMarkedElements: [], // Array con objetos marcados desde la grilla
			
			// Variables de paginación
			pagination: { 'per_page':null }, // objeto requerido para paginacion
			numberItemsToPaginate: [ 5,10,15,20,30,40,50,100,250,500,750,1000],

			// Datos generales y de Acceso a contenidos
			moduleName: "Módulo de Cuentas", // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
			localInstanceNameDetail: "Cuentas", // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
			localInstanceName: "cuentas", // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
			localInstanceNameListObjects: "cuentas", // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
			modelInstance: Cuenta, // modelo de la clase o recurso principal de la vista mantenedor
			apiUrl: environmentConfig.invercolProd.apiUrl, // url del backend
			environmentConfig: environmentConfig, // config local

			//Configuraciones
			orderList: 'asc', // orden por defecto en la tabla
			tabActive:'tab1', // default tab que se muestra al inicio de cada vista
			object_id: 'cuenta_id',

			/* Fin Setup del Framework */

			/* Variables del Componente */
			cuenta:{},
      cuentas: [],
      cuentasStorage: [],
			api_libros: [],
			api_cuentas: [],
			api_cuenta_dependencias: [],

		}
	},

	watch: {},
	methods: {
		instanceTableWithLocalObjects() {
      this.obtenerCuentas()
      this.apiObtenerLibros()
			this.apiObtenerCuentas()
			this.apiObtenerDependencias()
		},


		obtenerCuentas: function() {
			this.isLoading = true
			this.$http.get(`${this.apiUrl}/frontend/cuentas`).then(response => {
				// success callback
				if ((response.status = 200)) {
					this.cuentas = {}
					this.cuentasStorage = {}
					this.cuentas = response.body.cuentas.data
					this.cuentasStorage = response.body.cuentas.data
					this.pagination = response.body.cuentas
				}
				this.isLoading = false
			},
			response => {
				/*// error callback //this.checkResponseHttpToAlert(response.status)*/
			})
    },
    


		apiObtenerLibros: function() {
			this.isLoading = true
			this.$http.get(`${this.apiUrl}/api/libros`).then(response => {
				// success callback
				if ((response.status = 200)) {
					this.api_libros = {}
					this.api_libros = response.body
				}
				this.isLoading = false
			},
			response => {
				/*// error callback //this.checkResponseHttpToAlert(response.status)*/
			})
		},

		apiObtenerCuentas: function() {
			this.isLoading = true
			this.$http.get(`${this.apiUrl}/api/cuentas`).then(response => {
				// success callback
				if ((response.status = 200)) {
					this.api_cuentas = {}
					this.api_cuentas = response.body
				}
				this.isLoading = false
			},
			response => {
				/*// error callback //this.checkResponseHttpToAlert(response.status)*/
			})
		},



		apiObtenerDependencias: function() {
			this.isLoading = true
			this.$http.get(`${this.apiUrl}/api/cuenta_dependencias`).then(response => {
				// success callback
				if ((response.status = 200)) {
					this.api_cuenta_dependencias = {}
					this.api_cuenta_dependencias = response.body
				}
				this.isLoading = false
			},
			response => {
				/*// error callback //this.checkResponseHttpToAlert(response.status)*/
			})
		},

		eliminarCuenta: function(cuenta_id) {

			this.$http.delete(`${this.apiUrl}/frontend/cuentas/${cuenta_id}`).then(response => {
				// success callback
				if (response.status == 200) {
					console.log(response)
					this.obtenerCuentas()
					this.seleccionarFormatoNotificacion('success', 'delete', true, {})
				}
			},
			response => {
				// error callback
			})
		},

		modalGestionarElemento: function(cuenta) {
			this.cuenta = cuenta
			this.$modal.show("modal-gestionar-cuentas")
		}
	}
}
</script>
<style>
#tab-content p {
	 display: none;
}

#tab-content p.is-active {
	 display: block;
}
.box {
	overflow-x: auto;
	overflow-y: hidden;

	-webkit-touch-callout: none;
	-webkit-user-select: none;  
	-moz-user-select: none;   
	-ms-user-select: none;     
	user-select: none; 
}

.wmd-view-topscroll, .wmd-view {
		overflow-x: scroll;
		overflow-y: hidden;
		width: 300px;
		border: none 0px RED;
}

.wmd-view-topscroll { height: 20px; }
.wmd-view { height: 200px; }
.scroll-div1 { 
		width: 1000px; 
		overflow-x: scroll;
		overflow-y: hidden;
		height:20px;
}
.scroll-div2 { 
		width: 1000px; 
		height:20px;
}
</style>
