<template lang="pug">
	div(v-if="cargo")
		h2 Actualizar Cargo
		div
		.field
			.field
				label Código
				input.input(type='text', v-model='cargo.cargo_codigo')
			.field
				label Nombre
				input.input(type='text', v-model='cargo.cargo_nombre')
			.field
				label Descripción
				input.textarea(v-model='cargo.cargo_descripcion', rows="1")
			.field
				label Tipo Cargo
					.select.is-fullwidth
						select(v-model='cargo.tipo_cargo_id')
							option(value='')
							option(:value='t.tipo_cargo_id', v-for="t in tipo_cargos") {{ t.tipo_cargo_nombre }}

		.field.is-grouped
			button.button.is-primary.is-small(
					@click.prevent="guardarCargo(cargo)"
			) Guardar
</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	name: "actualizar-cargo",
	props: ["cargo", "tipo_cargos"],
	data() {
		return {
			apiUrl:environmentConfig.invercolProd.apiUrl,

		}
	},
	created() {},
	methods: {
		
		guardarCargo: function(cargo) {
 			this.$http.put(`${this.apiUrl}/frontend/cargos/${cargo.cargo_id}`,cargo).then(response => {
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