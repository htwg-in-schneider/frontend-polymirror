<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMarketStore } from '@/stores/marketStore.js';

const route = useRoute();
const store = useMarketStore();

const market = computed(() => store.currentMarket);

const categoryIcon = computed(() => {
  const icons = {
    Politics: 'gavel', Sports: 'sports', Crypto: 'currency_bitcoin',
    Tech: 'memory', Culture: 'theater_comedy', Geopolitics: 'travel_explore',
    Finance: 'payments', Science: 'biotech', Economy: 'bar_chart',
    Elections: 'how_to_vote', Business: 'business_center', Other: 'help_outline',
  };
  return icons[market.value?.category] ?? 'help_outline';
});

function formatVolume(vol) {
  if (!vol) return '$0';
  if (vol >= 1_000_000) return '$' + (vol / 1_000_000).toFixed(1) + 'M';
  if (vol >= 1_000) return '$' + (vol / 1_000).toFixed(0) + 'K';
  return '$' + vol.toFixed(0);
}

onMounted(() => store.fetchMarketById(route.params.id));
</script>

<template>
  <!-- TOP NAV -->
  <nav class="top-nav">
    <div class="flex items-center gap-8">
      <router-link to="/" class="nav-brand">
        <span class="material-symbols-outlined text-primary" style="font-size:1.75rem;">hub</span>
        PolyMirror
      </router-link>
      <nav class="nav-links">
        <router-link to="/markets" class="nav-link active">Markets</router-link>
        <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        <router-link to="/leaderboard" class="nav-link">Leaderboard</router-link>
        <router-link to="/faq" class="nav-link">FAQ</router-link>
      </nav>
    </div>
    <div class="nav-actions">
      <div class="search-wrap hide-on-mobile">
        <span class="material-symbols-outlined">search</span>
        <input class="search-input" type="text" placeholder="Search markets...">
      </div>
      <div class="nav-balance">
        <span class="nav-balance-label">Available</span>
        <span class="nav-balance-value">0.00 Poly</span>
      </div>
      <router-link to="/profile" class="btn btn-ghost btn-sm" style="display:flex;align-items:center;gap:var(--sp-2);"><span class="material-symbols-outlined" style="font-size:1.1rem;">account_circle</span><span class="hide-on-mobile">Profile</span></router-link>
      <router-link to="/register" class="btn btn-ghost btn-sm">Sign In</router-link>
      <router-link to="/login" class="btn btn-primary">Log In</router-link>
      <button class="nav-search-icon" aria-label="Search">
        <span class="material-symbols-outlined">search</span>
      </button>
      <button class="hamburger-btn" aria-label="Menu">
        <span class="material-symbols-outlined">menu</span>
      </button>
    </div>
  </nav>

  <div class="mobile-menu">
    <router-link to="/markets" class="mobile-menu-link active">Markets</router-link>
    <router-link to="/dashboard" class="mobile-menu-link">Dashboard</router-link>
    <router-link to="/leaderboard" class="mobile-menu-link">Leaderboard</router-link>
    <router-link to="/faq" class="mobile-menu-link">FAQ</router-link>
    <div class="mobile-menu-divider"></div>
    <div class="mobile-menu-actions">
      <router-link to="/register" class="btn btn-secondary">Sign In</router-link>
      <router-link to="/login" class="btn btn-primary">Log In</router-link>
    </div>
  </div>

  <!-- SIDEBAR -->
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <a href="#" class="sidebar-link active"><span class="material-symbols-outlined">gavel</span><span class="sidebar-link-label">Politik</span></a>
      <a href="#" class="sidebar-link"><span class="material-symbols-outlined">sports</span><span class="sidebar-link-label">Sport</span></a>
      <a href="#" class="sidebar-link"><span class="material-symbols-outlined">currency_bitcoin</span><span class="sidebar-link-label">Krypto</span></a>
      <a href="#" class="sidebar-link"><span class="material-symbols-outlined">public</span><span class="sidebar-link-label">Iran</span></a>
      <a href="#" class="sidebar-link"><span class="material-symbols-outlined">payments</span><span class="sidebar-link-label">Finanzen</span></a>
      <a href="#" class="sidebar-link"><span class="material-symbols-outlined">travel_explore</span><span class="sidebar-link-label">Geopolitik</span></a>
      <a href="#" class="sidebar-link"><span class="material-symbols-outlined">memory</span><span class="sidebar-link-label">Technik</span></a>
      <a href="#" class="sidebar-link"><span class="material-symbols-outlined">theater_comedy</span><span class="sidebar-link-label">Kultur</span></a>
      <a href="#" class="sidebar-link"><span class="material-symbols-outlined">bar_chart</span><span class="sidebar-link-label">Economy</span></a>
      <a href="#" class="sidebar-link"><span class="material-symbols-outlined">cloud</span><span class="sidebar-link-label">Wetter</span></a>
      <a href="#" class="sidebar-link"><span class="material-symbols-outlined">tag</span><span class="sidebar-link-label">Erwähnungen</span></a>
      <a href="#" class="sidebar-link"><span class="material-symbols-outlined">how_to_vote</span><span class="sidebar-link-label">Wahlen</span></a>
    </nav>
  </aside>

  <!-- MAIN -->
  <main class="page-with-sidebar app-main">
    <div class="container" style="padding-inline:0;max-width:100%;">
      <div class="detail-grid">

        <!-- Market Header -->
        <div class="glass-panel detail-market-header" style="position:relative;">
          <div style="position:absolute;top:var(--sp-4);right:var(--sp-4);">
            <span class="badge-live">Live Market</span>
          </div>
          <div class="flex items-center gap-2 mb-4 text-primary">
            <span class="material-symbols-outlined" style="font-size:.875rem;">{{ categoryIcon }}</span>
            <span class="text-label-sm uppercase" style="letter-spacing:.2em;">{{ market?.category }}</span>
          </div>
          <h1 class="text-headline-lg" style="font-size:clamp(1.5rem,3vw,2.25rem);line-height:1.2;margin-bottom:var(--sp-6);text-shadow:0 0 8px rgba(173,198,255,0.3);">
            {{ market?.title }}
          </h1>
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
                <button class="chart-tab active">Probability</button>
                <button class="chart-tab">Volume</button>
                <button class="chart-tab">Order Book</button>
              </div>
              <div class="chart-range-group">
                <button class="chart-range-btn">1H</button>
                <button class="chart-range-btn active">1D</button>
                <button class="chart-range-btn">1W</button>
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
              <div class="chart-tooltip" style="top:2.5rem;left:60%;">
                <p class="text-label-sm text-dim">NOV 14, 2:00 PM</p>
                <p class="text-title-md text-primary">64.2% Chance</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Right: Trade Slip -->
        <aside>
          <div class="glass-panel trade-slip sticky-top">
            <h2 class="text-headline-md flex items-center gap-2 mb-6">
              <span class="material-symbols-outlined text-primary-cont">bolt</span>
              Execute Position
            </h2>
            <div class="trade-slip-yes-no">
              <div style="display:flex;flex-direction:column;align-items:center;gap:var(--sp-1);">
                <button class="btn-yes">YES</button>
                <span class="text-label-sm text-dim">{{ market?.odds }}¢</span>
              </div>
              <div style="display:flex;flex-direction:column;align-items:center;gap:var(--sp-1);">
                <button class="btn-no">NO</button>
                <span class="text-label-sm text-dim">{{ market ? 100 - market.odds : 0 }}¢</span>
              </div>
            </div>
            <div class="form-group mb-8">
              <label class="form-label-muted">Amount (USDC)</label>
              <div style="position:relative;">
                <input class="form-input-number" type="number" placeholder="0.00" style="padding-right:4rem;">
                <span style="position:absolute;right:var(--sp-4);top:50%;transform:translateY(-50%);font-family:var(--font-label);font-size:.8rem;color:var(--outline);font-weight:700;">USDC</span>
              </div>
            </div>
            <div class="trade-calculation mb-8">
              <div class="trade-calc-row">
                <span class="trade-calc-label">Shares to Receive</span>
                <span class="trade-calc-value">153.84</span>
              </div>
              <div class="trade-calc-row">
                <span class="trade-calc-label">Potential Return</span>
                <span style="font-family:var(--font-headline);font-weight:700;color:var(--on-surface);font-size:.7rem;">$153.84 (+53.8%)</span>
              </div>
            </div>
            <button class="btn btn-primary" style="width:100%;padding:var(--sp-4);font-size:.875rem;border-radius:var(--radius-lg);justify-content:center;">
              Buy Shares
            </button>
            <p class="text-center text-label-sm text-dim uppercase tracking-widest" style="margin-top:var(--sp-6);letter-spacing:.15em;">
              Secured by PolyMirror Protocol
            </p>
            <div style="margin-top:var(--sp-8);padding-top:var(--sp-6);border-top:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column;align-items:center;gap:var(--sp-3);">
              <p style="font-size:.7rem;color:var(--on-surface-variant);letter-spacing:.05em;">Want to trade with real money?</p>
              <a href="#" style="display:inline-flex;align-items:center;gap:var(--sp-2);padding:var(--sp-2) var(--sp-5);border-radius:var(--radius-lg);border:1px solid rgba(77,142,255,0.3);color:var(--primary);font-family:var(--font-label);font-size:.75rem;font-weight:600;letter-spacing:.08em;text-decoration:none;">
                Trade on Polymarket
                <span class="material-symbols-outlined" style="font-size:.9rem;">open_in_new</span>
              </a>
            </div>
            <div style="margin-top:var(--sp-6);padding:var(--sp-6);border-radius:var(--radius-lg);border:1px solid rgba(255,255,255,0.05);background:rgba(19,27,46,0.3);">
              <h4 class="text-label-sm text-dim uppercase tracking-widest mb-4" style="letter-spacing:.2em;">Market Resolution</h4>
              <ul style="display:flex;flex-direction:column;gap:var(--sp-3);">
                <li style="display:flex;gap:var(--sp-2);font-size:.7rem;color:var(--on-surface-variant);line-height:1.5;">
                  <span class="text-primary-cont">•</span>
                  This market resolves YES if ETH/USD reaches or exceeds $5,000.00 at any point before Dec 31, 23:59:59 UTC.
                </li>
                <li style="display:flex;gap:var(--sp-2);font-size:.7rem;color:var(--on-surface-variant);line-height:1.5;">
                  <span class="text-primary-cont">•</span>
                  Resolution source: Chainlink Price Feed (Ethereum/USD).
                </li>
              </ul>
            </div>
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
                <span class="font-label" style="font-family:var(--font-label);font-weight:600;">{{ formatVolume(market?.volume) }}</span>
              </div>
              <div class="trade-calc-row">
                <span class="trade-calc-label">Unique Participants</span>
                <span class="font-label" style="font-family:var(--font-label);font-weight:600;">12,842</span>
              </div>
              <div class="trade-calc-row">
                <span class="trade-calc-label">Closing Date</span>
                <span class="font-label" style="font-family:var(--font-label);font-weight:600;">DEC 31, 2024</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </main>

  <!-- FOOTER -->
  <footer class="footer footer-app">
    <div class="footer-bottom" style="max-width:80rem;margin-inline:auto;border-top:none;padding-top:0;">
      <div class="flex gap-8">
        <a href="#" class="footer-link" style="margin-bottom:0;">Whitepaper</a>
        <a href="#" class="footer-link" style="margin-bottom:0;">Governance</a>
        <a href="#" class="footer-link" style="margin-bottom:0;">Terms</a>
        <a href="#" class="footer-link" style="margin-bottom:0;">Security</a>
      </div>
      <span class="footer-copyright">Polymirror Oracle v2.4</span>
    </div>
  </footer>

  <!-- MOBILE NAV -->
  <nav class="mobile-nav">
    <router-link to="/markets" class="mobile-nav-item active"><span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1;">explore</span><span class="mobile-nav-label">Markets</span></router-link>
    <router-link to="/dashboard" class="mobile-nav-item"><span class="material-symbols-outlined">dashboard</span><span class="mobile-nav-label">Dash</span></router-link>
    <router-link to="/leaderboard" class="mobile-nav-item"><span class="material-symbols-outlined">leaderboard</span><span class="mobile-nav-label">Ranks</span></router-link>
    <router-link to="/profile" class="mobile-nav-item"><span class="material-symbols-outlined">account_circle</span><span class="mobile-nav-label">Profile</span></router-link>
  </nav>
</template>

<style scoped></style>
