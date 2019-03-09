<template lang="pug">
  modal(
    style="z-index:2000 !importantpadding-top: 20px"
    name="modal-gestionar-libros"
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
      button.button.is-small.is-danger(style="float:right", @click.prevent="$modal.hide('modal-gestionar-libros')") ❌
    .section
      h3 Gestión de Libros
      .content.columns

         .column.is-6
            div.box
              h2 Nuevo Libro
              .field
                .field
                    label Libro Código
                    input.input.is-fullwidth(type='text', v-model='nuevo_libro.libro_codigo')
                .field
                    label Libro Nombre
                    input.input.is-fullwidth(type='text', v-model='nuevo_libro.libro_nombre')
                .field
                    label Libro Descripción
                    input.textarea.is-fullwidth(v-model='nuevo_libro.libro_descripcion', rows="1")

              .field.is-grouped
                button.button.is-primary.is-small(
                    @click.prevent="guardarNuevoLibro(nuevo_libro)"
                ) Guardar Libro

         .column.is-6
            div.box
              h2 Asociar Libro a Cuenta
              .field
                .field
                  label Seleccione Libro
                  .select.is-fullwidth
                    select(v-model='nuevo_libro_cuenta.libro_id')
                      option(value='')
                      option(v-for='l in libros', :value='l.libro_id') {{ l.libro_nombre }}

                .field
                  label Seleccione Cuenta
                  .select.is-fullwidth
                    select(v-model='nuevo_libro_cuenta.cuenta_id')
                      option(value='')
                      option(v-for='c in cuentas', :value='c.cuenta_id') {{ `${c.cuenta_id} - ${c.cuenta_nombre}` }}

              .field.is-grouped
                button.button.is-primary.is-small(
                    @click.prevent="guardarNuevoLibroCuenta(nuevo_libro_cuenta)"
                ) Guardar Asociacion


</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
  mixins: [InvercolCoreFunctionsMixin],
  name: "modal-gestionar-libros",
  props: ["libros", "cuentas"],
  data() {
    return {
      tabActive: null,
      nuevo_libro: {
         libro_id:'',
         libro_codigo:'',
         libro_nombre:'',
         libro_descripcion:'',
      },
      nuevo_libro_cuenta: {
        cuenta_id: null,
        libro_id: null
      }
    }
  },
  created() {},
  methods: {
    guardarNuevoLibro: function(nuevo_libro) {
      var formData = new FormData()
      //Conforma objeto paramétrico para solicitud http
      formData.append(`libro_codigo`, nuevo_libro.libro_codigo || "Null")
      formData.append(`libro_nombre`, nuevo_libro.libro_nombre || "Null")
      formData.append(`libro_descripcion`,nuevo_libro.libro_descripcion || "Null")
      this.$http.post(`${environmentConfig.invercolProd.apiUrl}/frontend/libros`,formData).then(response => {
        // success callback
        if (response.status == 200 || response.status == 201) {
          console.log(response)
          this.$parent.obtenerLibros()
          this.seleccionarFormatoNotificacion('success', 'create', true, {})
          this.limpiarNuevoLibro()
        }
      },
      response => {
        // error callback
      })
    },

    guardarNuevoLibroCuenta: function(nuevo_libro_cuenta) {
      var formData = new FormData()
      //Conforma objeto paramétrico para solicitud http
      formData.append(`cuenta_id`, nuevo_libro_cuenta.cuenta_id)
      formData.append(`libro_id`, nuevo_libro_cuenta.libro_id)
      this.$http.post(`${environmentConfig.invercolProd.apiUrl}/frontend/libroscuentas`,formData).then(response => {
        // success callback

        if (response.body.status == 401) {
          return this.seleccionarFormatoNotificacion('warn', 'create', true, {title:'Asociación existente',text:'La cuenta ya ha sido asociada a este libro'})
        }

        if (response.status == 200 || response.status == 201) {
          console.log(response)
          this.$parent.obtenerCuentas()
          this.seleccionarFormatoNotificacion('success', 'create', true, {})
          this.limpiarNuevoLibro()
        }

      },
      response => {
        
        return this.seleccionarFormatoNotificacion('error', 'create', true, {title:'Error Desconocido',text:'Error desconocido, contacte con soporte'})
        // error callback
      })
    },
    limpiarNuevoLibro: function () {
      this.nuevo_libro = {
        libro_codigo:'',
        libro_nombre:'',
        libro_descripcion:'',
      }
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