<template lang="pug">
	modal(
		style="z-index:2000 !importantpadding-top: 20px"
		name="modal-gestionar-cargos"
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
			button.button.is-small.is-danger(style="float:right", @click.prevent="$modal.hide('modal-gestionar-cargos')") ❌
		.section
			h1 Gestión de Cargos
			.content.columns
				.column.is-6
					actualizar-cargo(
						:cargo="cargo",
						:cargos="cargos",
						:tipo_cargos="tipo_cargos",
					)

				.column.is-6
					mantener-cargo-funcion(
						:cargo="cargo"
					)


</template>
<script>
//import moment from 'moment'

import ActualizarCargo from "@/components/pages/Mantenedores/Cargos/Forms/ActualizarCargo.vue"
import MantenerCargoFuncion from "@/components/pages/Mantenedores/Cargos/Forms/MantenerCargoFuncion.vue"

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	name: "modal-gestionar-cargos",
	components:{
    ActualizarCargo,
    MantenerCargoFuncion,
	},
	props: ["cargo", "cargos", "tipo_cargos", "funciones"],
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