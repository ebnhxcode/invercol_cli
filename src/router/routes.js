import About from '@/components/pages/About/About.vue'
import Home from '@/components/pages/Home/Home.vue'
import Books from '@/components/pages/Books/Books.vue'
import Establecimientos from '@/components/pages/Establecimientos/Establecimientos.vue'
import Fichas from '@/components/pages/Fichas/Fichas.vue'
import Rbd from '@/components/pages/Rbd/Rbd.vue'
import Contratos from '@/components/pages/Contratos/Contratos.vue'
import Remuneraciones from '@/components/pages/Remuneraciones/Remuneraciones.vue'
import Countries from '@/components/pages/Countries/Countries.vue'
import Regions from '@/components/pages/Regions/Regions.vue'
import Communes from '@/components/pages/Communes/Communes.vue'
import Accounts from '@/components/pages/Accounts/Accounts.vue'
import Graphs from '@/components/pages/Graphs/Graphs.vue'
import Reports from '@/components/pages/Reports/Reports.vue'
import Monitoring from '@/components/pages/Monitoring/Monitoring.vue'
import Notifications from '@/components/pages/Notifications/Notifications.vue'



import Hotels from '@/components/pages/Hotels/Hotels.vue'
import Rates from '@/components/pages/Rates/Rates.vue'
import Bookings from '@/components/pages/Bookings/Bookings.vue'
import Services from '@/components/pages/Services/Services.vue'
import Users from '@/components/pages/Users/Users.vue'

export const routes = [
  { path: '/about', name: 'About', component: About },
  { path: '/', name: 'home', component: Home },
  { path: '/libros', name: 'Books', component: Books },
  { path: '/establecimientos', name: 'Establishments', component: Establecimientos },
  { path: '/fichas', name: 'Fichas', component: Fichas },
  { path: '/rbd', name: 'Rbd', component: Rbd },
  { path: '/contratos', name: 'Contratos', component: Contratos },
  { path: '/remuneraciones', name: 'Remuneraciones', component: Remuneraciones },
  { path: '/paises', name: 'Countries', component: Countries },
  { path: '/regiones', name: 'Regions', component: Regions },
  { path: '/comunas', name: 'Communes', component: Communes },
  { path: '/cuentas', name: 'Accounts', component: Accounts },
  { path: '/usuarios', name: 'Usuarios', component: Users }, 
  { path: '/graficos', name: 'Graficos', component: Graphs }, 
  { path: '/reportes', name: 'Reportes', component: Reports }, 
  { path: '/monitoreo', name: 'Monitoreo y Logs', component: Monitoring }, 
  { path: '/notificaciones', name: 'Notificaciones', component: Notifications }, 


  { path: '/hotels', name: 'Hotels', component: Hotels },
  { path: '/rates', name: 'Rates', component: Rates },
  { path: '/bookings', name: 'Bookings', component: Bookings },
  { path: '/services', name: 'Services', component: Services },
  
]