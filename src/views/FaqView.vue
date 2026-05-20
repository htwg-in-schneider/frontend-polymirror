<script setup>
import { ref } from 'vue';

const openItem = ref(null);

function toggle(id) {
  openItem.value = openItem.value === id ? null : id;
}

const faqs = [
  { id: 1, q: 'What is PolyMirror?', a: 'PolyMirror is a paper trading platform for prediction markets. You can bet on real-world events with virtual credits — politics, sports, crypto and more. The odds are mirrored live from Polymarket, but you don\'t risk any real money.' },
  { id: 2, q: 'How does paper trading work?', a: 'Paper trading means simulated trading without real money. You get virtual credits to practice before trading with real money on platforms like Polymarket.' },
  { id: 3, q: 'Where do the odds / prices come from?', a: 'All odds are pulled in real-time from Polymarket. When probabilities change there, you\'ll see it instantly on PolyMirror.' },
  { id: 4, q: 'Is PolyMirror free?', a: 'Yes, completely free. You just need an account and can start immediately.' },
  { id: 5, q: 'Can I lose real money?', a: 'No. PolyMirror uses only virtual credits. There is no way to deposit or lose real money.' },
  { id: 6, q: 'How do I get started?', a: 'Create an account and you\'ll automatically receive 1,000 credits. Then you can start betting on markets right away.' },
  { id: 7, q: 'What are credits?', a: 'Credits are the virtual currency on PolyMirror. Every new user starts with 1,000 credits. You bet credits on YES or NO outcomes and win based on the odds.' },
  { id: 8, q: 'How is a market resolved?', a: 'When the event occurs (e.g. an election is decided), the market is resolved. If you bet on the correct outcome, you receive your winnings based on the odds at the time of your bet.' },
  { id: 9, q: 'What categories are available?', a: 'Politics, Sports, Crypto, Iran, Finance, Geopolitics, Tech, Culture, Economy, Weather, Mentions, and Elections.' },
  { id: 10, q: 'How does the leaderboard work?', a: 'The leaderboard shows top traders ranked by profit. Your profit is your current credit balance minus the 1,000 starting credits.' },
];
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
        <router-link to="/faq" class="nav-link active">FAQ</router-link>
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
    <router-link to="/leaderboard" class="mobile-menu-link">Leaderboard</router-link>
    <router-link to="/faq" class="mobile-menu-link active">FAQ</router-link>
    <div class="mobile-menu-divider"></div>
    <div class="mobile-menu-actions">
      <router-link to="/register" class="btn btn-secondary">Sign In</router-link>
      <router-link to="/login" class="btn btn-primary">Log In</router-link>
    </div>
  </div>

  <main style="padding-top:var(--nav-height);padding-bottom:var(--sp-24);">

    <!-- Page Header -->
    <div style="text-align:center;padding:var(--sp-16) var(--sp-6) var(--sp-12);position:relative;">
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:28rem;height:20rem;background:rgba(173,198,255,0.05);border-radius:50%;filter:blur(4rem);pointer-events:none;"></div>
      <div style="position:relative;z-index:1;">
        <p class="section-eyebrow" style="text-align:center;margin-bottom:var(--sp-4);">Help Center</p>
        <h1 style="font-family:var(--font-headline);font-size:clamp(2rem,4vw,3rem);font-weight:900;letter-spacing:-.02em;color:var(--primary);text-shadow:0 0 5px rgba(173,198,255,0.2);margin-bottom:var(--sp-4);">Frequently Asked Questions</h1>
        <p style="color:var(--on-surface-variant);font-size:1rem;max-width:28rem;margin-inline:auto;line-height:1.7;">
          Everything you need to know about PolyMirror and paper trading on prediction markets.
        </p>
      </div>
    </div>

    <!-- FAQ Accordion -->
    <div class="container" style="padding-bottom:var(--sp-16);">
      <div class="faq-list">
        <div
          v-for="faq in faqs"
          :key="faq.id"
          class="faq-item"
          :class="{ open: openItem === faq.id }"
        >
          <button class="faq-question" :aria-expanded="openItem === faq.id" @click="toggle(faq.id)">
            {{ faq.q }}
            <span class="material-symbols-outlined faq-icon">add</span>
          </button>
          <div class="faq-divider"></div>
          <div class="faq-answer" role="region">
            <p class="faq-answer-inner">{{ faq.a }}</p>
          </div>
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
</template>

<style scoped>
.faq-list { display: flex; flex-direction: column; gap: var(--sp-3); max-width: 48rem; margin-inline: auto; }
.faq-item { border-radius: var(--radius-xl); border: 1px solid rgba(255,255,255,0.06); background: var(--surface-low); overflow: hidden; transition: border-color var(--t-base); }
.faq-item.open { border-color: rgba(173,198,255,0.2); }
.faq-question { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: var(--sp-4); padding: var(--sp-6); background: none; border: none; cursor: pointer; text-align: left; font-family: var(--font-headline); font-size: 1rem; font-weight: 700; color: var(--on-surface); transition: color var(--t-base); }
.faq-question:hover { color: var(--primary); }
.faq-item.open .faq-question { color: var(--primary); }
.faq-icon { flex-shrink: 0; font-size: 1.25rem; color: var(--outline); transition: transform 250ms ease, color var(--t-base); }
.faq-item.open .faq-icon { transform: rotate(45deg); color: var(--primary); }
.faq-answer { max-height: 0; overflow: hidden; transition: max-height 350ms cubic-bezier(0.4,0,0.2,1); }
.faq-item.open .faq-answer { max-height: 20rem; }
.faq-answer-inner { padding: 0 var(--sp-6) var(--sp-6); font-size: 0.9375rem; line-height: 1.75; color: var(--on-surface-variant); }
.faq-divider { height: 1px; background: rgba(255,255,255,0.05); margin: 0 var(--sp-6); }
.faq-item.open .faq-divider { background: rgba(173,198,255,0.08); }
</style>
