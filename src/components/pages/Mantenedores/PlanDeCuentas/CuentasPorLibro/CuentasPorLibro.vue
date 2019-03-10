<template lang="pug">
	div
		.section.hero.is-info.is-small.is-bold(v-show="isVisibleOptionsBanner==true")
			.hero-head.header.nav.container.nav-left.nav-item.nav-right.nav-menu.content.has-text-centered
			.hero-body
				//.has-text-centered
				h5.title Módulo de Cuentas
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

								modal-gestionar-cuentas(:cuentas="cuentas",:libros="libros",:cuenta_dependencias="cuenta_dependencias")
								button.button.is-small(@click.prevent="modalGestionarCuentas()") Gestionar Cuentas
				.columns.section(style="padding-top: 0px;")
					.column.is-2(style="padding-right: 0px")
						aside-menu
					.column.is-10.content
						.box(style="position: sticky;padding-top: 10px;top: 0;display: flex;z-index:10; !important;margin-bottom: 0rem;")
							.tabs.is-boxed
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
								.is-narrow(style="overflow-x: scroll;overflow-y: hidden;font-size: 1rem;display:block;max-width: 100%;user-select:text !important;")
									table
										thead
											tr
												th Acciones 
												th(v-for='th in modelInstance') {{ th.label }}
										tbody
											tr(v-for="c in cuentas")
												td 
													.buttons.has-addons
														.button.is-small.tooltip.is-link(data-tooltip="Opciones")
															v-icon(name="cogs")
												td(v-for='td in modelInstance') {{ c[td.field] }}
														
							div(v-show="tabActive==='tab2'")
								| Crear Cuenta
							div(v-show="tabActive==='tab3'")
								| Asociar Cuenta


						

							
				
</template>
<script>
import AsideMenu from "@/components/layouts/Menus/AsideMenu.vue"
import ModalGestionarCuentas from "@/components/pages/Mantenedores/PlanDeCuentas/CuentasPorLibro/Modals/ModalGestionarCuentas.vue"

import { Cuenta } from '@/models/Cuenta'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	components: {
		AsideMenu,
		ModalGestionarCuentas
	},
	created() {
		this.instanceTableWithLocalObjects()
		// Tipo de notificacion , Titulo de los mensajes , Mensajes , Grupo
	},
	data() {
		return {
			/* Setup del Framework */
			localInstanceNameDetail: "Cuentas", // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
			isVisibleOptionsBanner: false,
			isLoading: false,
			apiUrl: environmentConfig.invercolProd.apiUrl,
			tabActive:'tab1', // default
			modelInstance: Cuenta,



			/* Variables y Setup del Componente */
			cuentas: [],
			libros: [],
			cuenta_dependencias: [],

			id_cuenta_edicion: null
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
					this.cuentas = response.body
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
</style>
