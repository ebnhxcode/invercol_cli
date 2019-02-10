export const DistantisCoreFunctionsMixin = {
   methods: {

      checkResponseHttpToAlert(statusCode){
        switch (statusCode) {
          case 401:
            swal({
              title: "Atencion",
              text: "Su sesión ha expirado, por favor inicie sesion nuevamente.",
              type: "warning",
              confirmButtonClass: "btn-danger",
              closeOnConfirm: true,
            }, function (isConfirm) {
              if (isConfirm) {
                  window.location.href = '/login';
              }
            });
            break;
  
          case 500:
            swal({
              title: "Atención",
              text: "Se recomienda estar al día, por favor actualice la página.",
              type: "warning",
              confirmButtonClass: "btn-danger",
              closeOnConfirm: true,
            }, function (isConfirm) {
              if (isConfirm) {
                  window.location.href = '/login';
              }
            });
            break;
  
          default :
            swal({
              title: "Atencion",
              text: "Ocurrio un error al procesar el formulario, por favor actualice la página.",
              type: "warning",
              confirmButtonClass: "btn-danger",
              closeOnConfirm: true
            }, function (isConfirm) {
              if (isConfirm) {
                  window.location.href = '/login';
              }
            });
            break;
        }
      },

      deteleTagInTable(textInSearch, text){
         textInSearch.map((arrTexts,index) => {
            if (arrTexts.text == text) {
               textInSearch.splice(index, 1)
            }
         })
         this.filterInTable()
      },
   
       /*
       * Recarga los datos desde local storage y vuelve a procesar solo los filtros que estan activos y que contienen referencias sobre el campo
       */
      filterInTable() {        
         this.$data[this.localInstanceName] = []
         var instanceObjsCombinedResults = []
         for (let arrIndex in this.modelInstance) { 
            if (this.modelInstance[arrIndex].searchTextInField || this.modelInstance[arrIndex].arrayTextsInSearch.length > 0) {
               if (!this.modelInstance[arrIndex].arrayTextsInSearch.includes(this.modelInstance[arrIndex].searchTextInField) && 
                  this.modelInstance[arrIndex].searchTextInField) {
                  this.modelInstance[arrIndex].arrayTextsInSearch.push({text:this.modelInstance[arrIndex].searchTextInField,isRestrictiveFilter:false})
               }
               this.modelInstance[arrIndex].searchTextInField = null
               this.modelInstance[arrIndex].arrayTextsInSearch.map(tag => {
                  instanceObjsCombinedResults.push(this.filterBy(this.$data[`${this.localInstanceName}Storage`], tag['text'], this.modelInstance[arrIndex].field))
               })
            }
         }
   
         instanceObjsCombinedResults.map(arrHoteles => {
            arrHoteles.map(obj => {
               if (this.$data[this.localInstanceName].indexOf(obj) === -1) {
                  this.$data[this.localInstanceName].push(obj)  
               }
            })
         })
   
         if (this.$data[this.localInstanceName].length == 0) {
            this.reloadLocalInstanceObjects()
         }
         
      },
   
   
   
      filterInTableValidatingRestrictions(tag) {
         tag.isRestrictiveFilter=!tag.isRestrictiveFilter
         this.filterInTable()        
         for (let arrIndex in this.modelInstance) { 
           this.modelInstance[arrIndex].arrayTextsInSearch.map(tag => {
             if (tag.isRestrictiveFilter == true) {
               this.$data[this.localInstanceName] = this.filterBy(this.$data[this.localInstanceName], tag.text, this.modelInstance[arrIndex].field)
             }
           })
         }
         /*
         if (this.hoteles.length == 0) {
           this.filterInTable()
         }
         */
      },

      getExcelFieldsJson: function() {
         var fields = {}
         for (let m in this.modelInstance) {
           if (this.modelInstance[m].isVisible == true) {
             fields = Object.assign({}, fields, {
               [this.modelInstance[m].field || "no_existe_campo"]: "String"
             })
           }
         }
         //console.log(fields)
         return fields
      },
      getExcelLabelsJson: function() {
         var labels = {}
         for (let m in this.modelInstance) {
            if (this.modelInstance[m].isVisible == true) {
               labels = Object.assign({}, labels, {
               [this.modelInstance[m].field || "no_existe_campo"]: this.modelInstance[m].label
               })
            }
         }
         //console.log(labels)
         return labels
      },
      getExcelJsonData () {
         var self = this        
         this.excelJsonData = []
         return this.$data[this.localInstanceName].map(function (data, index) {
            let obj = {}
            for (let m in self.localInstance) {
               //p1 : validar si se encuentra activo
               //p2 : empaquetar datos y pushear objeto
               //p3 : validar si tiene relacion
               if (self.localInstance[m].isVisible == true) {
               //preguntar si es un objeto y obtener el nombre de la relacion
               let field
               if (typeof(self.localInstance[m].field) === 'object') {
                  field = self.localInstance[m].field[self.localInstance[m].fieldRelation]
               } else {
                  field = self.localInstance[m].field
               }

               obj = Object.assign({}, obj, {
                  [ field ]:
                  data[self.localInstance[m].field]
               })
               }

            }
            return self.excelJsonData.push(obj)
         })
      },

      instanceTableWithLocalObjects(operator){
         if (!operator) { return }
         //localStorage.clear()
         this.limpiarFiltrosModel()
         this.isLoading = true
   
         this.$http.get(`${this.environmentConfig.distantisPreprod.apiUrl}/${operator}/${this.localInstanceName}`)
         .then(response => { // success callback
            if (response.status = 200) {
            //localStorage.setItem(`${this.localInstanceName}`, JSON.stringify(response.body.hoteles))
            //console.log(response.body)
            
            this.$data[this.localInstanceName] = response.body[this.localInstanceName]['data']
            this.$data[`${this.localInstanceName}Storage`] = response.body[this.localInstanceName]['data']
            this.pagination = response.body[this.localInstanceName] || null

            } else { this.checkResponseHttpToAlert(response.status) }
            this.isLoading = false
         }, response => { /*// error callback //this.checkResponseHttpToAlert(response.status)*/ });
      },


      /*
      * make the order
      * */
      listOrder: function (field) { 
         this.$data[this.localInstanceName] = _.orderBy(this.$data[this.localInstanceName], field, this.orderList)
      },

      /*
      * make the order in relation
      * */
      listOrderRelation: function (field, fieldRelation) { 
         //console.log(this.$data[this.localInstanceName])
         //console.log([field, fieldRelation])
         //this.datos_excel = this.$data[this.localInstanceName] = this.lista_objs_model = _.orderBy(this.lista_objs_model, columna, this.orden_lista); 
         // fieldRelation
         this.$data[this.localInstanceName] = _.orderBy(this.$data[this.localInstanceName], function (obj) {
            if (obj[field]) {
               return obj[field][fieldRelation]
            }
         }, this.orderList)
      },

      limpiarFiltrosModel() {
         for (let arrIndex in this.modelInstance) { 
           this.modelInstance[arrIndex].searchTextInField = '' 
           this.modelInstance[arrIndex].arrayTextsInSearch = []
         }
      },


      navigate (page) {
         this.isLoading = true
         this.$http.get(`${this.environmentConfig.distantisPreprod.apiUrl}/${this.operatorName}/${this.localInstanceName}?page=` + page + '&per_page=' + this.pagination.per_page).then(response => {
            if (response.status == 200) {
            this.$data[this.localInstanceName] = response.body[this.localInstanceName]['data']
            this.$data[`${this.localInstanceName}Storage`] = response.body[this.localInstanceName]['data']
            this.pagination = response.body[this.localInstanceName] || null
            this.isLoading = false
            } else { this.checkResponseHttpToAlert(response.status) }
         }, response => { this.checkResponseHttpToAlert(response.status) })// error callback
      },
   
      navigateCustom () {
         this.isLoading = true
         this.$http.get(`${this.environmentConfig.distantisPreprod.apiUrl}/${this.operatorName}/${this.localInstanceName}?page=` + 1 + '&per_page=' + this.pagination.per_page).then(response => {
            //console.log(response)
            if (response.status == 200) {
            this.$data[this.localInstanceName] = response.body[this.localInstanceName]['data']
            this.$data[`${this.localInstanceName}Storage`] = response.body[this.localInstanceName]['data']
            this.pagination = response.body[this.localInstanceName] || null
            this.isLoading = false
            } else { this.checkResponseHttpToAlert(response.status) }
         }, response => { this.checkResponseHttpToAlert(response.status) })// error callback
      },

      processExcelDataWithObjectsOfLocalInstance: function (instanteObjectsData) {
         var self = this
         var fields = this.getExcelFieldsJson()
         /* el timeout es solo para no influir en la performance mientras se usa el sistema */
         return setTimeout(() => {
            self.excelJsonData = []
            instanteObjectsData.map(function (object, index) {
               let obj = {}
               for (let field in fields) {

               if (typeof(object[field]) == 'object' && object[field]) {
                  let fieldRelation = self.modelInstance[field].fieldRelation
                  obj = Object.assign({}, obj, { [ field ]: object[field][fieldRelation] || '-' })
               } else if (object[field]) {
                  obj = Object.assign({}, obj, { [ field ] : object[field] || '-' })
               } else {
                  obj = Object.assign({}, obj, { [ field ] : '-' })
               }
               }
               return self.excelJsonData.push(obj)          
            })
         }, 1000) //console.log('pasando la data')
      },
      recargarDatos() {
         //this.hoteles = JSON.parse(localStorage.getItem(`${this.localInstanceName}`))
         this.$data[this.localInstanceName] = this.$data[
           `${this.localInstanceName}Storage`
         ]
      },
      reloadLocalInstanceObjects() {
         this.$data[this.localInstanceName] = this.$data[`${this.localInstanceName}Storage`]
      },
      restartTable() {
         //if (JSON.parse(localStorage.getItem(`${this.localInstanceName}`)) === null) { return }
         if (this.$data[`${this.localInstanceName}Storage`].length === 0) {
           return
         }
         this.textPrincipalFilter = null
         this.limpiarFiltrosModel()
         this.reloadLocalInstanceObjects()
      },
      reiniciarTabla() {
         //if (JSON.parse(localStorage.getItem(`${this.localInstanceName}`)) === null) { return }
         if (this.$data[`${this.localInstanceName}Storage`].length === 0) {
           return
         }
         this.textPrincipalFilter = null
         this.limpiarFiltrosModel()
         this.reloadLocalInstanceObjects()
      },

      restartAllTagRestrictions: function () {
         for (let arrIndex in this.modelInstance) { 
           this.modelInstance[arrIndex].arrayTextsInSearch.map( (text) => {
             return text.isRestrictiveFilter = false
           }) 
         }
      },
   
      /*
      * Actualiza opciones del tablero al desmarcar una opcion
      */
      refreshBoard: function (mInstance) {
         mInstance.isVisible = !mInstance.isVisible
         this.listOrder(mInstance.field)
         //this.listOrder('id_hotel')
      },

      switchListOrder: function (model) {
         this.orderList == 'asc' ? this.orderList = 'desc' : this.orderList = 'asc'
         if (model['fieldRelation'] != undefined) {
           this.listOrderRelation(model['field'], model['fieldRelation'])
         } else {
           this.listOrder(model['field'])
         }
      },
   
   }
}