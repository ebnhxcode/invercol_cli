<template lang="pug">
	modal(
		style="z-index:2000 !importantpadding-top: 20px"
		name="modal-gestionar-libros"
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
			button.button.is-small.is-danger(style="float:right", @click.prevent="$modal.hide('modal-gestionar-libros')") ❌
		.section
			h1 Gestión de Libros
			.content.columns
				.column.is-6
					actualizar-libro(
						:libro="libro"
					)

				.column.is-6
					mantener-libro-cuenta(
						:libro="libro"
					)



</template>
<script>
//import moment from 'moment'

import ActualizarLibro from "@/components/pages/Mantenedores/Libros/Forms/ActualizarLibro.vue"
import MantenerLibroCuenta from "@/components/pages/Mantenedores/Libros/Forms/MantenerLibroCuenta.vue"

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	name: "modal-gestionar-libros",
	components: {
		ActualizarLibro,
		MantenerLibroCuenta
	},
	props: ["libro", "libros", "cuentas"],
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