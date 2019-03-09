<template lang="pug">
  modal(
    style="z-index:2000 !importantpadding-top: 20px"
    name="modal-gestionar-cuentas"
    :reset="true"
    :width="'70%'"
    :min-width="320"
    :height="'auto'"
    :min-height="600"
    :adaptive="true"
    :resizable="true"
    :scrollable="true"
    :draggable="false"
  )

    div
      button.button.is-small.is-danger(style="float:right", @click.prevent="$modal.hide('modal-gestionar-cuentas')") ❌
    .section
      h3 Gestión de Cuentas
      .content.columns
        .column.is-6
          div.box
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
                    select(v-model='nueva_cuenta.cuenta_dependencia')
                      option(value='')
                      option(v-for="d in cuenta_dependencias", :value='d.cuenta_dependencia_id') {{ d.cuenta_dependencia_nombre }}

            .field.is-grouped
              button.button.is-primary.is-small(
                  @click.prevent="guardarNuevaCuenta(nueva_cuenta)"
              ) Guardar Cuenta

        .column.is-6
          div.box
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
  name: "modal-gestionar-cuentas",
  props: ["libros", "cuentas","cuenta_dependencias"],
  data() {
    return {
      tabActive: null,
      nueva_cuenta: {
        cuenta_id: null,
        cuenta_codigo: null,
        cuenta_nombre: null,
        cuenta_descripcion: null,
        cuenta_titular: null,
        cuenta_dependencia_id: null
      },
      nueva_cuenta_libro: {
        cuenta_id: null,
        libro_id: null
      }
    }
  },
  created() {},
  methods: {
    guardarNuevaCuenta: function(nueva_cuenta) {
      var formData = new FormData()
      //Conforma objeto paramétrico para solicitud http
      formData.append(`cuenta_id`, nueva_cuenta.cuenta_id || "Null")
      formData.append(`cuenta_codigo`, nueva_cuenta.cuenta_codigo || "Null")
      formData.append(`cuenta_nombre`, nueva_cuenta.cuenta_nombre || "Null")
      formData.append(`cuenta_descripcion`,nueva_cuenta.cuenta_descripcion || "Null")
      formData.append(`cuenta_titular`, nueva_cuenta.cuenta_titular || 1) 
      formData.append(`cuenta_dependencia_id`,nueva_cuenta.cuenta_dependencia_id || 0)
      this.$http.post(`${environmentConfig.invercolProd.apiUrl}/frontend/cuentas`,formData).then(response => {
        // success callback
        if (response.status == 200 || response.status == 201) {
          console.log(response)
          this.$parent.obtenerCuentas()
          this.seleccionarFormatoNotificacion('success', 'create', true, {})
          this.limpiarNuevaCuenta()
        }
      },
      response => {
        // error callback
      })
    },

    guardarNuevoLibroCuenta: function(nueva_cuenta_libro) {
      var formData = new FormData()
      //Conforma objeto paramétrico para solicitud http
      formData.append(`cuenta_id`, nueva_cuenta_libro.cuenta_id)
      formData.append(`libro_id`, nueva_cuenta_libro.libro_id)
      this.$http.post(`${environmentConfig.invercolProd.apiUrl}/frontend/libroscuentas`,formData).then(response => {
        // success callback

        if (response.body.status == 401) {
          return this.seleccionarFormatoNotificacion('warn', 'create', true, {title:'Asociación existente',text:'La cuenta ya ha sido asociada a este libro'})
        }

        if (response.status == 200 || response.status == 201) {
          console.log(response)
          this.$parent.obtenerCuentas()
          this.seleccionarFormatoNotificacion('success', 'create', true, {})
          this.limpiarNuevaCuenta()
        }

      },
      response => {
        
        return this.seleccionarFormatoNotificacion('error', 'create', true, {title:'Error Desconocido',text:'Error desconocido, contacte con soporte'})
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