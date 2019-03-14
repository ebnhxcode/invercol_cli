<template lang="pug">
  div
    h2 Asociar Cuenta a Libro
    .field
      .field
        label Seleccione Cuenta
        .select.is-fullwidth
          select(v-model='nueva_cuenta_libro.cuenta_id')
            option(value='')
            option(v-for='c in cuentas', :value='c.cuenta_id') {{ `${c.cuenta_id} - ${c.cuenta_nombre}` }}
      .field
        label Seleccione Libro
        .select.is-fullwidth
          select(v-model='nueva_cuenta_libro.libro_id')
            option(value='')
            option(v-for='l in libros', :value='l.libro_id') {{ l.libro_nombre }}
    .field.is-grouped
      button.button.is-primary.is-small(
        @click.prevent="guardarNuevoLibroCuenta(nueva_cuenta_libro)"
      ) Guardar Asociacion
</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
  mixins: [InvercolCoreFunctionsMixin],
  name: "asociar-cuenta-libro",
  props: ["libros", "cuentas"],
  data() {
    return {
      apiUrl:environmentConfig.invercolProd.apiUrl,
      nueva_cuenta_libro: {
        cuenta_id: null,
        libro_id: null
      }
    }
  },
  created() {},
  methods: {
    guardarNuevoLibroCuenta: function(nueva_cuenta_libro) {
      var formData = new FormData()
      //Conforma objeto paramétrico para solicitud http
      formData.append(`cuenta_id`, nueva_cuenta_libro.cuenta_id)
      formData.append(`libro_id`, nueva_cuenta_libro.libro_id)
      this.$http.post(`${environmentConfig.invercolProd.apiUrl}/frontend/libros_cuentas`,formData).then(response => {
        // success callback

        if (response.body.status == 401) {
          return this.seleccionarFormatoNotificacion('warn', 'create', true, {title:'Asociación existente',text:'La cuenta ya ha sido asociada a este libro'})
        }

        if (response.status == 200 || response.status == 201) {
          console.log(response)
          this.$parent.obtenerCuentas()
          this.seleccionarFormatoNotificacion('success', 'create', true, {})
          this.limpiarNuevaCuentaLibro()
        }

      },
      response => {
        
        return this.seleccionarFormatoNotificacion('error', 'create', true, {title:'Error Desconocido',text:'Error desconocido, contacte con soporte'})
        // error callback
      })
    },
    limpiarNuevaCuentaLibro: function() {
      this.nueva_cuenta_libro = {
        cuenta_id: null,
        libro_id: null
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