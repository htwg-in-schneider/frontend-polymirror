<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import { useMarketStore } from '@/stores/marketStore.js';
import { useUserStore } from '@/stores/userStore.js';

const router = useRouter();
const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
const marketStore = useMarketStore();
const userStore = useUserStore();
const mobileOpen = ref(false);
const searchInput = ref('');

function submitSearch() {
  const q = searchInput.value.trim();
  marketStore.setSearch(q);
  if (router.currentRoute.value.path !== '/markets') {
    router.push('/markets');
  }
}

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value;
}

function closeMobile() {
  mobileOpen.value = false;
}

function handleLogin() {
  loginWithRedirect();
}

function handleSignup() {
  loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } });
}

function handleLogout() {
  mobileOpen.value = false;
  logout({ logoutParams: { returnTo: window.location.origin + import.meta.env.BASE_URL } });
}
</script>

<template>
  <nav class="top-nav">
    <div class="flex items-center gap-8">
      <router-link to="/" class="nav-brand" @click="closeMobile">
        <span class="material-symbols-outlined text-primary" style="font-size:1.75rem;">hub</span>
        PolyMirror
      </router-link>
      <nav class="nav-links">
        <router-link to="/markets" class="nav-link">Markets</router-link>
        <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        <router-link to="/leaderboard" class="nav-link">Leaderboard</router-link>
        <router-link to="/faq" class="nav-link">FAQ</router-link>
        <router-link v-if="userStore.isAdmin" to="/admin" class="nav-link" style="color:var(--primary);">Admin</router-link>
      </nav>
    </div>
    <div class="nav-actions">
      <div class="search-wrap hide-on-mobile">
        <span class="material-symbols-outlined">search</span>
        <input v-model="searchInput" class="search-input" type="text" placeholder="Search markets..." @keydown.enter="submitSearch">
      </div>
      <template v-if="isAuthenticated">
        <router-link to="/dashboard" class="nav-balance" style="text-decoration:none;">
          <span class="nav-balance-label">Available</span>
          <span class="nav-balance-value">{{ userStore.currentUser?.balance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00' }} Poly</span>
        </router-link>
        <router-link to="/profile" class="btn btn-ghost btn-sm" style="display:flex;align-items:center;gap:var(--sp-2);">
          <span class="material-symbols-outlined" style="font-size:1.1rem;">account_circle</span>
          <span class="hide-on-mobile">Profile</span>
        </router-link>
        <button class="btn btn-ghost btn-sm" @click="handleLogout">Logout</button>
      </template>
      <template v-else>
        <button class="btn btn-ghost btn-sm" @click="handleSignup">Sign Up</button>
        <button class="btn btn-primary" @click="handleLogin">Log In</button>
      </template>
      <button class="nav-search-icon" aria-label="Search" @click="submitSearch">
        <span class="material-symbols-outlined">search</span>
      </button>
      <button class="hamburger-btn" aria-label="Menu" @click="toggleMobile">
        <span class="material-symbols-outlined">{{ mobileOpen ? 'close' : 'menu' }}</span>
      </button>
    </div>
  </nav>

  <div class="mobile-menu" :class="{ open: mobileOpen }">
    <router-link to="/markets" class="mobile-menu-link" @click="closeMobile">Markets</router-link>
    <router-link to="/dashboard" class="mobile-menu-link" @click="closeMobile">Dashboard</router-link>
    <router-link to="/leaderboard" class="mobile-menu-link" @click="closeMobile">Leaderboard</router-link>
    <router-link to="/faq" class="mobile-menu-link" @click="closeMobile">FAQ</router-link>
    <router-link v-if="userStore.isAdmin" to="/admin" class="mobile-menu-link" style="color:var(--primary);" @click="closeMobile">Admin</router-link>
    <div class="mobile-menu-divider"></div>
    <div class="mobile-menu-actions">
      <template v-if="isAuthenticated">
        <router-link to="/profile" class="btn btn-secondary" @click="closeMobile">Profile</router-link>
        <button class="btn btn-primary" @click="handleLogout">Logout</button>
      </template>
      <template v-else>
        <button class="btn btn-secondary" @click="handleSignup">Sign Up</button>
        <button class="btn btn-primary" @click="handleLogin">Log In</button>
      </template>
    </div>
  </div>
</template>
