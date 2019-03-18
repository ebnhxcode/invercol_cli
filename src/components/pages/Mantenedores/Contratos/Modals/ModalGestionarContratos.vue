<template lang="pug">
	modal(
		style="z-index:2000 !importantpadding-top: 20px"
		name="modal-gestionar-contratos"
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
			button.button.is-small.is-danger(style="float:right", @click.prevent="$modal.hide('modal-gestionar-contratos')") ❌
		.section
			h1 Gestión de Contratos
			.content.columns
				.column.is-6
					actualizar-contrato(
						:contrato="contrato",
						:tipo_contratos="tipo_contratos",
						:ficha_trabajadores="ficha_trabajadores"
					)

				.column.is-6
</template>
<script>
//import moment from 'moment'

import ActualizarContrato from "@/components/pages/Mantenedores/Contratos/Forms/ActualizarContrato.vue"

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	name: "modal-gestionar-contratos",
	components:{
		ActualizarContrato,
	},
	props: ["contrato", "tipo_contratos", "ficha_trabajadores"],
	data() {
		return {

		}
	},
	created() {},
	methods: {
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