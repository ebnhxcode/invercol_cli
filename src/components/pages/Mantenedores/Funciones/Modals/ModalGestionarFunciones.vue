<template lang="pug">
	modal(
		style="z-index:2000 !importantpadding-top: 20px"
		name="modal-gestionar-funciones"
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
			button.button.is-small.is-danger(style="float:right", @click.prevent="$modal.hide('modal-gestionar-funciones')") ❌
		.section
			h1 Gestión de Funciones
			.content.columns
				.column.is-6
					actualizar-funcion(
						:funcion="funcion",
						:tipo_funciones="tipo_funciones",
					)

				.column.is-6


</template>
<script>
//import moment from 'moment'

import ActualizarFuncion from "@/components/pages/Mantenedores/Funciones/Forms/ActualizarFuncion.vue"

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	name: "modal-gestionar-funciones",
	components:{
		ActualizarFuncion,
	},
	props: ["funcion", "cargos", "tipo_funciones"],
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