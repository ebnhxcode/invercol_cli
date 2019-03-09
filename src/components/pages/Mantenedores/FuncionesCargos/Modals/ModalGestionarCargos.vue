<template lang="pug">
  modal(
    style="z-index:2000 !importantpadding-top: 20px"
    name="modal-gestionar-cargos"
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
      button.button.is-small.is-danger(style="float:right", @click.prevent="$modal.hide('modal-gestionar-cargos')") ❌
    .section
      h3 Gestión de Cargos
      .content.columns
         .column.is-6
            div.box
               h2 Nueva Función o Cargo
               .field
                  .field
                     label Código
                     input.input.is-fullwidth(type='text', v-model='nuevo_cargo.cargo_codigo')
                  .field
                     label Nombre
                     input.input.is-fullwidth(type='text', v-model='nuevo_cargo.cargo_nombre')
                  .field
                     label Descripción
                     input.input.is-fullwidth(type='text', v-model='nuevo_cargo.cargo_descripcion')

                  .field
                     label Tipo Cargo
                     .select.is-fullwidth
                        select(v-model='nuevo_cargo.tipo_cargo_id')
                           option(value='')
                           option(value='1') RBD
                           option(value='2') AC

               .field.is-grouped
                  button.button.is-primary.is-small(
                     @click.prevent="guardarNuevoCargo(nuevo_cargo)"
                  ) Guardar Función o Cargo

         .column.is-6


</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
  mixins: [InvercolCoreFunctionsMixin],
  name: "modal-gestionar-cargos",
  props: [],
  data() {
    return {
      tabActive: null,
      nuevo_cargo: {
         cargo_codigo:'',
         cargo_nombre:'',
         cargo_descripcion:'',
         tipo_cargo_id:'',
      },

    }
  },
  created() {},
  methods: {
    guardarNuevoCargo: function(nuevo_cargo) {
      var formData = new FormData()
      //Conforma objeto paramétrico para solicitud http
      formData.append(`cargo_codigo`, nuevo_cargo.cargo_codigo || "Null")
      formData.append(`cargo_nombre`, nuevo_cargo.cargo_nombre || "Null")
      formData.append(`cargo_descripcion`,nuevo_cargo.cargo_descripcion || "Null")
      formData.append(`tipo_cargo_id`,nuevo_cargo.tipo_cargo_id || "Null")
      this.$http.post(`${environmentConfig.invercolProd.apiUrl}/frontend/cargos`,formData).then(response => {
        // success callback
        if (response.status == 200 || response.status == 201) {
          console.log(response)
          this.$parent.obtenerCargos()
          this.seleccionarFormatoNotificacion('success', 'create', true, {})
          this.limpiarNuevoCargo()
        }
      },
      response => {
        // error callback
      })
    },

    limpiarNuevoCargo: function () {
      this.nuevo_cargo = {
         cargo_codigo:'',
         cargo_nombre:'',
         cargo_descripcion:'',
         tipo_cargo_id:'',
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