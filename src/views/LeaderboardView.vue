<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore.js';
import axios from 'axios';
import { API_BASE } from '@/config.js';

const userStore = useUserStore();
const leaderboard = ref([]);
const loading = ref(true);
const error = ref(null);

const totalPlayers = computed(() => leaderboard.value.length);
const totalVolume = computed(() => {
  const sum = leaderboard.value.reduce((acc, e) => acc + (e.totalInvested || 0), 0);
  if (sum >= 1_000_000) return (sum / 1_000_000).toFixed(1) + 'M';
  if (sum >= 1_000) return (sum / 1_000).toFixed(0) + 'K';
  return sum.toFixed(0);
});
const totalTrades = computed(() => leaderboard.value.reduce((acc, e) => acc + (e.tradeCount || 0), 0));

const currentUserId = computed(() => userStore.currentUser?.id);

const myEntry = computed(() => {
  if (!currentUserId.value) return null;
  return leaderboard.value.find(e => e.userId === currentUserId.value) || null;
});

function initials(name) {
  if (!name) return '??';
  return name.slice(0, 2).toUpperCase();
}

function formatProfit(val) {
  const abs = Math.abs(val).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  return val >= 0 ? '+' + abs : '-' + abs;
}

function rankClass(rank) {
  if (rank === 1) return 'leaderboard-rank-1';
  if (rank === 2) return 'leaderboard-rank-2';
  if (rank === 3) return 'leaderboard-rank-3';
  return 'leaderboard-rank-other';
}

function rowStyle(rank, isMe) {
  if (isMe) return 'border:1px solid rgba(208,188,255,0.2);background:rgba(160,120,255,0.06);';
  if (rank === 1) return 'border:1px solid rgba(255,215,0,0.15);background:rgba(255,215,0,0.04);';
  if (rank === 2) return 'border:1px solid rgba(192,192,192,0.1);background:rgba(192,192,192,0.03);';
  if (rank === 3) return 'border:1px solid rgba(205,127,50,0.1);';
  return '';
}

function stickyBg(rank, isMe) {
  if (isMe) return 'background:color-mix(in srgb,var(--surface-low),rgba(160,120,255,0.1));';
  if (rank === 1) return 'background:color-mix(in srgb,var(--surface-low),rgba(255,215,0,0.07));';
  return '';
}

onMounted(async () => {
  try {
    const { data } = await axios.get(`${API_BASE}/leaderboard`);
    leaderboard.value = data;
  } catch (e) {
    error.value = 'Failed to load leaderboard.';
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <main class="page-with-sidebar app-main" style="padding-bottom:var(--sp-24);">

    <!-- Header -->
    <div style="background:linear-gradient(180deg,var(--surface-base) 0%,var(--surface) 100%);padding:var(--sp-16) var(--sp-6) var(--sp-12);text-align:center;position:relative;overflow:hidden;">
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:30rem;height:30rem;background:rgba(173,198,255,0.06);border-radius:50%;filter:blur(5rem);pointer-events:none;"></div>
      <div style="position:relative;z-index:1;">
        <p class="section-eyebrow" style="text-align:center;margin-bottom:var(--sp-4);">Global Rankings</p>
        <h1 style="font-family:var(--font-headline);font-size:clamp(2.5rem,5vw,4rem);font-weight:900;letter-spacing:-.02em;color:var(--primary);text-shadow:0 0 5px rgba(173,198,255,0.2);margin-bottom:var(--sp-4);">Leaderboard</h1>
        <p class="text-muted" style="font-size:1rem;max-width:28rem;margin-inline:auto;">Top prediction traders ranked by total profit.</p>
      </div>
    </div>

    <!-- Stats -->
    <div class="container" style="margin-bottom:var(--sp-12);">
      <div class="season-stats-grid" style="background:var(--surface-low);border-radius:var(--radius-xl);padding:var(--sp-6);border:1px solid rgba(255,255,255,0.04);">
        <div class="text-center">
          <p class="stat-label" style="text-align:center;margin-bottom:var(--sp-2);">Total Players</p>
          <p style="font-family:var(--font-headline);font-size:1.75rem;font-weight:900;color:var(--on-surface);">{{ totalPlayers.toLocaleString() }}</p>
        </div>
        <div class="text-center">
          <p class="stat-label" style="text-align:center;margin-bottom:var(--sp-2);">Total Volume</p>
          <p style="font-family:var(--font-headline);font-size:1.75rem;font-weight:900;color:var(--on-surface);">{{ totalVolume }} Poly</p>
        </div>
        <div class="text-center">
          <p class="stat-label" style="text-align:center;margin-bottom:var(--sp-2);">Total Trades</p>
          <p style="font-family:var(--font-headline);font-size:1.75rem;font-weight:900;color:var(--primary);">{{ totalTrades.toLocaleString() }}</p>
        </div>
      </div>
    </div>

    <!-- Loading / Error -->
    <div v-if="loading" style="text-align:center;padding:var(--sp-16);color:var(--on-surface-variant);">
      <span class="material-symbols-outlined" style="font-size:2rem;animation:spin 1s linear infinite;">refresh</span>
      <p style="margin-top:var(--sp-4);">Loading leaderboard...</p>
    </div>
    <div v-else-if="error" style="text-align:center;padding:var(--sp-16);color:var(--error);">{{ error }}</div>

    <!-- Leaderboard Table -->
    <div v-else class="container">

      <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
      <div style="min-width:42rem;">

      <!-- Header row -->
      <div style="display:grid;grid-template-columns:50px minmax(0,1fr) 120px 100px 100px;column-gap:var(--sp-4);padding:var(--sp-2) var(--sp-6);margin-bottom:var(--sp-2);">
        <span class="text-label-sm text-dim uppercase tracking-widest">#</span>
        <span class="text-label-sm text-dim uppercase tracking-widest">Player</span>
        <span class="text-label-sm text-dim uppercase tracking-widest" style="text-align:center;">Total Profit</span>
        <span class="text-label-sm text-dim uppercase tracking-widest" style="text-align:center;">Invested</span>
        <span class="text-label-sm text-dim uppercase tracking-widest" style="text-align:center;">Trades</span>
      </div>

      <div style="display:flex;flex-direction:column;gap:var(--sp-3);">
        <div
          v-for="entry in leaderboard"
          :key="entry.userId"
          class="leaderboard-row"
          :style="rowStyle(entry.rank, entry.userId === currentUserId)"
        >
          <div class="leaderboard-player-sticky" :style="stickyBg(entry.rank, entry.userId === currentUserId)">
            <span :class="['leaderboard-rank', rankClass(entry.rank)]" :style="entry.userId === currentUserId ? 'color:var(--tertiary);font-size:1rem;' : ''">{{ entry.rank }}</span>
            <div class="leaderboard-avatar" :style="entry.userId === currentUserId ? 'border-color:rgba(208,188,255,0.4);' : ''">
              <img v-if="entry.avatarUrl" :src="entry.avatarUrl" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" />
              <span v-else class="leaderboard-avatar-text" :style="entry.userId === currentUserId ? 'color:var(--tertiary);' : ''">{{ initials(entry.username) }}</span>
            </div>
            <div class="leaderboard-info">
              <p class="leaderboard-name" :style="entry.userId === currentUserId ? 'color:var(--tertiary);' : ''">
                <template v-if="entry.userId === currentUserId">YOU · </template>{{ entry.username }}
              </p>
              <p class="leaderboard-handle">Balance: {{ (entry.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }} Poly</p>
            </div>
          </div>
          <div class="lb-stat-cell">
            <p :class="['leaderboard-stat-value', entry.profit >= 0 ? 'positive' : 'negative']">{{ formatProfit(entry.profit) }} Poly</p>
            <p class="leaderboard-stat-label">Profit</p>
          </div>
          <div class="lb-stat-cell">
            <p class="leaderboard-stat-value">{{ (entry.totalInvested || 0).toLocaleString('en-US', { maximumFractionDigits: 0 }) }}</p>
            <p class="leaderboard-stat-label">Invested</p>
          </div>
          <div class="lb-stat-cell">
            <p class="leaderboard-stat-value">{{ entry.tradeCount }}</p>
            <p class="leaderboard-stat-label">Trades</p>
          </div>
        </div>

        <!-- Current user highlight if not in top list (scrolled past) -->
        <template v-if="myEntry && myEntry.rank > leaderboard.length">
          <div class="leaderboard-row" style="border:1px solid rgba(208,188,255,0.2);background:rgba(160,120,255,0.06);">
            <div class="leaderboard-player-sticky" style="background:color-mix(in srgb,var(--surface-low),rgba(160,120,255,0.1));">
              <span class="leaderboard-rank" style="color:var(--tertiary);font-size:1rem;">{{ myEntry.rank }}</span>
              <div class="leaderboard-avatar" style="border-color:rgba(208,188,255,0.4);"><span class="leaderboard-avatar-text" style="color:var(--tertiary);">{{ initials(myEntry.username) }}</span></div>
              <div class="leaderboard-info">
                <p class="leaderboard-name" style="color:var(--tertiary);">YOU · {{ myEntry.username }}</p>
                <p class="leaderboard-handle">Balance: {{ (myEntry.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }} Poly</p>
              </div>
            </div>
            <div class="lb-stat-cell"><p :class="['leaderboard-stat-value', myEntry.profit >= 0 ? 'positive' : 'negative']">{{ formatProfit(myEntry.profit) }} Poly</p><p class="leaderboard-stat-label">Profit</p></div>
            <div class="lb-stat-cell"><p class="leaderboard-stat-value">{{ (myEntry.totalInvested || 0).toLocaleString('en-US', { maximumFractionDigits: 0 }) }}</p><p class="leaderboard-stat-label">Invested</p></div>
            <div class="lb-stat-cell"><p class="leaderboard-stat-value">{{ myEntry.tradeCount }}</p><p class="leaderboard-stat-label">Trades</p></div>
          </div>
        </template>
      </div>

      </div>
      </div>

      <p v-if="leaderboard.length === 0 && !loading" style="text-align:center;color:var(--on-surface-variant);padding:var(--sp-12);">
        No traders yet. Be the first to place a trade!
      </p>
    </div>
  </main>

  <!-- MOBILE NAV -->
  <nav class="mobile-nav">
    <router-link to="/markets" class="mobile-nav-item"><span class="material-symbols-outlined">explore</span><span class="mobile-nav-label">Markets</span></router-link>
    <router-link to="/dashboard" class="mobile-nav-item"><span class="material-symbols-outlined">dashboard</span><span class="mobile-nav-label">Dash</span></router-link>
    <router-link to="/leaderboard" class="mobile-nav-item active"><span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1;">leaderboard</span><span class="mobile-nav-label">Ranks</span></router-link>
    <router-link to="/profile" class="mobile-nav-item"><span class="material-symbols-outlined">account_circle</span><span class="mobile-nav-label">Profile</span></router-link>
  </nav>
</template>

<style scoped>
.negative {
  color: var(--error, #f44336);
}
</style>
