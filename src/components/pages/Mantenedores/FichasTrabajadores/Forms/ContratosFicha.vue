<template lang="pug">
	div
		h2 Contratos de la ficha
		.is-narrow(style="overflow-x: scroll;overflow-y: hidden;font-size: 1rem;display:block;max-width: 100%;user-select:text !important;")
			table
				thead
					tr
						th Acciones
						th Fecha Inicio
						th Sueldo Base
						th Horas Semanales
						th Horas Extras
						th Bono
						th Valor Hora
						th Tipo Contrato
						th Subvención
				tbody
					tr(v-for="c in ficha_trabajador.contratos")
						td 
							.button.is-small.tooltip.is-light(data-tooltip="Eliminar", @click.prevent="eliminarContrato()")
								v-icon(name="times")
						td {{ c.contrato_fecha_inicio }}
						td {{ c.contrato_sueldo_base }}
						td {{ c.contrato_horas_semanales }}
						td {{ c.contrato_horas_extras }}
						td {{ c.contrato_bono }}
						td {{ c.contrato_valor_hora }}
						td {{ c.rbd.rbd_nombre }}
						td {{ c.subvencion.subvencion_nombre }}


</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	name: "contratos-ficha",
	props: ["ficha_trabajador"],
	data() {
		return {
			apiUrl:environmentConfig.invercolProd.apiUrl,
		}
	},
	created() {},
	methods: {
		eliminarContrato: function () {
			console.log('contrato eliminado')
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