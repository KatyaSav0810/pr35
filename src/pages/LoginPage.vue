<template>
  <div class="page">
    <h1>Вход в систему</h1>
    <form @submit="handleSubmit">
      <div class="form-group">
        <label>Логин</label>
        <input v-model="form.username" type="text" class="form-input" />
      </div>
      <div class="form-group">
        <label>Пароль</label>
        <input v-model="form.password" type="password" class="form-input" />
      </div>
      <p class="hint">
        Демо-учётные записи: admin/admin123, user/user123
      </p>
      <button type="submit" :disabled="isLoading" class="btn-submit">
        {{ isLoading ? 'Вход...' : 'Войти' }}
      </button>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const isLoading = ref(false)
const error = ref(null)

const form = reactive({
  username: '',
  password: ''
})

const handleSubmit = async (e) => {
  e.preventDefault()
  error.value = null
  isLoading.value = true

  try {
    await authStore.login({
      username: form.username.trim(),
      password: form.password.trim()
    })
    const redirect = router.currentRoute.value.query.redirect || '/profile'
    router.push(redirect)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Ошибка входа'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.page { max-width: 400px; margin: 2rem auto; }
.form-group { margin-bottom: 0.8rem; }
.form-input { width: 100%; padding: 0.6rem; border: 1px solid #ccc; border-radius: 4px; }
.btn-submit { margin-top: 1rem; padding: 0.7rem 1rem; background: #42b983; color: white; border: none; border-radius: 4px; cursor: pointer; }
.btn-submit:disabled { background: #ccc; cursor: not-allowed; }
.error-message { color: #c62828; margin-top: 0.5rem; }
.hint { font-size: 0.9rem; color: #666; margin-bottom: 1rem; }
</style>