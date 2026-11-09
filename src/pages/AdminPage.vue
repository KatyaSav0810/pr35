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

const fetchProtectedData = async () => {
  loading.value = true
  error.value = null

  if (!authStore.validateToken()) {
    error.value = 'Сессия истекла. Пожалуйста, войдите снова.'
    loading.value = false
    return
  }

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      if (response.status === 401) {
        authStore.logout()
        error.value = 'Требуется повторная авторизация.'
      } else {
        error.value = `Ошибка сервера: ${response.status}`
      }
      loading.value = false
      return
    }

    data.value = await response.json()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Произошла ошибка сети'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.admin-data { background: #f3f4f6; padding: 1rem; border-radius: 6px; margin-top: 1rem; }
pre { margin: 0; font-size: 0.9rem; }
.btn-primary { padding: 0.7rem 1rem; background: #0b5cf6; color: white; border: none; border-radius: 4px; cursor: pointer; }
.error-message { color: #c62828; margin-top: 1rem; }
</style>