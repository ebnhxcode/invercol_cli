<template lang="pug">
	div
		h2 Nuevo Libro
		.field
			.field
				label Código
				input.input(type='text', v-model='nuevo_libro.libro_codigo')
			.field
				label Nombre
				input.input(type='text', v-model='nuevo_libro.libro_nombre')
			.field
				label Descripción
				input.textarea(v-model='nuevo_libro.libro_descripcion', rows="1")

		.field.is-grouped
			button.button.is-primary.is-small(
					@click.prevent="guardarNuevoLibro(nuevo_libro)"
			) Guardar
</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	name: "crear-libro",
	props: [],
	data() {
		return {
			apiUrl:environmentConfig.invercolProd.apiUrl,
			nuevo_libro: {
				libro_codigo: null,
				libro_nombre: null,
				libro_descripcion: null,
			},
		}
	},
	created() {},
	methods: {
		

		guardarNuevoLibro: function(nuevo_libro) {
			//Conforma objeto paramétrico para guardar en el bknd
			var formData = new FormData()
			formData.append(`libro_codigo`, nuevo_libro.libro_codigo)
			formData.append(`libro_nombre`, nuevo_libro.libro_nombre)
			formData.append(`libro_descripcion`,nuevo_libro.libro_descripcion)

			this.$http.post(`${this.apiUrl}/frontend/libros`,formData).then(response => {
				// success callback
				if (response.status == 200 || response.status == 201) {
					console.log(response)
					this.$parent.obtenerLibros() // SOON DEPRECATE
					this.seleccionarFormatoNotificacion('success', 'create', true, {})
					this.limpiarNuevoLibro()
				}
				
			},
			response => {
				this.seleccionarFormatoNotificacion('error', 'custom', true, {title:'Error',text:'Error al guardar'})
				// error callback
			})
		},

		limpiarNuevoLibro: function() {
			this.nuevo_libro = {
				libro_codigo: null,
				libro_nombre: null,
				libro_descripcion: null,
			}
		}
	},
	filters: {}
}
</script>
<style lang="">
#tab-content p {
	display: none
}

#tab-content p.is-active {
	display: block
}
</style>