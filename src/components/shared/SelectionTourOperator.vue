<template lang="pug">
  div
    //* SELECCIÓN DEL TOUROPERADOR *//
    h6.has-text-centered(style="font-size: .83rem;") Seleccione Tour Operador 
    // {{ `: ${$parent.$data['operatorName']}.` | capitalize }}
    .select(:class="$parent.$data['isLoading']?'is-loading':''")
      select(
        v-model="operatorName",
        @change.prevent="listingByOperator()"
      )
        option
        option(
          v-for="operator in tourOperators",
          :value="operator.name"
        ) {{ operator.name | capitalize }}
</template>
<script>
  /*
  * Import de componentes y clases
  */
  import { tourOperators } from '@/models/TourOperator'
  import Spinner from '@/components/shared/Spinner.vue'

  export default {
    components: { Spinner },
    name: "selection-tour-operator",
    props: [],
    data () {
      return {
        tourOperators: tourOperators,
        operatorName:'distantis',
      }
    },
    methods: {
      listingByOperator: function () {
        this.$parent.$data['operatorName'] = this.operatorName
        this.$parent.instanceTableWithLocalObjects(this.operatorName)
      },
    },
  }
</script>
