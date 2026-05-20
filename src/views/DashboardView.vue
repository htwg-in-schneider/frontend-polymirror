<script setup>
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
        <router-link to="/markets" class="nav-link">Markets</router-link>
        <router-link to="/dashboard" class="nav-link active">Dashboard</router-link>
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
      <button class="nav-search-icon" aria-label="Search"><span class="material-symbols-outlined">search</span></button>
      <button class="hamburger-btn" aria-label="Menu"><span class="material-symbols-outlined">menu</span></button>
    </div>
  </nav>

  <div class="mobile-menu">
    <router-link to="/markets" class="mobile-menu-link">Markets</router-link>
    <router-link to="/dashboard" class="mobile-menu-link active">Dashboard</router-link>
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
  <main class="page-with-sidebar app-main" style="padding-top:calc(var(--nav-height) + 2rem);">

    <!-- Balance + Performance Row -->
    <div class="grid-2" style="margin-bottom:var(--sp-8);">
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
          <h2 class="text-label-sm text-primary uppercase tracking-widest mb-2" style="opacity:.7;letter-spacing:.2em;">Total Estimated Balance</h2>
          <div class="balance-value-wrap">
            <span class="stat-value-xl" style="color:#ffffff;text-shadow:0 0 5px rgba(255,255,255,0.15);">12,482.90</span>
            <div class="balance-currency-badge">
              <span style="font-family:var(--font-headline);font-weight:700;color:var(--on-primary-cont);font-size:.875rem;">Poly</span>
            </div>
          </div>
          <div class="balance-stats">
            <div class="stat-inline">
              <span class="stat-label">Daily ROI</span>
              <span style="font-family:var(--font-headline);font-weight:700;color:var(--primary);">+12.4%</span>
            </div>
            <div class="stat-inline">
              <span class="stat-label">Active Positions</span>
              <span style="font-family:var(--font-headline);font-weight:700;color:var(--on-surface);">8</span>
            </div>
            <div class="stat-inline">
              <span class="stat-label">Win Rate</span>
              <span style="font-family:var(--font-headline);font-weight:700;color:var(--on-surface);">68%</span>
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

    <!-- Positions + Widgets -->
    <div class="dash-main-grid">
      <!-- Positions Table -->
      <div class="glass-panel" style="padding:0;overflow:hidden;">
        <div class="panel-header-row" style="padding:var(--sp-6) var(--sp-8);border-bottom:1px solid rgba(66,71,84,0.15);display:flex;justify-content:space-between;align-items:center;">
          <h3 class="text-headline-sm flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">balance</span>
            Active Positions
          </h3>
          <div class="flex gap-2">
            <button class="btn btn-secondary btn-sm">All Markets</button>
            <button class="btn btn-ghost btn-sm">History</button>
          </div>
        </div>
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Market Identifier</th>
                <th>Position</th>
                <th>Odds</th>
                <th>Investment</th>
                <th>Est. Payout</th>
                <th style="text-align:right;">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><div class="table-market-id"><div class="table-market-icon"><span class="material-symbols-outlined">public</span></div><div><p class="table-market-name">US 2024 Election Result</p><p class="table-market-code">ID: Poly-POL-982</p></div></div></td>
                <td><span class="position-yes">Yes</span></td>
                <td style="font-family:var(--font-headline);font-weight:700;">4.82x</td>
                <td style="font-family:var(--font-label);color:var(--on-surface-variant);">500.00 Poly</td>
                <td class="stat-payout">2,410.00 Poly</td>
                <td style="text-align:right;"><button class="btn btn-ghost btn-sm"><span class="material-symbols-outlined">more_vert</span></button></td>
              </tr>
              <tr>
                <td><div class="table-market-id"><div class="table-market-icon"><span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1;">currency_bitcoin</span></div><div><p class="table-market-name">BTC &gt; $100k by Q4</p><p class="table-market-code">ID: Poly-CRY-012</p></div></div></td>
                <td><span class="position-no">No</span></td>
                <td style="font-family:var(--font-headline);font-weight:700;">1.25x</td>
                <td style="font-family:var(--font-label);color:var(--on-surface-variant);">1,200.00 Poly</td>
                <td class="stat-payout">1,500.00 Poly</td>
                <td style="text-align:right;"><button class="btn btn-ghost btn-sm"><span class="material-symbols-outlined">more_vert</span></button></td>
              </tr>
              <tr>
                <td><div class="table-market-id"><div class="table-market-icon"><span class="material-symbols-outlined">movie</span></div><div><p class="table-market-name">Oscar Best Picture 2024</p><p class="table-market-code">ID: Poly-ENT-441</p></div></div></td>
                <td><span class="position-yes">Yes</span></td>
                <td style="font-family:var(--font-headline);font-weight:700;">2.10x</td>
                <td style="font-family:var(--font-label);color:var(--on-surface-variant);">250.00 Poly</td>
                <td class="stat-payout">525.00 Poly</td>
                <td style="text-align:right;"><button class="btn btn-ghost btn-sm"><span class="material-symbols-outlined">more_vert</span></button></td>
              </tr>
              <tr>
                <td><div class="table-market-id"><div class="table-market-icon"><span class="material-symbols-outlined">account_balance</span></div><div><p class="table-market-name">FED RATE CUT IN MARCH</p><p class="table-market-code">ID: Poly-FIN-223</p></div></div></td>
                <td><span class="position-no">No</span></td>
                <td style="font-family:var(--font-headline);font-weight:700;">0.85x</td>
                <td style="font-family:var(--font-label);color:var(--on-surface-variant);">800.00 Poly</td>
                <td class="stat-payout" style="color:var(--error);">−120.00 Poly</td>
                <td style="text-align:right;"><button class="btn btn-ghost btn-sm"><span class="material-symbols-outlined">more_vert</span></button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Side Widgets -->
      <div style="display:flex;flex-direction:column;gap:var(--sp-6);">
        <div class="glass-panel">
          <h3 class="text-label-sm text-primary uppercase tracking-widest mb-4" style="opacity:.7;letter-spacing:.2em;">Trending Prediction</h3>
          <div style="border-radius:var(--radius-md);overflow:hidden;height:8rem;position:relative;margin-bottom:var(--sp-4);background:var(--surface-high);">
            <div style="position:absolute;inset:0;background:linear-gradient(to top,var(--surface),transparent);"></div>
            <div style="position:absolute;bottom:var(--sp-2);left:var(--sp-2);right:var(--sp-2);">
              <p style="font-family:var(--font-headline);font-size:.65rem;font-weight:900;text-transform:uppercase;line-height:1.3;color:#fff;">Will Neuralink gain FDA approval this month?</p>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-1">
              <span class="material-symbols-outlined text-primary" style="font-size:.75rem;">payments</span>
              <span class="text-label-sm text-muted">Vol: $1.2M</span>
            </div>
            <button class="btn btn-ghost btn-sm text-primary" style="color:var(--primary);font-weight:700;">Trade Now</button>
          </div>
        </div>
        <div class="glass-panel" style="flex:1;">
          <h3 class="text-label-sm text-primary uppercase tracking-widest mb-4" style="opacity:.7;letter-spacing:.2em;">System Terminal</h3>
          <div class="terminal" style="height:10rem;">
            <p>&gt; Initializing secure proxy...</p>
            <p>&gt; Connection established to NODE-08</p>
            <p class="terminal-line-highlight">&gt; [Update] Market ID 982 shift +0.4%</p>
            <p>&gt; Liquidating dummy accounts...</p>
            <p>&gt; Syncing Poly Protocol v2.4.1</p>
            <p class="terminal-line-bright">&gt; Oracle Status: SYNCHRONIZED</p>
            <p class="terminal-cursor">&gt; _</p>
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
      <span class="footer-copyright">&copy; 2024 POLYMIRROR PROTOCOL. ALL RIGHTS RESERVED.</span>
    </div>
  </footer>

  <!-- MOBILE NAV -->
  <nav class="mobile-nav">
    <router-link to="/markets" class="mobile-nav-item"><span class="material-symbols-outlined">explore</span><span class="mobile-nav-label">Markets</span></router-link>
    <router-link to="/dashboard" class="mobile-nav-item active"><span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1;">dashboard</span><span class="mobile-nav-label">Dash</span></router-link>
    <router-link to="/leaderboard" class="mobile-nav-item"><span class="material-symbols-outlined">leaderboard</span><span class="mobile-nav-label">Ranks</span></router-link>
    <router-link to="/profile" class="mobile-nav-item"><span class="material-symbols-outlined">account_circle</span><span class="mobile-nav-label">Profile</span></router-link>
  </nav>
</template>

<style scoped></style>
