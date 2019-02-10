<template lang="pug">
  div
    h6.has-text-centered(style="font-size: .83rem;") Búsqueda avanzada
    //p Haz una búsqueda con datos personalizadas
    .columns
      //.column.is-6
        datepicker(
            placeholder="Rango de fechas",
            :options="{mode: 'range'}",
            v-model="rangoFechas"
          )
        .calendar
          input(type="date")
          (style="max-height: 12rem;overflow-y:auto;")
      .column
        .field.has-addons(
          v-for="m in $parent.$data['modelInstance']",
          v-if="m.isVisible == true"
        )
          //aqui despues segun el tipo de campo, se generará un input para hacer las busquedas segun el tipo de dato con el tipo de input
          //.control          
          input.input.is-light.is-small(
            type="text",
            :placeholder="`${m.label}`"
          )
            
        button.button.is-primary.is-small(
          @click.prevent="doSearchAdvanced()"
        ) Nueva Búsqueda
</template>
<script>
  export default {
    name:'advanced-search',
    components: {  },
    props:[],
    data(){
      return {}
    },
    methods:{
      doSearchAdvanced: function () {

        console.log(this.$parent.$data['modelInstance']);

        /*
        var formData = new FormData();

        for (let i in this.permitido_guardar) {
          if (this.$data[`${this.nombre_model}`][`${this.permitido_guardar[i]}`] !== null) {
              formData.append(`${this.permitido_guardar[i]}`, this.$data[`${this.nombre_model}`][`${this.permitido_guardar[i]}`] || 0);
          }
        }

        this.$http.post(`/${this.nombre_ruta}`, formData).then(response => { // success callback
          if (response.status == 200) {
              if (!this.es_null(response.body[`${this.nombre_model}`])) { // del backend viene el objeto con el nombre
                this.id_en_edicion = null; // se resetea el objeto reactivo de la clase
              }//this.inicializar();
          } else {
              this.checkear_estado_respuesta_http(response.status);
              return false;
          }
          if (this.mostrar_notificaciones(response) == true) {
              this.limpiar_objeto_clase_local();
              this.inicializar();
              this.ocultar_modal('crear');
              return;
          }
        }, response => { // error callback
          this.checkear_estado_respuesta_http(response.status);
        });
        */
      },

    },
  }
</script>