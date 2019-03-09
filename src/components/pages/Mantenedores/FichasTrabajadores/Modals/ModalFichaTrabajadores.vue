<template lang="pug">
  modal(
    style="z-index:2000 !importantpadding-top: 20px"
    name="modal-ficha-trabajadores"
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
      button.button.is-small.is-danger(style="float:right", @click.prevent="$modal.hide('modal-ficha-trabajadores')") ❌
    .section
      h3 Ficha Trabajadores
      .content.columns
        .column.is-6
          div.box
            h2 Nueva Ficha de Ingreso
            .field
              .field
                label Rut
                input.input.is-fullwidth(type='text', v-model='nueva_ficha_trabajador.ficha_rut')
              .field
                label Dv
                input.input.is-fullwidth(type='text', v-model='nueva_ficha_trabajador.ficha_dv')
              .field
                label Genero
                .select.is-fullwidth
                  select(v-model='nueva_ficha_trabajador.ficha_genero')
                    option(value='')
                    option(value='H') Hombre
                    option(value='M') Mujer

              .field
                label Nombre
                input.input.is-fullwidth(type='text', v-model='nueva_ficha_trabajador.ficha_nombre')

              .field
                label Apellido Paterno
                input.input.is-fullwidth(type='text', v-model='nueva_ficha_trabajador.ficha_apellido_paterno')

              .field
                label Apellido Materno
                input.input.is-fullwidth(type='text', v-model='nueva_ficha_trabajador.ficha_apellido_materno')

              .field
                label Fecha Nacimiento
                input.input.is-fullwidth(type="date", v-model='nueva_ficha_trabajador.ficha_fecha_nacimiento')

              .field
                label Fecha Ingreso
                input.input.is-fullwidth(type="date", v-model='nueva_ficha_trabajador.ficha_fecha_ingreso')

              .field
                label Cargo
                .select.is-fullwidth
                  select(v-model='nueva_ficha_trabajador.cargo_id')
                    option(value='')
                    option(value='1') Docente Directivo (DOCDIR) -> RBD
                    option(value='2') Docente Aula (DOCAUL) -> RBD
                    option(value='3') Docente Técnico Pedagógico (DOCTEP) -> RBD
                    option(value='4') Asistente Profesional (ASIPRO) -> RBD
                    option(value='5') Asistente Paradocente (ASIPAR) -> RBD
                    option(value='6') Asistente Servicio Auxiliar (ASIAUX) -> RBD
                    option(value='7') Directivo (DIR) -> AC
                    option(value='8') Profesional (PRO) -> AC
                    option(value='9') Técnico-Administrativo (TEC) -> AC

              .field
                label Establecimiento
                .select.is-fullwidth
                  select(v-model='nueva_ficha_trabajador.establecimiento_id')
                    option(value='')
                    option(value='1') Establecimiento Prueba 1
                    option(value='2') Establecimiento Prueba 2

              .field
                label Sueldo Base
                input.input.is-fullwidth(type='text', v-model='nueva_ficha_trabajador.sueldo_base')

              .field
                label Contrato Hrs Semanales
                input.input.is-fullwidth(type='text', v-model='nueva_ficha_trabajador.horas_semanales')

              .field
                label Horas Extra
                input.input.is-fullwidth(type='text', v-model='nueva_ficha_trabajador.horas_extras')
              .field
                label Bono
                input.input.is-fullwidth(type='text', v-model='nueva_ficha_trabajador.bono')
                    

            .field.is-grouped
              button.button.is-primary.is-small(
                  @click.prevent="guardarNuevaFichaTrabajador(nueva_ficha_trabajador)"
              ) Guardar Ficha

        .column.is-6
          div.box
            h2 Lista de Bonos
            .field
              
 
</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
  mixins: [InvercolCoreFunctionsMixin],
  name: "modal-ficha-trabajadores",
  props: [],
  data() {
    return {
      tabActive: null,
      nueva_ficha_trabajador: {
        ficha_rut: null,
        ficha_dv: null,
        ficha_genero: null,
        ficha_nombre: null,
        ficha_apellido_paterno: null,
        ficha_apellido_materno: null,
        ficha_fecha_nacimiento: null,
        ficha_fecha_ingreso: null,
        establecimiento_id: null,
        cargo_id: null,
        sueldo_base: null,
        horas_semanales: null,
        horas_extras: null,
        bono: null,
      },
    }
  },
  created() {},
  methods: {
    guardarNuevaFichaTrabajador: function(nueva_ficha_trabajador) {
      var formData = new FormData()
      //Conforma objeto paramétrico para solicitud http
      formData.append(`ficha_rut`, nueva_ficha_trabajador.ficha_rut || "Null")
      formData.append(`ficha_dv`, nueva_ficha_trabajador.ficha_dv || "Null")
      formData.append(`ficha_genero`, nueva_ficha_trabajador.ficha_genero || "Null")
      formData.append(`ficha_nombre`, nueva_ficha_trabajador.ficha_nombre || "Null")
      formData.append(`ficha_apellido_paterno`, nueva_ficha_trabajador.ficha_apellido_paterno || "Null")
      formData.append(`ficha_apellido_materno`,nueva_ficha_trabajador.ficha_apellido_materno || "Null")
      //formData.append(`ficha_fecha_nacimiento`, nueva_ficha_trabajador.ficha_fecha_nacimiento) 
      //formData.append(`ficha_fecha_ingreso`, nueva_ficha_trabajador.ficha_fecha_ingreso) 
      formData.append(`establecimiento_id`,nueva_ficha_trabajador.establecimiento_id)
      formData.append(`cargo_id`,nueva_ficha_trabajador.cargo_id)
      formData.append(`sueldo_base`,nueva_ficha_trabajador.sueldo_base)
      formData.append(`horas_semanales`,nueva_ficha_trabajador.horas_semanales)
      formData.append(`horas_extras`,nueva_ficha_trabajador.horas_extras)
      formData.append(`bono`,nueva_ficha_trabajador.bono)
      this.$http.post(`${environmentConfig.invercolProd.apiUrl}/frontend/fichas_trabajadores`,formData).then(response => {
        // success callback
        if (response.status == 200 || response.status == 201) {
          console.log(response)
          this.$parent.obtenerFichasTrabajadores()
          this.seleccionarFormatoNotificacion('success', 'create', true)
          this.limpiarNuevaFichaTrabajador()
        }
      },
      response => {
        // error callback
      })
    },

    limpiarNuevaFichaTrabajador: function() {
      this.nueva_ficha_trabajador = {
        ficha_rut: null,
        ficha_dv: null,
        ficha_genero: null,
        ficha_nombre: null,
        ficha_apellido_paterno: null,
        ficha_apellido_materno: null,
        ficha_fecha_nacimiento: null,
        ficha_fecha_ingreso: null,
        establecimiento_id: null
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