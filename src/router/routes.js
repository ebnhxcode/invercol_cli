import About from '@/components/pages/About/About.vue'
import Home from '@/components/pages/Home/Home.vue'
import Libros from '@/components/pages/Libros/Libros.vue'
import Establecimientos from '@/components/pages/Establecimientos/Establecimientos.vue'
import FichasTrabajadores from '@/components/pages/FichasTrabajadores/FichasTrabajadores.vue'
import Rbd from '@/components/pages/Rbd/Rbd.vue'
import Contratos from '@/components/pages/Contratos/Contratos.vue'
import Remuneraciones from '@/components/pages/Remuneraciones/Remuneraciones.vue'
import Paises from '@/components/pages/Paises/Paises.vue'
import Regiones from '@/components/pages/Regiones/Regiones.vue'
import Comunas from '@/components/pages/Comunas/Comunas.vue'
import Cuentas from '@/components/pages/Cuentas/Cuentas.vue'
import Graficos from '@/components/pages/Graficos/Graficos.vue'
import Reportes from '@/components/pages/Reportes/Reportes.vue'
import Monitoreos from '@/components/pages/Monitoreos/Monitoreos.vue'
import Notificaciones from '@/components/pages/Notificaciones/Notificaciones.vue'


/**
 * Del otro sistema
 */
import Hotels from '@/components/pages/Hotels/Hotels.vue'
import Rates from '@/components/pages/Rates/Rates.vue'
import Bookings from '@/components/pages/Bookings/Bookings.vue'
import Services from '@/components/pages/Services/Services.vue'
import Users from '@/components/pages/Users/Users.vue'

export const routes = [
  { path: '/about', name: 'About', component: About },
  { path: '/', name: 'home', component: Home },
  { path: '/libros', name: 'Libros', component: Libros },
  { path: '/establecimientos', name: 'Establecimientos', component: Establecimientos },
  { path: '/fichastrabajadores', name: 'FichasTrabajadores', component: FichasTrabajadores },
  { path: '/rbd', name: 'Rbd', component: Rbd },
  { path: '/contratos', name: 'Contratos', component: Contratos },
  { path: '/remuneraciones', name: 'Remuneraciones', component: Remuneraciones },
  { path: '/paises', name: 'Paises', component: Paises },
  { path: '/regiones', name: 'Regiones', component: Regiones },
  { path: '/comunas', name: 'Comunas', component: Comunas },
  { path: '/cuentas', name: 'Cuentas', component: Cuentas },
  { path: '/usuarios', name: 'Usuarios', component: Users }, 
  { path: '/graficos', name: 'Graficos', component: Graficos }, 
  { path: '/reportes', name: 'Reportes', component: Reportes }, 
  { path: '/monitoreos', name: 'Monitoreos y Logs', component: Monitoreos }, 
  { path: '/notificaciones', name: 'Notificaciones', component: Notificaciones }, 


  { path: '/hotels', name: 'Hotels', component: Hotels },
  { path: '/rates', name: 'Rates', component: Rates },
  { path: '/bookings', name: 'Bookings', component: Bookings },
  { path: '/services', name: 'Services', component: Services },
  
]