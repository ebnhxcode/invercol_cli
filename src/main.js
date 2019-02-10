// Se importa la instancia de Vue
import Vue from 'vue'
Vue.config.productionTip = false

// Se importa la App main
import Invercol from '@/Invercol'

// Se importa el Enrutador
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import { routes } from '@/router/routes'
const router = new VueRouter({ 
  routes: routes,
  linkActiveClass: 'is-active',
  mode: 'history',
})

//Libreria para trabajo con fechas
//import moment from 'moment-es6'

//Se importa plugin de Request y Response Http
import VueResource from 'vue-resource'
Vue.use(VueResource)

//Se importa plugin de filtros _ lodash
import { _ , range } from 'lodash'
window._ = require('lodash')

//Se importa plugin de filtros
import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)

//Se importa nuestro bus de eventos
import EventBus from '@/plugins/event-bus'
Vue.use(EventBus)

/*
import verificaRelacion from '@/filters/verificaRelacion'
Vue.use(verificaRelacion)
*/

import checkRelationFilter from '@/filters/checkRelation.js'
Vue.use(checkRelationFilter)

// only import the icons you use to reduce bundle size
import 'vue-awesome/icons/flag'
 
// or import all icons if you don't care about bundle size
import 'vue-awesome/icons'
 
/* Register component with one of 2 methods */
 
import Icon from 'vue-awesome/components/Icon'
 
// globally (in your main .js file)
Vue.component('v-icon', Icon)

//Se importa lib de alertas de sweetalert
//import Swal from 'sweetalert2'
//Vue.use(Swal)

import VModal from 'vue-js-modal'
Vue.use(VModal, {dialog: true})


/* eslint-disable no-new, render de la app */
new Vue({
  el: '#invercol',
  render: h => h(Invercol),
  router: router
})
