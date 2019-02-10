import About from '@/components/pages/About/About.vue'
import Home from '@/components/pages/Home/Home.vue'
import Hotels from '@/components/pages/Hotels/Hotels.vue'
import Rates from '@/components/pages/Rates/Rates.vue'
import Bookings from '@/components/pages/Bookings/Bookings.vue'
import Services from '@/components/pages/Services/Services.vue'
import Users from '@/components/pages/Users/Users.vue'

export const routes = [
  { path: '/about', name: 'About', component: About },
  { path: '/', name: 'home', component: Home },
  { path: '/hotels', name: 'Hotels', component: Hotels },
  { path: '/rates', name: 'Rates', component: Rates },
  { path: '/bookings', name: 'Bookings', component: Bookings },
  { path: '/services', name: 'Services', component: Services },
  { path: '/users', name: 'Users', component: Users }, 
]