<template lang="pug">
	modal(
		style="z-index:2000 !importantpadding-top: 20px"
		name="modal-gestionar-rbds"
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
			button.button.is-small.is-danger(style="float:right", @click.prevent="$modal.hide('modal-gestionar-rbds')") ❌
		.section
			h1 Gestión de Rbd
			.content.columns
				.column.is-6
					actualizar-rbd(
						:rbd="rbd",
						:establecimientos="establecimientos",
					)

				.column.is-6
					
					

</template>
<script>
//import moment from 'moment'

import ActualizarRbd from "@/components/pages/Mantenedores/Rbds/Forms/ActualizarRbd.vue"


import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	name: "modal-gestionar-rbds",
	components:{
		ActualizarRbd,
	},
	props: ['rbd', 'establecimientos'],
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