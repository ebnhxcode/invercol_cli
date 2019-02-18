import About from '@/components/pages/About/About.vue'
import Home from '@/components/pages/Home/Home.vue'
import Books from '@/components/pages/Books/Books.vue'
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
  { path: '/books', name: 'Books', component: Books },
  { path: '/users', name: 'Usuarios', component: Users }, 
  { path: '/graphs', name: 'Graficos', component: Graphs }, 
  { path: '/reports', name: 'Reportes', component: Reports }, 
  { path: '/monitoring', name: 'Monitoreo y Logs', component: Monitoring }, 
  { path: '/notifications', name: 'Notificaciones', component: Notifications }, 


  { path: '/hotels', name: 'Hotels', component: Hotels },
  { path: '/rates', name: 'Rates', component: Rates },
  { path: '/bookings', name: 'Bookings', component: Bookings },
  { path: '/services', name: 'Services', component: Services },
  
]