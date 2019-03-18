<template lang="pug">
  div
    h2 Mantener Funciones Asociadas
    table
      thead
        tr
          th Acciones
          th Función
      tbody
        tr(v-for="f in cargo.funciones")
          td
            .button.is-small.tooltip.is-light(
              data-tooltip="Desasociar",
              @click.prevent="eliminarAsociacionCargoFuncion(f.funcion_id)"
            )
              v-icon(name="times")
          td {{ f.funcion_nombre }}
        tr(v-if="cargo.funciones && cargo.funciones.length == 0")
          td(colspan="2") No existen funciones asociadas a este cargo
  
</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
  mixins: [InvercolCoreFunctionsMixin],
  name: "mantener-cargo-funcion",
  components:{
    
  },
  props: ['cargo'],
  data() {
    return {
      apiUrl: environmentConfig.invercolProd.apiUrl,
    }
  },
  created() {},
  methods: {
		eliminarAsociacionCuentaLibro: function (libro_cuenta_id) {

			this.$http.delete(`${this.apiUrl}/frontend/libros_cuentas/${libro_cuenta_id}`).then(response => {
				// success callback
				if (response.status == 200) {
          this.cuenta.libros_cuentas.splice(this.cuenta.libros_cuentas.indexOf(libro_cuenta_id), 1)
					//console.log(response)
					this.seleccionarFormatoNotificacion('success', 'delete', true, {})
				}
			},
			response => {
				// error callback
			})

		},
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