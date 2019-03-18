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
								
				.columns.section(style="padding-top: 0px;")
					.column.is-2(style="padding-right: 0px")
						aside-menu
					.column.is-10.content
						.box(style="position: sticky;padding-top: 1px;padding-bottom: 4px;top: 0;display: flex;z-index:10;margin-bottom: -0.5rem;")
							.tabs.is-boxed(style="border-radius:5px 5px 5px 5px;")
								ul(style="margin:0px;")
									li
									li(:class="[tabActive==='tab1' ? 'is-active' : '']", @click.prevent="tabActive='tab1'")
										a Lista de Contratos
									li(:class="[tabActive==='tab2' ? 'is-active' : '']", @click.prevent="tabActive='tab2'")
										a Crear Contrato

						.box(v-show="tabActive != null")
							div(v-show="tabActive==='tab1'")
								modal-gestionar-contratos(
									:contrato="contrato",
									:tipo_contratos="tipo_contratos",
									:ficha_trabajadores="ficha_trabajadores"
								)

								// Cabecera de los campos de la tabla
								table-columns(:modelInstance="modelInstance")

								toolbar-for-table(
									v-show="!isLoading", 
									:localInstanceName="localInstanceName",
									:numberItemsToPaginate="numberItemsToPaginate",
									:pagination="pagination",
									:localInstanceObjects.sync="contratos",
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
										crear-contrato(
											:tipo_contratos="tipo_contratos",
											:ficha_trabajadores="ficha_trabajadores"
										)
							div(v-show="tabActive==='tab3'")
								.columns
									.column.is-6

</template>

<script>

import AsideMenu from '@/components/layouts/Menus/AsideMenu.vue'
import Loader from '@/components/shared/Loader.vue'
import Spinner from '@/components/shared/Spinner.vue';
import ModalGestionarContratos from "@/components/pages/Mantenedores/Contratos/Modals/ModalGestionarContratos.vue"
import CrearContrato from "@/components/pages/Mantenedores/Contratos/Forms/CrearContrato.vue"
import TableColumns from '@/components/shared/TableColumns.vue'
import TablePro from '@/components/shared/TablePro.vue'
import ToolbarForTable from '@/components/shared/ToolbarForTable.vue'

import { Contrato } from '@/models/Contrato'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [ InvercolCoreFunctionsMixin ],
	components: {
		AsideMenu,
		Spinner,
		Loader,
		ModalGestionarContratos,
		CrearContrato,
		TableColumns,
		ToolbarForTable,
		TablePro,
	},
	created(){
		this.instanceTableWithLocalObjects()
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
			moduleName: "Módulo de Contratos", // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
			localInstanceNameDetail: "Contratos", // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
			localInstanceName: "contratos", // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
			localInstanceNameListObjects: "contratos", // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
			modelInstance: Contrato, // modelo de la clase o recurso principal de la vista mantenedor
			apiUrl: environmentConfig.invercolProd.apiUrl, // url del backend
			environmentConfig: environmentConfig, // config local
			

			//Configuraciones
			orderList: 'asc', // orden por defecto en la tabla
			tabActive:'tab1', // default tab que se muestra al inicio de cada vista
			object_id: 'contrato_id',


			/* Variables y Setup del Componente */
			contrato:{},
			contratos:[],
			tipo_contratos:[],
			ficha_trabajadores:[],


		}
	},

	watch: {},
	methods: {
		instanceTableWithLocalObjects(){
			this.obtenerContratos()
			this.obtenerTipoContratos()
			this.obtenerFichaTrabajadores()
		},

		obtenerContratos: function () {
			this.isLoading = true

			this.$http.get(`${this.apiUrl}/frontend/contratos`).then(response => { // success callback
					if (response.status = 200) {
						this.contratos = response.body.contratos.data
						this.contratosStorage = response.body.contratos.data
					}
					this.isLoading = false
			}, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
		},
		
		obtenerTipoContratos: function () {
			this.isLoading = true

			this.$http.get(`${this.apiUrl}/api/tipo_contratos`)
				.then(response => { // success callback
					if (response.status = 200) {
						this.tipo_contratos = response.body
					}
					this.isLoading = false
			}, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
		},
		
		obtenerFichaTrabajadores: function () {
			this.isLoading = true

			this.$http.get(`${this.apiUrl}/api/ficha_trabajadores`)
				.then(response => { // success callback
					if (response.status = 200) {
						this.ficha_trabajadores = response.body
					}
					this.isLoading = false
			}, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
		},

		modalGestionarElemento: function(contrato) {
			this.contrato = contrato
			this.$modal.show("modal-gestionar-contratos")
		}

	}

}
</script>