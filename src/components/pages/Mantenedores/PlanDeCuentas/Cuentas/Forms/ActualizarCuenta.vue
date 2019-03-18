<template lang="pug">
  div(v-if="cuenta")
    h2 Actualizar Cuenta
    .field
      .field
        label Código
        input.input(type='text', v-model='cuenta.cuenta_id')
      .field
        label Código Adicional
        input.input(type='text', v-model='cuenta.cuenta_codigo')
      .field
        label Nombre
        input.input(type='text', v-model='cuenta.cuenta_nombre')
      .field
        label Descripción
        input.textarea(v-model='cuenta.cuenta_descripcion', rows="1")
      .field
        label Cuenta Titular
          .select.is-fullwidth
            select(v-model='cuenta.cuenta_titular')
              option(value='')
              option(value='0') Si
              option(value='1') No
      .field
        label Cuenta Dependencia
          .select.is-fullwidth
            select(v-model='cuenta.cuenta_dependencia')
              option(value='')
              option(v-for="d in cuenta_dependencias", :value='d.cuenta_dependencia_id') {{ d.cuenta_dependencia_nombre }}

    .field.is-grouped
      button.button.is-primary.is-small(
        @click.prevent="guardarCuenta(cuenta)"
      ) Guardar
</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
  mixins: [InvercolCoreFunctionsMixin],
  name: "crear-cuenta",
  props: ["cuenta_dependencias", "cuenta"],
  data() {
    return {
      apiUrl:environmentConfig.invercolProd.apiUrl,

    }
  },
  created() {},
  methods: {
    
		guardarCuenta: function(cuenta) {
			this.$http.put(`${this.apiUrl}/frontend/cuentas/${cuenta.cuenta_id}`,cuenta).then(response => {
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