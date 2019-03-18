<template lang="pug">
	div
		h2 Nuevo Cargo
		.field
			.field
				label Código
				input.input(type='text', v-model='nuevo_cargo.cargo_codigo')
			.field
				label Nombre
				input.input(type='text', v-model='nuevo_cargo.cargo_nombre')
			.field
				label Descripción
				input.textarea(v-model='nuevo_cargo.cargo_descripcion', rows="1")
			.field
				label Tipo Cargo
					.select.is-fullwidth
						select(v-model='nuevo_cargo.tipo_cargo_id')
							option(value='')
							option(:value='t.tipo_cargo_id', v-for="t in tipo_cargos") {{ t.tipo_cargo_nombre }}


		.field.is-grouped
			button.button.is-primary.is-small(
					@click.prevent="guardarNuevoCargo(nuevo_cargo)"
			) Guardar
</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	name: "crear-cargo",
	props: ["tipo_cargos"],
	data() {
		return {
			apiUrl:environmentConfig.invercolProd.apiUrl,
			nuevo_cargo: {
				cargo_codigo: null,
				cargo_nombre: null,
				cargo_descripcion: null,
				tipo_cargo_id: null
			},
		}
	},
	created() {},
	methods: {
		

		guardarNuevoCargo: function(nuevo_cargo) {
			//Conforma objeto paramétrico para guardar en el bknd
      var formData = new FormData()
      formData.append(`cargo_codigo`, nuevo_cargo.cargo_codigo)
			formData.append(`cargo_nombre`, nuevo_cargo.cargo_nombre)
			formData.append(`cargo_descripcion`,nuevo_cargo.cargo_descripcion)
      formData.append(`tipo_cargo_id`,nuevo_cargo.tipo_cargo_id)

			this.$http.post(`${this.apiUrl}/frontend/cargos`,formData).then(response => {
				// success callback
				if (response.status == 200 || response.status == 201) {
					console.log(response)
					this.$parent.obtenerCargos() // SOON DEPRECATE
					this.seleccionarFormatoNotificacion('success', 'create', true, {})
					this.limpiarNuevoCargo()
				}
				
			},
			response => {
				this.seleccionarFormatoNotificacion('error', 'custom', true, {title:'Error',text:'Error al guardar'})
				// error callback
			})
		},

		limpiarNuevoCargo: function() {
			this.nuevo_cargo = {
				cargo_codigo: null,
				cargo_nombre: null,
				cargo_descripcion: null,
				tipo_cargo_id: null
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