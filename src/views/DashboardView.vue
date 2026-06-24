<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import { useUserStore } from '@/stores/userStore.js';
import axios from 'axios';
import { API_BASE } from '@/config.js';

const { getAccessTokenSilently } = useAuth0();
const userStore = useUserStore();

const trades = ref([]);
const loading = ref(true);

const user = computed(() => userStore.currentUser);

const openTrades = computed(() => trades.value.filter(t => !t.status || t.status === 'OPEN'));
const closedTrades = computed(() => trades.value.filter(t => t.status && t.status !== 'OPEN'));

const totalInvested = computed(() => openTrades.value.reduce((sum, t) => sum + t.amount, 0));
const totalPotentialPayout = computed(() => openTrades.value.reduce((sum, t) => sum + t.potentialPayout, 0));
const activeCount = computed(() => openTrades.value.length);

onMounted(async () => {
  try {
    const token = await getAccessTokenSilently();
    const { data } = await axios.get(`${API_BASE}/trades/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    trades.value = data;
  } catch (e) {
    console.error('Failed to load trades', e);
  } finally {
    loading.value = false;
  }
});

async function sellTrade(trade) {
  if (!confirm(`Sell your ${trade.option} position on "${trade.marketTitle}"?`)) return;
  try {
    const token = await getAccessTokenSilently();
    const { data } = await axios.post(`${API_BASE}/trades/sell/${trade.id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert(`Sold for ${data.sellValue.toFixed(2)} Poly`);
    // Refresh
    await userStore.loadProfile(getAccessTokenSilently);
    const res = await axios.get(`${API_BASE}/trades/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    trades.value = res.data;
  } catch (e) {
    alert(e.response?.data?.error || 'Sell failed');
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}
</script>

<template>
  <main style="padding-top:var(--nav-height);padding-bottom:var(--sp-24);">
    <div class="container" style="max-width:72rem;">

      <!-- Balance + Stats Row -->
      <div class="grid-2" style="margin-bottom:var(--sp-8);margin-top:var(--sp-8);">
        <!-- Balance Panel -->
        <div class="glass-panel balance-panel">
          <div class="balance-panel-bg">
            <svg width="200" height="120" viewBox="0 0 200 120" style="opacity:.6;">
              <rect x="10"  y="60"  width="8" height="50" fill="var(--primary)" rx="1"/>
              <rect x="30"  y="40"  width="8" height="70" fill="var(--primary)" rx="1"/>
              <rect x="50"  y="50"  width="8" height="60" fill="var(--primary)" rx="1"/>
              <rect x="70"  y="25"  width="8" height="85" fill="var(--primary)" rx="1"/>
              <rect x="90"  y="30"  width="8" height="80" fill="var(--primary)" rx="1"/>
              <rect x="110" y="15"  width="8" height="95" fill="var(--primary)" rx="1"/>
              <rect x="130" y="20"  width="8" height="90" fill="var(--primary)" rx="1"/>
              <rect x="150" y="5"   width="8" height="105" fill="var(--primary)" rx="1"/>
              <rect x="170" y="10"  width="8" height="100" fill="var(--primary)" rx="1"/>
            </svg>
          </div>
          <div style="position:relative;z-index:1;">
            <h2 class="text-label-sm text-primary uppercase tracking-widest mb-2" style="opacity:.7;letter-spacing:.2em;">Available Balance</h2>
            <div class="balance-value-wrap">
              <span class="stat-value-xl" style="color:#ffffff;text-shadow:0 0 5px rgba(255,255,255,0.15);">{{ user?.balance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00' }}</span>
              <div class="balance-currency-badge">
                <span style="font-family:var(--font-headline);font-weight:700;color:var(--on-primary-cont);font-size:.875rem;">Poly</span>
              </div>
            </div>
            <div class="balance-stats">
              <div class="stat-inline">
                <span class="stat-label">Total Invested</span>
                <span style="font-family:var(--font-headline);font-weight:700;color:var(--primary);">{{ totalInvested.toFixed(2) }}</span>
              </div>
              <div class="stat-inline">
                <span class="stat-label">Active Positions</span>
                <span style="font-family:var(--font-headline);font-weight:700;color:var(--on-surface);">{{ activeCount }}</span>
              </div>
              <div class="stat-inline">
                <span class="stat-label">Potential Value</span>
                <span style="font-family:var(--font-headline);font-weight:700;color:var(--on-surface);">{{ totalPotentialPayout.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Performance Chart -->
        <div class="glass-panel" style="display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <h2 class="text-label-sm text-primary uppercase tracking-widest mb-6" style="opacity:.7;letter-spacing:.2em;">Performance Trajectory</h2>
            <div style="height:8rem;position:relative;">
              <svg width="100%" height="100%" viewBox="0 0 200 80" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="perfGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%"   stop-color="#4d8eff" stop-opacity="0.45"/>
                    <stop offset="100%" stop-color="#4d8eff" stop-opacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M0,60 Q20,55 40,65 T80,40 T120,50 T160,20 T200,30 L200,80 L0,80 Z" fill="url(#perfGradient)"/>
                <path d="M0,60 Q20,55 40,65 T80,40 T120,50 T160,20 T200,30" fill="none" stroke="#4d8eff" stroke-width="2" style="filter:drop-shadow(0 0 5px rgba(77,142,255,1))"/>
              </svg>
            </div>
          </div>
          <div class="flex justify-between items-center mt-4">
            <span class="text-label-sm text-dim uppercase" style="letter-spacing:.1em;">System: Optimized</span>
            <span class="material-symbols-outlined text-primary">monitor_heart</span>
          </div>
        </div>
      </div>

      <!-- Positions Table -->
      <div class="glass-panel" style="padding:0;overflow:hidden;">
        <div style="padding:var(--sp-6) var(--sp-8);border-bottom:1px solid rgba(66,71,84,0.15);display:flex;justify-content:space-between;align-items:center;">
          <h3 class="text-headline-sm flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">balance</span>
            Your Positions
          </h3>
          <span class="text-label-sm text-dim">{{ activeCount }} trades</span>
        </div>

        <div v-if="loading" style="padding:var(--sp-12);text-align:center;">
          <p style="color:var(--on-surface-variant);font-size:.9rem;">Loading trades...</p>
        </div>

        <div v-else-if="trades.length === 0" style="padding:var(--sp-12);text-align:center;">
          <span class="material-symbols-outlined" style="font-size:3rem;color:var(--outline);margin-bottom:var(--sp-4);display:block;">receipt_long</span>
          <p style="color:var(--on-surface-variant);font-size:.9rem;margin-bottom:var(--sp-4);">No trades yet</p>
          <router-link to="/markets" class="btn btn-primary btn-sm">Explore Markets</router-link>
        </div>

        <div v-else class="data-table-wrapper">
          <!-- Open Positions -->
          <div v-if="openTrades.length" style="padding:var(--sp-4) var(--sp-8) var(--sp-2);border-bottom:1px solid rgba(66,71,84,0.1);">
            <span class="text-label-sm text-primary uppercase" style="letter-spacing:.1em;">Open Positions ({{ openTrades.length }})</span>
          </div>
          <table v-if="openTrades.length" class="data-table">
            <thead>
              <tr>
                <th>Market</th>
                <th>Position</th>
                <th>Odds</th>
                <th>Investment</th>
                <th>Potential Payout</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="trade in openTrades" :key="trade.id">
                <td>
                  <router-link :to="'/market/' + trade.marketId" style="color:var(--on-surface);text-decoration:none;font-weight:500;font-size:.85rem;">
                    {{ trade.marketTitle }}
                  </router-link>
                </td>
                <td>
                  <span :class="trade.option === 'YES' ? 'position-yes' : 'position-no'">{{ trade.option }}</span>
                </td>
                <td style="font-family:var(--font-headline);font-weight:700;">{{ trade.odds?.toFixed(1) }}%</td>
                <td style="font-family:var(--font-label);color:var(--on-surface-variant);">{{ trade.amount?.toFixed(2) }} Poly</td>
                <td class="stat-payout">{{ trade.potentialPayout?.toFixed(2) }} Poly</td>
                <td style="font-size:.75rem;color:var(--on-surface-variant);">{{ formatDate(trade.createdAt) }}</td>
                <td>
                  <button class="btn btn-sm btn-sell" @click="sellTrade(trade)">
                    <span class="material-symbols-outlined" style="font-size:1rem;">sell</span>
                    Sell
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Closed Positions -->
          <div v-if="closedTrades.length" style="padding:var(--sp-4) var(--sp-8) var(--sp-2);border-bottom:1px solid rgba(66,71,84,0.1);">
            <span class="text-label-sm text-dim uppercase" style="letter-spacing:.1em;">Closed Positions ({{ closedTrades.length }})</span>
          </div>
          <table v-if="closedTrades.length" class="data-table">
            <thead>
              <tr>
                <th>Market</th>
                <th>Position</th>
                <th>Odds</th>
                <th>Investment</th>
                <th>Potential Payout</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="trade in closedTrades" :key="trade.id" style="opacity:.7;">
                <td>
                  <router-link :to="'/market/' + trade.marketId" style="color:var(--on-surface);text-decoration:none;font-weight:500;font-size:.85rem;">
                    {{ trade.marketTitle }}
                  </router-link>
                </td>
                <td>
                  <span :class="trade.option === 'YES' ? 'position-yes' : 'position-no'">{{ trade.option }}</span>
                </td>
                <td style="font-family:var(--font-headline);font-weight:700;">{{ trade.odds?.toFixed(1) }}%</td>
                <td style="font-family:var(--font-label);color:var(--on-surface-variant);">{{ trade.amount?.toFixed(2) }} Poly</td>
                <td class="stat-payout">{{ trade.potentialPayout?.toFixed(2) }} Poly</td>
                <td style="font-size:.75rem;color:var(--on-surface-variant);">{{ formatDate(trade.createdAt) }}</td>
                <td>
                  <span :class="'trade-status trade-status-' + (trade.status || 'OPEN').toLowerCase()">{{ trade.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </main>

  <!-- MOBILE NAV -->
  <nav class="mobile-nav">
    <router-link to="/markets" class="mobile-nav-item">
      <span class="material-symbols-outlined">explore</span>
      <span class="mobile-nav-label">Markets</span>
    </router-link>
    <router-link to="/dashboard" class="mobile-nav-item active">
      <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1;">dashboard</span>
      <span class="mobile-nav-label">Dash</span>
    </router-link>
    <router-link to="/leaderboard" class="mobile-nav-item">
      <span class="material-symbols-outlined">leaderboard</span>
      <span class="mobile-nav-label">Ranks</span>
    </router-link>
    <router-link to="/profile" class="mobile-nav-item">
      <span class="material-symbols-outlined">account_circle</span>
      <span class="mobile-nav-label">Profile</span>
    </router-link>
  </nav>
</template>

<style scoped>
.btn-sell {
  display: inline-flex;
  align-items: center;
  gap: .25rem;
  padding: .25rem .75rem;
  background: rgba(255, 152, 0, 0.15);
  color: #ff9800;
  border: 1px solid rgba(255, 152, 0, 0.3);
  border-radius: var(--radius-sm, 6px);
  font-family: var(--font-label);
  font-weight: 600;
  font-size: .75rem;
  cursor: pointer;
  transition: all 0.15s ease;
}
.btn-sell:hover {
  background: rgba(255, 152, 0, 0.25);
  border-color: #ff9800;
}
.trade-status {
  display: inline-block;
  padding: .15rem .5rem;
  border-radius: var(--radius-sm, 6px);
  font-family: var(--font-label);
  font-weight: 700;
  font-size: .7rem;
  letter-spacing: .05em;
  text-transform: uppercase;
}
.trade-status-won {
  background: rgba(76, 175, 80, 0.15);
  color: #4caf50;
  border: 1px solid rgba(76, 175, 80, 0.3);
}
.trade-status-lost {
  background: rgba(244, 67, 54, 0.15);
  color: #f44336;
  border: 1px solid rgba(244, 67, 54, 0.3);
}
.trade-status-sold {
  background: rgba(255, 152, 0, 0.15);
  color: #ff9800;
  border: 1px solid rgba(255, 152, 0, 0.3);
}
</style>
