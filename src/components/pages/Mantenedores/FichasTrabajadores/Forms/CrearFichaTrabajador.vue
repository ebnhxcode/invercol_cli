<template lang="pug">
	div
		h2 Nueva Ficha Trabajador
		.field

			.field
				label Rbd
					.select.is-fullwidth
						select(v-model='nueva_ficha_trabajador.rbd_id')
							option(value='')
							option(:value='r.rbd_id', v-for="r in rbds") {{ r.rbd_nombre }}
			.field
				label Rut
				input.input(type='text', max-length="8", v-model='nueva_ficha_trabajador.ficha_rut')
			.field
				label Dv
				input.input(type='text', max-length="1", v-model='nueva_ficha_trabajador.ficha_dv')
			.field
				label Género
				.select.is-fullwidth
					select(v-model='nueva_ficha_trabajador.ficha_genero')
						option(value='')
						option(value='M') Masculino
						option(value='F') Femenino
						option(value='ND') No Definido
			.field
				label Nombre
				input.input(type='text', v-model='nueva_ficha_trabajador.ficha_nombre')
			.field
				label Apellido Paterno
				input.input(type='text', v-model='nueva_ficha_trabajador.ficha_apellido_paterno')
			.field
				label Apellido Materno
				input.input(type='text', v-model='nueva_ficha_trabajador.ficha_apellido_materno')
			.field
				label Fecha Nacimiento
				input.input(type='date', v-model='nueva_ficha_trabajador.ficha_fecha_nacimiento')
			.field
				label Fecha Ingreso Contrato
				input.input(type='date', v-model='nueva_ficha_trabajador.ficha_fecha_ingreso')

			.field
				label Cargo
					.select.is-fullwidth
						select(v-model='nueva_ficha_trabajador.cargo_id')
							option(value='')
							option(:value='c.cargo_id', v-for="c in cargos") {{ c.cargo_nombre }}
							

		.field.is-grouped
			button.button.is-primary.is-small(
					@click.prevent="guardarNuevaFichaTrabajador(nueva_ficha_trabajador)"
			) Guardar
</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	name: "crear-ficha-trabajador",
	props: ["cargos", "rbds"],
	data() {
		return {
			apiUrl:environmentConfig.invercolProd.apiUrl,
			nueva_ficha_trabajador: {
				ficha_rut: null,
				ficha_dv: null,
				ficha_genero: null,
				ficha_nombre: null,
				ficha_apellido_paterno: null,
				ficha_apellido_materno: null,
				ficha_fecha_nacimiento: null,
				ficha_fecha_ingreso: null,
				cargo_id: null,
				rbd_id: null,
			},
		}
	},
	created() {},
	methods: {
		

		guardarNuevaFichaTrabajador: function(nueva_ficha_trabajador) {
			//Conforma objeto paramétrico para guardar en el bknd
			var formData = new FormData()
			formData.append(`ficha_rut`, nueva_ficha_trabajador.ficha_rut)
			formData.append(`ficha_dv`, nueva_ficha_trabajador.ficha_dv)
			formData.append(`ficha_genero`,nueva_ficha_trabajador.ficha_genero)
			formData.append(`ficha_nombre`, nueva_ficha_trabajador.ficha_nombre) 
			formData.append(`ficha_apellido_paterno`,nueva_ficha_trabajador.ficha_apellido_paterno)
			formData.append(`ficha_apellido_materno`,nueva_ficha_trabajador.ficha_apellido_materno)
			formData.append(`ficha_fecha_nacimiento`,nueva_ficha_trabajador.ficha_fecha_nacimiento)
			formData.append(`ficha_fecha_ingreso`,nueva_ficha_trabajador.ficha_fecha_ingreso)
			formData.append(`cargo_id`,nueva_ficha_trabajador.cargo_id)
			formData.append(`rbd_id`,nueva_ficha_trabajador.rbd_id)

			this.$http.post(`${this.apiUrl}/frontend/fichas_trabajadores`,formData).then(response => {
				// success callback
				if (response.status == 200 || response.status == 201) {
					console.log(response)
					this.$parent.obtenerFichasTrabajadores() // SOON DEPRECATE
					this.seleccionarFormatoNotificacion('success', 'create', true, {})
					this.limpiarNuevaFichaTrabajador()
				}
				
			},
			response => {
				this.seleccionarFormatoNotificacion('error', 'custom', true, {title:'Error',text:'Error al guardar'})
				// error callback
			})
		},

		limpiarNuevaFichaTrabajador: function() {
			this.nueva_ficha_trabajador = {
				ficha_rut: null,
				ficha_dv: null,
				ficha_genero: null,
				ficha_nombre: null,
				ficha_apellido_paterno: null,
				ficha_apellido_materno: null,
				ficha_fecha_nacimiento: null,
				ficha_fecha_ingreso: null,
				cargo_id: null,
				rbd_id: null,
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