<script setup>
</script>

<template>
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
      <router-link to="/register" class="btn btn-ghost btn-sm">Sign In</router-link>
      <router-link to="/login" class="btn btn-primary">Log In</router-link>
    </div>
  </nav>

  <main>
    <!-- HERO -->
    <section class="hero">
      <div class="hero-glow-1"></div>
      <div class="hero-glow-2"></div>
      <div class="hero-grid">
        <div class="hero-content">
          <span class="hero-eyebrow">PolyMirror</span>
          <h1 class="hero-title">Trade <span style="color:var(--primary);text-shadow:var(--glow-text);">Polymarket</span><br>risk-free.</h1>
          <p class="hero-subtitle">
            Experience the high-stakes thrill of prediction markets without the capital risk.
            Master the odds in a luminous digital arena built for precision.
          </p>
          <div class="hero-actions">
            <router-link to="/register" class="btn btn-primary btn-lg">Get Started</router-link>
            <router-link to="/markets" class="btn btn-secondary btn-lg">View Markets</router-link>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-image-wrap">
            <img src="@/assets/images/hero-visual.jpg" alt="PolyMirror prediction arena">
            <div style="position:absolute;inset:0;background:linear-gradient(to top,var(--surface-base),transparent);opacity:0.5;pointer-events:none;"></div>
          </div>
          <div class="hero-float-chip hero-float-chip-tr">
            <div class="glass-chip" style="border-radius:var(--radius-2xl);padding:var(--sp-4) var(--sp-5);">
              <div class="hero-pulse-dot"></div>
              <span class="text-label-sm uppercase" style="letter-spacing:.15em;font-weight:700;">Live: 4,209 Markets</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- VALUE PROPS -->
    <section class="section" style="background:var(--surface-low);">
      <div class="container">
        <div class="section-header-row">
          <div>
            <span class="section-eyebrow">The Protocol</span>
            <h2 class="section-title">Master the Markets</h2>
          </div>
          <p class="section-subtitle">
            Our precision prediction environment is designed for competitive analysis and risk-free growth
            using the Poly Mirror Token.
          </p>
        </div>
        <div class="grid-3">
          <div class="card-feature">
            <div style="width:5rem;height:5rem;background:rgba(173,198,255,0.08);border-radius:var(--radius-xl);display:flex;align-items:center;justify-content:center;border:1px solid rgba(173,198,255,0.15);flex-shrink:0;">
              <span class="material-symbols-outlined text-primary" style="font-size:3rem;">school</span>
            </div>
            <h3 class="text-headline-lg">Practice</h3>
            <p style="font-size:0.9375rem;line-height:1.75;color:var(--on-surface-variant);">
              Refine your intuition with simulated credits. No losses, only lessons in market dynamics and behavioral psychology.
            </p>
          </div>
          <div class="card-feature-primary">
            <div style="width:5rem;height:5rem;background:rgba(255,255,255,0.15);border-radius:var(--radius-xl);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(8px);flex-shrink:0;">
              <span class="material-symbols-outlined text-white" style="font-size:3rem;">military_tech</span>
            </div>
            <h3 class="text-headline-lg text-white">Compete</h3>
            <p style="font-size:0.9375rem;line-height:1.75;color:#fff;opacity:0.9;">
              Climb the global leaderboard. Pit your forecasts against the world's most accurate prediction engines.
            </p>
          </div>
          <div class="card-feature">
            <div style="width:5rem;height:5rem;background:rgba(77,142,255,0.08);border-radius:var(--radius-xl);display:flex;align-items:center;justify-content:center;border:1px solid rgba(173,198,255,0.15);flex-shrink:0;">
              <span class="material-symbols-outlined text-primary" style="font-size:3rem;">analytics</span>
            </div>
            <h3 class="text-headline-lg">Master</h3>
            <p style="font-size:0.9375rem;line-height:1.75;color:var(--on-surface-variant);">
              Analyze deep liquidity trends and historical resolution data to transform from a casual guesser to a market maven.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED MARKETS -->
    <section class="section">
      <div class="container">
        <div class="section-header-row" style="margin-bottom:var(--sp-10);">
          <div>
            <span class="section-eyebrow">Live Markets</span>
            <h2 class="section-title">Featured Predictions</h2>
          </div>
          <router-link to="/markets" class="btn btn-secondary btn-sm">All Markets</router-link>
        </div>
        <div class="category-grid">
          <!-- POLITICS -->
          <div style="display:flex;flex-direction:column;gap:var(--sp-4);">
            <div class="flex items-center justify-between" style="padding-bottom:var(--sp-4);border-bottom:1px solid rgba(173,198,255,0.08);">
              <h3 class="text-headline-sm uppercase" style="letter-spacing:.1em;">Politics</h3>
              <router-link to="/markets" class="text-label-sm text-primary" style="font-weight:700;">View All</router-link>
            </div>
            <div class="card" style="padding:var(--sp-6);cursor:pointer;">
              <h5 class="text-title-lg" style="line-height:1.4;margin-bottom:var(--sp-6);">Who will win the 2024 Presidential Election?</h5>
              <div class="odds-bar-wrapper">
                <div class="odds-labels">
                  <span class="odds-label-yes">Democrat</span>
                  <span class="odds-label-no">Republican</span>
                </div>
                <div class="odds-bar odds-bar-lg">
                  <div class="odds-bar-fill" style="width:52%"></div>
                </div>
                <div class="flex justify-between">
                  <span class="text-label-md text-primary" style="font-weight:700;">52%</span>
                  <span class="text-label-md text-muted" style="font-weight:700;">48%</span>
                </div>
              </div>
            </div>
          </div>
          <!-- SPORTS -->
          <div style="display:flex;flex-direction:column;gap:var(--sp-4);">
            <div class="flex items-center justify-between" style="padding-bottom:var(--sp-4);border-bottom:1px solid rgba(173,198,255,0.08);">
              <h3 class="text-headline-sm uppercase" style="letter-spacing:.1em;">Sports</h3>
              <router-link to="/markets" class="text-label-sm text-primary" style="font-weight:700;">View All</router-link>
            </div>
            <div class="card-elevated" style="padding:var(--sp-6);cursor:pointer;overflow:hidden;position:relative;">
              <span class="badge badge-primary" style="position:relative;">Live</span>
              <h5 class="text-title-lg" style="line-height:1.4;margin:var(--sp-4) 0 var(--sp-6);position:relative;">Next Superbowl Champion?</h5>
              <div class="glass" style="display:flex;justify-content:space-between;align-items:center;padding:var(--sp-3) var(--sp-4);border-radius:var(--radius-lg);border:1px solid rgba(173,198,255,0.15);position:relative;">
                <span class="text-title-md" style="font-weight:700;">KC Chiefs</span>
                <span class="text-label-md text-primary" style="font-weight:900;">22% Odds</span>
              </div>
            </div>
          </div>
          <!-- CRYPTO -->
          <div style="display:flex;flex-direction:column;gap:var(--sp-4);">
            <div class="flex items-center justify-between" style="padding-bottom:var(--sp-4);border-bottom:1px solid rgba(173,198,255,0.08);">
              <h3 class="text-headline-sm uppercase" style="letter-spacing:.1em;">Crypto</h3>
              <router-link to="/markets" class="text-label-sm text-primary" style="font-weight:700;">View All</router-link>
            </div>
            <div class="market-row" style="cursor:pointer;">
              <div>
                <p class="text-title-md">BTC reach $100k before May?</p>
                <p class="market-row-meta">Vol: 8.2M Poly</p>
              </div>
              <span class="text-headline-sm text-primary" style="font-weight:900;">62%</span>
            </div>
            <div class="market-row" style="cursor:pointer;">
              <div>
                <p class="text-title-md">ETH above $4,500 by July?</p>
                <p class="market-row-meta">Vol: 2.1M Poly</p>
              </div>
              <span class="text-headline-sm text-primary" style="font-weight:900;">34%</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- QUOTE -->
    <section style="padding:var(--sp-24) var(--sp-6);position:relative;">
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:40rem;height:24rem;background:rgba(173,198,255,0.05);border-radius:50%;filter:blur(6rem);pointer-events:none;z-index:0;"></div>
      <div style="position:relative;z-index:1;max-width:42rem;margin-inline:auto;text-align:center;">
        <div style="font-family:Georgia,serif;font-size:4.5rem;line-height:1;color:var(--primary);opacity:0.22;user-select:none;margin-bottom:var(--sp-2);">&ldquo;</div>
        <blockquote style="font-family:Georgia,serif;font-size:clamp(1rem,1.8vw,1.2rem);font-style:italic;line-height:1.85;color:var(--on-surface);opacity:0.88;margin:0;padding:0;">
          And the wise ones bet heavily when the world offers them that opportunity. They bet big when they have the odds. And the rest of the time, they don&rsquo;t. It&rsquo;s just that simple.
        </blockquote>
        <div style="margin-top:var(--sp-8);display:flex;flex-direction:column;align-items:center;gap:var(--sp-2);">
          <div style="width:2.5rem;height:1px;background:var(--primary);opacity:0.35;margin-bottom:var(--sp-2);"></div>
          <p style="font-family:var(--font-label);font-size:0.75rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--primary);opacity:0.75;">Charlie Munger</p>
          <p style="font-family:var(--font-label);font-size:0.625rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--on-surface-variant);opacity:0.6;">Berkshire Hathaway</p>
        </div>
      </div>
    </section>
  </main>

  <!-- FOOTER -->
  <footer class="footer" style="margin-top:var(--sp-24);">
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
        <div class="footer-status">
          <div class="hero-pulse-dot"></div>
          Mainnet Live
        </div>
        <div class="footer-status">
          <span class="material-symbols-outlined" style="font-size:.875rem;">terminal</span>
          v1.2.0-Alpha
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
