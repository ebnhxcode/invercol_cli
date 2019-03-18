/**
 * Home
 */
import Home from '@/components/pages/Home/Home.vue'
/**
 * Mantenedores
*/
import FichasTrabajadores from '@/components/pages/Mantenedores/FichasTrabajadores/FichasTrabajadores.vue'
import Funciones from '@/components/pages/Mantenedores/Funciones/Funciones.vue'
import Cargos from '@/components/pages/Mantenedores/Cargos/Cargos.vue'
import Contratos from '@/components/pages/Mantenedores/Contratos/Contratos.vue'
import Establecimientos from '@/components/pages/Mantenedores/Establecimientos/Establecimientos.vue'
import Rbds from '@/components/pages/Mantenedores/Rbds/Rbds.vue'
import Libros from '@/components/pages/Mantenedores/Libros/Libros.vue'
import Paises from '@/components/pages/Mantenedores/Paises/Paises.vue'
import Regiones from '@/components/pages/Mantenedores/Regiones/Regiones.vue'
import Comunas from '@/components/pages/Mantenedores/Comunas/Comunas.vue'
import Usuarios from '@/components/pages/Mantenedores/Usuarios/Usuarios.vue'
  /**
   * Plan de Cuentas - Sub Menu de Mantenedores
  */
  import Cuentas from '@/components/pages/Mantenedores/PlanDeCuentas/Cuentas/Cuentas.vue'
  import Subvenciones from '@/components/pages/Mantenedores/PlanDeCuentas/Subvenciones/Subvenciones.vue'
/**
 * Perfil de Usuarios
 */
import PerfilUsuario from '@/components/pages/PerfilDeUsuarios/PerfilUsuario/PerfilUsuario.vue'
import Notificaciones from '@/components/pages/PerfilDeUsuarios/Notificaciones/Notificaciones.vue'
import RbdUsuarios from '@/components/pages/PerfilDeUsuarios/RbdUsuarios/RbdUsuarios.vue'
/**
 * Libros
 */
import Remuneraciones from '@/components/pages/Libros/Remuneraciones/Remuneraciones.vue'
import OtrosIngresos from '@/components/pages/Libros/OtrosIngresos/OtrosIngresos.vue'
import Honorarios from '@/components/pages/Libros/Honorarios/Honorarios.vue'
import Compras from '@/components/pages/Libros/Compras/Compras.vue'
import Ficom from '@/components/pages/Libros/Ficom/Ficom.vue'
/**
 * Reportería
 */
import Graficos from '@/components/pages/Reporteria/Graficos/Graficos.vue'
import Reportes from '@/components/pages/Reporteria/Reportes/Reportes.vue'
import Monitoreos from '@/components/pages/Reporteria/Monitoreos/Monitoreos.vue'

/**
 * Del otro sistema
 */
//import Hotels from '@/components/pages/Hotels/Hotels.vue'
//import Rates from '@/components/pages/Rates/Rates.vue'
//import Bookings from '@/components/pages/Bookings/Bookings.vue'
//import Services from '@/components/pages/Services/Services.vue'
//import Users from '@/components/pages/Users/Users.vue'
//import About from '@/components/pages/About/About.vue'

export const routes = [
  /* Rutas Home */
  { path: '/', name: 'home', component: Home },
  //{ path: '/home', name: 'home', component: Home },
  /* Rutas Mantenedores */
  { path: '/mantenedores/fichastrabajadores', name: 'FichasTrabajadores', component: FichasTrabajadores },
  { path: '/mantenedores/funciones', name: 'Funciones', component: Funciones },
  { path: '/mantenedores/cargos', name: 'Cargos', component: Cargos },
  { path: '/mantenedores/contratos', name: 'Contratos', component: Contratos },
  { path: '/mantenedores/establecimientos', name: 'Establecimientos', component: Establecimientos },
  { path: '/mantenedores/rbds', name: 'Rbds', component: Rbds },
  { path: '/mantenedores/libros', name: 'Libros', component: Libros },
  { path: '/mantenedores/paises', name: 'Paises', component: Paises },
  { path: '/mantenedores/regiones', name: 'Regiones', component: Regiones },
  { path: '/mantenedores/comunas', name: 'Comunas', component: Comunas },
  { path: '/mantenedores/usuarios', name: 'Usuarios', component: Usuarios },
    /* Rutas Plan de Cuentas - Sub de Mantenedores */
    { path: '/mantenedores/plandecuentas/cuentas', name: 'Cuentas', component: Cuentas },
    { path: '/mantenedores/plandecuentas/subvenciones', name: 'Subvenciones', component: Subvenciones },
  /* Rutas Perfil de Usuarios */
  { path: '/perfildeusuarios/notificaciones', name: 'Notificaciones', component: Notificaciones },
  { path: '/perfildeusuarios/perfilusuario', name: 'PerfilUsuario', component: PerfilUsuario },
  { path: '/perfildeusuarios/rbdusuarios', name: 'RbdUsuarios', component: RbdUsuarios },
  /* Rutas Libros */
  { path: '/libros/remuneraciones', name: 'remuneraciones', component: Remuneraciones },
  { path: '/libros/otrosingresos', name: 'OtrosIngresos', component: OtrosIngresos },
  { path: '/libros/honorarios', name: 'Honorarios', component: Honorarios },
  { path: '/libros/compras', name: 'Comras', component: Compras },
  { path: '/libros/ficom', name: 'Ficom', component: Ficom },
  /* Rutas Reporteria */
  { path: '/reporteria/graficos', name: 'Graficos', component: Graficos }, 
  { path: '/reporteria/reportes', name: 'Reportes', component: Reportes }, 
  { path: '/reporteria/monitoreos', name: 'Monitoreos y Logs', component: Monitoreos }, 
  //{ path: '/hotels', name: 'Hotels', component: Hotels },
  //{ path: '/rates', name: 'Rates', component: Rates },
  //{ path: '/bookings', name: 'Bookings', component: Bookings },
  //{ path: '/services', name: 'Services', component: Services },
  //{ path: '/about', name: 'About', component: About },
]