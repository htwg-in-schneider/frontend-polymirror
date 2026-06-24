<script setup>
import { onMounted } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';

const { loginWithRedirect, isAuthenticated } = useAuth0();

onMounted(() => {
  if (!isAuthenticated.value) {
    loginWithRedirect();
  }
});
</script>

<template>
  <main style="padding-top:var(--nav-height);min-height:100vh;display:flex;align-items:center;justify-content:center;">
    <p style="color:var(--on-surface-variant);font-size:.9375rem;">Redirecting to login...</p>
  </main>
</template>
