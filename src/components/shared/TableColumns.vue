<template lang="pug">
  div(style="padding-bottom: 20px;")
    //has-text-centered
    h4 Tablero
    p Seleccione campos para visualizar en la tabla
    .buttons
      button.button.is-small(
        v-for="m in modelInstance",
        :class="m.isVisible?'is-primary':'is-light'",
        @click.prevent="changeVisibility(m)",
        style="font-size: 0.7rem;margin:2px;padding:5px;"
      ) 
        v-icon(name="check", v-show="m.isVisible==true",width="10")
        p &nbsp;{{ m.label }}
</template>
<script>
  export default {
    name:'table-columns',
    components: {  },
    props:['modelInstance'],
    data() {
      return {
      }
    },
    methods: { 
      changeVisibility: function (m) {
        m.isVisible = !m.isVisible
      },
    }
  }
</script>