<template lang="pug">
	div(v-if="rbd")
		h2 Actualizar rbd
		.field
			.field
				label Código
				input.input(v-model='rbd.rbd_codigo')
			.field
				label Nombre
				input.input(type='text', v-model='rbd.rbd_nombre')
			.field
				label Descripción
				input.textarea(v-model='rbd.rbd_descripcion', rows="1")
			.field
				label Establecimientos
					.select.is-fullwidth
						select(v-model='rbd.establecimiento_id')
							option(value='')
							option(:value='e.establecimiento_id', v-for="e in establecimientos") {{ e.establecimiento_nombre }}

		.field.is-grouped
			button.button.is-primary.is-small(
					@click.prevent="guardarRbd(rbd)"
			) Guardar
</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	name: "actualizar-rbd",
	props: ["rbd", "establecimientos"],
	data() {
		return {
			apiUrl:environmentConfig.invercolProd.apiUrl,

		}
	},
	created() {},
	methods: {
		
		guardarRbd: function(rbd) {
 			this.$http.put(`${this.apiUrl}/frontend/rbds/${rbd.rbd_id}`,rbd).then(response => {
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