<template lang="pug">
  div
    h2 Asociar Función a Cargo
    .field
      .field
        label Seleccione Cargo
        .select.is-fullwidth
          select(v-model='nuevo_cargo_funcion.cargo_id')
            option(value='')
            option(v-for='c in cargos', :value='c.cargo_id') {{ `${c.cargo_id} - ${c.cargo_nombre}` }}
      .field
        label Seleccione Función
        .select.is-fullwidth
          select(v-model='nuevo_cargo_funcion.funcion_id')
            option(value='')
            option(v-for='f in funciones', :value='f.funcion_id') {{ f.funcion_nombre }}
    .field.is-grouped
      button.button.is-primary.is-small(
        @click.prevent="guardarNuevoLibroCuenta(nuevo_cargo_funcion)"
      ) Guardar Asociacion
</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
  mixins: [InvercolCoreFunctionsMixin],
  name: "asociar-cargo-funcion",
  props: ["cargos", "funciones"],
  data() {
    return {
      apiUrl:environmentConfig.invercolProd.apiUrl,
      nuevo_cargo_funcion: {
        cargo_id: null,
        funcion_id: null
      }
    }
  },
  created() {},
  methods: {
    guardarNuevoLibroCuenta: function(nuevo_cargo_funcion) {
      var formData = new FormData()
      //Conforma objeto paramétrico para solicitud http
      formData.append(`cargo_id`, nuevo_cargo_funcion.cargo_id)
      formData.append(`funcion_id`, nuevo_cargo_funcion.funcion_id)
      this.$http.post(`${environmentConfig.invercolProd.apiUrl}/frontend/cargos_funciones`,formData).then(response => {
        // success callback

        if (response.body.status == 401) {
          return this.seleccionarFormatoNotificacion('warn', 'create', true, {title:'Asociación existente',text:'La función ya ha sido asociada a este cargo'})
        }

        if (response.status == 200 || response.status == 201) {
          console.log(response)
          //this.$parent.obtenerCargos()
          //this.$parent.obtenerFunciones()
          this.seleccionarFormatoNotificacion('success', 'create', true, {})
          this.limpiarNuevoCargoFuncion()
        }

      },
      response => {
        
        return this.seleccionarFormatoNotificacion('error', 'create', true, {title:'Error Desconocido',text:'Error desconocido, contacte con soporte'})
        // error callback
      })
    },
    limpiarNuevoCargoFuncion: function() {
      this.nuevo_cargo_funcion = {
        cargo_id: null,
        funcion_id: null
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