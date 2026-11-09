import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import LoginPage from '../pages/LoginPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'
import AdminPage from '../pages/AdminPage.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { requiresAuth: false }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
    meta: { requiresAuth: true, roles: ['user', 'admin'] }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isLoggedIn = authStore.token !== null

  if (to.meta.requiresAuth) {
    if (!isLoggedIn) {
      return next({ name: 'Login', query: { redirect: to.fullPath } })
    }
    if (to.meta.roles && !to.meta.roles.includes(authStore.role)) {
      return next({ name: 'Profile' })
    }
  }

  if (to.name === 'Login' && isLoggedIn) {
    return next({ name: 'Profile' })
  }

  next()
})

export default router