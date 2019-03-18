<template lang="pug">
	div
		h2 Nuevo Establecimiento
		.field
			.field
				label Nombre
				input.input(type='text', v-model='nuevo_establecimiento.establecimiento_nombre')
			.field
				label Dirección
				input.textarea(v-model='nuevo_establecimiento.establecimiento_direccion', rows="1")
			.field
				label Descripción
				input.textarea(v-model='nuevo_establecimiento.establecimiento_descripcion', rows="1")
			.field
				label Región
					.select.is-fullwidth
						select(v-model='nuevo_establecimiento.region_id')
							option(value='')
							option(:value='r.region_id', v-for="r in regiones") {{ r.region_nombre }}
			.field
				label Comuna
					.select.is-fullwidth
						select(v-model='nuevo_establecimiento.comuna_id')
							option(value='')
							option(
								:value='c.comuna_id', 
								v-for="c in comunas",
								v-show="nuevo_establecimiento.region_id == c.region_id || nuevo_establecimiento.region_id == null"
							) {{ c.comuna_nombre }}

		.field.is-grouped
			button.button.is-primary.is-small(
					@click.prevent="guardarNuevoEstablecimiento(nuevo_establecimiento)"
			) Guardar
</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	name: "crear-establecimiento",
	props: ["regiones", "comunas"],
	data() {
		return {
			apiUrl:environmentConfig.invercolProd.apiUrl,
			nuevo_establecimiento: {
				establecimiento_nombre: null,
				establecimiento_direccion: null,
				establecimiento_descripcion: null,
				region_id: null,
				comuna_id: null
			},
		}
	},
	created() {},
	methods: {
		

		guardarNuevoEstablecimiento: function(nuevo_establecimiento) {
			//Conforma objeto paramétrico para guardar en el bknd
			var formData = new FormData()
			formData.append(`establecimiento_nombre`, nuevo_establecimiento.establecimiento_nombre)
			formData.append(`establecimiento_direccion`, nuevo_establecimiento.establecimiento_direccion)
			formData.append(`establecimiento_descripcion`,nuevo_establecimiento.establecimiento_descripcion)
			formData.append(`region_id`, nuevo_establecimiento.region_id) 
			formData.append(`comuna_id`,nuevo_establecimiento.comuna_id)

			this.$http.post(`${this.apiUrl}/frontend/establecimientos`,formData).then(response => {
				// success callback
				if (response.status == 200 || response.status == 201) {
					console.log(response)
					this.$parent.obtenerEstablecimientos() // SOON DEPRECATE
					this.seleccionarFormatoNotificacion('success', 'create', true, {})
					this.limpiarNuevoEstablecimiento()
				}
				
			},
			response => {
				this.seleccionarFormatoNotificacion('error', 'custom', true, {title:'Error',text:'Error al guardar'})
				// error callback
			})
		},

		limpiarNuevoEstablecimiento: function() {
			this.nuevo_establecimiento = {
				establecimiento_nombre: null,
				establecimiento_direccion: null,
				establecimiento_descripcion: null,
				region_id: null,
				comuna_id: null
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