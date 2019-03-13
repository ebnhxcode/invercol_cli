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


								// Cabecera de los campos de la tabla
								table-columns(:modelInstance="modelInstance")

								toolbar-for-table(
									v-show="!isLoading", 
									:localInstanceName="localInstanceName",
									:numberItemsToPaginate="numberItemsToPaginate",
									:pagination.sync="pagination",
									:localInstanceObjects.sync="cuentas",
									:textPrincipalFilter.sync="textPrincipalFilter",
									:isPrincipalTextFilterEnabled.sync="isPrincipalTextFilterEnabled",
								)
                
								table-pro(
									v-show="!isLoading"
								)

								loader(v-show="isLoading")
														
							div(v-show="tabActive==='tab2'")
								| Crear Cuenta
							div(v-show="tabActive==='tab3'")
								| Asociar Cuenta


						

							
				
</template>
<script>

import AsideMenu from "@/components/layouts/Menus/AsideMenu.vue"
import Loader from '@/components/shared/Loader.vue'
import Spinner from '@/components/shared/Spinner.vue';
import ModalGestionarCuentas from "@/components/pages/Mantenedores/PlanDeCuentas/CuentasPorLibro/Modals/ModalGestionarCuentas.vue"

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
			numberItemsToPaginate: [ 5,10,15,20,30,40,50,100 ],

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
			cuentas: [],
			cuentasStorage: [], // auxiliar
			libros: [],
			cuenta_dependencias: [],

		}
	},

	watch: {},
	methods: {
		instanceTableWithLocalObjects() {
			this.obtenerLibros()
			this.obtenerCuentas()
			this.obtenerDependencias()
		},

		eliminarAsociacionCuentaLibro: function (libro_cuenta_id) {

			this.$http.delete(`${this.apiUrl}/frontend/libroscuentas/${libro_cuenta_id}`).then(response => {
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
		obtenerLibros: function() {
			this.isLoading = true
			this.$http.get(`${this.apiUrl}/frontend/libros`).then(response => {
				// success callback
				if ((response.status = 200)) {
					this.libros = {}
					this.libros = response.body
				}
				this.isLoading = false
			},
			response => {
				/*// error callback //this.checkResponseHttpToAlert(response.status)*/
			})
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
				}
				this.isLoading = false
			},
			response => {
				/*// error callback //this.checkResponseHttpToAlert(response.status)*/
			})
		},
		obtenerDependencias: function() {
			this.isLoading = true
			this.$http.get(`${this.apiUrl}/frontend/cuenta_dependencias`).then(response => {
				// success callback
				if ((response.status = 200)) {
					this.cuenta_dependencias = {}
					this.cuenta_dependencias = response.body
				}
				this.isLoading = false
			},
			response => {
				/*// error callback //this.checkResponseHttpToAlert(response.status)*/
			})
		},

		eliminarCuenta: function(cuenta_id) {
			//var formData = new FormData()
			//Conforma objeto paramétrico para solicitud http
			//formData.append(`libro_id`, libro_id)
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
		editarCuenta: function(cuenta_id) {
			this.id_cuenta_edicion = cuenta_id
		},
		actualizarCuenta: function(cuenta) {
			this.$http.put(`${this.apiUrl}/frontend/cuentas/${cuenta.cuenta_id}`,cuenta).then(response => {
				// success callback
				if (response.status == 200 || response.status == 201) {
					console.log(response)
					this.obtenerCuentas()
					this.seleccionarFormatoNotificacion('success', 'update', true, {})
					this.id_cuenta_edicion = null
				}
			},
			response => {
				// error callback
			})
		},

		obtenerCuenta: async function() {
			(await 1) == 1
			return
		},
		modalGestionarCuentas: function() {
			
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
