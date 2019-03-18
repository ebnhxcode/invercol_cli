<template lang="pug">
	div(v-if="contrato")
		h2 Actualizar Contrato
		.field
			.field
				label Fecha Inicio Contrato
				input.input(type='date', v-model='contrato.contrato_fecha_inicio')
			.field
				label Horas Semanales
				input.input(type='number', v-model='contrato.contrato_horas_semanales')
			.field
				label Sueldo Base
				input.input(type='number', v-model='contrato.contrato_sueldo_base')
			.field
				label Valor hora
				input.input(type='number', v-model='contrato.contrato_valor_hora')
			.field
				label Tipo Contrato
					.select.is-fullwidth
						select(v-model='contrato.tipo_contrato_id')
							option(value='')
							option(:value='t.tipo_contrato_id', v-for="t in tipo_contratos") {{ t.tipo_contrato_nombre }}
			.field
				label Ficha Trabajador
					.select.is-fullwidth
						select(v-model='contrato.ficha_trabajador_id')
							option(value='')
							option(:value='f.ficha_trabajador_id', v-for="f in ficha_trabajadores") {{ f.ficha_nombre }}

		.field.is-grouped
			button.button.is-primary.is-small(
					@click.prevent="guardarContrato(contrato)"
			) Guardar
</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	name: "modal-gestionar-contratos",
	props: ["contrato", "tipo_contratos", "ficha_trabajadores"],
	data() {
		return {
			apiUrl:environmentConfig.invercolProd.apiUrl,
		}
	},
	created() {},
	methods: {
		

		guardarContrato: function(contrato) {
			this.$http.put(`${this.apiUrl}/frontend/contratos/${contrato.contrato_id}`,contrato).then(response => {
				// success callback
				if (response.status == 200 || response.status == 201) {
					console.log(response)
					this.seleccionarFormatoNotificacion('success', 'create', true, {})
				}
				
			},
			response => {
				this.seleccionarFormatoNotificacion('error', 'custom', true, {title:'Error',text:'Error al guardar'})
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