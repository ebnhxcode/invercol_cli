import moment from 'moment'

export default {
   name: 'modal-rate',
   props: [
      'rate',
      'areas',
      'rateTypes',
      'roomTypes',
      'cities',
      'communes',
      'categories',
      'currencies'
   ],
   data(){
      return {
         tabActive:null,
      }
   },
   created() {

   },
   methods: {
      updateRate: function () {
         console.log(this.rate)


      },
   },
   filters: {
      formatDateDesde: function (date) {
         return moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY')
      },
      formatDateHasta: function (date) {
         return moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY')
      },
   }
}