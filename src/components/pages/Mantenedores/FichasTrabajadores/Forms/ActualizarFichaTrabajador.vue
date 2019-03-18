<template lang="pug">
	div(v-if="ficha_trabajador")
		h2 Actualizar Ficha Trabajador
		.field

			.field
				label Rbd
					.select.is-fullwidth
						select(v-model='ficha_trabajador.rbd_id')
							option(value='')
							option(:value='r.rbd_id', v-for="r in rbds") {{ r.rbd_nombre }}
			.field
				label Rut
				input.input(type='text', max-length="8", v-model='ficha_trabajador.ficha_rut')
			.field
				label Dv
				input.input(type='text', max-length="1", v-model='ficha_trabajador.ficha_dv')
			.field
				label Género
				.select.is-fullwidth
					select(v-model='ficha_trabajador.ficha_genero')
						option(value='')
						option(value='M') Masculino
						option(value='F') Femenino
						option(value='ND') No Definido
			.field
				label Nombre
				input.input(type='text', v-model='ficha_trabajador.ficha_nombre')
			.field
				label Apellido Paterno
				input.input(type='text', v-model='ficha_trabajador.ficha_apellido_paterno')
			.field
				label Apellido Materno
				input.input(type='text', v-model='ficha_trabajador.ficha_apellido_materno')
			.field
				label Fecha Nacimiento
				input.input(type='date', v-model='ficha_trabajador.ficha_fecha_nacimiento')
			.field
				label Fecha Ingreso Contrato
				input.input(type='date', v-model='ficha_trabajador.ficha_fecha_ingreso')

			.field
				label Cargo
					.select.is-fullwidth
						select(v-model='ficha_trabajador.cargo_id')
							option(value='')
							option(:value='c.cargo_id', v-for="c in cargos") {{ c.cargo_nombre }}
							

		.field.is-grouped
			button.button.is-primary.is-small(
					@click.prevent="guardarFichaTrabajador(ficha_trabajador)"
			) Guardar
</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
	mixins: [InvercolCoreFunctionsMixin],
	name: "actualizar-ficha_trabajador",
	props: ["ficha_trabajador", "cargos", "rbds"],
	data() {
		return {
			apiUrl:environmentConfig.invercolProd.apiUrl,

		}
	},
	created() {},
	methods: {
		
		guardarFichaTrabajador: function(ficha_trabajador) {
 			this.$http.put(`${this.apiUrl}/frontend/fichas_trabajadores/${ficha_trabajador.ficha_trabajador_id}`,ficha_trabajador).then(response => {
				// success callback
				if (response.status == 200 || response.status == 201) {
					console.log(response)
					this.seleccionarFormatoNotificacion('success', 'update', true, {})
				}
			},
			response => {
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