import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('auth_token') || null,
    role: localStorage.getItem('auth_role') || null,
    user: null 
    email: localStorage.getItem('auth_email') || null  // [ДОБАВЛЕНО]
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.role === 'admin',
    isUser: (state) => state.role === 'user'
  },

  actions: {
    login(credentials) {
      const { username, password } = credentials

      if (username === 'admin' && password === 'admin123') {
        this.token = 'fake-admin-token'
        this.role = 'admin'
        this.email = 'admin@example.com'
      } else if (username === 'user' && password === 'user123') {
        this.token = 'fake-user-token'
        this.role = 'user'
        this.email = 'user@example.com'
      } else {
        throw new Error('Неверный логин или пароль')
      }

      localStorage.setItem('auth_token', this.token)
      localStorage.setItem('auth_role', this.role)
      localStorage.setItem('auth_email', this.email)
    },

    logout() {
      this.token = null
      this.role = null
      this.user = null
      this.email = null
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_role')
      localStorage.removeItem('auth_email')
    },

    validateToken() {
      if (!this.token) {
        return false
      }
      return true
    }
  }
})