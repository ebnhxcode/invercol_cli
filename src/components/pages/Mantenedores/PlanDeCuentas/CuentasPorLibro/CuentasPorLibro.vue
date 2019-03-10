<template lang="pug">
	div
		.section.hero.is-info.is-small.is-bold(v-show="isVisibleOptionsBanner==true")
			.hero-head.header.nav.container.nav-left.nav-item.nav-right.nav-menu.content.has-text-centered
			.hero-body
				//.has-text-centered
				h5.title Más opciones · Módulo de Cuentas
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
						//h2 Cuentas
						.box(style="position: sticky;padding-top: 10px;top: 0;display: flex;z-index:10; !important;margin-bottom: 0rem;")
							.tabs.is-boxed
								//.is-boxed.is-centered
								ul(style="margin:0px;")
									li
									li(:class="[tabActive==='availabilityDetail' ? 'is-active' : '']", @click.prevent="tabActive='availabilityDetail'")
										a Lista de Cuentas
									li(:class="[tabActive==='transactions' ? 'is-active' : '']", @click.prevent="tabActive='transactions'")
										a Crear Cuenta
									li(:class="[tabActive==='hotelInfo' ? 'is-active' : '']", @click.prevent="tabActive='hotelInfo'")
										a Asociar Cuenta
									
						.box(v-show="tabActive != null")
							div(v-show="tabActive==='availabilityDetail'")
								.is-narrow(style="overflow-x: scroll;overflow-y: hidden;font-size: 1rem;display:block;max-width: 100%;user-select:text !important;")
									table
										thead
											tr
												th Acciones 
												th Cuenta ID
												th Cuenta Código
												th Cuenta Nombre
												th Cuenta Descripción
												th Cuenta Titular
												th Cuenta Dependencia
												th Libros
												th Detalle de Libros
										tbody
											tr(v-for="c in cuentas")
												td 
													.buttons.has-addons.is-rounded
														.button.is-small.tooltip.is-light(data-tooltip="Opciones")
															v-icon(name="cogs")
														.button.is-small.tooltip.is-light(
															data-tooltip="Editar", 
															@click.prevent="editarCuenta(c.cuenta_id)",
															v-show="id_cuenta_edicion == null || id_cuenta_edicion != c.cuenta_id"
														)
															v-icon(name="edit")
														.button.is-small.tooltip.is-secondary(
															data-tooltip="Deshacer", 
															@click.prevent="id_cuenta_edicion=null",
															v-show="id_cuenta_edicion != null && id_cuenta_edicion == c.cuenta_id"
														) 
															v-icon(name="times")
														.button.is-small.tooltip.is-primary(
															data-tooltip="Actualizar", 
															@click.prevent="actualizarCuenta(c)",
															v-show="id_cuenta_edicion != null && id_cuenta_edicion == c.cuenta_id"
														)
															v-icon(name="check")
														.button.is-small.tooltip.is-danger(data-tooltip="Eliminar", @click.prevent="eliminarCuenta(c.cuenta_id)",v-if="id_cuenta_edicion == null")
															v-icon(name="times")

												td(v-if="id_cuenta_edicion!=c.cuenta_id") {{ c.cuenta_id }}
												td(v-else)
													input.input.is-fullwidth(type='text', v-model='c.cuenta_id')

												td(v-if="id_cuenta_edicion!=c.cuenta_id") {{ c.cuenta_codigo || 'Sin codigo adicional incorporado' }}
												td(v-else)
													input.input.is-fullwidth(type='text', v-model='c.cuenta_codigo')

												td(v-if="id_cuenta_edicion!=c.cuenta_id") {{ c.cuenta_nombre }}
												td(v-else)
													input.input.is-fullwidth(type='text', v-model='c.cuenta_nombre')

												td(v-if="id_cuenta_edicion!=c.cuenta_id") {{ c.cuenta_descripcion }}
												td(v-else)
													input.textarea.is-fullwidth(v-model='c.cuenta_descripcion', rows='1')

												td(v-if="id_cuenta_edicion!=c.cuenta_id") {{ c.cuenta_titular == 0 ? 'Cuenta Titular' : 'Normal' }}
												td(v-else)
													.select.is-fullwidth
														select(v-model='c.cuenta_dependencia_id')
															option(value='')
															option(value='0') Si
															option(value='1') No

												td(v-if="id_cuenta_edicion!=c.cuenta_id") {{ c.cuenta_dependencia_id ? c.cuenta_dependencia.cuenta_dependencia_nombre : 'Sin dependencia' }}
												td(v-else)
													.select.is-fullwidth
														select(v-model='c.cuenta_dependencia_id')
															option(value='')
															option(v-for="d in cuenta_dependencias", :value='d.cuenta_dependencia_id') {{ d.cuenta_dependencia_nombre }}

												td {{ c.libros_cuentas ? c.libros_cuentas.length : 0 }}
												td 
													ul(v-if="c.libros_cuentas")
														li(v-for="lc in c.libros_cuentas", v-if="lc.libro")
															div
																.button.is-small.tooltip.is-light(data-tooltip="Desasociar", style="float:right;", @click.prevent="eliminarAsociacionCuentaLibro(lc.libro_cuenta_id)")
																	v-icon(name="times")
																p {{ lc.libro.libro_nombre }}
													ul(v-if="!c.libros_cuentas")
														li Aún sin libros para asociar
														
							div(v-show="tabActive==='transactions'")
								| Crear Cuenta
							div(v-show="tabActive==='hotelInfo'")
								| Asociar Cuenta


						

							
				
</template>
<script>
import AsideMenu from "@/components/layouts/Menus/AsideMenu.vue"
import ModalGestionarCuentas from "@/components/pages/Mantenedores/PlanDeCuentas/CuentasPorLibro/Modals/ModalGestionarCuentas.vue"

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
			tabActive:null,

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
