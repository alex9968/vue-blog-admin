import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Welcome from '../components/Welcome.vue'
import Visitor from '../views/Visitor/index.vue'
import New from '../components/New.vue'
import Articles from '../views/Articles.vue'
import Chat from '../components/Chat.vue'
import Test from '../views/Test.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/visitor', component: Visitor },
      { path: '/new', component: New },
      { path: '/articles', component: Articles },
      { path: '/chat', component: Chat },
      { path: '/test', component: Test }
    ]
  }
]

const router = new VueRouter({
  routes
})
// mount router navgitar
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   const token = window.sessionStorage.getItem('token')
//   if (!token) return next('/login')
//   next()
// })
export default router
