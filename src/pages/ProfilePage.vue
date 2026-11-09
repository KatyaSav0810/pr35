<template>
  <div class="page">
    <h1>Профиль пользователя</h1>
    <p>Роль: <strong>{{ authStore.role }}</strong></p>

    <button v-if="authStore.isAdmin" @click="goToAdmin" class="btn-admin">
      Перейти в панель администратора
    </button>

    <button @click="logout" class="btn-danger">Выйти</button>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/login')
}

const goToAdmin = () => {
  router.push('/admin')
}
</script>

<style scoped>
.btn-admin { background: #3b82f6; color: white; padding: 0.7rem 1rem; border: none; border-radius: 4px; cursor: pointer; }
.btn-danger { margin-top: 1rem; padding: 0.7rem 1rem; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer; }
</style>