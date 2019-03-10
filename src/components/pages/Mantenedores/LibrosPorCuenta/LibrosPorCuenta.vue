<template lang="pug">
	div
		.section.hero.is-info.is-small.is-bold(v-show="isVisibleOptionsBanner==true")
			.hero-head.header.nav.container.nav-left.nav-item.nav-right.nav-menu.content.has-text-centered
			.hero-body
				//.has-text-centered
				h5.title Más opciones · Módulo de Libros
				h6 Invercol IO
		.hero.is-light.hero-head
			.content
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

								modal-gestionar-libros(:cuentas="cuentas",:libros="libros")
								button.button.is-small(@click.prevent="modalGestionarLibros()") Gestionar Libros
				.columns
					.column.is-2.section(style="padding-right: 0px")
						aside-menu
					.column.is-10.section
						div.box
							h2 Libros               
							table
								thead
									tr
										th Acciones 
										th Libro ID
										th Libro Código
										th Libro Nombre
										th Libro Descripción
										th Cuentas
								tbody
									tr(v-for="l in libros")
										th
											.buttons.has-addons
												.button.is-small.tooltip.is-light(data-tooltip="Opciones")
													v-icon(name="cogs")
												.button.is-small.tooltip.is-light(
													data-tooltip="Editar", 
													@click.prevent="editarLibro(l.libro_id)",
													v-if="id_libro_edicion == null || id_libro_edicion != l.libro_id"
												)
													v-icon(name="edit")
												.button.is-small.tooltip.is-secondary(
													data-tooltip="Deshacer", 
													@click.prevent="id_libro_edicion=null",
													v-show="id_libro_edicion != null && id_libro_edicion == l.libro_id"
												) 
													v-icon(name="times")
												.button.is-small.tooltip.is-primary(
													data-tooltip="Actualizar", 
													@click.prevent="actualizarLibro(l)",
													v-if="id_libro_edicion != null && id_libro_edicion == l.libro_id"
												)
													v-icon(name="check")
												.button.is-small.tooltip.is-danger(data-tooltip="Eliminar", @click.prevent="eliminarLibro(l.libro_id)", v-if="id_libro_edicion == null")
													v-icon(name="times")
										td {{ l.libro_id }}

										td(v-if="id_libro_edicion!=l.libro_id") {{ l.libro_codigo }}
										td(v-else)
											input.input.is-fullwidth(type='text', v-model='l.libro_codigo')

										td(v-if="id_libro_edicion!=l.libro_id") {{ l.libro_nombre }}
										td(v-else)
											input.input.is-fullwidth(type='text', v-model='l.libro_nombre')

										td(v-if="id_libro_edicion!=l.libro_id") {{ l.libro_descripcion }}
										td(v-else)
											input.textarea.is-fullwidth(v-model='l.libro_descripcion', rows='1')

										td {{ l.libros_cuentas ? l.libros_cuentas.length : 0 }}


</template>
<script>
import AsideMenu from "@/components/layouts/Menus/AsideMenu.vue"
import ModalGestionarLibros from "@/components/pages/Mantenedores/LibrosPorCuenta/Modals/ModalGestionarLibros.vue"

import { InvercolCoreFunctionsMixin } from "@/mixins/InvercolCoreFunctions.js"
import { environmentConfig } from "@/services/environments/environment-config"

export default {
  mixins: [InvercolCoreFunctionsMixin],
  components: {
    AsideMenu,
    ModalGestionarLibros
  },
  created() {
    this.instanceTableWithLocalObjects()
  },
  data() {
    return {
      /* Variables y Setup del Componente */
      localInstanceNameDetail: "Libros", // nombre de la instancia local por la page que hace ref. a hoteles -> hotel o a $data[this.localInstanceName]
      isVisibleOptionsBanner: false,
			isLoading: false,
			tabActive:null,
			apiUrl: environmentConfig.invercolProd.apiUrl,

      libros: [], // lista de libros
      cuentas: [], // lista de cuentas
      nuevo_libro: {
        libro_id: "",
        libro_codigo: "",
        libro_nombre: "",
        libro_descripcion: ""
      },
      nuevo_libro_cuenta: {
        libro_id: "",
        cuenta_id: ""
      },
      id_libro_edicion: null
    }
  },

  watch: {},
  methods: {
    instanceTableWithLocalObjects() {
      this.obtenerLibros()
      this.obtenerCuentas()
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

    eliminarLibro: function(libro_id) {
      //var formData = new FormData()
      //Conforma objeto paramétrico para solicitud http
      this.$http.delete(`${this.apiUrl}/frontend/libros/${libro_id}`).then(response => {
				// success callback
				if (response.status == 200) {
					console.log(response)
					this.obtenerLibros()
					this.seleccionarFormatoNotificacion(
						"success",
						"delete",
						true,
						{}
					)
				}
			},
			response => {
				// error callback
			})
    },
    editarLibro: function(libro_id) {
      this.id_libro_edicion = libro_id
    },
    actualizarLibro: function(libro) {
      this.$http.put(`${this.apiUrl}/frontend/libros/${libro.libro_id}`,libro).then(response => {
				// success callback
				if (response.status == 200 || response.status == 201) {
					console.log(response)
					this.obtenerLibros()
					this.seleccionarFormatoNotificacion(
						"success",
						"update",
						true,
						{}
					)
					this.id_libro_edicion = null
				}
			},
			response => {
				// error callback
			})
    },

    modalGestionarLibros: function() {
      this.$modal.show("modal-gestionar-libros")
    }
  }
}
</script>