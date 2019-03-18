<template lang="pug">
	div(v-if="funcion")
		h2 Actualizar Función
		.field
			.field
				label Código
				input.input(type='text', v-model='funcion.funcion_codigo')
			.field
				label Nombre
				input.input(type='text', v-model='funcion.funcion_nombre')
			.field
				label Descripción
				input.textarea(v-model='funcion.funcion_descripcion', rows="1")
			.field
				label Tipo Función
					.select.is-fullwidth
						select(v-model='funcion.tipo_funcion_id')
							option(value='')
							option(:value='t.tipo_funcion_id', v-for="t in tipo_funciones") {{ t.tipo_funcion_nombre }}

		.field.is-grouped
			button.button.is-primary.is-small(
					@click.prevent="guardarFuncion(funcion)"
			) Guardar
</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	name: "actualizar-funcion",
	props: ["funcion", "tipo_funciones"],
	data() {
		return {
			apiUrl:environmentConfig.invercolProd.apiUrl,

		}
	},
	created() {},
	methods: {
		
		guardarFuncion: function(funcion) {
 			this.$http.put(`${this.apiUrl}/frontend/funciones/${funcion.funcion_id}`,funcion).then(response => {
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