export default {
   name: 'advanced-search',
   props: [
      'rate',
      'areas',
      'rateTypes',
      'roomTypes',
      'cities',
      'communes',
      'categories',
      'currencies',
      'localInstanceName',
      'operatorName',

      'environmentConfig',

      'pagination',//mutated
      'isLoading',//mutated
      'rates',//mutated
      'ratesStorage',//mutated
   ],
   data(){
      return {
         advancedSearchForm: { // formulario de busqueda avanzada
            from: '',
            to: '',
            rate_type_id: '',
            room_type_id: '',
            city_id: '',
            commune_id: '',
            area_id: '',
            currency_id: '',
            hotel_name: '',
         },
         isLoadingMutated:false,
         paginationMutated:{ 'per_page':null },
         ratesMutated:{},
      }
   },
   created() {

   },
   watch: {
      isLoadingMutated(isLoadingMutated) {  //console.log(isLoadingMutated)
         this.$emit('update:isLoading', isLoadingMutated)
      },
      paginationMutated(paginationMutated) { //console.log(paginationMutated)
         this.$emit('update:pagination', paginationMutated)
      },
      ratesMutated(ratesMutated) { //console.log(ratesMutated)
         this.$emit('update:rates', ratesMutated)
         this.$emit('update:ratesStorage', ratesMutated)
      },
   },
   
   methods: {
      doAdvancedSearch: function () {

         this.isLoadingMutated = true
         this.paginationMutated = {}

         var formData = new FormData();
         for (let column in this.advancedSearchForm) { //Conforma objeto paramétrico para solicitud http
             if (this.advancedSearchForm[column] !== null) {
               formData.append(column, this.advancedSearchForm[column])
             }
         }
         formData.append('db_operator', this.operatorName);
         this.$http.post(`${this.environmentConfig.distantisPreprod.apiUrl}/api/rates/ratesAdvancedSearch`, formData).then(response => { // success callback
             if (response.status == 200) {
               //console.log(response)
               this.ratesMutated = response.body[this.localInstanceName]['data']
               this.paginationMutated = response.body[this.localInstanceName]
               this.isLoadingMutated = false
             }
         }, response => {});
         
      },
   },
   filters: {

   }
}