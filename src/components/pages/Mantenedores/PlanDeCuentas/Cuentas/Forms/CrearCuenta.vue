<template lang="pug">
  div
    h2 Nueva Cuenta
    .field
      .field
        label Código
        input.input(type='text', v-model='nueva_cuenta.cuenta_id')
      .field
        label Código Adicional
        input.input(type='text', v-model='nueva_cuenta.cuenta_codigo')
      .field
        label Nombre
        input.input(type='text', v-model='nueva_cuenta.cuenta_nombre')
      .field
        label Descripción
        input.textarea(v-model='nueva_cuenta.cuenta_descripcion', rows="1")
      .field
        label Cuenta Titular
          .select.is-fullwidth
            select(v-model='nueva_cuenta.cuenta_titular')
              option(value='')
              option(value='0') Si
              option(value='1') No
      .field
        label Cuenta Dependencia
          .select.is-fullwidth
            select(v-model='nueva_cuenta.cuenta_dependencia_id')
              option(value='')
              option(v-for="d in cuenta_dependencias", :value='d.cuenta_dependencia_id') {{ d.cuenta_dependencia_nombre }}

    .field.is-grouped
      button.button.is-primary.is-small(
          @click.prevent="guardarNuevaCuenta(nueva_cuenta)"
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
      nueva_cuenta: {
        cuenta_id: null,
        cuenta_codigo: null,
        cuenta_nombre: null,
        cuenta_descripcion: null,
        cuenta_titular: null,
        cuenta_dependencia_id: null
      },
    }
  },
  created() {},
  methods: {
    

    guardarNuevaCuenta: function(nueva_cuenta) {
      //Conforma objeto paramétrico para guardar en el bknd
      var formData = new FormData()
      formData.append(`cuenta_id`, nueva_cuenta.cuenta_id)
      formData.append(`cuenta_codigo`, nueva_cuenta.cuenta_codigo)
      formData.append(`cuenta_nombre`, nueva_cuenta.cuenta_nombre)
      formData.append(`cuenta_descripcion`,nueva_cuenta.cuenta_descripcion)
      formData.append(`cuenta_titular`, nueva_cuenta.cuenta_titular) 
      formData.append(`cuenta_dependencia_id`,nueva_cuenta.cuenta_dependencia_id)

      this.$http.post(`${this.apiUrl}/frontend/cuentas`,formData).then(response => {
        // success callback
        if (response.status == 200 || response.status == 201) {
          console.log(response)
          this.$parent.obtenerCuentas() // SOON DEPRECATE
          this.seleccionarFormatoNotificacion('success', 'create', true, {})
          this.limpiarNuevaCuenta()
        }
        
      },
      response => {
        this.seleccionarFormatoNotificacion('error', 'custom', true, {title:'Error',text:'Error al guardar'})
        // error callback
      })
    },

    limpiarNuevaCuenta: function() {
      this.nueva_cuenta = {
        cuenta_id: "",
        cuenta_codigo: "",
        cuenta_nombre: "",
        cuenta_descripcion: "",
        cuenta_titular: "",
        cuenta_dependencia_id: ""
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