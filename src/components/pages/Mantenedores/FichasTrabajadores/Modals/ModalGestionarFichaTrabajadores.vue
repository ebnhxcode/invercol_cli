<template lang="pug">
	modal(
		style="z-index:2000 !importantpadding-top: 20px"
		name="modal-gestionar-ficha-trabajadores"
		:reset="true"
		:width="'70%'"
		:min-width="320"
		:height="'auto'"
		:min-height="600"
		:adaptive="true"
		:resizable="true"
		:scrollable="true"
		:draggable="false"
	)

		div
			button.button.is-small.is-danger(style="float:right", @click.prevent="$modal.hide('modal-gestionar-ficha-trabajadores')") ❌
		.section
			h1 Gestión de Fichas de Trabajadores
			.content.columns
				.column.is-6
					actualizar-ficha-trabajador(
						:ficha_trabajador="ficha_trabajador",
						:cargos="cargos",
						:rbds="rbds"
					)

				.column.is-6
					crear-contrato(
						:ficha_trabajador="ficha_trabajador",
						:rbds="rbds",
						:subvenciones="subvenciones",
						:tipo_contratos="tipo_contratos",
						:ficha_trabajadores="ficha_trabajadores"
					)
			.columns
				.column.is-12
					contratos-ficha(
						:ficha_trabajador="ficha_trabajador"
					)
					

</template>
<script>
//import moment from 'moment'

import ActualizarFichaTrabajador from "@/components/pages/Mantenedores/FichasTrabajadores/Forms/ActualizarFichaTrabajador.vue"
import CrearContrato from "@/components/pages/Mantenedores/FichasTrabajadores/Forms/CrearContrato.vue"
import ContratosFicha from "@/components/pages/Mantenedores/FichasTrabajadores/Forms/ContratosFicha.vue"

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	name: "modal-gestionar-ficha-trabajadores",
	components:{
		ActualizarFichaTrabajador,
		CrearContrato,
		ContratosFicha,
	},
	props: ["ficha_trabajador","cargos","rbds","subvenciones","tipo_contratos","ficha_trabajadores"],
	data() {
		return {
		}
	},
	created() {},
	methods: {
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