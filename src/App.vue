<template>
  <header style="padding: 1rem 0; border-bottom: 1px solid #eee; margin-bottom: 1.5rem;">
    <span v-if="authStore.isAuthenticated">
      Авторизован как <strong>{{ authStore.role }}</strong> |
      <RouterLink to="/profile" style="margin-left: 0.5rem;">Профиль</RouterLink>
    </span>
    <span v-else>
      <RouterLink to="/login">Войти</RouterLink>
    </span>
  </header>
  <RouterView />
</template>

<script setup>
import { useAuthStore } from './stores/auth'
const authStore = useAuthStore()
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background: #f5f5f5;
}
</style>