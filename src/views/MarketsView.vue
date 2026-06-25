<script setup>
import { ref, onMounted } from 'vue';
import { useMarketStore } from '@/stores/marketStore.js';
import axios from 'axios';
import { API_BASE } from '@/config.js';

const store = useMarketStore();
const sidebarCategories = ref([]);

const CATEGORY_ICONS = {
  Politics: 'gavel', Sports: 'sports', Crypto: 'currency_bitcoin',
  Tech: 'memory', Culture: 'theater_comedy', Geopolitics: 'travel_explore',
  Finance: 'payments', Science: 'biotech', Economy: 'bar_chart',
  Elections: 'how_to_vote', Business: 'business_center',
  Entertainment: 'movie', World: 'public', Other: 'help_outline',
};

const SUBCATEGORIES = {
  Sports:   ['NBA', 'NFL', 'MLB', 'Soccer', 'Tennis', 'Golf', 'F1', 'UFC/MMA', 'NHL', 'Cricket'],
  Crypto:   ['Bitcoin', 'Ethereum', 'Solana', 'XRP', 'Memecoins'],
  Politics: ['US Politics', 'International'],
  Tech:     ['AI', 'Software', 'Hardware'],
  Culture:  ['Entertainment', 'Music', 'Movies'],
};

function categoryIcon(cat) {
  return CATEGORY_ICONS[cat] ?? 'help_outline';
}

function formatVolume(vol) {
  if (!vol) return '$0';
  if (vol >= 1_000_000) return '$' + (vol / 1_000_000).toFixed(1) + 'M';
  if (vol >= 1_000) return '$' + (vol / 1_000).toFixed(0) + 'K';
  return '$' + vol.toFixed(0);
}

const searchInput = ref('');
const featuredMarket = ref(null);

function submitSearch() {
  store.setSearch(searchInput.value.trim());
}

function clearSearch() {
  searchInput.value = '';
  store.setSearch('');
}

onMounted(async () => {
  store.fetchGroups();
  try {
    const { data } = await axios.get(`${API_BASE}/categories/visible`);
    sidebarCategories.value = data;
  } catch (e) {
    console.error('Failed to load categories', e);
  }
  // Hervorgehobenen Markt laden (einzelner Markt mit höchstem Volumen)
  try {
    const { data } = await axios.get(`${API_BASE}/markets`, { params: { page: 0, size: 1 } });
    if (data.content?.length) featuredMarket.value = data.content[0];
  } catch (e) {
    console.error('Failed to load featured market', e);
  }
});
</script>

<template>
  <!-- SEITENLEISTE -->
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <button @click="store.filterByCategory('')" :class="['sidebar-link', store.selectedCategory === '' ? 'active' : '']">
        <span class="material-symbols-outlined">apps</span>
        <span class="sidebar-link-label">All</span>
      </button>

      <template v-for="cat in sidebarCategories" :key="cat.id">
        <button @click="store.filterByCategory(cat.name)" :class="['sidebar-link', store.selectedCategory === cat.name ? 'active' : '']">
          <span class="material-symbols-outlined">{{ categoryIcon(cat.name) }}</span>
          <span class="sidebar-link-label">{{ cat.name }}</span>
        </button>
        <div v-if="SUBCATEGORIES[cat.name] && store.selectedCategory === cat.name" class="sidebar-sub">
          <button
            v-for="sub in SUBCATEGORIES[cat.name]" :key="sub"
            @click="store.setSubcategory(store.selectedSubcategory === sub ? '' : sub)"
            :class="['sidebar-sub-link', store.selectedSubcategory === sub ? 'active' : '']"
          >{{ sub }}</button>
        </div>
      </template>
    </nav>
  </aside>

  <!-- HAUPTINHALT -->
  <main class="page-with-sidebar app-main">

    <!-- Mobiler Kategorie-Filter (nur auf Mobilgeräten sichtbar, wenn die Seitenleiste ausgeblendet ist) -->
    <div class="mobile-category-bar">
      <button @click="store.filterByCategory('')" :class="['mobile-cat-btn', store.selectedCategory === '' ? 'active' : '']">All</button>
      <button v-for="cat in sidebarCategories" :key="cat.id" @click="store.filterByCategory(cat.name)" :class="['mobile-cat-btn', store.selectedCategory === cat.name ? 'active' : '']">
        {{ cat.name }}
      </button>
    </div>

    <!-- Hervorgehobener Markt (Hero) -->
    <router-link v-if="featuredMarket" :to="'/market/' + featuredMarket.id" class="market-hero mb-12" style="text-decoration:none;color:inherit;display:block;">
      <div class="market-hero-content">
        <div class="flex items-center gap-3 mb-4">
          <span class="badge-live">Featured Prediction</span>
          <span class="text-label-sm text-dim" style="letter-spacing:.1em;text-transform:uppercase;">
            <span class="material-symbols-outlined" style="font-size:.8rem;vertical-align:middle;">{{ categoryIcon(featuredMarket.category) }}</span>
            {{ featuredMarket.category }} · {{ formatVolume(featuredMarket.volume) }} Vol
          </span>
        </div>
        <div style="display:flex;align-items:flex-start;gap:var(--sp-4);">
          <img v-if="featuredMarket.imageUrl" :src="featuredMarket.imageUrl" alt="" style="width:4rem;height:4rem;border-radius:var(--radius-md, 8px);object-fit:cover;flex-shrink:0;margin-top:4px;">
          <h1 class="market-hero-title">{{ featuredMarket.title }}</h1>
        </div>
        <div class="flex gap-4" style="flex-wrap:wrap;">
          <span class="btn btn-primary">Bet YES ({{ featuredMarket.odds }}%)</span>
          <span class="btn btn-secondary">Bet NO ({{ (100 - featuredMarket.odds).toFixed(1) }}%)</span>
        </div>
      </div>
    </router-link>

    <!-- Laden / Fehler -->
    <div v-if="store.loading" style="text-align:center;padding:var(--sp-16);color:var(--on-surface-variant);">
      <span class="material-symbols-outlined" style="font-size:2rem;animation:spin 1s linear infinite;">refresh</span>
      <p style="margin-top:var(--sp-4);">Loading markets...</p>
    </div>
    <div v-else-if="store.error" style="text-align:center;padding:var(--sp-16);color:var(--error);">
      {{ store.error }}
    </div>

    <!-- Markt-Raster -->
    <div v-else class="grid-3" style="margin-bottom:var(--sp-12);">

      <template v-for="group in store.groups" :key="group.eventId">

        <!-- Einzelergebnis-Markt: JA/NEIN-Karte -->
        <router-link
          v-if="group.markets.length === 1"
          :to="'/market/' + group.markets[0].id"
          class="card-market"
          style="text-decoration:none;"
        >
          <div class="card-market-body">
            <div class="flex justify-between items-start mb-4">
              <div class="badge-category">
                <span class="material-symbols-outlined text-primary" style="font-size:.875rem;">{{ categoryIcon(group.category) }}</span>
                {{ group.category }}
              </div>
              <span class="text-label-sm text-dim">{{ formatVolume(group.markets[0].volume) }}</span>
            </div>
            <div class="market-title-row">
              <img v-if="group.markets[0].imageUrl" :src="group.markets[0].imageUrl" class="market-thumb" alt="">
              <h3 class="text-title-lg" style="line-height:1.4;">
                {{ group.markets[0].title }}
              </h3>
            </div>
            <div class="odds-bar-wrapper">
              <div class="odds-labels">
                <span class="odds-label-yes">YES {{ group.markets[0].odds }}%</span>
                <span class="odds-label-no">NO {{ (100 - group.markets[0].odds).toFixed(1) }}%</span>
              </div>
              <div class="odds-bar">
                <div class="odds-bar-fill" :style="{ width: group.markets[0].odds + '%' }"></div>
              </div>
            </div>
          </div>
          <div class="card-market-footer">
            <span class="btn btn-secondary btn-sm" style="flex:1;">Yes</span>
            <span class="btn btn-ghost btn-sm" style="flex:1;">No</span>
          </div>
        </router-link>

        <!-- Mehrergebnis-Event: gruppierte Karte -->
        <div v-else class="card-market">
          <router-link :to="'/event/' + group.eventId" class="card-market-body event-card-link">
            <div class="flex justify-between items-start mb-4">
              <div class="badge-category">
                <span class="material-symbols-outlined text-primary" style="font-size:.875rem;">{{ categoryIcon(group.category) }}</span>
                {{ group.category }}
              </div>
              <span class="text-label-sm text-dim">{{ group.markets.length }} outcomes</span>
            </div>
            <div class="market-title-row">
              <img v-if="group.markets[0].imageUrl" :src="group.markets[0].imageUrl" class="market-thumb" alt="">
              <h3 class="text-title-lg" style="line-height:1.4;">
                {{ group.eventTitle }}
              </h3>
            </div>
          </router-link>
          <div class="card-market-body" style="padding-top:0;">
            <div class="outcome-list">
              <router-link
                v-for="m in group.markets.slice(0, 5)"
                :key="m.id"
                :to="'/market/' + m.id"
                class="outcome-row"
              >
                <span class="outcome-label">{{ m.title }}</span>
                <span class="outcome-odds">{{ m.odds }}%</span>
              </router-link>
              <router-link v-if="group.markets.length > 5" :to="'/event/' + group.eventId" class="outcome-row" style="justify-content:center;color:var(--primary);font-weight:600;">
                +{{ group.markets.length - 5 }} more
              </router-link>
            </div>
          </div>
        </div>

      </template>
    </div>

    <!-- Seitennavigation -->
    <div style="display:flex;align-items:center;justify-content:center;gap:var(--sp-4);margin-bottom:var(--sp-12);">
      <button class="btn btn-ghost btn-sm" :disabled="store.page === 0" @click="store.prevPage()">
        <span class="material-symbols-outlined">chevron_left</span>
      </button>
      <span style="font-family:var(--font-label);font-size:.8rem;color:var(--on-surface-variant);">
        Page {{ store.page + 1 }} / {{ store.totalPages }} &nbsp;·&nbsp; {{ store.totalElements.toLocaleString() }} Events
      </span>
      <button class="btn btn-ghost btn-sm" :disabled="store.page >= store.totalPages - 1" @click="store.nextPage()">
        <span class="material-symbols-outlined">chevron_right</span>
      </button>
    </div>

  </main>


  <!-- MOBILE NAVIGATION -->
  <nav class="mobile-nav">
    <router-link to="/markets" class="mobile-nav-item active">
      <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1;">explore</span>
      <span class="mobile-nav-label">Markets</span>
    </router-link>
    <router-link to="/dashboard" class="mobile-nav-item">
      <span class="material-symbols-outlined">dashboard</span>
      <span class="mobile-nav-label">Dash</span>
    </router-link>
    <router-link to="/leaderboard" class="mobile-nav-item">
      <span class="material-symbols-outlined">leaderboard</span>
      <span class="mobile-nav-label">Ranks</span>
    </router-link>
    <router-link to="/profile" class="mobile-nav-item">
      <span class="material-symbols-outlined">account_circle</span>
      <span class="mobile-nav-label">Profile</span>
    </router-link>
  </nav>
</template>

<style scoped>
.outcome-list {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}

.outcome-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--sp-2) var(--sp-3);
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  text-decoration: none;
  color: var(--on-surface);
  font-size: .8rem;
  transition: background .15s;
}

.outcome-row:hover {
  background: var(--surface-3);
}

.outcome-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: var(--sp-4);
}

.outcome-odds {
  font-family: var(--font-label);
  font-size: .8rem;
  font-weight: 600;
  color: var(--primary);
  flex-shrink: 0;
}

/* Mobiler Kategorie-Filter — auf Desktop ausgeblendet (Seitenleiste sichtbar) */
.mobile-category-bar {
  display: none;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  gap: var(--sp-2);
  padding-bottom: var(--sp-4);
  margin-bottom: var(--sp-4);
}
@media (max-width: 63.9rem) {
  .mobile-category-bar { display: flex; }
}
.mobile-cat-btn {
  white-space: nowrap;
  padding: var(--sp-2) var(--sp-4);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(66, 71, 84, 0.2);
  background: rgba(30, 33, 40, 0.6);
  color: var(--on-surface-variant);
  font-family: var(--font-label);
  font-size: .75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;
}
.mobile-cat-btn:hover {
  border-color: var(--primary);
  color: var(--on-surface);
}
.mobile-cat-btn.active {
  background: rgba(77, 142, 255, 0.15);
  border-color: var(--primary);
  color: var(--primary);
}

.market-title-row {
  display: flex;
  align-items: flex-start;
  gap: var(--sp-3);
  margin-bottom: var(--sp-8);
}
.market-thumb {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-sm, 6px);
  object-fit: cover;
  flex-shrink: 0;
  margin-top: 2px;
}
.event-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  cursor: pointer;
}
.event-card-link:hover h3 {
  color: var(--primary);
}

/* Sub-Kategorien in der Sidebar */
.sidebar-sub {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: var(--sp-2) 0 var(--sp-2) var(--sp-8);
  border-left: 2px solid var(--surface-3);
  margin-left: calc(var(--sp-8) + 4px);
  margin-bottom: var(--sp-2);
}

.sidebar-sub-link {
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--sp-2) var(--sp-3);
  border-radius: var(--radius-sm);
  font-family: var(--font-label);
  font-size: .75rem;
  color: var(--on-surface-variant);
  text-align: left;
  transition: background .15s, color .15s;
  white-space: nowrap;
}

.sidebar-sub-link:hover {
  background: var(--surface-2);
  color: var(--on-surface);
}

.sidebar-sub-link.active {
  background: color-mix(in srgb, var(--primary) 15%, transparent);
  color: var(--primary);
  font-weight: 600;
}
</style>
