const navigateMixin = {
  methods: {
    /*
      navigate: function () {
        return this.$parent.navigate()
      },
      navigateCustom: function () {
        return $this.$parent.navigateCustom()
      },
      */
    navigate(page) {
      this.$emit("update:isLoading", true)
      this.$http
        .get(
          `${this.configService.apiUrl}/${this.operatorName}/${
            this.localInstance
          }?page=` +
            page +
            "&per_page=" +
            this.paginationInstance.per_page
        )
        .then(
          response => {
            //console.log(response)
            if (response.status == 200) {
              this.$emit("update:isLoading", false)
              console.log('pase')
              //console.log(response.body[`${this.localInstance}`])

              //this.objectsInstance =
              //this.objectsInstanceStorage = response.body[`${this.localInstance}`]
              //this.paginationInstance = response.body.pagination || null
              /*
            this.$emit(`'update:${this.localInstance}'`, response.body[`${this.localInstance}`])
            this.$emit(`'update:${this.localInstance}Storage'`, response.body[`${this.localInstance}`])
            this.$emit('update:pagination', response.body.pagination)
            */
              //console.log(`'${this.localInstance}Storage'`)
              //this.configurar_relaciones(response.body[this.nombre_ruta].data, this.relaciones_clase);
              //this.asignar_recursos(response);
            } else {
              //this.checkear_estado_respuesta_http(response.status);
            }
          },
          response => {
            //this.checkear_estado_respuesta_http(response.status);
          }
        ); // error callback
    },

    navigateCustom() {
      this.$emit("update:isLoading", true)
      this.$http
        .get(
          `${this.configService.apiUrl}/${this.operatorName}/${
            this.localInstance
          }?page=` +
            1 +
            "&per_page=" +
            this.paginationInstance.per_page
        )
        .then(
          response => {
            //console.log(response)
            if (response.status == 200) {
              this.$emit("update:isLoading", false)
              console.log('pase')
              //console.log(response.body[`${this.localInstance}`])

              //this.objectsInstance = response.body[`${this.localInstance}`]
              //this.objectsInstanceStorage = response.body[`${this.localInstance}`]
              //this.paginationInstance = response.body.pagination || null
              /*
            this.$emit(`'update:${this.localInstance}'`, response.body[`${this.localInstance}`])
            this.$emit(`'update:${this.localInstance}Storage'`, response.body[`${this.localInstance}`])
            this.$emit('update:pagination', response.body.pagination)
            */
              //this.configurar_relaciones(response.body[this.nombre_ruta].data, this.relaciones_clase);
              //this.asignar_recursos(response);
              //this.pagination = response.body.pagination || null
            } else {
              //this.checkear_estado_respuesta_http(response.status);
            }
          },
          response => {
            //this.checkear_estado_respuesta_http(response.status);
          }
        ); // error callback
    }
  }
};

export default navigateMixin;
