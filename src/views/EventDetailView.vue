<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { API_BASE } from '@/config.js';

const route = useRoute();
const event = ref(null);
const loading = ref(true);
const error = ref(null);

const CATEGORY_ICONS = {
  Politics: 'gavel', Sports: 'sports', Crypto: 'currency_bitcoin',
  Tech: 'memory', Culture: 'theater_comedy', Geopolitics: 'travel_explore',
  Finance: 'payments', Science: 'biotech', Economy: 'bar_chart',
  Elections: 'how_to_vote', Business: 'business_center', Other: 'help_outline',
};

const categoryIcon = computed(() => CATEGORY_ICONS[event.value?.category] ?? 'help_outline');

const totalVolume = computed(() => {
  if (!event.value) return 0;
  return event.value.markets.reduce((sum, m) => sum + (m.volume || 0), 0);
});

function formatVolume(vol) {
  if (!vol) return '$0';
  if (vol >= 1_000_000) return '$' + (vol / 1_000_000).toFixed(1) + 'M';
  if (vol >= 1_000) return '$' + (vol / 1_000).toFixed(0) + 'K';
  return '$' + vol.toFixed(0);
}

onMounted(async () => {
  try {
    const { data } = await axios.get(`${API_BASE}/markets/event/${route.params.eventId}`);
    event.value = data;
  } catch {
    error.value = 'Event not found.';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <main style="padding-top:var(--nav-height);padding-bottom:var(--sp-24);">
    <div class="container" style="max-width:72rem;">

      <!-- Loading -->
      <div v-if="loading" style="text-align:center;padding:var(--sp-16);color:var(--on-surface-variant);">
        <span class="material-symbols-outlined" style="font-size:2rem;animation:spin 1s linear infinite;">refresh</span>
        <p style="margin-top:var(--sp-4);">Loading event...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" style="text-align:center;padding:var(--sp-16);color:var(--error);">
        {{ error }}
      </div>

      <!-- Event Content -->
      <template v-else-if="event">

        <!-- Header -->
        <div class="glass-panel" style="margin-top:var(--sp-8);margin-bottom:var(--sp-6);position:relative;">
          <div class="flex items-center gap-2 mb-4 text-primary">
            <span class="material-symbols-outlined" style="font-size:.875rem;">{{ categoryIcon }}</span>
            <span class="text-label-sm uppercase" style="letter-spacing:.2em;">{{ event.category }}</span>
          </div>
          <div style="display:flex;align-items:flex-start;gap:var(--sp-4);margin-bottom:var(--sp-4);">
            <img v-if="event.markets[0]?.imageUrl" :src="event.markets[0].imageUrl" alt="" style="width:3.5rem;height:3.5rem;border-radius:var(--radius-md, 8px);object-fit:cover;flex-shrink:0;margin-top:4px;">
            <h1 class="text-headline-lg" style="font-size:clamp(1.5rem,3vw,2.25rem);line-height:1.2;">
              {{ event.eventTitle }}
            </h1>
          </div>
          <div class="flex items-center gap-6" style="flex-wrap:wrap;">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-dim" style="font-size:1rem;">bar_chart</span>
              <span class="text-label-sm text-dim">Total Volume: <strong style="color:var(--on-surface);">{{ formatVolume(totalVolume) }}</strong></span>
            </div>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-dim" style="font-size:1rem;">format_list_numbered</span>
              <span class="text-label-sm text-dim">{{ event.markets.length }} outcomes</span>
            </div>
          </div>
        </div>

        <!-- Markets List -->
        <div class="event-markets-grid">
          <router-link
            v-for="m in event.markets"
            :key="m.id"
            :to="'/market/' + m.id"
            class="glass-panel event-market-card"
          >
            <div class="flex justify-between items-start mb-4">
              <h3 class="event-market-title">{{ m.title }}</h3>
              <span class="text-label-sm text-dim" style="flex-shrink:0;margin-left:var(--sp-4);">{{ formatVolume(m.volume) }}</span>
            </div>

            <div class="odds-bar-wrapper" style="margin-bottom:var(--sp-4);">
              <div class="odds-labels">
                <span class="odds-label-yes">YES {{ m.odds }}%</span>
                <span class="odds-label-no">NO {{ (100 - m.odds).toFixed(1) }}%</span>
              </div>
              <div class="odds-bar">
                <div class="odds-bar-fill" :style="{ width: m.odds + '%' }"></div>
              </div>
            </div>

            <div v-if="m.resolved" class="event-market-resolved">
              <span class="material-symbols-outlined" style="font-size:.875rem;">check_circle</span>
              Resolved — {{ m.outcome }}
            </div>

            <div class="event-market-cta">
              <span class="text-label-sm text-primary" style="font-weight:600;">View Market</span>
              <span class="material-symbols-outlined text-primary" style="font-size:1rem;">arrow_forward</span>
            </div>
          </router-link>
        </div>

        <!-- Back -->
        <div style="text-align:center;margin-top:var(--sp-8);">
          <router-link to="/markets" class="btn btn-ghost btn-sm">
            <span class="material-symbols-outlined" style="font-size:1rem;">arrow_back</span>
            Back to Markets
          </router-link>
        </div>

      </template>
    </div>
  </main>
</template>

<style scoped>
.event-markets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: var(--sp-4);
}

.event-market-card {
  text-decoration: none;
  color: var(--on-surface);
  transition: border-color 0.2s, transform 0.15s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.event-market-card:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
}

.event-market-title {
  font-size: .95rem;
  font-weight: 600;
  line-height: 1.4;
  flex: 1;
}

.event-market-resolved {
  display: inline-flex;
  align-items: center;
  gap: .25rem;
  padding: .25rem .75rem;
  border-radius: var(--radius-sm, 6px);
  background: rgba(255, 152, 0, 0.15);
  color: #ff9800;
  border: 1px solid rgba(255, 152, 0, 0.3);
  font-weight: 700;
  font-size: .75rem;
  letter-spacing: .05em;
  text-transform: uppercase;
  margin-bottom: var(--sp-4);
}

.event-market-cta {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  margin-top: auto;
  padding-top: var(--sp-4);
  border-top: 1px solid rgba(66, 71, 84, 0.15);
}
</style>
