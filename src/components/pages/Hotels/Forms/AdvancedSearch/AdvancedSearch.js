export default {
   name: 'advanced-search',
   props: [
      'hotel',

      'areas',
      //'continents',
      'countries',
      'cities',
      'communes',
      'categories',

      'localInstanceName',
      'operatorName',

      'environmentConfig',

      'pagination',//mutated
      'isLoading',//mutated
      'hotels',//mutated
      'hotelsStorage',//mutated
   ],
   data(){
      return {
         advancedSearchForm: { // formulario de busqueda avanzada
            area_ia: '',
            //continent_id: '',
            country_id: '',
            city_id: '',
            commune_id: '',
            category_id: '',
            hotel_name: '',
         },
         isLoadingMutated:false,
         paginationMutated:{ 'per_page':null },
         hotelsMutated:{},
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
      hotelsMutated(hotelsMutated) { //console.log(hotelsMutated)
         this.$emit('update:hotels', hotelsMutated)
         this.$emit('update:hotelsStorage', hotelsMutated)
      },
   },
   
   methods: {
      hotelsAdvancedSearch: function () {

         this.isLoadingMutated = true
         this.paginationMutated = {}

         var formData = new FormData();
         for (let column in this.advancedSearchForm) { //Conforma objeto paramétrico para solicitud http
             if (this.advancedSearchForm[column] !== null) {
               formData.append(column, this.advancedSearchForm[column])
             }
         }
         formData.append('db_operator', this.operatorName);
         this.$http.post(`${this.environmentConfig.distantisPreprod.apiUrl}/api/hotels/hotelsAdvancedSearch`, formData).then(response => { // success callback
             if (response.status == 200) {
               //console.log(response)
               this.hotelsMutated = response.body[this.localInstanceName]['data']
               this.paginationMutated = response.body[this.localInstanceName]
               this.isLoadingMutated = false
             }
         }, response => {});
         
      },
   },
   filters: {

   }
}