<template lang="pug">
	div
		h2 Mantener Funciones Asociadas
		table
			thead
				tr
					th Acciones
					th Función
			tbody
				tr(v-for="f in cargo.cargo_funciones")
					td
						.button.is-small.tooltip.is-light(
							data-tooltip="Desasociar",
							@click.prevent="eliminarAsociacionCargoFuncion(f.cargo_funcion_id)"
						)
							v-icon(name="times")
					td {{ f.funcion.funcion_nombre }}
				tr(v-if="cargo.cargo_funciones && cargo.cargo_funciones.length == 0")
					td(colspan="2") No existen funciones asociadas a este cargo
	
</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	name: "mantener-cargo-funcion",
	components:{
		
	},
	props: ['cargo'],
	data() {
		return {
			apiUrl: environmentConfig.invercolProd.apiUrl,
		}
	},
	created() {},
	methods: {
		eliminarAsociacionCargoFuncion: function (cargo_funcion_id) {

			this.$http.delete(`${this.apiUrl}/frontend/cargos_funciones/${cargo_funcion_id}`).then(response => {
				// success callback
				if (response.status == 200) {
					this.cargo.cargo_funciones.splice(this.cargo.cargo_funciones.indexOf(cargo_funcion_id), 1)
					//console.log(response)
					this.seleccionarFormatoNotificacion('success', 'delete', true, {})
				}
			},
			response => {
				// error callback
			})

		},
	},
	filters: {},
	/*
	beforeDestroy() {
	},
	*/
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