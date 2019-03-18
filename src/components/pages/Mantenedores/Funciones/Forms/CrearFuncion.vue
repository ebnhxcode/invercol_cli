<template lang="pug">
	div
		h2 Nueva Función
		.field
			.field
				label Código
				input.input(type='text', v-model='nueva_funcion.funcion_codigo')
			.field
				label Nombre
				input.input(type='text', v-model='nueva_funcion.funcion_nombre')
			.field
				label Descripción
				input.textarea(v-model='nueva_funcion.funcion_descripcion', rows="1")
			.field
				label Tipo Función
					.select.is-fullwidth
						select(v-model='nueva_funcion.tipo_funcion_id')
							option(value='')
							option(:value='t.tipo_funcion_id', v-for="t in tipo_funciones") {{ t.tipo_funcion_nombre }}

		.field.is-grouped
			button.button.is-primary.is-small(
					@click.prevent="guardarNuevaFuncion(nueva_funcion)"
			) Guardar
</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	name: "crear-establecimiento",
	props: ["tipo_funciones"],
	data() {
		return {
			apiUrl:environmentConfig.invercolProd.apiUrl,
			nueva_funcion: {
				funcion_codigo: null,
				funcion_nombre: null,
				funcion_descripcion: null,
				tipo_funcion_id: null
			},
		}
	},
	created() {},
	methods: {
		

		guardarNuevaFuncion: function(nueva_funcion) {
			//Conforma objeto paramétrico para guardar en el bknd
      var formData = new FormData()
      formData.append(`funcion_codigo`, nueva_funcion.funcion_codigo)
			formData.append(`funcion_nombre`, nueva_funcion.funcion_nombre)
			formData.append(`funcion_descripcion`,nueva_funcion.funcion_descripcion)
      formData.append(`tipo_funcion_id`,nueva_funcion.tipo_funcion_id)

			this.$http.post(`${this.apiUrl}/frontend/funciones`,formData).then(response => {
				// success callback
				if (response.status == 200 || response.status == 201) {
					console.log(response)
					this.$parent.obtenerFunciones() // SOON DEPRECATE
					this.seleccionarFormatoNotificacion('success', 'create', true, {})
					this.limpiarNuevaFuncion()
				}
				
			},
			response => {
				this.seleccionarFormatoNotificacion('error', 'custom', true, {title:'Error',text:'Error al guardar'})
				// error callback
			})
		},

		limpiarNuevaFuncion: function() {
			this.nueva_funcion = {
				funcion_codigo: null,
				funcion_nombre: null,
				funcion_descripcion: null,
				tipo_funcion_id: null
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