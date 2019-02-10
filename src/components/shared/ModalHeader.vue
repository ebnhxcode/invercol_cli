<template lang="pug">
   modal(
      style="z-index:2000 !important;"
      name="modal-header"
      :reset="true"
      width="90%"
      :min-width="320"
      :height="'auto'"
      :min-height="600"
      :adaptive="true"
      :resizable="true"
      :scrollable="false"
      :draggable="true"
   )
      button.button.is-small.is-danger(style="float:right;") ❌
      .section
         
         p Crear nuevo
         br
         br
         br
         br
         br
         br
         br
         p Fin
                     
</template>


<script>
export default {
   name: 'modal-header',
   data(){
      return {
         
      }
   }
}
</script>

<style>

</style>
