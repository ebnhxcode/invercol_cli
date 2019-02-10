<template lang="pug">
  div
    h6.has-text-centered(style="font-size: .83rem;") Tablero
    //p Seleccione campos para visualizar en la tabla
    .buttons
      button.button.is-small(
        v-for="mInstance in $parent.$data['modelInstance']",
        :class="mInstance.isVisible?'is-primary':'is-light'",
        @click.prevent="$parent.refreshBoard(mInstance)",
        style="font-size: 0.7rem;margin:2px;padding:5px;"
      ) 
        v-icon(name="check", v-show="mInstance.isVisible==true",width="10")
        p &nbsp;{{ mInstance.label }}
    

</template>
<script>
  export default {
    name:'header-board-columns',
    components: {  },
    props:[],
    data() {
      return {
      }
    },
    methods: { }
  }
</script>