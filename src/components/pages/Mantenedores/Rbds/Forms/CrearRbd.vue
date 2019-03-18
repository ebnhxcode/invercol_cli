<template lang="pug">
	div
		h2 Nuevo Rbd
		.field
			.field
				label Código
				input.input(v-model='nuevo_rbd.rbd_codigo')
			.field
				label Nombre
				input.input(type='text', v-model='nuevo_rbd.rbd_nombre')
			.field
				label Descripción
				input.textarea(v-model='nuevo_rbd.rbd_descripcion', rows="1")
			.field
				label Establecimiento
					.select.is-fullwidth
						select(v-model='nuevo_rbd.establecimiento_id')
							option(value='')
							option(:value='r.establecimiento_id', v-for="r in establecimientos") {{ r.establecimiento_nombre }}

		.field.is-grouped
			button.button.is-primary.is-small(
					@click.prevent="guardarNuevoRbd(nuevo_rbd)"
			) Guardar
</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	name: "crear-rbd",
	props: ["establecimientos"],
	data() {
		return {
			apiUrl:environmentConfig.invercolProd.apiUrl,
			nuevo_rbd: {
				rbd_codigo: null,
				rbd_nombre: null,				
				rbd_descripcion: null,
				establecimiento_id: null,
			},
		}
	},
	created() {},
	methods: {
		

		guardarNuevoRbd: function(nuevo_rbd) {
			//Conforma objeto paramétrico para guardar en el bknd
			var formData = new FormData()
			formData.append(`rbd_codigo`, nuevo_rbd.rbd_codigo || "Null")
			formData.append(`rbd_nombre`, nuevo_rbd.rbd_nombre || "Null")			
			formData.append(`rbd_descripcion`,nuevo_rbd.rbd_descripcion || "Null")
			formData.append(`establecimiento_id`, nuevo_rbd.establecimiento_id) 

			this.$http.post(`${this.apiUrl}/frontend/rbds`,formData).then(response => {
				// success callback
				if (response.status == 200 || response.status == 201) {
					console.log(response)
					this.$parent.obtenerRbds() // SOON DEPRECATE
					this.seleccionarFormatoNotificacion('success', 'create', true, {})
					this.limpiarNuevoRbd()
				}
				
			},
			response => {
				this.seleccionarFormatoNotificacion('error', 'custom', true, {title:'Error',text:'Error al guardar'})
				// error callback
			})
		},

		limpiarNuevoRbd: function() {
			this.nuevo_rbd = {
				rbd_codigo: null,
				rbd_nombre: null,				
				rbd_descripcion: null,
				establecimiento_id: null
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