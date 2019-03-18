<template lang="pug">
	div
		h2 Mantener Cuentas Asociadas
		table
			thead
				tr
					th Acciones
					th Cuenta
			tbody
				tr(v-for="l in libro.libros_cuentas")
					td
						.button.is-small.tooltip.is-light(
							data-tooltip="Desasociar",
							@click.prevent="eliminarAsociacionCuentaLibro(l.libro_cuenta_id)"
						)
							v-icon(name="times")
					td {{ l.cuenta.cuenta_nombre }}
				tr(v-if="libro.libros_cuentas && libro.libros_cuentas.length == 0")
					td(colspan="2") No existen cuentas asociadas a este libro
	
</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	name: "mantener-libro-cuenta",
	components:{
		
	},
	props: ['libro'],
	data() {
		return {
			apiUrl: environmentConfig.invercolProd.apiUrl,
		}
	},
	created() {},
	methods: {

		eliminarAsociacionCuentaLibro: function (libro_cuenta_id) {

			this.$http.delete(`${this.apiUrl}/frontend/libros_cuentas/${libro_cuenta_id}`).then(response => {
				// success callback
				if (response.status == 200) {
					this.libro.libros_cuentas.splice(this.libro.libros_cuentas.indexOf(libro_cuenta_id), 1)
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