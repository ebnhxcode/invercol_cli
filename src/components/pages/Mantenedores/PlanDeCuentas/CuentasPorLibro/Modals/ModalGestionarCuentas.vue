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
      h1 Gestión de Cuentas
      .content.columns
        .column.is-6
          actualizar-cuenta(
            :cuenta_dependencias="cuenta_dependencias",
            :cuenta="cuenta"
          )

        .column.is-6
          mantener-cuenta-libro(
            :cuenta="cuenta"
          )
          

</template>
<script>
//import moment from 'moment'

import ActualizarCuenta from "@/components/pages/Mantenedores/PlanDeCuentas/CuentasPorLibro/Forms/ActualizarCuenta.vue"
import MantenerCuentaLibro from "@/components/pages/Mantenedores/PlanDeCuentas/CuentasPorLibro/Forms/MantenerCuentaLibro.vue"

import { InvercolCoreFunctionsMixin } from '@/mixins/InvercolCoreFunctions.js'
import { environmentConfig } from "@/services/environments/environment-config"

export default {
  mixins: [InvercolCoreFunctionsMixin],
  name: "modal-gestionar-cuentas",
  components:{
    ActualizarCuenta,
    MantenerCuentaLibro
  },
  props: ['cuenta_dependencias','cuenta'],
  data() {
    return {

    }
  },
  created() {},
  methods: {
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