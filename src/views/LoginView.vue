<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import authBg from '@/assets/images/auth-bg.jpg';
import { useUserStore } from '@/stores/userStore.js';

const router = useRouter();
const userStore = useUserStore();

const showPassword = ref(false);
const email = ref('');
const password = ref('');
const errorMsg = ref('');

async function handleLogin() {
  errorMsg.value = '';
  try {
    await userStore.login(email.value, password.value);
    router.push('/profile');
  } catch (e) {
    errorMsg.value = e;
  }
}
</script>

<template>
  <div class="bg-glow-blob bg-glow-blob-tr"></div>
  <div class="bg-glow-blob bg-glow-blob-bl"></div>

  <nav class="auth-mobile-nav">
    <router-link to="/" class="nav-brand">
      <span class="material-symbols-outlined text-primary" style="font-size:1.75rem;">hub</span>
      PolyMirror
    </router-link>
    <button class="hamburger-btn" aria-label="Menu"><span class="material-symbols-outlined">menu</span></button>
  </nav>

  <div class="mobile-menu">
    <router-link to="/markets" class="mobile-menu-link">Markets</router-link>
    <router-link to="/dashboard" class="mobile-menu-link">Dashboard</router-link>
    <router-link to="/leaderboard" class="mobile-menu-link">Leaderboard</router-link>
    <router-link to="/faq" class="mobile-menu-link">FAQ</router-link>
    <div class="mobile-menu-divider"></div>
    <div class="mobile-menu-actions">
      <router-link to="/register" class="btn btn-secondary">Sign In</router-link>
      <router-link to="/login" class="btn btn-primary">Log In</router-link>
    </div>
  </div>

  <div class="auth-layout">
    <!-- Brand side -->
    <div class="auth-brand-side" style="width:55%;">
      <img :src="authBg" alt="" class="auth-brand-img">
      <div class="auth-brand-content">
        <router-link to="/" class="flex items-center gap-2" style="text-decoration:none;">
          <span class="material-symbols-outlined text-primary" style="font-size:2.25rem;">hub</span>
          <span style="font-family:var(--font-headline);font-size:1.75rem;font-weight:900;letter-spacing:-.02em;text-transform:uppercase;color:var(--primary);">PolyMirror</span>
        </router-link>
        <div style="max-width:28rem;">
          <p class="auth-brand-tagline">PolyMirror</p>
          <h2 class="auth-brand-title">Ready to Predict?</h2>
          <p class="auth-brand-subtitle">Your portfolio is waiting. Sign in to track your positions and compete on the leaderboard.</p>
        </div>
        <div class="stat-group" style="border-top:1px solid rgba(66,71,84,0.3);padding-top:var(--sp-8);opacity:.75;">
          <div class="stat"><span class="stat-label">Market Vol</span><span class="stat-value">$1.2B+</span></div>
          <div class="stat"><span class="stat-label">Active Markets</span><span class="stat-value">867</span></div>
        </div>
      </div>
    </div>

    <!-- Form side -->
    <div class="auth-form-side">
      <div class="auth-form-wrap">
        <h1 class="auth-title">Welcome Back</h1>
        <p class="auth-subtitle">Authenticate to enter the ledger.</p>

        <form style="display:flex;flex-direction:column;gap:var(--sp-6);" @submit.prevent="handleLogin">
          <div v-if="errorMsg" style="color:#ff6b6b;font-size:.85rem;padding:var(--sp-3);border:1px solid rgba(255,107,107,0.3);border-radius:var(--radius-md);">
            {{ errorMsg }}
          </div>
          <div class="form-group">
            <label class="form-label-muted" for="email">Email</label>
            <div class="input-wrapper">
              <span class="material-symbols-outlined">alternate_email</span>
              <input class="form-input has-icon" id="email" v-model="email" type="email" placeholder="nexus@polymirror.io" autocomplete="email" required>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label-muted" for="password">Password</label>
            <div class="input-wrapper">
              <span class="material-symbols-outlined">key</span>
              <input class="form-input has-icon" id="password" v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••••••" autocomplete="current-password" required>
              <button type="button" @click="showPassword = !showPassword" style="position:absolute;right:var(--sp-4);top:50%;transform:translateY(-50%);color:var(--outline);background:none;border:none;cursor:pointer;">
                <span class="material-symbols-outlined">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
              </button>
            </div>
          </div>
          <div class="flex justify-end">
            <a href="#" class="text-label-md text-primary" style="font-weight:600;">Forgot Password?</a>
          </div>
          <button type="submit" class="btn btn-kinetic" :disabled="userStore.loading" style="width:100%;padding:var(--sp-4);font-size:.875rem;border-radius:var(--radius-lg);">
            {{ userStore.loading ? 'Anmelden...' : 'Log In' }}
          </button>
        </form>

        <div class="form-divider">
          <div class="form-divider-line"></div>
          <span class="form-divider-text">External Linkages</span>
          <div class="form-divider-line"></div>
        </div>
        <button class="social-btn" style="width:100%;">
          <span class="material-symbols-outlined" style="font-size:1.25rem;">language</span>
          Google
        </button>

        <p class="auth-footer-text">
          New to the ledger?
          <router-link to="/register" class="form-link" style="margin-left:4px;">register</router-link>
        </p>

        <div class="flex justify-center gap-6" style="margin-top:var(--sp-8);">
          <a href="#" class="text-label-sm text-dim" style="letter-spacing:.15em;text-transform:uppercase;">Privacy Protocol</a>
          <a href="#" class="text-label-sm text-dim" style="letter-spacing:.15em;text-transform:uppercase;">System Terms</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
