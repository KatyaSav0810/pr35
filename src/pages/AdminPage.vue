<template>
  <div class="page">
    <h1>Панель администратора</h1>
    <p>Здесь только администраторы.</p>
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="data" class="admin-data">
      <h3>Данные, доступные только админу</h3>
      <pre>{{ data }}</pre>
    </div>
    <div v-else-if="error" class="error-message">{{ error }}</div>

    <button @click="fetchProtectedData" class="btn-primary" :disabled="loading">
      Запросить защищённые данные
    </button>

    <button @click="$router.push('/profile')" style="margin-top:1rem;">Назад в профиль</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const loading = ref(false)
const data = ref(null)
const error = ref(null)

const fetchProtectedData = () => {
  if (!authStore.validateToken()) {
    error.value = 'Токен недействителен'
    return
  }

  loading.value = true
  error.value = null
  data.value = null

  setTimeout(() => {
    data.value = {
      message: 'Секретные данные администратора',
      users: ['admin', 'user'],
      token: authStore.token
    }
    loading.value = false
  }, 1000)
}
</script>

<style scoped>
.page { max-width: 600px; margin: 2rem auto; }
.admin-data { background: #f0f0f0; padding: 1rem; border-radius: 4px; margin: 1rem 0; }
.btn-primary { background: #3b82f6; color: white; padding: 0.7rem 1rem; border: none; border-radius: 4px; cursor: pointer; }
.btn-primary:disabled { background: #ccc; cursor: not-allowed; }
.error-message { color: #c62828; margin: 1rem 0; }
pre { white-space: pre-wrap; word-break: break-word; }
</style>