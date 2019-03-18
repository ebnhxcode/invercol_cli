<template lang="pug">
	div(v-if="establecimiento")
		h2 Actualizar Establecimiento
		.field
			.field
				label Nombre
				input.input(type='text', v-model='establecimiento.establecimiento_nombre')
			.field
				label Descrirección
				input.textarea(v-model='establecimiento.establecimiento_direccion', rows="1")
			.field
				label Descripción
				input.textarea(v-model='establecimiento.establecimiento_descripcion', rows="1")
			.field
				label Región
					.select.is-fullwidth
						select(v-model='establecimiento.region_id')
							option(value='')
							option(:value='r.region_id', v-for="r in regiones") {{ r.region_nombre }}
			.field
				label Comuna
					.select.is-fullwidth
						select(v-model='establecimiento.comuna_id')
							option(value='')
							option(
								:value='c.comuna_id', 
								v-for="c in comunas",
								v-show="establecimiento.region_id == c.region_id || establecimiento.region_id == null"
							) {{ c.comuna_nombre }}

		.field.is-grouped
			button.button.is-primary.is-small(
					@click.prevent="guardarEstablecimiento(establecimiento)"
			) Guardar
</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	name: "actualizar-establecimiento",
	props: ["establecimiento", "regiones", "comunas"],
	data() {
		return {
			apiUrl:environmentConfig.invercolProd.apiUrl,

		}
	},
	created() {},
	methods: {
		
		guardarEstablecimiento: function(establecimiento) {
 			this.$http.put(`${this.apiUrl}/frontend/establecimientos/${establecimiento.establecimiento_id}`,establecimiento).then(response => {
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