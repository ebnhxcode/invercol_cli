<template lang="pug">
	div(v-if="subvencion")
		h2 Actualizar Subvención
		.field
			.field
				label Código
				input.input(type='text', v-model='subvencion.subvencion_codigo')
			.field
				label Nombre
				input.input(type='text', v-model='subvencion.subvencion_nombre')

		.field.is-grouped
			button.button.is-primary.is-small(
					@click.prevent="guardarSubvencion(subvencion)"
			) Guardar

</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	name: "actualizar-subvencion",
	props: ["subvencion"],
	data() {
		return {
			apiUrl:environmentConfig.invercolProd.apiUrl,

		}
	},
	created() {},
	methods: {
		
		guardarSubvencion: function(subvencion) {
 			this.$http.put(`${this.apiUrl}/frontend/subvenciones/${subvencion.subvencion_id}`,subvencion).then(response => {
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