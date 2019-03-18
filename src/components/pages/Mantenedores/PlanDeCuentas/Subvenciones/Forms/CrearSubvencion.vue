<template lang="pug">
	div
		h2 Nueva Subvención
		.field
			.field
				label Código
				input.input(type='text', v-model='nueva_subvencion.subvencion_codigo')
			.field
				label Nombre
				input.input(type='text', v-model='nueva_subvencion.subvencion_nombre')

		.field.is-grouped
			button.button.is-primary.is-small(
					@click.prevent="guardarNuevaSubvencion(nueva_subvencion)"
			) Guardar
</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	name: "crear-subvencion",
	props: [],
	data() {
		return {
			apiUrl:environmentConfig.invercolProd.apiUrl,
			nueva_subvencion: {
				subvencion_codigo: null,
				subvencion_nombre: null,
			},
		}
	},
	created() {},
	methods: {
		

		guardarNuevaSubvencion: function(nueva_subvencion) {
			//Conforma objeto paramétrico para guardar en el bknd
			var formData = new FormData()
			formData.append(`subvencion_codigo`, nueva_subvencion.subvencion_codigo)
			formData.append(`subvencion_nombre`, nueva_subvencion.subvencion_nombre)

			this.$http.post(`${this.apiUrl}/frontend/subvenciones`,formData).then(response => {
				// success callback
				if (response.status == 200 || response.status == 201) {
					console.log(response)
					this.$parent.obtenerSubvenciones() // SOON DEPRECATE
					this.seleccionarFormatoNotificacion('success', 'create', true, {})
					this.limpiarNuevaSubvencion()
				}
				
			},
			response => {
				this.seleccionarFormatoNotificacion('error', 'custom', true, {title:'Error',text:'Error al guardar'})
				// error callback
			})
		},

		limpiarNuevaSubvencion: function() {
			this.nueva_subvencion = {
				subvencion_codigo: null,
				subvencion_nombre: null,
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