<template>
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
        <span class="footer-col-title">Legal</span>
        <router-link to="/imprint" class="footer-link">Imprint</router-link>
        <router-link to="/privacy" class="footer-link">Privacy Policy</router-link>
      </div>
      <div>
        <span class="footer-col-title">More</span>
        <router-link to="/faq" class="footer-link">FAQ</router-link>
        <router-link to="/leaderboard" class="footer-link">Leaderboard</router-link>
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
