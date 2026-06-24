<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import { useMarketStore } from '@/stores/marketStore.js';
import { useUserStore } from '@/stores/userStore.js';
import axios from 'axios';
import { API_BASE } from '@/config.js';

const route = useRoute();
const store = useMarketStore();
const userStore = useUserStore();
const { isAuthenticated, getAccessTokenSilently, loginWithRedirect } = useAuth0();

const market = computed(() => store.currentMarket);

// Trade state
const selectedOption = ref('YES');
const tradeAmount = ref('');
const tradeStep = ref(1); // 1=input, 2=confirm, 3=success
const tradeLoading = ref(false);
const tradeError = ref('');
const lastTrade = ref(null);

const categoryIcon = computed(() => {
  const icons = {
    Politics: 'gavel', Sports: 'sports', Crypto: 'currency_bitcoin',
    Tech: 'memory', Culture: 'theater_comedy', Geopolitics: 'travel_explore',
    Finance: 'payments', Science: 'biotech', Economy: 'bar_chart',
    Elections: 'how_to_vote', Business: 'business_center', Other: 'help_outline',
  };
  return icons[market.value?.category] ?? 'help_outline';
});

const currentOdds = computed(() => {
  if (!market.value) return 50;
  return selectedOption.value === 'YES' ? market.value.odds : (100 - market.value.odds);
});

const amount = computed(() => parseFloat(tradeAmount.value) || 0);

const potentialPayout = computed(() => {
  if (amount.value <= 0 || currentOdds.value <= 0) return 0;
  return Math.round((amount.value / (currentOdds.value / 100)) * 100) / 100;
});

const potentialProfit = computed(() => {
  return Math.round((potentialPayout.value - amount.value) * 100) / 100;
});

const profitPercent = computed(() => {
  if (amount.value <= 0) return 0;
  return Math.round((potentialProfit.value / amount.value) * 1000) / 10;
});

function selectOption(opt) {
  selectedOption.value = opt;
}

function goToConfirm() {
  tradeError.value = '';
  if (!amount.value || amount.value <= 0) { tradeError.value = 'Enter a valid amount'; return; }
  if (amount.value < 0.01) { tradeError.value = 'Minimum amount is 0.01 Poly'; return; }
  if (amount.value > 1000000) { tradeError.value = 'Maximum amount is 1,000,000 Poly'; return; }
  if (!userStore.currentUser) { tradeError.value = 'Please log in first'; return; }
  if (amount.value > userStore.currentUser.balance) { tradeError.value = 'Insufficient balance'; return; }
  tradeStep.value = 2;
}

async function executeTrade() {
  tradeLoading.value = true;
  tradeError.value = '';
  try {
    const token = await getAccessTokenSilently();
    const { data } = await axios.post(`${API_BASE}/trades`, {
      marketId: market.value.id,
      option: selectedOption.value,
      amount: amount.value,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    lastTrade.value = data.trade;
    userStore.currentUser.balance = data.newBalance;
    tradeStep.value = 3;
  } catch (e) {
    tradeError.value = e.response?.data?.error || 'Trade failed';
    tradeStep.value = 1;
  } finally {
    tradeLoading.value = false;
  }
}

function resetTrade() {
  tradeStep.value = 1;
  tradeAmount.value = '';
  tradeError.value = '';
  lastTrade.value = null;
}

function formatVolume(vol) {
  if (!vol) return '$0';
  if (vol >= 1_000_000) return '$' + (vol / 1_000_000).toFixed(1) + 'M';
  if (vol >= 1_000) return '$' + (vol / 1_000).toFixed(0) + 'K';
  return '$' + vol.toFixed(0);
}

onMounted(() => store.fetchMarketById(route.params.id));
</script>

<template>
  <main class="page-with-sidebar app-main" style="padding-top:var(--nav-height);">
    <div class="container" style="padding-inline:var(--sp-6);max-width:80rem;">
      <div class="detail-grid">

        <!-- Market Header -->
        <div class="glass-panel detail-market-header" style="position:relative;">
          <div style="position:absolute;top:var(--sp-4);right:var(--sp-4);">
            <span v-if="market?.resolved" class="badge-resolved">
              <span class="material-symbols-outlined" style="font-size:.875rem;">check_circle</span>
              Resolved — {{ market.outcome }}
            </span>
            <span v-else class="badge-live">Live Market</span>
          </div>
          <div class="flex items-center gap-2 mb-4 text-primary">
            <span class="material-symbols-outlined" style="font-size:.875rem;">{{ categoryIcon }}</span>
            <span class="text-label-sm uppercase" style="letter-spacing:.2em;">{{ market?.category }}</span>
          </div>
          <div style="display:flex;align-items:flex-start;gap:var(--sp-4);margin-bottom:var(--sp-6);">
            <img v-if="market?.imageUrl" :src="market.imageUrl" alt="" style="width:3.5rem;height:3.5rem;border-radius:var(--radius-md, 8px);object-fit:cover;flex-shrink:0;margin-top:4px;">
            <h1 class="text-headline-lg" style="font-size:clamp(1.5rem,3vw,2.25rem);line-height:1.2;text-shadow:0 0 8px rgba(173,198,255,0.3);">
              {{ market?.title }}
            </h1>
          </div>
          <div class="flex items-end gap-8" style="flex-wrap:wrap;">
            <div>
              <p class="text-label-sm text-dim uppercase tracking-widest" style="margin-bottom:var(--sp-1);">Current Probability</p>
              <p class="stat-value-primary" style="font-size:3rem;line-height:1;">{{ market?.odds }}<span style="font-size:1.5rem;">%</span></p>
            </div>
            <div style="flex:1;min-width:12rem;">
              <div class="probability-bar" style="margin-bottom:var(--sp-3);">
                <div class="probability-bar-fill animated" :style="{ width: market?.odds + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Left: Chart -->
        <section class="detail-chart-section" style="display:flex;flex-direction:column;gap:var(--sp-6);">
          <div class="glass-panel chart-panel">
            <div class="chart-controls">
              <div class="chart-tab-group">
                <span class="chart-tab active">Probability</span>
              </div>
              <div class="chart-range-group">
                <span class="chart-range-btn active">ALL</span>
              </div>
            </div>
            <div class="chart-area">
              <svg width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="none" style="position:absolute;inset:0;">
                <defs>
                  <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%"   stop-color="#4d8eff" stop-opacity="0.2"/>
                    <stop offset="100%" stop-color="#4d8eff" stop-opacity="0"/>
                  </linearGradient>
                </defs>
                <path class="chart-line"
                  d="M0 200 Q 50 190, 100 210 T 200 175 T 300 230 T 400 140 T 500 165 T 600 110 T 700 125 T 800 70"
                  fill="none" stroke="#4d8eff" stroke-width="2.5"/>
                <path
                  d="M0 200 Q 50 190, 100 210 T 200 175 T 300 230 T 400 140 T 500 165 T 600 110 T 700 125 T 800 70 L 800 300 L 0 300 Z"
                  fill="url(#chartFill)"/>
              </svg>
            </div>
          </div>
        </section>

        <!-- Right: Trade Slip -->
        <aside>
          <div class="glass-panel trade-slip sticky-top">

            <!-- Resolved State -->
            <template v-if="market?.resolved">
              <div style="text-align:center;padding:var(--sp-6) 0;">
                <span class="material-symbols-outlined" style="font-size:3rem;color:var(--outline);margin-bottom:var(--sp-4);display:block;">lock</span>
                <h2 class="text-headline-md" style="margin-bottom:var(--sp-2);">Market Resolved</h2>
                <p style="font-size:.85rem;color:var(--on-surface-variant);margin-bottom:var(--sp-6);">This market has been settled.</p>
                <div style="display:inline-flex;align-items:center;gap:var(--sp-2);padding:var(--sp-3) var(--sp-6);border-radius:var(--radius-lg);font-weight:700;font-size:1.1rem;"
                  :style="{ background: market.outcome === 'YES' ? 'rgba(76,175,80,0.15)' : 'rgba(255,107,107,0.15)', color: market.outcome === 'YES' ? '#4caf50' : '#ff6b6b', border: market.outcome === 'YES' ? '1px solid rgba(76,175,80,0.3)' : '1px solid rgba(255,107,107,0.3)' }">
                  Outcome: {{ market.outcome }}
                </div>
              </div>
            </template>

            <!-- Step 1: Input -->
            <template v-else-if="tradeStep === 1">
              <h2 class="text-headline-md flex items-center gap-2 mb-6">
                <span class="material-symbols-outlined text-primary-cont">bolt</span>
                Execute Position
              </h2>

              <div v-if="tradeError" style="color:#ff6b6b;font-size:.8rem;padding:var(--sp-3);border:1px solid rgba(255,107,107,0.3);border-radius:var(--radius-md);margin-bottom:var(--sp-4);">
                {{ tradeError }}
              </div>

              <div class="trade-slip-yes-no">
                <div style="display:flex;flex-direction:column;align-items:center;gap:var(--sp-1);">
                  <button class="btn-yes" :class="{ active: selectedOption === 'YES' }" @click="selectOption('YES')">YES</button>
                  <span class="text-label-sm text-dim">{{ market?.odds }}¢</span>
                </div>
                <div style="display:flex;flex-direction:column;align-items:center;gap:var(--sp-1);">
                  <button class="btn-no" :class="{ active: selectedOption === 'NO' }" @click="selectOption('NO')">NO</button>
                  <span class="text-label-sm text-dim">{{ market ? (100 - market.odds).toFixed(1) : 0 }}¢</span>
                </div>
              </div>

              <div class="form-group mb-8">
                <label class="form-label-muted">Amount (Poly)</label>
                <div style="position:relative;">
                  <input v-model="tradeAmount" class="form-input-number" type="number" placeholder="0.00" min="1" step="1" style="padding-right:4rem;">
                  <span style="position:absolute;right:var(--sp-4);top:50%;transform:translateY(-50%);font-family:var(--font-label);font-size:.8rem;color:var(--outline);font-weight:700;">POLY</span>
                </div>
                <p v-if="isAuthenticated && userStore.currentUser" style="font-size:.7rem;color:var(--on-surface-variant);margin-top:var(--sp-2);">
                  Balance: <span style="color:var(--primary);font-weight:700;">{{ userStore.currentUser.balance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }} Poly</span>
                </p>
              </div>

              <div v-if="amount > 0" class="trade-calculation mb-8">
                <div class="trade-calc-row">
                  <span class="trade-calc-label">Your Odds</span>
                  <span class="trade-calc-value">{{ currentOdds.toFixed(1) }}%</span>
                </div>
                <div class="trade-calc-row">
                  <span class="trade-calc-label">Potential Payout</span>
                  <span style="font-family:var(--font-headline);font-weight:700;color:var(--on-surface);font-size:.7rem;">{{ potentialPayout.toFixed(2) }} Poly</span>
                </div>
                <div class="trade-calc-row">
                  <span class="trade-calc-label">Potential Profit</span>
                  <span style="font-family:var(--font-headline);font-weight:700;color:#4caf50;font-size:.7rem;">+{{ potentialProfit.toFixed(2) }} Poly (+{{ profitPercent }}%)</span>
                </div>
              </div>

              <template v-if="isAuthenticated">
                <button class="btn btn-primary" style="width:100%;padding:var(--sp-4);font-size:.875rem;border-radius:var(--radius-lg);justify-content:center;" @click="goToConfirm" :disabled="amount <= 0">
                  Buy {{ selectedOption }} Shares
                </button>
              </template>
              <template v-else>
                <button class="btn btn-primary" style="width:100%;padding:var(--sp-4);font-size:.875rem;border-radius:var(--radius-lg);justify-content:center;" @click="loginWithRedirect()">
                  Log in to Trade
                </button>
              </template>
            </template>

            <!-- Step 2: Confirm -->
            <template v-if="tradeStep === 2">
              <h2 class="text-headline-md flex items-center gap-2 mb-6">
                <span class="material-symbols-outlined text-primary-cont">verified</span>
                Confirm Trade
              </h2>

              <div style="display:flex;flex-direction:column;gap:var(--sp-4);padding:var(--sp-6);border-radius:var(--radius-lg);background:rgba(19,27,46,0.4);border:1px solid rgba(173,198,255,0.1);margin-bottom:var(--sp-6);">
                <div class="trade-calc-row">
                  <span class="trade-calc-label">Market</span>
                  <span style="font-size:.75rem;color:var(--on-surface);font-weight:500;max-width:60%;text-align:right;">{{ market?.title }}</span>
                </div>
                <div class="trade-calc-row">
                  <span class="trade-calc-label">Position</span>
                  <span :style="{ color: selectedOption === 'YES' ? '#4caf50' : '#ff6b6b', fontWeight: 700, fontSize: '.85rem' }">{{ selectedOption }}</span>
                </div>
                <div class="trade-calc-row">
                  <span class="trade-calc-label">Amount</span>
                  <span style="font-weight:700;font-size:.85rem;color:var(--on-surface);">{{ amount.toFixed(2) }} Poly</span>
                </div>
                <div class="trade-calc-row">
                  <span class="trade-calc-label">Odds</span>
                  <span style="font-weight:600;font-size:.85rem;color:var(--on-surface);">{{ currentOdds.toFixed(1) }}%</span>
                </div>
                <div style="border-top:1px solid rgba(173,198,255,0.1);padding-top:var(--sp-3);"></div>
                <div class="trade-calc-row">
                  <span class="trade-calc-label">Potential Payout</span>
                  <span style="font-family:var(--font-headline);font-weight:700;color:#4caf50;font-size:.85rem;">{{ potentialPayout.toFixed(2) }} Poly</span>
                </div>
              </div>

              <div style="display:flex;gap:var(--sp-3);">
                <button class="btn btn-secondary" style="flex:1;padding:var(--sp-4);font-size:.875rem;border-radius:var(--radius-lg);justify-content:center;" @click="tradeStep = 1">
                  Back
                </button>
                <button class="btn btn-primary" style="flex:2;padding:var(--sp-4);font-size:.875rem;border-radius:var(--radius-lg);justify-content:center;" @click="executeTrade" :disabled="tradeLoading">
                  {{ tradeLoading ? 'Processing...' : 'Confirm Trade' }}
                </button>
              </div>
            </template>

            <!-- Step 3: Success -->
            <template v-if="tradeStep === 3">
              <div style="text-align:center;padding:var(--sp-6) 0;">
                <span class="material-symbols-outlined" style="font-size:3rem;color:#4caf50;margin-bottom:var(--sp-4);display:block;">check_circle</span>
                <h2 class="text-headline-md" style="margin-bottom:var(--sp-2);">Trade Executed!</h2>
                <p style="font-size:.85rem;color:var(--on-surface-variant);margin-bottom:var(--sp-6);">Your position has been placed successfully.</p>

                <div style="display:flex;flex-direction:column;gap:var(--sp-3);padding:var(--sp-5);border-radius:var(--radius-lg);background:rgba(19,27,46,0.4);border:1px solid rgba(76,175,80,0.2);margin-bottom:var(--sp-6);text-align:left;">
                  <div class="trade-calc-row">
                    <span class="trade-calc-label">Position</span>
                    <span :style="{ color: lastTrade?.option === 'YES' ? '#4caf50' : '#ff6b6b', fontWeight: 700 }">{{ lastTrade?.option }}</span>
                  </div>
                  <div class="trade-calc-row">
                    <span class="trade-calc-label">Amount</span>
                    <span style="font-weight:600;color:var(--on-surface);">{{ lastTrade?.amount?.toFixed(2) }} Poly</span>
                  </div>
                  <div class="trade-calc-row">
                    <span class="trade-calc-label">Potential Payout</span>
                    <span style="font-weight:700;color:#4caf50;">{{ lastTrade?.potentialPayout?.toFixed(2) }} Poly</span>
                  </div>
                  <div class="trade-calc-row">
                    <span class="trade-calc-label">New Balance</span>
                    <span style="font-weight:600;color:var(--primary);">{{ userStore.currentUser?.balance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }} Poly</span>
                  </div>
                </div>

                <div style="display:flex;gap:var(--sp-3);">
                  <button class="btn btn-secondary" style="flex:1;padding:var(--sp-3);font-size:.85rem;border-radius:var(--radius-lg);justify-content:center;" @click="resetTrade">
                    New Trade
                  </button>
                  <router-link to="/dashboard" class="btn btn-primary" style="flex:1;padding:var(--sp-3);font-size:.85rem;border-radius:var(--radius-lg);justify-content:center;">
                    Dashboard
                  </router-link>
                </div>
              </div>
            </template>

            <!-- Polymarket Link -->
            <a v-if="market?.eventSlug"
              :href="'https://polymarket.com/event/' + market.eventSlug"
              target="_blank"
              rel="noopener noreferrer"
              class="polymarket-link"
            >
              <span style="font-weight:700;">Trade with real money on Polymarket</span>
              <span class="material-symbols-outlined" style="font-size:1rem;">open_in_new</span>
            </a>

            <p class="text-center text-label-sm text-dim uppercase tracking-widest" style="margin-top:var(--sp-6);letter-spacing:.15em;">
              Secured by PolyMirror Protocol
            </p>
          </div>
        </aside>

        <!-- Context / Stats -->
        <div class="detail-context-section grid-2" style="gap:var(--sp-6);">
          <div class="glass-panel">
            <h3 class="text-label-sm text-dim uppercase tracking-widest mb-4" style="letter-spacing:.2em;">Market Context</h3>
            <p class="text-body-md text-muted" style="line-height:1.7;">
              {{ market?.description }}
            </p>
          </div>
          <div class="glass-panel">
            <h3 class="text-label-sm text-dim uppercase tracking-widest mb-4" style="letter-spacing:.2em;">Oracle Statistics</h3>
            <div style="display:flex;flex-direction:column;gap:var(--sp-3);">
              <div class="trade-calc-row">
                <span class="trade-calc-label">Total Volume</span>
                <span style="font-family:var(--font-label);font-weight:600;">{{ formatVolume(market?.volume) }}</span>
              </div>
              <div class="trade-calc-row">
                <span class="trade-calc-label">Category</span>
                <span style="font-family:var(--font-label);font-weight:600;">{{ market?.category }}</span>
              </div>
              <div class="trade-calc-row">
                <span class="trade-calc-label">End Date</span>
                <span style="font-family:var(--font-label);font-weight:600;">{{ market?.endDate || 'Open' }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<style scoped>
.btn-yes.active { background: #4caf50; color: #fff; box-shadow: 0 0 12px rgba(76,175,80,0.4); }
.btn-no.active { background: #ff6b6b; color: #fff; box-shadow: 0 0 12px rgba(255,107,107,0.4); }
.polymarket-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-2);
  margin-top: var(--sp-6);
  padding: var(--sp-3) var(--sp-4);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--on-surface-variant);
  font-size: .8rem;
  text-decoration: none;
  transition: all 0.15s;
}
.polymarket-link:hover {
  background: rgba(77, 142, 255, 0.1);
  border-color: var(--primary);
  color: var(--primary);
}
.badge-resolved {
  display: inline-flex;
  align-items: center;
  gap: .25rem;
  padding: .25rem .75rem;
  border-radius: var(--radius-sm, 6px);
  background: rgba(255, 152, 0, 0.15);
  color: #ff9800;
  border: 1px solid rgba(255, 152, 0, 0.3);
  font-family: var(--font-label);
  font-weight: 700;
  font-size: .75rem;
  letter-spacing: .05em;
  text-transform: uppercase;
}
</style>
