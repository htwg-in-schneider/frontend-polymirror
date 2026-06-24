<script setup>
import { ref, onMounted } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import axios from 'axios';
import { API_BASE } from '@/config.js';

const { isAuthenticated } = useAuth0();
const contactName = ref('');
const contactEmail = ref('');
const contactSubject = ref('');
const contactMessage = ref('');

const politicsMarket = ref(null);
const sportsMarket = ref(null);
const cryptoMarkets = ref([]);
const marketCount = ref(0);

function formatVolume(vol) {
  if (!vol) return '$0';
  if (vol >= 1_000_000) return '$' + (vol / 1_000_000).toFixed(1) + 'M';
  if (vol >= 1_000) return '$' + (vol / 1_000).toFixed(0) + 'K';
  return '$' + vol.toFixed(0);
}

onMounted(async () => {
  try {
    const [pol, spo, cry, all] = await Promise.all([
      axios.get(`${API_BASE}/markets`, { params: { page: 0, size: 1, category: 'Politics' } }),
      axios.get(`${API_BASE}/markets`, { params: { page: 0, size: 1, category: 'Sports' } }),
      axios.get(`${API_BASE}/markets`, { params: { page: 0, size: 2, category: 'Crypto' } }),
      axios.get(`${API_BASE}/markets`, { params: { page: 0, size: 1 } }),
    ]);
    if (pol.data.content?.length) politicsMarket.value = pol.data.content[0];
    if (spo.data.content?.length) sportsMarket.value = spo.data.content[0];
    if (cry.data.content?.length) cryptoMarkets.value = cry.data.content;
    if (all.data.totalElements) marketCount.value = all.data.totalElements;
  } catch (e) {
    console.error('Failed to load featured markets', e);
  }
});

const contactError = ref('');

function sendContact() {
  contactError.value = '';
  if (!contactName.value.trim()) { contactError.value = 'Please enter your name'; return; }
  if (contactName.value.trim().length > 100) { contactError.value = 'Name is too long (max 100 characters)'; return; }
  if (!contactEmail.value.trim()) { contactError.value = 'Please enter your email'; return; }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(contactEmail.value.trim())) { contactError.value = 'Please enter a valid email address'; return; }
  if (!contactMessage.value.trim()) { contactError.value = 'Please enter a message'; return; }
  if (contactMessage.value.length > 2000) { contactError.value = 'Message is too long (max 2000 characters)'; return; }

  const to = 'kontakt@polymirror.de';
  const subject = encodeURIComponent(contactSubject.value || 'Contact Request');
  const body = encodeURIComponent(
    `Name: ${contactName.value}\nE-Mail: ${contactEmail.value}\n\n${contactMessage.value}`
  );
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
}
</script>

<template>
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
            <router-link v-if="!isAuthenticated" to="/register" class="btn btn-primary btn-lg">Get Started</router-link>
            <router-link to="/markets" class="btn btn-primary btn-lg">View Markets</router-link>
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
              <span class="text-label-sm uppercase" style="letter-spacing:.15em;font-weight:700;">Live: {{ marketCount.toLocaleString() }} Markets</span>
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
            <router-link v-if="politicsMarket" :to="'/market/' + politicsMarket.id" class="card" style="padding:var(--sp-6);cursor:pointer;text-decoration:none;color:inherit;">
              <div style="display:flex;align-items:flex-start;gap:var(--sp-3);margin-bottom:var(--sp-6);">
                <img v-if="politicsMarket.imageUrl" :src="politicsMarket.imageUrl" alt="" style="width:2.5rem;height:2.5rem;border-radius:var(--radius-sm, 6px);object-fit:cover;flex-shrink:0;">
                <h5 class="text-title-lg" style="line-height:1.4;">{{ politicsMarket.title }}</h5>
              </div>
              <div class="odds-bar-wrapper">
                <div class="odds-labels">
                  <span class="odds-label-yes">YES {{ politicsMarket.odds }}%</span>
                  <span class="odds-label-no">NO {{ (100 - politicsMarket.odds).toFixed(1) }}%</span>
                </div>
                <div class="odds-bar odds-bar-lg">
                  <div class="odds-bar-fill" :style="{ width: politicsMarket.odds + '%' }"></div>
                </div>
              </div>
            </router-link>
            <div v-else class="card" style="padding:var(--sp-6);color:var(--on-surface-variant);font-size:.85rem;">No politics markets available</div>
          </div>
          <!-- SPORTS -->
          <div style="display:flex;flex-direction:column;gap:var(--sp-4);">
            <div class="flex items-center justify-between" style="padding-bottom:var(--sp-4);border-bottom:1px solid rgba(173,198,255,0.08);">
              <h3 class="text-headline-sm uppercase" style="letter-spacing:.1em;">Sports</h3>
              <router-link to="/markets" class="text-label-sm text-primary" style="font-weight:700;">View All</router-link>
            </div>
            <router-link v-if="sportsMarket" :to="'/market/' + sportsMarket.id" class="card-elevated" style="padding:var(--sp-6);cursor:pointer;overflow:hidden;position:relative;text-decoration:none;color:inherit;">
              <span class="badge badge-primary" style="position:relative;">Live</span>
              <div style="display:flex;align-items:flex-start;gap:var(--sp-3);margin:var(--sp-4) 0 var(--sp-6);position:relative;">
                <img v-if="sportsMarket.imageUrl" :src="sportsMarket.imageUrl" alt="" style="width:2.5rem;height:2.5rem;border-radius:var(--radius-sm, 6px);object-fit:cover;flex-shrink:0;">
                <h5 class="text-title-lg" style="line-height:1.4;">{{ sportsMarket.title }}</h5>
              </div>
              <div class="glass" style="display:flex;justify-content:space-between;align-items:center;padding:var(--sp-3) var(--sp-4);border-radius:var(--radius-lg);border:1px solid rgba(173,198,255,0.15);position:relative;">
                <span class="text-title-md" style="font-weight:700;">{{ formatVolume(sportsMarket.volume) }} Vol</span>
                <span class="text-label-md text-primary" style="font-weight:900;">{{ sportsMarket.odds }}% Odds</span>
              </div>
            </router-link>
            <div v-else class="card-elevated" style="padding:var(--sp-6);color:var(--on-surface-variant);font-size:.85rem;">No sports markets available</div>
          </div>
          <!-- CRYPTO -->
          <div style="display:flex;flex-direction:column;gap:var(--sp-4);">
            <div class="flex items-center justify-between" style="padding-bottom:var(--sp-4);border-bottom:1px solid rgba(173,198,255,0.08);">
              <h3 class="text-headline-sm uppercase" style="letter-spacing:.1em;">Crypto</h3>
              <router-link to="/markets" class="text-label-sm text-primary" style="font-weight:700;">View All</router-link>
            </div>
            <template v-if="cryptoMarkets.length">
              <router-link v-for="m in cryptoMarkets" :key="m.id" :to="'/market/' + m.id" class="market-row" style="cursor:pointer;text-decoration:none;color:inherit;">
                <div style="display:flex;align-items:center;gap:var(--sp-3);">
                  <img v-if="m.imageUrl" :src="m.imageUrl" alt="" style="width:2rem;height:2rem;border-radius:var(--radius-sm, 6px);object-fit:cover;flex-shrink:0;">
                  <div>
                    <p class="text-title-md">{{ m.title }}</p>
                    <p class="market-row-meta">Vol: {{ formatVolume(m.volume) }}</p>
                  </div>
                </div>
                <span class="text-headline-sm text-primary" style="font-weight:900;">{{ m.odds }}%</span>
              </router-link>
            </template>
            <div v-else class="market-row" style="color:var(--on-surface-variant);font-size:.85rem;">No crypto markets available</div>
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

    <!-- CONTACT FORM -->
    <section class="section" style="background:var(--surface-low);">
      <div class="container">
        <div style="max-width:40rem;margin-inline:auto;">
          <div style="text-align:center;margin-bottom:var(--sp-12);">
            <span class="section-eyebrow">Get in Touch</span>
            <h2 class="section-title">Contact Us</h2>
            <p style="color:var(--on-surface-variant);font-size:.9375rem;line-height:1.75;max-width:28rem;margin-inline:auto;">
              Questions, feedback, or suggestions? Send us a message.
            </p>
          </div>
          <div v-if="contactError" style="color:#ff6b6b;font-size:.85rem;padding:var(--sp-3) var(--sp-4);border:1px solid rgba(255,107,107,0.3);border-radius:var(--radius-md);margin-bottom:var(--sp-4);">
            {{ contactError }}
          </div>
          <form class="contact-form" @submit.prevent="sendContact">
            <div class="contact-row">
              <div class="contact-field">
                <label class="contact-label" for="c-name">Name</label>
                <input id="c-name" v-model="contactName" class="contact-input" type="text" placeholder="Max Mustermann" required>
              </div>
              <div class="contact-field">
                <label class="contact-label" for="c-email">E-Mail</label>
                <input id="c-email" v-model="contactEmail" class="contact-input" type="email" placeholder="max@example.com" required>
              </div>
            </div>
            <div class="contact-field">
              <label class="contact-label" for="c-subject">Subject</label>
              <input id="c-subject" v-model="contactSubject" class="contact-input" type="text" placeholder="What is it about?">
            </div>
            <div class="contact-field">
              <label class="contact-label" for="c-msg">Message</label>
              <textarea id="c-msg" v-model="contactMessage" class="contact-input contact-textarea" placeholder="Your message..." rows="5" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;padding:var(--sp-4);font-size:.9rem;border-radius:var(--radius-lg);">
              <span class="material-symbols-outlined" style="font-size:1.1rem;">send</span>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  </main>

</template>

<style scoped>
.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--sp-5);
}
.contact-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-5);
}
@media (max-width: 600px) {
  .contact-row { grid-template-columns: 1fr; }
}
.contact-field {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}
.contact-label {
  font-family: var(--font-label);
  font-size: .75rem;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--on-surface-variant);
}
.contact-input {
  background: var(--surface-base);
  border: 1px solid rgba(173, 198, 255, 0.12);
  border-radius: var(--radius-lg);
  padding: var(--sp-3) var(--sp-4);
  font-size: .875rem;
  color: var(--on-surface);
  font-family: inherit;
  transition: border-color var(--t-base);
  outline: none;
  resize: vertical;
}
.contact-input::placeholder {
  color: var(--on-surface-variant);
  opacity: 0.5;
}
.contact-input:focus {
  border-color: var(--primary);
}
.contact-textarea {
  min-height: 8rem;
}
</style>
