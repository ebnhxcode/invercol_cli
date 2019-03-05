<template lang="pug">
   modal(
      style="z-index:2000 !important;padding-top: 20px;"
      name="modal-rate"
      :reset="true"
      width="85%"
      :min-width="320"
      :height="'auto'"
      :min-height="600"
      :adaptive="true"
      :resizable="true"
      :scrollable="true"
      :draggable="false"
   )
   
      button.button.is-small.is-danger(style="float:right;", @click.prevent="$modal.hide('modal-new-book')") ❌

      div.section
         h3 Crear un nuevo libro:
         .content.columns
            .column.is-4.section(style='padding-right: 0px;')
               .box
                  h4 Nuevo Libro
                  div

                     .field.is-grouped.columns
                        .column
                           label Libro Código
                        .column
                           label Libro Nombre
                        .column
                           label Libro Descripción

                     .field.is-grouped
                        button.button.is-primary.is-small(
                           @click.prevent="saveNewBook()"
                        ) Guardar Cambios

            .column.is-8.section
               div



</template>
<script>
export default {
   name: 'modal-new-book',
   //props: [],
   data(){
      return {
         
      }
   },
   created() {

   },
   methods: {
    saveNewBook: function () {

    }
   }
}
</script>