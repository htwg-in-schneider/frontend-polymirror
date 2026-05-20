<script setup>
</script>

<template>
  <div class="bg-glow-blob bg-glow-blob-tr"></div>

  <!-- TOP NAV -->
  <nav class="top-nav">
    <div class="flex items-center gap-8">
      <router-link to="/" class="nav-brand">
        <span class="material-symbols-outlined text-primary" style="font-size:1.75rem;">hub</span>
        PolyMirror
      </router-link>
      <nav class="nav-links">
        <router-link to="/markets" class="nav-link">Markets</router-link>
        <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        <router-link to="/leaderboard" class="nav-link active">Leaderboard</router-link>
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
      <button class="nav-search-icon" aria-label="Search"><span class="material-symbols-outlined">search</span></button>
      <button class="hamburger-btn" aria-label="Menu"><span class="material-symbols-outlined">menu</span></button>
    </div>
  </nav>

  <div class="mobile-menu">
    <router-link to="/markets" class="mobile-menu-link">Markets</router-link>
    <router-link to="/dashboard" class="mobile-menu-link">Dashboard</router-link>
    <router-link to="/leaderboard" class="mobile-menu-link active">Leaderboard</router-link>
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

  <main class="page-with-sidebar app-main" style="padding-bottom:var(--sp-24);">

    <!-- Header -->
    <div style="background:linear-gradient(180deg,var(--surface-base) 0%,var(--surface) 100%);padding:var(--sp-16) var(--sp-6) var(--sp-12);text-align:center;position:relative;overflow:hidden;">
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:30rem;height:30rem;background:rgba(173,198,255,0.06);border-radius:50%;filter:blur(5rem);pointer-events:none;"></div>
      <div style="position:relative;z-index:1;">
        <p class="section-eyebrow" style="text-align:center;margin-bottom:var(--sp-4);">Global Rankings</p>
        <h1 style="font-family:var(--font-headline);font-size:clamp(2.5rem,5vw,4rem);font-weight:900;letter-spacing:-.02em;color:var(--primary);text-shadow:0 0 5px rgba(173,198,255,0.2);margin-bottom:var(--sp-4);">Leaderboard</h1>
        <p class="text-muted" style="font-size:1rem;max-width:28rem;margin-inline:auto;">The world's most accurate prediction engineers, ranked by total profit and win rate.</p>
      </div>
    </div>

    <!-- Season Stats -->
    <div class="container" style="margin-bottom:var(--sp-12);">
      <div class="season-stats-grid" style="background:var(--surface-low);border-radius:var(--radius-xl);padding:var(--sp-6);border:1px solid rgba(255,255,255,0.04);">
        <div class="text-center"><p class="stat-label" style="text-align:center;margin-bottom:var(--sp-2);">Total Players</p><p style="font-family:var(--font-headline);font-size:1.75rem;font-weight:900;color:var(--on-surface);">42,801</p></div>
        <div class="text-center"><p class="stat-label" style="text-align:center;margin-bottom:var(--sp-2);">Season Volume</p><p style="font-family:var(--font-headline);font-size:1.75rem;font-weight:900;color:var(--on-surface);">$1.2B</p></div>
        <div class="text-center"><p class="stat-label" style="text-align:center;margin-bottom:var(--sp-2);">Markets Resolved</p><p style="font-family:var(--font-headline);font-size:1.75rem;font-weight:900;color:var(--on-surface);">2,840</p></div>
        <div class="text-center"><p class="stat-label" style="text-align:center;margin-bottom:var(--sp-2);">Season Ends</p><p style="font-family:var(--font-headline);font-size:1.75rem;font-weight:900;color:var(--primary);">87 Days</p></div>
      </div>
    </div>

    <!-- Leaderboard Table -->
    <div class="container">
      <div class="flex gap-4 mb-8">
        <button class="btn btn-primary btn-sm">All Time</button>
        <button class="btn btn-secondary btn-sm">This Month</button>
        <button class="btn btn-secondary btn-sm">This Week</button>
      </div>

      <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
      <div style="min-width:42rem;">

      <div style="display:grid;grid-template-columns:50px minmax(0,1fr) 100px 120px 100px;column-gap:var(--sp-4);padding:var(--sp-2) var(--sp-6);margin-bottom:var(--sp-2);">
        <span class="text-label-sm text-dim uppercase tracking-widest">#</span>
        <span class="text-label-sm text-dim uppercase tracking-widest">Player</span>
        <span class="text-label-sm text-dim uppercase tracking-widest" style="text-align:center;">Win Rate</span>
        <span class="text-label-sm text-dim uppercase tracking-widest" style="text-align:center;">Total Profit</span>
        <span class="text-label-sm text-dim uppercase tracking-widest" style="text-align:center;">Positions</span>
      </div>

      <div style="display:flex;flex-direction:column;gap:var(--sp-3);">
        <div class="leaderboard-row" style="border:1px solid rgba(255,215,0,0.15);background:rgba(255,215,0,0.04);">
          <div class="leaderboard-player-sticky" style="background:color-mix(in srgb,var(--surface-low),rgba(255,215,0,0.07));"><span class="leaderboard-rank leaderboard-rank-1">1</span><div class="leaderboard-avatar"><span class="leaderboard-avatar-text">PX</span></div><div class="leaderboard-info"><p class="leaderboard-name">PHANTOM_X</p><p class="leaderboard-handle">ID: PMR-0001 · Politics Specialist</p></div></div>
          <div class="lb-stat-cell"><p class="leaderboard-stat-value positive">94%</p><p class="leaderboard-stat-label">Win Rate</p></div>
          <div class="lb-stat-cell"><p class="leaderboard-stat-value positive">+84,200 PMR</p><p class="leaderboard-stat-label">Total Profit</p></div>
          <div class="lb-stat-cell"><p class="leaderboard-stat-value">148</p><p class="leaderboard-stat-label">Positions</p></div>
        </div>
        <div class="leaderboard-row" style="border:1px solid rgba(192,192,192,0.1);background:rgba(192,192,192,0.03);">
          <div class="leaderboard-player-sticky"><span class="leaderboard-rank leaderboard-rank-2">2</span><div class="leaderboard-avatar"><span class="leaderboard-avatar-text">NV</span></div><div class="leaderboard-info"><p class="leaderboard-name">NOVA_VANTAGE</p><p class="leaderboard-handle">ID: PMR-0042 · Crypto Oracle</p></div></div>
          <div class="lb-stat-cell"><p class="leaderboard-stat-value positive">89%</p><p class="leaderboard-stat-label">Win Rate</p></div>
          <div class="lb-stat-cell"><p class="leaderboard-stat-value positive">+61,800 PMR</p><p class="leaderboard-stat-label">Total Profit</p></div>
          <div class="lb-stat-cell"><p class="leaderboard-stat-value">204</p><p class="leaderboard-stat-label">Positions</p></div>
        </div>
        <div class="leaderboard-row" style="border:1px solid rgba(205,127,50,0.1);">
          <div class="leaderboard-player-sticky"><span class="leaderboard-rank leaderboard-rank-3">3</span><div class="leaderboard-avatar"><span class="leaderboard-avatar-text">AR</span></div><div class="leaderboard-info"><p class="leaderboard-name">ARCHITECT_01</p><p class="leaderboard-handle">ID: PMR-0108 · Tech Analyst</p></div></div>
          <div class="lb-stat-cell"><p class="leaderboard-stat-value positive">81%</p><p class="leaderboard-stat-label">Win Rate</p></div>
          <div class="lb-stat-cell"><p class="leaderboard-stat-value positive">+44,500 PMR</p><p class="leaderboard-stat-label">Total Profit</p></div>
          <div class="lb-stat-cell"><p class="leaderboard-stat-value">316</p><p class="leaderboard-stat-label">Positions</p></div>
        </div>
        <div class="leaderboard-row">
          <div class="leaderboard-player-sticky"><span class="leaderboard-rank leaderboard-rank-other">4</span><div class="leaderboard-avatar"><span class="leaderboard-avatar-text">QX</span></div><div class="leaderboard-info"><p class="leaderboard-name">QUANT_X99</p><p class="leaderboard-handle">ID: PMR-0201 · Multi-Market</p></div></div>
          <div class="lb-stat-cell"><p class="leaderboard-stat-value">78%</p><p class="leaderboard-stat-label">Win Rate</p></div>
          <div class="lb-stat-cell"><p class="leaderboard-stat-value positive">+38,200 PMR</p><p class="leaderboard-stat-label">Total Profit</p></div>
          <div class="lb-stat-cell"><p class="leaderboard-stat-value">287</p><p class="leaderboard-stat-label">Positions</p></div>
        </div>
        <div class="leaderboard-row">
          <div class="leaderboard-player-sticky"><span class="leaderboard-rank leaderboard-rank-other">5</span><div class="leaderboard-avatar"><span class="leaderboard-avatar-text">SE</span></div><div class="leaderboard-info"><p class="leaderboard-name">SIGNAL_ECHO</p><p class="leaderboard-handle">ID: PMR-0399 · Sports Expert</p></div></div>
          <div class="lb-stat-cell"><p class="leaderboard-stat-value">75%</p><p class="leaderboard-stat-label">Win Rate</p></div>
          <div class="lb-stat-cell"><p class="leaderboard-stat-value positive">+29,100 PMR</p><p class="leaderboard-stat-label">Total Profit</p></div>
          <div class="lb-stat-cell"><p class="leaderboard-stat-value">412</p><p class="leaderboard-stat-label">Positions</p></div>
        </div>
        <div class="leaderboard-row">
          <div class="leaderboard-player-sticky"><span class="leaderboard-rank leaderboard-rank-other">6</span><div class="leaderboard-avatar"><span class="leaderboard-avatar-text">VG</span></div><div class="leaderboard-info"><p class="leaderboard-name">VANGUARD_11</p><p class="leaderboard-handle">ID: PMR-0502 · Science Focus</p></div></div>
          <div class="lb-stat-cell"><p class="leaderboard-stat-value">72%</p><p class="leaderboard-stat-label">Win Rate</p></div>
          <div class="lb-stat-cell"><p class="leaderboard-stat-value positive">+22,600 PMR</p><p class="leaderboard-stat-label">Total Profit</p></div>
          <div class="lb-stat-cell"><p class="leaderboard-stat-value">195</p><p class="leaderboard-stat-label">Positions</p></div>
        </div>
        <div class="leaderboard-row">
          <div class="leaderboard-player-sticky"><span class="leaderboard-rank leaderboard-rank-other">7</span><div class="leaderboard-avatar"><span class="leaderboard-avatar-text">OR</span></div><div class="leaderboard-info"><p class="leaderboard-name">ORACLE_NINE</p><p class="leaderboard-handle">ID: PMR-0618 · Crypto / Finance</p></div></div>
          <div class="lb-stat-cell"><p class="leaderboard-stat-value">70%</p><p class="leaderboard-stat-label">Win Rate</p></div>
          <div class="lb-stat-cell"><p class="leaderboard-stat-value positive">+18,900 PMR</p><p class="leaderboard-stat-label">Total Profit</p></div>
          <div class="lb-stat-cell"><p class="leaderboard-stat-value">344</p><p class="leaderboard-stat-label">Positions</p></div>
        </div>
        <!-- Current User -->
        <div class="leaderboard-row" style="border:1px solid rgba(208,188,255,0.2);background:rgba(160,120,255,0.06);">
          <div class="leaderboard-player-sticky" style="background:color-mix(in srgb,var(--surface-low),rgba(160,120,255,0.1));"><span class="leaderboard-rank" style="color:var(--tertiary);font-size:1rem;">142</span><div class="leaderboard-avatar" style="border-color:rgba(208,188,255,0.4);"><span class="leaderboard-avatar-text" style="color:var(--tertiary);">ME</span></div><div class="leaderboard-info"><p class="leaderboard-name" style="color:var(--tertiary);">YOU · ARCHITECT_01</p><p class="leaderboard-handle">ID: PMR-4201 · Your current rank</p></div></div>
          <div class="lb-stat-cell"><p class="leaderboard-stat-value" style="color:var(--tertiary);">68%</p><p class="leaderboard-stat-label">Win Rate</p></div>
          <div class="lb-stat-cell"><p class="leaderboard-stat-value positive">+4,482 PMR</p><p class="leaderboard-stat-label">Total Profit</p></div>
          <div class="lb-stat-cell"><p class="leaderboard-stat-value">8</p><p class="leaderboard-stat-label">Positions</p></div>
        </div>
      </div>

      </div>
      </div>

      <div style="display:flex;justify-content:center;margin-top:var(--sp-10);">
        <button class="btn btn-secondary">Load More Operators</button>
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
      <span class="footer-copyright">&copy; 2024 POLYMIRROR PROTOCOL. ALL RIGHTS RESERVED.</span>
    </div>
  </footer>

  <!-- MOBILE NAV -->
  <nav class="mobile-nav">
    <router-link to="/markets" class="mobile-nav-item"><span class="material-symbols-outlined">explore</span><span class="mobile-nav-label">Markets</span></router-link>
    <router-link to="/dashboard" class="mobile-nav-item"><span class="material-symbols-outlined">dashboard</span><span class="mobile-nav-label">Dash</span></router-link>
    <router-link to="/leaderboard" class="mobile-nav-item active"><span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1;">leaderboard</span><span class="mobile-nav-label">Ranks</span></router-link>
    <router-link to="/profile" class="mobile-nav-item"><span class="material-symbols-outlined">account_circle</span><span class="mobile-nav-label">Profile</span></router-link>
  </nav>
</template>

<style scoped></style>
