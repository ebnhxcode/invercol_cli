<template lang="pug">
	div(v-if="libro")
		h2 Actualizar Libro
		.field
			.field
					label Código
					input.input.is-fullwidth(type='text', v-model='libro.libro_codigo')
			.field
					label Nombre
					input.input.is-fullwidth(type='text', v-model='libro.libro_nombre')
			.field
					label Descripción
					input.textarea.is-fullwidth(v-model='libro.libro_descripcion', rows="1")

		.field.is-grouped
			button.button.is-primary.is-small(
					@click.prevent="guardarLibro(libro)"
			) Guardar
</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	name: "actualizar-libro",
	props: ["libro"],
	data() {
		return {
			apiUrl:environmentConfig.invercolProd.apiUrl,

		}
	},
	created() {},
	methods: {
		
		guardarLibro: function(libro) {
			this.$http.put(`${this.apiUrl}/frontend/libros/${libro.libro_id}`,libro).then(response => {
				// success callback
				if (response.status == 200 || response.status == 201) {
					console.log(response)
					this.seleccionarFormatoNotificacion('success', 'update', true, {})
				}
			},
			response => {
				// error callback
			})
		},

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