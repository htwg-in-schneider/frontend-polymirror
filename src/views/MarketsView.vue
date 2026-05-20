<script setup>
import { ref, onMounted } from 'vue';
import { useMarketStore } from '@/stores/marketStore.js';

const store = useMarketStore();

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

function submitSearch() {
  store.setSearch(searchInput.value.trim());
}

function clearSearch() {
  searchInput.value = '';
  store.setSearch('');
}

onMounted(() => store.fetchGroups());
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
        <input
          v-model="searchInput"
          class="search-input"
          type="text"
          placeholder="Search markets..."
          @keydown.enter="submitSearch"
        />
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
      <button class="nav-search-icon" aria-label="Search" @click="submitSearch">
        <span class="material-symbols-outlined">search</span>
      </button>
      <button class="hamburger-btn" aria-label="Menu">
        <span class="material-symbols-outlined">menu</span>
      </button>
    </div>
  </nav>

  <!-- MOBILE MENU -->
  <div class="mobile-menu">
    <a href="/markets" class="mobile-menu-link active">Markets</a>
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
      <button @click="store.filterByCategory('')" :class="['sidebar-link', store.selectedCategory === '' ? 'active' : '']">
        <span class="material-symbols-outlined">apps</span>
        <span class="sidebar-link-label">All</span>
      </button>

      <button @click="store.filterByCategory('Politics')" :class="['sidebar-link', store.selectedCategory === 'Politics' ? 'active' : '']">
        <span class="material-symbols-outlined">gavel</span>
        <span class="sidebar-link-label">Politics</span>
      </button>
      <div v-if="store.selectedCategory === 'Politics'" class="sidebar-sub">
        <button
          v-for="sub in SUBCATEGORIES.Politics" :key="sub"
          @click="store.setSubcategory(store.selectedSubcategory === sub ? '' : sub)"
          :class="['sidebar-sub-link', store.selectedSubcategory === sub ? 'active' : '']"
        >{{ sub }}</button>
      </div>

      <button @click="store.filterByCategory('Sports')" :class="['sidebar-link', store.selectedCategory === 'Sports' ? 'active' : '']">
        <span class="material-symbols-outlined">sports</span>
        <span class="sidebar-link-label">Sports</span>
      </button>
      <div v-if="store.selectedCategory === 'Sports'" class="sidebar-sub">
        <button
          v-for="sub in SUBCATEGORIES.Sports" :key="sub"
          @click="store.setSubcategory(store.selectedSubcategory === sub ? '' : sub)"
          :class="['sidebar-sub-link', store.selectedSubcategory === sub ? 'active' : '']"
        >{{ sub }}</button>
      </div>

      <button @click="store.filterByCategory('Crypto')" :class="['sidebar-link', store.selectedCategory === 'Crypto' ? 'active' : '']">
        <span class="material-symbols-outlined">currency_bitcoin</span>
        <span class="sidebar-link-label">Crypto</span>
      </button>
      <div v-if="store.selectedCategory === 'Crypto'" class="sidebar-sub">
        <button
          v-for="sub in SUBCATEGORIES.Crypto" :key="sub"
          @click="store.setSubcategory(store.selectedSubcategory === sub ? '' : sub)"
          :class="['sidebar-sub-link', store.selectedSubcategory === sub ? 'active' : '']"
        >{{ sub }}</button>
      </div>

      <button @click="store.filterByCategory('Geopolitics')" :class="['sidebar-link', store.selectedCategory === 'Geopolitics' ? 'active' : '']">
        <span class="material-symbols-outlined">travel_explore</span>
        <span class="sidebar-link-label">Geopolitics</span>
      </button>

      <button @click="store.filterByCategory('Finance')" :class="['sidebar-link', store.selectedCategory === 'Finance' ? 'active' : '']">
        <span class="material-symbols-outlined">payments</span>
        <span class="sidebar-link-label">Finance</span>
      </button>

      <button @click="store.filterByCategory('Tech')" :class="['sidebar-link', store.selectedCategory === 'Tech' ? 'active' : '']">
        <span class="material-symbols-outlined">memory</span>
        <span class="sidebar-link-label">Tech</span>
      </button>
      <div v-if="store.selectedCategory === 'Tech'" class="sidebar-sub">
        <button
          v-for="sub in SUBCATEGORIES.Tech" :key="sub"
          @click="store.setSubcategory(store.selectedSubcategory === sub ? '' : sub)"
          :class="['sidebar-sub-link', store.selectedSubcategory === sub ? 'active' : '']"
        >{{ sub }}</button>
      </div>

      <button @click="store.filterByCategory('Culture')" :class="['sidebar-link', store.selectedCategory === 'Culture' ? 'active' : '']">
        <span class="material-symbols-outlined">theater_comedy</span>
        <span class="sidebar-link-label">Culture</span>
      </button>
      <div v-if="store.selectedCategory === 'Culture'" class="sidebar-sub">
        <button
          v-for="sub in SUBCATEGORIES.Culture" :key="sub"
          @click="store.setSubcategory(store.selectedSubcategory === sub ? '' : sub)"
          :class="['sidebar-sub-link', store.selectedSubcategory === sub ? 'active' : '']"
        >{{ sub }}</button>
      </div>

      <button @click="store.filterByCategory('Economy')" :class="['sidebar-link', store.selectedCategory === 'Economy' ? 'active' : '']">
        <span class="material-symbols-outlined">bar_chart</span>
        <span class="sidebar-link-label">Economy</span>
      </button>

      <button @click="store.filterByCategory('Elections')" :class="['sidebar-link', store.selectedCategory === 'Elections' ? 'active' : '']">
        <span class="material-symbols-outlined">how_to_vote</span>
        <span class="sidebar-link-label">Elections</span>
      </button>

      <button @click="store.filterByCategory('Science')" :class="['sidebar-link', store.selectedCategory === 'Science' ? 'active' : '']">
        <span class="material-symbols-outlined">biotech</span>
        <span class="sidebar-link-label">Science</span>
      </button>
    </nav>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="page-with-sidebar app-main">

    <!-- Featured Market Hero -->
    <div class="market-hero mb-12">
      <div class="market-hero-content">
        <div class="flex items-center gap-3 mb-4">
          <span class="badge-live">Featured Prediction</span>
          <span class="text-label-sm text-dim" style="letter-spacing:.1em;text-transform:uppercase;">Ending in 14h 22m</span>
        </div>
        <h1 class="market-hero-title">Will Bitcoin hit $100k before May?</h1>
        <div class="flex gap-4" style="flex-wrap:wrap;">
          <button class="btn btn-primary">Bet YES (62%)</button>
          <button class="btn btn-secondary">Bet NO (38%)</button>
        </div>
      </div>
    </div>

    <!-- Loading / Error -->
    <div v-if="store.loading" style="text-align:center;padding:var(--sp-16);color:var(--on-surface-variant);">
      <span class="material-symbols-outlined" style="font-size:2rem;animation:spin 1s linear infinite;">refresh</span>
      <p style="margin-top:var(--sp-4);">Loading markets...</p>
    </div>
    <div v-else-if="store.error" style="text-align:center;padding:var(--sp-16);color:var(--error);">
      {{ store.error }}
    </div>

    <!-- Market Grid -->
    <div v-else class="grid-3" style="margin-bottom:var(--sp-12);">

      <template v-for="group in store.groups" :key="group.eventId">

        <!-- Single-outcome market: YES/NO card -->
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
            <h3 class="text-title-lg" style="line-height:1.4;margin-bottom:var(--sp-8);">
              {{ group.markets[0].title }}
            </h3>
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
            <button class="btn btn-secondary btn-sm" style="flex:1;" @click.prevent>Yes</button>
            <button class="btn btn-ghost btn-sm" style="flex:1;" @click.prevent>No</button>
          </div>
        </router-link>

        <!-- Multi-outcome event: grouped card -->
        <div v-else class="card-market">
          <div class="card-market-body">
            <div class="flex justify-between items-start mb-4">
              <div class="badge-category">
                <span class="material-symbols-outlined text-primary" style="font-size:.875rem;">{{ categoryIcon(group.category) }}</span>
                {{ group.category }}
              </div>
              <span class="text-label-sm text-dim">{{ group.markets.length }} outcomes</span>
            </div>
            <h3 class="text-title-lg" style="line-height:1.4;margin-bottom:var(--sp-8);">
              {{ group.eventTitle }}
            </h3>
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
              <span v-if="group.markets.length > 5" class="text-label-sm text-dim" style="padding:var(--sp-2) 0;">
                +{{ group.markets.length - 5 }} more
              </span>
            </div>
          </div>
        </div>

      </template>
    </div>

    <!-- Pagination -->
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
