<script setup>
</script>

<template>
  <div class="bg-glow-blob bg-glow-blob-tr"></div>

  <!-- TOP NAVIGATION -->
  <nav class="top-nav">
    <div class="flex items-center gap-8">
      <router-link to="/" class="nav-brand">
        <span class="material-symbols-outlined text-primary" style="font-size:1.75rem;">hub</span>
        PolyMirror
      </router-link>
      <nav class="nav-links">
        <router-link to="/markets" class="nav-link">Markets</router-link>
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
      <router-link to="/profile" class="btn btn-ghost btn-sm" style="display:flex;align-items:center;gap:var(--sp-2);">
        <span class="material-symbols-outlined" style="font-size:1.1rem;">account_circle</span>
        <span class="hide-on-mobile">Profile</span>
      </router-link>
      <router-link to="/login" class="btn btn-primary">Log In</router-link>
      <button class="nav-search-icon" aria-label="Search"><span class="material-symbols-outlined">search</span></button>
      <button class="hamburger-btn" aria-label="Menu"><span class="material-symbols-outlined">menu</span></button>
    </div>
  </nav>

  <div class="mobile-menu">
    <router-link to="/markets" class="mobile-menu-link">Markets</router-link>
    <router-link to="/dashboard" class="mobile-menu-link">Dashboard</router-link>
    <router-link to="/leaderboard" class="mobile-menu-link">Leaderboard</router-link>
    <router-link to="/faq" class="mobile-menu-link">FAQ</router-link>
    <div class="mobile-menu-divider"></div>
    <div class="mobile-menu-actions">
      <router-link to="/profile" class="btn btn-secondary">Profile</router-link>
      <router-link to="/login" class="btn btn-primary">Log In</router-link>
    </div>
  </div>

  <main style="padding-top:var(--nav-height);padding-bottom:var(--sp-24);">

    <!-- Page Header -->
    <div style="text-align:center;padding:calc(var(--sp-14) + 3rem) var(--sp-6) var(--sp-10);position:relative;">
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:24rem;height:16rem;background:rgba(173,198,255,0.05);border-radius:50%;filter:blur(4rem);pointer-events:none;"></div>
      <div style="position:relative;z-index:1;">
        <p class="section-eyebrow" style="text-align:center;font-size:1.5rem;letter-spacing:.05em;margin-bottom:var(--sp-6);">Account Settings</p>
        <div style="display:flex;justify-content:center;margin-bottom:var(--sp-5);">
          <div class="profile-avatar-ring">
            <span class="profile-avatar-initials">V1</span>
            <button style="position:absolute;bottom:-4px;right:-4px;width:2rem;height:2rem;border-radius:50%;background:var(--surface-high);border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;cursor:pointer;" title="Edit avatar">
              <span class="material-symbols-outlined" style="font-size:0.9rem;color:var(--on-surface-variant);">edit</span>
            </button>
          </div>
        </div>
        <h1 style="font-family:var(--font-headline);font-size:clamp(1.75rem,4vw,2.5rem);font-weight:900;letter-spacing:-.02em;color:var(--primary);text-shadow:var(--glow-text);margin-bottom:var(--sp-2);">VANGUARD_01</h1>
        <p style="font-family:var(--font-label);font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--on-surface-variant);">Member since March 2024</p>
      </div>
    </div>

    <!-- Settings sections -->
    <div class="profile-section" style="display:flex;flex-direction:column;gap:var(--sp-6);">

      <!-- 1. Account Information -->
      <div class="settings-card">
        <p class="settings-card-title">Account Information</p>
        <div class="settings-row">
          <div><p class="settings-row-label">Email</p><p class="settings-row-value">operator@network.net</p></div>
          <button class="btn-edit"><span class="material-symbols-outlined" style="font-size:0.875rem;">edit</span>Edit</button>
        </div>
        <div class="settings-row">
          <div><p class="settings-row-label">Username</p><p class="settings-row-value">VANGUARD_01</p></div>
          <button class="btn-edit"><span class="material-symbols-outlined" style="font-size:0.875rem;">edit</span>Edit</button>
        </div>
        <div class="settings-row">
          <div><p class="settings-row-label">User ID</p><p class="settings-row-value muted">PMR-4201</p></div>
          <span style="font-family:var(--font-label);font-size:0.625rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--outline);background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-sm);padding:var(--sp-1) var(--sp-2);">Fixed</span>
        </div>
      </div>

      <!-- 2. Security -->
      <div class="settings-card">
        <p class="settings-card-title">Security</p>
        <div class="settings-row">
          <div><p class="settings-row-label">Password</p><p class="settings-row-value" style="letter-spacing:.15em;">••••••••••••</p></div>
          <button class="btn-edit"><span class="material-symbols-outlined" style="font-size:0.875rem;">lock</span>Change</button>
        </div>
        <div class="settings-row">
          <div><p class="settings-row-label">Two-Factor Authentication</p><p class="settings-row-value muted">Disabled</p></div>
          <button class="btn-edit"><span class="material-symbols-outlined" style="font-size:0.875rem;">shield</span>Enable</button>
        </div>
      </div>

      <!-- 3. Preferences -->
      <div class="settings-card">
        <p class="settings-card-title">Preferences</p>
        <div class="settings-row">
          <div><p class="settings-row-label">Email Notifications</p><p class="settings-row-value muted">Market updates and results</p></div>
          <div class="toggle-wrap">
            <span class="toggle-label" id="notif-label">On</span>
            <label class="toggle" aria-label="Email Notifications">
              <input type="checkbox" checked @change="(e) => e.target.previousElementSibling.textContent = e.target.checked ? 'On' : 'Off'">
              <span class="toggle-track"></span>
            </label>
          </div>
        </div>
        <div class="settings-row">
          <div><p class="settings-row-label">Trade Confirmations</p><p class="settings-row-value muted">Confirm before placing bets</p></div>
          <div class="toggle-wrap">
            <span class="toggle-label">On</span>
            <label class="toggle" aria-label="Trade Confirmations">
              <input type="checkbox" checked>
              <span class="toggle-track"></span>
            </label>
          </div>
        </div>
        <div class="settings-row">
          <div><p class="settings-row-label">Leaderboard Visibility</p><p class="settings-row-value muted">Show profile on leaderboard</p></div>
          <div class="toggle-wrap">
            <span class="toggle-label" style="min-width:3.5rem;">Public</span>
            <label class="toggle" aria-label="Leaderboard Visibility">
              <input type="checkbox" checked>
              <span class="toggle-track"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- 4. Danger Zone -->
      <div class="settings-card danger">
        <p class="settings-card-title">Danger Zone</p>
        <div class="settings-row">
          <div>
            <p style="font-size:0.9375rem;color:var(--on-surface);font-weight:500;margin-bottom:var(--sp-1);">Delete Account</p>
            <p style="font-size:0.8125rem;color:var(--on-surface-variant);">This action cannot be undone.</p>
          </div>
          <button class="btn-danger">
            <span class="material-symbols-outlined" style="font-size:1rem;">delete_forever</span>
            Delete
          </button>
        </div>
      </div>

    </div>
  </main>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="flex items-center gap-2" style="margin-bottom:var(--sp-4);">
          <span class="material-symbols-outlined text-primary">hub</span>
          <span style="font-family:var(--font-headline);font-size:1.125rem;font-weight:700;color:var(--on-surface);">PolyMirror</span>
        </div>
        <p>The precision prediction protocol for the next generation of analysts. Trade narratives, master the data, and own the future.</p>
      </div>
      <div>
        <span class="footer-col-title">Protocol</span>
        <a href="#" class="footer-link">Documentation</a>
        <a href="#" class="footer-link">Terms of Service</a>
        <a href="#" class="footer-link">Privacy Policy</a>
      </div>
      <div>
        <span class="footer-col-title">Connect</span>
        <a href="#" class="footer-link">Discord</a>
        <a href="#" class="footer-link">Twitter / X</a>
        <router-link to="/faq" class="footer-link">FAQ</router-link>
      </div>
    </div>
    <div class="footer-bottom">
      <span class="footer-copyright">&copy; 2024 PolyMirror. Powered by HTWG.</span>
      <div class="flex gap-8 items-center">
        <div class="footer-status"><div class="hero-pulse-dot"></div>Mainnet Live</div>
        <div class="footer-status"><span class="material-symbols-outlined" style="font-size:.875rem;">terminal</span>v1.2.0-Alpha</div>
      </div>
    </div>
  </footer>

  <!-- MOBILE NAV -->
  <nav class="mobile-nav">
    <router-link to="/markets" class="mobile-nav-item"><span class="material-symbols-outlined">explore</span><span class="mobile-nav-label">Markets</span></router-link>
    <router-link to="/dashboard" class="mobile-nav-item"><span class="material-symbols-outlined">dashboard</span><span class="mobile-nav-label">Dash</span></router-link>
    <router-link to="/leaderboard" class="mobile-nav-item"><span class="material-symbols-outlined">leaderboard</span><span class="mobile-nav-label">Ranks</span></router-link>
    <router-link to="/profile" class="mobile-nav-item active"><span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1;">account_circle</span><span class="mobile-nav-label">Profile</span></router-link>
  </nav>
</template>

<style scoped>
.profile-section { max-width: 42rem; margin-inline: auto; padding: 0 var(--sp-6); }
.settings-card { background: var(--surface-low); border: 1px solid rgba(255,255,255,0.05); border-radius: var(--radius-2xl); overflow: hidden; }
.settings-card-title { font-family: var(--font-label); font-size: 0.625rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--outline); padding: var(--sp-5) var(--sp-6) var(--sp-3); }
.settings-row { display: flex; align-items: center; justify-content: space-between; gap: var(--sp-6); padding: var(--sp-5) var(--sp-6); border-top: 1px solid rgba(255,255,255,0.04); }
.settings-row:first-of-type { border-top: none; }
.settings-row-label { font-family: var(--font-label); font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--on-surface-variant); margin-bottom: 2px; }
.settings-row-value { font-size: 0.9375rem; color: var(--on-surface); font-weight: 500; }
.settings-row-value.muted { color: var(--on-surface-variant); font-size: 0.875rem; }
.btn-edit { display: inline-flex; align-items: center; gap: var(--sp-1); font-family: var(--font-label); font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--primary); background: rgba(173,198,255,0.08); border: 1px solid rgba(173,198,255,0.15); border-radius: var(--radius-md); padding: var(--sp-2) var(--sp-3); cursor: pointer; transition: background var(--t-base), border-color var(--t-base); flex-shrink: 0; }
.btn-edit:hover { background: rgba(173,198,255,0.15); border-color: rgba(173,198,255,0.3); }
.toggle-wrap { display: flex; align-items: center; gap: var(--sp-3); flex-shrink: 0; }
.toggle-label { font-family: var(--font-label); font-size: 0.75rem; font-weight: 600; color: var(--on-surface-variant); min-width: 2.5rem; }
.toggle { position: relative; width: 2.75rem; height: 1.5rem; flex-shrink: 0; }
.toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
.toggle-track { position: absolute; inset: 0; border-radius: 99px; background: var(--surface-high); border: 1px solid rgba(255,255,255,0.1); cursor: pointer; transition: background var(--t-base), border-color var(--t-base); }
.toggle-track::after { content: ''; position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; border-radius: 50%; background: var(--outline); transition: transform 200ms ease, background var(--t-base); }
.toggle input:checked + .toggle-track { background: rgba(173,198,255,0.18); border-color: rgba(173,198,255,0.35); }
.toggle input:checked + .toggle-track::after { transform: translateX(20px); background: var(--primary); }
.settings-card.danger { border-color: rgba(255,75,75,0.2); }
.settings-card.danger .settings-card-title { color: var(--error); }
.btn-danger { display: inline-flex; align-items: center; gap: var(--sp-2); font-family: var(--font-label); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--error); background: transparent; border: 1px solid rgba(255,180,171,0.3); border-radius: var(--radius-lg); padding: var(--sp-3) var(--sp-5); cursor: pointer; transition: background var(--t-base), border-color var(--t-base); flex-shrink: 0; }
.btn-danger:hover { background: rgba(255,180,171,0.08); border-color: rgba(255,180,171,0.5); }
.profile-avatar-ring { width: 6.25rem; height: 6.25rem; border-radius: 50%; background: linear-gradient(135deg, rgba(173,198,255,0.2), rgba(160,120,255,0.15)); border: 2px solid rgba(173,198,255,0.25); display: flex; align-items: center; justify-content: center; position: relative; }
.profile-avatar-initials { font-family: var(--font-headline); font-size: 2rem; font-weight: 900; color: var(--primary); letter-spacing: -.02em; }
</style>
