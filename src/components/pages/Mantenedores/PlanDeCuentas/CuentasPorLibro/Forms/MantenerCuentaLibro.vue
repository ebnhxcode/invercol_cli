<template lang="pug">
  div
    h2 Mantener Libros
    table
      thead
        tr
          th Acciones
          th Libro
      tbody
        tr(v-for="l in cuenta.libros_cuentas")
          td
            .button.is-small.tooltip.is-light(
              data-tooltip="Desasociar",
              @click.prevent="eliminarAsociacionCuentaLibro(l.libro_cuenta_id)"
            )
              v-icon(name="times")
          td {{ l.libro.libro_nombre }}
        tr(v-if="cuenta.libros_cuentas && cuenta.libros_cuentas.length == 0")
          td(colspan="2") No existen libros asociados a esta cuenta
  
</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
  mixins: [InvercolCoreFunctionsMixin],
  name: "mantener-cuenta-libro",
  components:{
    
  },
  props: ['cuenta'],
  data() {
    return {
      apiUrl: environmentConfig.invercolProd.apiUrl,
    }
  },
  created() {},
  methods: {
      removeMarkedElement: function (elem) {
        this.groupedMarkedElements.splice(this.groupedMarkedElements.indexOf(elem), 1)
      },

		eliminarAsociacionCuentaLibro: function (libro_cuenta_id) {

			this.$http.delete(`${this.apiUrl}/frontend/libroscuentas/${libro_cuenta_id}`).then(response => {
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