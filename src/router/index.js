import Vue from 'vue'
import VueRouter from 'vue-router'
import { firebaseApp } from '../firebaseDb';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homePage',
    component: () => import('../components/homePage'),
    meta: {
      hideNavbar: true,
     }
  },
  // {
  //   path: '/auth_customer',
  //   name: 'auth_customer',
  //   component: () => import('../components/auth_customer'),
  //   meta: {
  //     hideNavbar: true,
  //    }
  // },
  // {
  //   path: '/login_admin',
  //   name: 'login_admin',
  //   component: () => import('../components/login_admin'),
  //   meta: {
  //     hideNavbar: true,
  //    }
  // },
  {
    path: '/books',
    name: 'books',
    component: () => import('../components/books'),
    meta: { requiresAuth: true },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/register')
  },
  {
    path: '/user_dashboard',
    name: 'user_dashboard',
    component: () => import('../components/user_dashboard'),
    meta: { requiresAuth: true },
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('../components/checkout'),
    meta: { requiresAuth: true },
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebaseApp.auth().currentUser

  if (requiresAuth && !currentUser) {
      next('/')
  } else if (requiresAuth && currentUser) {
      next()
  } else {
      next()
  }
})

export default router