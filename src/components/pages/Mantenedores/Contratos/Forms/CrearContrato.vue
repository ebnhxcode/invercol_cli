<template lang="pug">
	div
		h2 Nuevo Contrato
		.field
			.field
				label Fecha Inicio Contrato
				input.input(type='date', v-model='nuevo_contrato.contrato_fecha_inicio')
			.field
				label Horas Semanales
				input.input(type='number', v-model='nuevo_contrato.contrato_horas_semanales')
			.field
				label Sueldo Base
				input.input(type='number', v-model='nuevo_contrato.contrato_sueldo_base')
			.field
				label Valor hora
				input.input(type='number', v-model='nuevo_contrato.contrato_valor_hora')
			.field
				label Tipo Contrato
					.select.is-fullwidth
						select(v-model='nuevo_contrato.tipo_contrato_id')
							option(value='')
							option(:value='t.tipo_contrato_id', v-for="t in tipo_contratos") {{ t.tipo_contrato_nombre }}
			.field
				label Ficha Trabajador
					.select.is-fullwidth
						select(v-model='nuevo_contrato.ficha_trabajador_id')
							option(value='')
							option(:value='f.ficha_trabajador_id', v-for="f in ficha_trabajadores") {{ f.ficha_nombre }}

		.field.is-grouped
			button.button.is-primary.is-small(
					@click.prevent="guardarNuevoContrato(nuevo_contrato)"
			) Guardar
</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	name: "modal-gestionar-contratos",
	props: ["tipo_contratos", "ficha_trabajadores"],
	data() {
		return {
			apiUrl:environmentConfig.invercolProd.apiUrl,
			nuevo_contrato: {
				contrato_fecha_inicio: null,
				contrato_horas_semanales: null,
				contrato_sueldo_base: null,
				contrato_valor_hora: null,
				tipo_contrato_id: null,
				ficha_trabajador_id: null
			},
		}
	},
	created() {},
	methods: {
		

		guardarNuevoContrato: function(nuevo_contrato) {
			//Conforma objeto paramétrico para guardar en el bknd
			var formData = new FormData()
			formData.append(`contrato_fecha_inicio`, nuevo_contrato.contrato_fecha_inicio)
			formData.append(`contrato_horas_semanales`, nuevo_contrato.contrato_horas_semanales)
			formData.append(`contrato_sueldo_base`,nuevo_contrato.contrato_sueldo_base)
			formData.append(`contrato_valor_hora`, nuevo_contrato.contrato_valor_hora) 
			formData.append(`tipo_contrato_id`,nuevo_contrato.tipo_contrato_id)
			formData.append(`ficha_trabajador_id`,nuevo_contrato.ficha_trabajador_id || 0)

			this.$http.post(`${this.apiUrl}/frontend/contratos`,formData).then(response => {
				// success callback
				if (response.status == 200 || response.status == 201) {
					console.log(response)
					this.$parent.obtenerContratos() // SOON DEPRECATE
					this.seleccionarFormatoNotificacion('success', 'create', true, {})
					this.limpiarNuevoContrato()
				}
				
			},
			response => {
				this.seleccionarFormatoNotificacion('error', 'custom', true, {title:'Error',text:'Error al guardar'})
				// error callback
			})
		},

		limpiarNuevoContrato: function() {
			this.nuevo_contrato = {
				contrato_fecha_inicio: null,
				contrato_horas_semanales: null,
				contrato_sueldo_base: null,
				contrato_valor_hora: null,
				tipo_contrato_id: null,
				ficha_trabajador_id: null
			}
		}
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