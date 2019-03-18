<template lang="pug">
  div
    h2 Crear Contrato para esta Ficha
    .field
      .field
        label Fecha Inicio Contrato
        input.input(type='date', v-model='nuevo_contrato.contrato_fecha_inicio')

      .field
        label Sueldo Base
        input.input(type='number', max-length="8", v-model='nuevo_contrato.contrato_sueldo_base')
      .field
        label Horas Semanales
        input.input(type='number', max-length="8", v-model='nuevo_contrato.contrato_horas_semanales')
      .field
        label Horas Extras
        input.input(type='number', max-length="8", v-model='nuevo_contrato.contrato_horas_extras')
      .field
        label Bono
        input.input(type='number', max-length="8", v-model='nuevo_contrato.contrato_bono')
      .field
        label Valor Hora
        input.input(type='number', max-length="8", v-model='nuevo_contrato.contrato_valor_hora')

      .field
        label Tipo Contrato
          .select.is-fullwidth
            select(v-model='nuevo_contrato.tipo_contrato_id')
              option(value='')
              option(
                v-for="t in tipo_contratos",
                :value='t.tipo_contrato_id',
              ) {{ t.tipo_contrato_nombre }}

      .field
        label Subvención
          .select.is-fullwidth
            select(v-model='nuevo_contrato.subvencion_id')
              option(value='')
              option(
                v-for="s in subvenciones",
                :value='s.subvencion_id',
              ) {{ s.subvencion_nombre }}

      .field
        label Ficha del Trabajador
        input.input(type='text', :disabled="true", :value='ficha_trabajador.ficha_nombre')


      .field
        label Rbd
        input.input(type='text', :disabled="true", :value='ficha_trabajador.rbd.rbd_nombre')
              
              

    .field.is-grouped
      button.button.is-primary.is-small(
          @click.prevent="guardarNuevoContrato(nuevo_contrato)"
      ) Guardar
</template>
<script>
//import moment from 'moment'

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
  mixins: [InvercolCoreFunctionsMixin],
  name: "crear-contrato",
  props: ["ficha_trabajador","rbds","subvenciones","tipo_contratos","ficha_trabajadores"],
  data() {
    return {
      apiUrl:environmentConfig.invercolProd.apiUrl,
      nuevo_contrato: {
        contrato_fecha_inicio: null,
        contrato_sueldo_base: null,
        contrato_horas_semanales: null,
        contrato_horas_extras: null,
        contrato_bono: null,
        contrato_valor_hora: null,
        //rbd_id: null,
        //subvencion_id: null,
        ficha_trabajador_id: null,
        tipo_contrato_id: null,
      },
    }
  },
  created() {},
  methods: {
    

    guardarNuevoContrato: function(nuevo_contrato) {
      //Conforma objeto paramétrico para guardar en el bknd
      var formData = new FormData()
      formData.append(`contrato_fecha_inicio`,nuevo_contrato.contrato_fecha_inicio)
      formData.append(`contrato_sueldo_base`,nuevo_contrato.contrato_sueldo_base)
      formData.append(`contrato_horas_semanales`,nuevo_contrato.contrato_horas_semanales)
      formData.append(`contrato_horas_extras`,nuevo_contrato.contrato_horas_extras) 
      formData.append(`contrato_bono`,nuevo_contrato.contrato_bono)
      formData.append(`contrato_valor_hora`,nuevo_contrato.contrato_valor_hora)
      formData.append(`subvencion_id`,nuevo_contrato.subvencion_id)
      formData.append(`tipo_contrato_id`,nuevo_contrato.tipo_contrato_id)
      formData.append(`rbd_id`,this.ficha_trabajador.rbd_id)
      formData.append(`ficha_trabajador_id`,this.ficha_trabajador.ficha_trabajador_id)      

      this.$http.post(`${this.apiUrl}/frontend/contratos`,formData).then(response => {
        // success callback
        if (response.status == 200 || response.status == 201) {
          console.log(response)
          //this.$parent.obtenerFichasTrabajadores() // SOON DEPRECATE
          this.seleccionarFormatoNotificacion('success', 'create', true, {})
          this.limpiarNuevoContrato()
        }
        
      },
      response => {
        this.seleccionarFormatoNotificacion('error', 'custom', true, {title:'Error',text:'Error al guardar'})
        // error callback
      })
    },

    limpiarNuevoContrato: function() {
      this.nuevo_contrato = {
        contrato_fecha_inicio: null,
        contrato_sueldo_base: null,
        contrato_horas_semanales: null,
        contrato_horas_extras: null,
        contrato_bono: null,
        contrato_valor_hora: null,
        //rbd_id: null,
        //subvencion_id: null,
        ficha_trabajador_id: null,
        tipo_contrato_id: null,
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