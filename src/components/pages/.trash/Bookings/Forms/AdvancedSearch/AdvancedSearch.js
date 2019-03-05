export default {
   name: 'advanced-search',
   props: [
      'booking',

      'areas',
      'cities',
      'currencies',
      'tracings',
      'hotelsOperators',
      'hotels',

      'localInstanceName',
      'operatorName',

      'environmentConfig',

      'pagination',//mutated
      'isLoading',//mutated
      'bookings',//mutated
      'bookingsStorage',//mutated
   ],
   data(){
      return {
         advancedSearchForm: { // formulario de busqueda avanzada
            area_id: '',
            country_id: '',
            city_id: '',
            commune_id: '',
            currency_id: '',
            tracing_id: '',
            operator_id: '',
            hotel_id: '',

            booking_id: '',
            file_number: '',
            pax_numbers: '',
            pax_name: '',
            booking_obs: '',

            from: '',
            to: '',
         },
         isLoadingMutated:false,
         paginationMutated:{ 'per_page':null },
         bookingsMutated:{},
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
      bookingsMutated(bookingsMutated) { //console.log(bookingsMutated)
         this.$emit('update:bookings', bookingsMutated)
         this.$emit('update:bookingsStorage', bookingsMutated)
      },
   },
   
   methods: {
      bookingsAdvancedSearch: function () {

         this.isLoadingMutated = true
         this.paginationMutated = {}

         var formData = new FormData();
         for (let column in this.advancedSearchForm) { //Conforma objeto paramétrico para solicitud http
             if (this.advancedSearchForm[column] !== null) {
               formData.append(column, this.advancedSearchForm[column])
             }
         }
         formData.append('db_operator', this.operatorName);
         this.$http.post(`${this.environmentConfig.distantisPreprod.apiUrl}/api/bookings/bookingsAdvancedSearch`, formData).then(response => { // success callback
             if (response.status == 200) {
               //console.log(response)
               this.bookingsMutated = response.body[this.localInstanceName]['data']
               this.paginationMutated = response.body[this.localInstanceName]
               this.isLoadingMutated = false
             }
         }, response => {});
         
      },
   },
   filters: {

   }
}