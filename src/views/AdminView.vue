<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import { useUserStore } from '@/stores/userStore.js';
import axios from 'axios';
import { API_BASE } from '@/config.js';

const API = API_BASE;
const { getAccessTokenSilently } = useAuth0();
const userStore = useUserStore();

// --- Tabs ---
const activeTab = ref('markets');

// --- Categories (from DB) ---
const categories = ref([]);
const allCategories = computed(() => categories.value.map(c => c.name));
const newCategoryInput = ref('');

async function loadCategories() {
  try {
    const { data } = await axios.get(`${API}/categories`);
    categories.value = data;
  } catch (e) {
    console.error('Failed to load categories', e);
  }
}

async function addCategory() {
  const cat = newCategoryInput.value.trim();
  if (!cat || allCategories.value.includes(cat)) { newCategoryInput.value = ''; return; }
  try {
    const token = await getAccessTokenSilently();
    const { data } = await axios.post(`${API}/categories`, { name: cat }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    categories.value.push(data);
    newCategoryInput.value = '';
  } catch (e) {
    alert('Failed to create category');
  }
}

async function toggleCategoryVisibility(cat) {
  try {
    const token = await getAccessTokenSilently();
    const { data } = await axios.put(`${API}/categories/${cat.id}`, { visible: !cat.visible }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const idx = categories.value.findIndex(c => c.id === cat.id);
    if (idx !== -1) categories.value[idx] = data;
  } catch (e) {
    alert('Failed to update category');
  }
}

async function removeCategory(cat) {
  const entry = categories.value.find(c => c.name === cat);
  if (!entry) return;
  try {
    const token = await getAccessTokenSilently();
    await axios.delete(`${API}/categories/${entry.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    categories.value = categories.value.filter(c => c.id !== entry.id);
  } catch (e) {
    alert('Failed to delete category');
  }
}

// --- Markets ---
const markets = ref([]);
const marketSearch = ref('');
const marketPage = ref(0);
const marketTotalPages = ref(0);
const marketLoading = ref(false);
const editingMarket = ref(null);
const showCreateMarket = ref(false);
const newMarket = ref({ title: '', category: 'Politics', odds: 50, description: '' });

async function loadMarkets() {
  marketLoading.value = true;
  try {
    const token = await getAccessTokenSilently();
    const params = { page: marketPage.value, size: 20 };
    if (marketSearch.value.trim()) params.search = marketSearch.value.trim();
    const { data } = await axios.get(`${API}/markets`, {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    markets.value = data.content;
    marketTotalPages.value = data.totalPages;
  } catch (e) {
    console.error('Failed to load markets', e);
  } finally {
    marketLoading.value = false;
  }
}

async function saveMarket(market) {
  try {
    const token = await getAccessTokenSilently();
    await axios.put(`${API}/markets/${market.id}`, market, {
      headers: { Authorization: `Bearer ${token}` },
    });
    editingMarket.value = null;
    loadMarkets();
  } catch (e) {
    alert('Failed to save market');
  }
}

async function deleteMarket(id) {
  if (!confirm('Delete this market?')) return;
  try {
    const token = await getAccessTokenSilently();
    await axios.delete(`${API}/markets/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    loadMarkets();
  } catch (e) {
    alert('Failed to delete market');
  }
}

const importing = ref(false);

async function importMarkets() {
  if (!confirm('Import markets from Polymarket? This may take a moment.')) return;
  importing.value = true;
  try {
    const token = await getAccessTokenSilently();
    const { data } = await axios.post(`${API}/markets/import`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert(`Import done: ${data.imported} new, ${data.updated} updated, ${data.resolved || 0} resolved, ${data.errors} errors`);
    loadMarkets();
    loadCategories();
  } catch (e) {
    alert('Import failed');
  } finally {
    importing.value = false;
  }
}

async function deleteAllMarkets() {
  if (!confirm('Delete ALL markets, events and related trades? This cannot be undone!')) return;
  try {
    const token = await getAccessTokenSilently();
    const { data } = await axios.delete(`${API}/markets`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert(`Deleted: ${data.deletedMarkets} markets, ${data.deletedEvents} events, ${data.deletedTrades} trades`);
    loadMarkets();
  } catch (e) {
    alert('Failed to delete all markets');
  }
}

async function createMarket() {
  if (!newMarket.value.title.trim()) { alert('Title is required'); return; }
  if (newMarket.value.odds < 0 || newMarket.value.odds > 100) { alert('Odds must be between 0 and 100'); return; }
  try {
    const token = await getAccessTokenSilently();
    await axios.post(`${API}/markets`, newMarket.value, {
      headers: { Authorization: `Bearer ${token}` },
    });
    showCreateMarket.value = false;
    newMarket.value = { title: '', category: 'Politics', odds: 50, description: '' };
    loadMarkets();
  } catch (e) {
    alert(e.response?.data?.error || 'Failed to create market');
  }
}

// --- Resolve Market ---
async function resolveMarket(market) {
  const outcome = prompt(`Resolve "${market.title}"?\nEnter outcome: YES or NO`);
  if (!outcome) return;
  const upper = outcome.trim().toUpperCase();
  if (upper !== 'YES' && upper !== 'NO') { alert('Outcome must be YES or NO'); return; }
  try {
    const token = await getAccessTokenSilently();
    const { data } = await axios.put(`${API}/markets/${market.id}/resolve`, { outcome: upper }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert(`Resolved! ${data.winners} winners, ${data.losers} losers out of ${data.tradesResolved} trades`);
    loadMarkets();
  } catch (e) {
    alert(e.response?.data?.error || 'Failed to resolve market');
  }
}

// --- Users ---
const users = ref([]);
const userSearch = ref('');
const userLoading = ref(false);
const editingUser = ref(null);

const filteredUsers = computed(() => {
  if (!userSearch.value.trim()) return users.value;
  const q = userSearch.value.toLowerCase();
  return users.value.filter(u =>
    u.username?.toLowerCase().includes(q) ||
    u.email?.toLowerCase().includes(q) ||
    u.role?.toLowerCase().includes(q)
  );
});

async function loadUsers() {
  userLoading.value = true;
  try {
    const token = await getAccessTokenSilently();
    const { data } = await axios.get(`${API}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    users.value = data;
  } catch (e) {
    console.error('Failed to load users', e);
  } finally {
    userLoading.value = false;
  }
}

async function deleteUser(id) {
  if (!confirm('Delete this user?')) return;
  try {
    const token = await getAccessTokenSilently();
    await axios.delete(`${API}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    loadUsers();
  } catch (e) {
    alert('Failed to delete user');
  }
}

async function saveUser(user) {
  try {
    const token = await getAccessTokenSilently();
    await axios.put(`${API}/users/${user.id}`, {
      username: user.username,
      role: user.role,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    editingUser.value = null;
    loadUsers();
  } catch (e) {
    alert('Failed to save user');
  }
}

// --- Seed Demo Data ---
const seeding = ref(false);
const deletingSeed = ref(false);

async function seedDemoData() {
  if (!confirm('Generate ~80 demo users with random trades for the leaderboard?')) return;
  seeding.value = true;
  try {
    const token = await getAccessTokenSilently();
    const { data } = await axios.post(`${API}/admin/seed`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert(`Seed done: ${data.usersCreated} users, ${data.tradesCreated} trades created`);
    loadUsers();
  } catch (e) {
    alert('Seed failed');
  } finally {
    seeding.value = false;
  }
}

async function deleteSeedData() {
  if (!confirm('Delete all seeded demo users and their trades? Real users will not be affected.')) return;
  deletingSeed.value = true;
  try {
    const token = await getAccessTokenSilently();
    const { data } = await axios.delete(`${API}/admin/seed`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert(`Deleted: ${data.usersDeleted} demo users, ${data.tradesDeleted} trades`);
    loadUsers();
  } catch (e) {
    alert('Failed to delete seed data');
  } finally {
    deletingSeed.value = false;
  }
}

// --- Ban/Unban ---
async function toggleBan(user) {
  const isBanned = user.banned;
  let banReason = null;
  if (!isBanned) {
    banReason = prompt('Ban reason (optional):');
    if (banReason === null) return; // cancelled
  }
  try {
    const token = await getAccessTokenSilently();
    await axios.put(`${API}/users/${user.id}`, {
      banned: !isBanned,
      banReason: isBanned ? null : (banReason || 'Violation of terms'),
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    loadUsers();
  } catch (e) {
    alert('Failed to update ban status');
  }
}

// --- Trades ---
const trades = ref([]);
const tradeSearch = ref('');
const tradePage = ref(0);
const tradeTotalPages = ref(0);
const tradeLoading = ref(false);

async function loadTrades() {
  tradeLoading.value = true;
  try {
    const token = await getAccessTokenSilently();
    const params = { page: tradePage.value, size: 20 };
    if (tradeSearch.value.trim()) params.search = tradeSearch.value.trim();
    const { data } = await axios.get(`${API}/trades`, {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    trades.value = data.content;
    tradeTotalPages.value = data.totalPages;
  } catch (e) {
    console.error('Failed to load trades', e);
  } finally {
    tradeLoading.value = false;
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// --- Appeals ---
const appeals = ref([]);
const appealsLoading = ref(false);

async function loadAppeals() {
  appealsLoading.value = true;
  try {
    const token = await getAccessTokenSilently();
    const { data } = await axios.get(`${API}/appeals`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    appeals.value = data;
  } catch (e) {
    console.error('Failed to load appeals', e);
  } finally {
    appealsLoading.value = false;
  }
}

async function reviewAppeal(appealId, action, adminResponse) {
  try {
    const token = await getAccessTokenSilently();
    await axios.put(`${API}/appeals/${appealId}`, { action, adminResponse }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    loadAppeals();
    loadUsers();
  } catch (e) {
    alert('Failed to review appeal');
  }
}

function handleAcceptAppeal(appeal) {
  const response = prompt('Admin response (optional):') || '';
  reviewAppeal(appeal.id, 'accept', response);
}

function handleRejectAppeal(appeal) {
  const response = prompt('Rejection reason (optional):') || '';
  reviewAppeal(appeal.id, 'reject', response);
}

const pendingAppealsCount = computed(() => appeals.value.filter(a => a.status === 'PENDING').length);

// --- Tab watchers ---
watch(activeTab, (tab) => {
  if (tab === 'markets') loadMarkets();
  else if (tab === 'users') loadUsers();
  else if (tab === 'trades') loadTrades();
  else if (tab === 'appeals') loadAppeals();
});

onMounted(() => {
  loadCategories();
  loadMarkets();
  loadAppeals();
});
</script>

<template>
  <main style="padding-top:var(--nav-height);padding-bottom:var(--sp-24);">
    <div class="container" style="max-width:80rem;">

      <!-- Header -->
      <div style="margin:var(--sp-8) 0;display:flex;justify-content:space-between;align-items:center;">
        <h1 class="text-headline-lg flex items-center gap-3">
          <span class="material-symbols-outlined text-primary" style="font-size:2rem;">admin_panel_settings</span>
          Admin Panel
        </h1>
      </div>

      <!-- Tabs -->
      <div class="admin-tabs">
        <button :class="['admin-tab', { active: activeTab === 'markets' }]" @click="activeTab = 'markets'">
          <span class="material-symbols-outlined">balance</span> Markets
        </button>
        <button :class="['admin-tab', { active: activeTab === 'users' }]" @click="activeTab = 'users'">
          <span class="material-symbols-outlined">group</span> Users
        </button>
        <button :class="['admin-tab', { active: activeTab === 'trades' }]" @click="activeTab = 'trades'">
          <span class="material-symbols-outlined">receipt_long</span> Trades
        </button>
        <button :class="['admin-tab', { active: activeTab === 'appeals' }]" @click="activeTab = 'appeals'">
          <span class="material-symbols-outlined">gavel</span> Appeals
          <span v-if="pendingAppealsCount > 0" style="background:var(--error);color:#fff;font-size:.65rem;font-weight:700;padding:1px 6px;border-radius:99px;margin-left:var(--sp-1);">{{ pendingAppealsCount }}</span>
        </button>
      </div>

      <!-- ==================== MARKETS TAB ==================== -->
      <div v-if="activeTab === 'markets'" class="glass-panel" style="padding:0;overflow:hidden;">
        <div style="padding:var(--sp-6) var(--sp-8);border-bottom:1px solid rgba(66,71,84,0.15);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:var(--sp-4);">
          <h3 class="text-headline-sm">Markets Management</h3>
          <div style="display:flex;gap:var(--sp-3);align-items:center;flex-wrap:wrap;">
            <div class="admin-search-wrap">
              <span class="material-symbols-outlined">search</span>
              <input v-model="marketSearch" type="text" placeholder="Search..." @keydown.enter="marketPage = 0; loadMarkets()">
            </div>
            <button class="btn btn-primary btn-sm" @click="showCreateMarket = !showCreateMarket">
              <span class="material-symbols-outlined" style="font-size:1rem;">add</span> New
            </button>
            <button class="btn btn-secondary btn-sm" :disabled="importing" @click="importMarkets">
              <span class="material-symbols-outlined" style="font-size:1rem;">cloud_download</span> {{ importing ? 'Importing...' : 'Import' }}
            </button>
            <button class="btn btn-ghost btn-sm" style="color:var(--danger);" @click="deleteAllMarkets">
              <span class="material-symbols-outlined" style="font-size:1rem;">delete_sweep</span> Clear All
            </button>
          </div>
        </div>

        <!-- Create Market Form -->
        <div v-if="showCreateMarket" style="padding:var(--sp-6) var(--sp-8);border-bottom:1px solid rgba(66,71,84,0.15);background:rgba(77,142,255,0.03);">
          <h4 style="margin-bottom:var(--sp-4);font-weight:600;">Create New Market</h4>
          <div class="admin-create-grid">
            <div>
              <label class="admin-label">Title</label>
              <input v-model="newMarket.title" class="admin-input" placeholder="Market title">
            </div>
            <div>
              <label class="admin-label">Category</label>
              <select v-model="newMarket.category" class="admin-input">
                <option v-for="cat in allCategories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>
            <div>
              <label class="admin-label">Odds (%)</label>
              <input v-model.number="newMarket.odds" class="admin-input" type="number" min="0" max="100">
            </div>
            <div>
              <label class="admin-label">Custom Category</label>
              <div style="display:flex;gap:var(--sp-2);">
                <input v-model="newCategoryInput" class="admin-input" style="flex:1;" placeholder="New category..." @keydown.enter="addCategory">
                <button class="btn btn-secondary btn-sm" @click="addCategory">Add</button>
              </div>
              <div v-if="categories.length" style="display:flex;flex-wrap:wrap;gap:var(--sp-2);margin-top:var(--sp-2);">
                <span v-for="cat in categories" :key="cat.id"
                  :style="{
                    display: 'inline-flex', alignItems: 'center', gap: 'var(--sp-1)',
                    background: cat.visible ? 'rgba(77,142,255,0.1)' : 'rgba(255,255,255,0.04)',
                    border: cat.visible ? '1px solid rgba(77,142,255,0.25)' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 'var(--radius-lg)', padding: 'var(--sp-1) var(--sp-3)',
                    fontSize: '.75rem', color: cat.visible ? 'var(--primary)' : 'var(--on-surface-variant)',
                    opacity: cat.visible ? 1 : 0.5, cursor: 'pointer'
                  }"
                  @click="toggleCategoryVisibility(cat)"
                  :title="cat.visible ? 'Visible in sidebar — click to hide' : 'Hidden — click to show in sidebar'">
                  <span class="material-symbols-outlined" style="font-size:.8rem;">{{ cat.visible ? 'visibility' : 'visibility_off' }}</span>
                  {{ cat.name }}
                  <button style="background:none;border:none;color:inherit;cursor:pointer;padding:0;font-size:.85rem;line-height:1;" @click.stop="removeCategory(cat.name)" title="Delete category">&times;</button>
                </span>
              </div>
            </div>
          </div>
          <div style="margin-bottom:var(--sp-4);">
            <label class="admin-label">Description</label>
            <textarea v-model="newMarket.description" class="admin-input" rows="2" placeholder="Market description"></textarea>
          </div>
          <div style="display:flex;gap:var(--sp-3);">
            <button class="btn btn-primary btn-sm" @click="createMarket">Create</button>
            <button class="btn btn-ghost btn-sm" @click="showCreateMarket = false">Cancel</button>
          </div>
        </div>

        <div v-if="marketLoading" style="padding:var(--sp-12);text-align:center;">
          <p style="color:var(--on-surface-variant);">Loading markets...</p>
        </div>

        <div v-else class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Odds</th>
                <th>Volume</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="m in markets" :key="m.id">
                <template v-if="editingMarket?.id === m.id">
                  <td style="font-family:var(--font-headline);font-size:.8rem;">{{ m.id }}</td>
                  <td><input v-model="editingMarket.title" class="admin-input-inline"></td>
                  <td>
                    <select v-model="editingMarket.category" class="admin-input-inline" style="width:8rem;">
                      <option v-for="cat in allCategories" :key="cat" :value="cat">{{ cat }}</option>
                    </select>
                  </td>
                  <td><input v-model.number="editingMarket.odds" class="admin-input-inline" type="number" style="width:5rem;"></td>
                  <td style="font-family:var(--font-label);color:var(--on-surface-variant);">${{ (editingMarket.volume || 0).toLocaleString() }}</td>
                  <td>
                    <div style="display:flex;gap:var(--sp-2);">
                      <button class="btn-icon btn-icon-save" @click="saveMarket(editingMarket)" title="Save">
                        <span class="material-symbols-outlined">check</span>
                      </button>
                      <button class="btn-icon btn-icon-cancel" @click="editingMarket = null" title="Cancel">
                        <span class="material-symbols-outlined">close</span>
                      </button>
                    </div>
                  </td>
                </template>
                <template v-else>
                  <td style="font-family:var(--font-headline);font-size:.8rem;color:var(--on-surface-variant);">{{ m.id }}</td>
                  <td style="font-weight:500;font-size:.85rem;max-width:20rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                    {{ m.title }}
                    <span v-if="m.resolved" class="admin-resolved-badge">{{ m.outcome }}</span>
                  </td>
                  <td><span class="admin-badge">{{ m.category }}</span></td>
                  <td style="font-family:var(--font-headline);font-weight:700;">{{ m.odds?.toFixed(1) }}%</td>
                  <td style="font-family:var(--font-label);color:var(--on-surface-variant);">${{ (m.volume || 0).toLocaleString() }}</td>
                  <td>
                    <div style="display:flex;gap:var(--sp-2);">
                      <button v-if="!m.resolved" class="btn-icon btn-icon-resolve" @click="resolveMarket(m)" title="Resolve market">
                        <span class="material-symbols-outlined">check_circle</span>
                      </button>
                      <button class="btn-icon" @click="editingMarket = { ...m }" title="Edit">
                        <span class="material-symbols-outlined">edit</span>
                      </button>
                      <button class="btn-icon btn-icon-danger" @click="deleteMarket(m.id)" title="Delete">
                        <span class="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="marketTotalPages > 1" class="admin-pagination">
          <button class="btn btn-ghost btn-sm" :disabled="marketPage === 0" @click="marketPage--; loadMarkets()">Previous</button>
          <span class="text-label-sm text-dim">Page {{ marketPage + 1 }} / {{ marketTotalPages }}</span>
          <button class="btn btn-ghost btn-sm" :disabled="marketPage >= marketTotalPages - 1" @click="marketPage++; loadMarkets()">Next</button>
        </div>
      </div>

      <!-- ==================== USERS TAB ==================== -->
      <div v-if="activeTab === 'users'" class="glass-panel" style="padding:0;overflow:hidden;">
        <div style="padding:var(--sp-6) var(--sp-8);border-bottom:1px solid rgba(66,71,84,0.15);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:var(--sp-4);">
          <h3 class="text-headline-sm">Users Management</h3>
          <div style="display:flex;gap:var(--sp-3);align-items:center;flex-wrap:wrap;">
            <div class="admin-search-wrap">
              <span class="material-symbols-outlined">search</span>
              <input v-model="userSearch" type="text" placeholder="Search...">
            </div>
            <button class="btn btn-secondary btn-sm" :disabled="seeding" @click="seedDemoData">
              <span class="material-symbols-outlined" style="font-size:1rem;">group_add</span> {{ seeding ? 'Seeding...' : 'Seed Demo Users' }}
            </button>
            <button class="btn btn-ghost btn-sm" style="color:var(--danger);" :disabled="deletingSeed" @click="deleteSeedData">
              <span class="material-symbols-outlined" style="font-size:1rem;">person_remove</span> {{ deletingSeed ? 'Deleting...' : 'Clear Demo Users' }}
            </button>
          </div>
        </div>

        <div v-if="userLoading" style="padding:var(--sp-12);text-align:center;">
          <p style="color:var(--on-surface-variant);">Loading users...</p>
        </div>

        <div v-else class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Balance</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="u in filteredUsers" :key="u.id">
                <template v-if="editingUser?.id === u.id">
                  <td style="font-family:var(--font-headline);font-size:.8rem;">{{ u.id }}</td>
                  <td><input v-model="editingUser.username" class="admin-input-inline"></td>
                  <td style="font-size:.85rem;color:var(--on-surface-variant);">{{ u.email }}</td>
                  <td>
                    <select v-model="editingUser.role" class="admin-input-inline" style="width:7rem;">
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                  <td><span :class="u.banned ? 'admin-status-banned' : ''">{{ u.banned ? 'BANNED' : '' }}</span></td>
                  <td style="font-family:var(--font-headline);">{{ u.balance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</td>
                  <td style="font-size:.75rem;color:var(--on-surface-variant);">{{ formatDate(u.createdAt) }}</td>
                  <td>
                    <div style="display:flex;gap:var(--sp-2);">
                      <button class="btn-icon btn-icon-save" @click="saveUser(editingUser)" title="Save">
                        <span class="material-symbols-outlined">check</span>
                      </button>
                      <button class="btn-icon btn-icon-cancel" @click="editingUser = null" title="Cancel">
                        <span class="material-symbols-outlined">close</span>
                      </button>
                    </div>
                  </td>
                </template>
                <template v-else>
                  <td style="font-family:var(--font-headline);font-size:.8rem;color:var(--on-surface-variant);">{{ u.id }}</td>
                  <td style="font-weight:500;">{{ u.username }}</td>
                  <td style="font-size:.85rem;color:var(--on-surface-variant);">{{ u.email }}</td>
                  <td><span :class="['admin-role-badge', u.role === 'ADMIN' ? 'admin-role-admin' : '']">{{ u.role }}</span></td>
                  <td>
                    <span v-if="u.banned" class="admin-status-banned" :title="u.banReason || ''">BANNED</span>
                    <span v-else class="admin-status-active">Active</span>
                  </td>
                  <td style="font-family:var(--font-headline);font-weight:700;">{{ u.balance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</td>
                  <td style="font-size:.75rem;color:var(--on-surface-variant);">{{ formatDate(u.createdAt) }}</td>
                  <td>
                    <div style="display:flex;gap:var(--sp-2);">
                      <button class="btn-icon" @click="editingUser = { ...u }" title="Edit">
                        <span class="material-symbols-outlined">edit</span>
                      </button>
                      <button v-if="!u.banned" class="btn-icon btn-icon-danger" @click="toggleBan(u)" title="Ban user">
                        <span class="material-symbols-outlined">block</span>
                      </button>
                      <button v-else class="btn-icon btn-icon-save" @click="toggleBan(u)" title="Unban user">
                        <span class="material-symbols-outlined">lock_open</span>
                      </button>
                      <button class="btn-icon btn-icon-danger" @click="deleteUser(u.id)" title="Delete">
                        <span class="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ==================== TRADES TAB ==================== -->
      <div v-if="activeTab === 'trades'" class="glass-panel" style="padding:0;overflow:hidden;">
        <div style="padding:var(--sp-6) var(--sp-8);border-bottom:1px solid rgba(66,71,84,0.15);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:var(--sp-4);">
          <h3 class="text-headline-sm">Trades Overview</h3>
          <div class="admin-search-wrap">
            <span class="material-symbols-outlined">search</span>
            <input v-model="tradeSearch" type="text" placeholder="Search trades..." @keydown.enter="tradePage = 0; loadTrades()">
          </div>
        </div>

        <div v-if="tradeLoading" style="padding:var(--sp-12);text-align:center;">
          <p style="color:var(--on-surface-variant);">Loading trades...</p>
        </div>

        <div v-else class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Market</th>
                <th>Position</th>
                <th>Odds</th>
                <th>Amount</th>
                <th>Payout</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in trades" :key="t.id">
                <td style="font-family:var(--font-headline);font-size:.8rem;color:var(--on-surface-variant);">{{ t.id }}</td>
                <td style="font-weight:500;">{{ t.username }}</td>
                <td style="font-size:.85rem;max-width:16rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{{ t.marketTitle }}</td>
                <td><span :class="t.option === 'YES' ? 'position-yes' : 'position-no'">{{ t.option }}</span></td>
                <td style="font-family:var(--font-headline);font-weight:700;">{{ t.odds?.toFixed(1) }}%</td>
                <td style="font-family:var(--font-label);">{{ t.amount?.toFixed(2) }} Poly</td>
                <td class="stat-payout">{{ t.potentialPayout?.toFixed(2) }} Poly</td>
                <td><span :class="'admin-trade-status admin-trade-' + (t.status || 'open').toLowerCase()">{{ t.status || 'OPEN' }}</span></td>
                <td style="font-size:.75rem;color:var(--on-surface-variant);">{{ formatDate(t.createdAt) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="tradeTotalPages > 1" class="admin-pagination">
          <button class="btn btn-ghost btn-sm" :disabled="tradePage === 0" @click="tradePage--; loadTrades()">Previous</button>
          <span class="text-label-sm text-dim">Page {{ tradePage + 1 }} / {{ tradeTotalPages }}</span>
          <button class="btn btn-ghost btn-sm" :disabled="tradePage >= tradeTotalPages - 1" @click="tradePage++; loadTrades()">Next</button>
        </div>
      </div>

      <!-- ==================== APPEALS TAB ==================== -->
      <div v-if="activeTab === 'appeals'" class="glass-panel" style="padding:0;overflow:hidden;">
        <div style="padding:var(--sp-6) var(--sp-8);border-bottom:1px solid rgba(66,71,84,0.15);display:flex;justify-content:space-between;align-items:center;">
          <h3 class="text-headline-sm">Appeals Management</h3>
          <span v-if="pendingAppealsCount > 0" style="font-size:.85rem;color:var(--error);font-weight:600;">{{ pendingAppealsCount }} pending</span>
        </div>

        <div v-if="appealsLoading" style="padding:var(--sp-12);text-align:center;">
          <p style="color:var(--on-surface-variant);">Loading appeals...</p>
        </div>

        <div v-else-if="appeals.length === 0" style="padding:var(--sp-12);text-align:center;">
          <p style="color:var(--on-surface-variant);">No appeals submitted yet.</p>
        </div>

        <div v-else style="display:flex;flex-direction:column;">
          <div
            v-for="a in appeals" :key="a.id"
            style="padding:var(--sp-5) var(--sp-8);border-bottom:1px solid rgba(66,71,84,0.1);"
            :style="a.status === 'PENDING' ? 'background:rgba(255,170,50,0.04);' : ''"
          >
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:var(--sp-4);margin-bottom:var(--sp-3);">
              <div>
                <div style="display:flex;align-items:center;gap:var(--sp-3);margin-bottom:var(--sp-2);">
                  <span style="font-weight:600;font-size:.95rem;">{{ a.username }}</span>
                  <span style="font-size:.75rem;color:var(--on-surface-variant);">{{ a.userEmail }}</span>
                  <span :class="[
                    'admin-role-badge',
                    a.status === 'PENDING' ? 'admin-appeal-pending' : '',
                    a.status === 'ACCEPTED' ? 'admin-appeal-accepted' : '',
                    a.status === 'REJECTED' ? 'admin-appeal-rejected' : '',
                  ]">{{ a.status }}</span>
                </div>
                <p style="font-size:.75rem;color:var(--on-surface-variant);margin-bottom:var(--sp-2);">
                  Ban reason: <span style="color:var(--error);">{{ a.banReason || 'N/A' }}</span>
                  · Submitted: {{ formatDate(a.createdAt) }}
                </p>
              </div>
            </div>
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-md);padding:var(--sp-3) var(--sp-4);margin-bottom:var(--sp-3);">
              <p style="font-size:.7rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--on-surface-variant);margin-bottom:var(--sp-1);">User's Appeal</p>
              <p style="font-size:.875rem;color:var(--on-surface);">{{ a.reason }}</p>
            </div>
            <div v-if="a.adminResponse" style="background:rgba(77,142,255,0.05);border:1px solid rgba(77,142,255,0.1);border-radius:var(--radius-md);padding:var(--sp-3) var(--sp-4);margin-bottom:var(--sp-3);">
              <p style="font-size:.7rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--primary);margin-bottom:var(--sp-1);">Admin Response</p>
              <p style="font-size:.875rem;color:var(--on-surface);">{{ a.adminResponse }}</p>
            </div>
            <div v-if="a.status === 'PENDING'" style="display:flex;gap:var(--sp-3);">
              <button class="btn btn-primary btn-sm" @click="handleAcceptAppeal(a)">
                <span class="material-symbols-outlined" style="font-size:1rem;">lock_open</span> Accept & Unban
              </button>
              <button class="btn btn-ghost btn-sm" style="color:var(--error);" @click="handleRejectAppeal(a)">
                <span class="material-symbols-outlined" style="font-size:1rem;">close</span> Reject
              </button>
            </div>
            <div v-if="a.reviewedAt" style="margin-top:var(--sp-2);">
              <span style="font-size:.7rem;color:var(--on-surface-variant);">Reviewed: {{ formatDate(a.reviewedAt) }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<style scoped>
.admin-tabs {
  display: flex;
  gap: var(--sp-2);
  margin-bottom: var(--sp-6);
}
.admin-tab {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-3) var(--sp-6);
  background: rgba(30, 33, 40, 0.6);
  border: 1px solid rgba(66, 71, 84, 0.2);
  border-radius: var(--radius-md);
  color: var(--on-surface-variant);
  font-family: var(--font-label);
  font-size: .875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.admin-tab:hover {
  border-color: var(--primary);
  color: var(--on-surface);
}
.admin-tab.active {
  background: rgba(77, 142, 255, 0.1);
  border-color: var(--primary);
  color: var(--primary);
}
.admin-tab .material-symbols-outlined {
  font-size: 1.1rem;
}
.admin-search-wrap {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  background: rgba(30, 33, 40, 0.8);
  border: 1px solid rgba(66, 71, 84, 0.3);
  border-radius: var(--radius-md);
  padding: var(--sp-2) var(--sp-4);
}
.admin-search-wrap .material-symbols-outlined {
  font-size: 1rem;
  color: var(--on-surface-variant);
}
.admin-search-wrap input {
  background: none;
  border: none;
  color: var(--on-surface);
  font-size: .85rem;
  outline: none;
  width: 12rem;
}
.admin-label {
  display: block;
  font-size: .75rem;
  font-weight: 600;
  color: var(--on-surface-variant);
  margin-bottom: var(--sp-1);
  text-transform: uppercase;
  letter-spacing: .05em;
}
.admin-input {
  width: 100%;
  padding: var(--sp-2) var(--sp-3);
  background: rgba(30, 33, 40, 0.8);
  border: 1px solid rgba(66, 71, 84, 0.3);
  border-radius: var(--radius-sm);
  color: var(--on-surface);
  font-size: .85rem;
  outline: none;
}
.admin-input:focus {
  border-color: var(--primary);
}
.admin-input-inline {
  padding: var(--sp-1) var(--sp-2);
  background: rgba(30, 33, 40, 0.8);
  border: 1px solid var(--primary);
  border-radius: var(--radius-sm);
  color: var(--on-surface);
  font-size: .85rem;
  outline: none;
  width: 100%;
}
.admin-badge {
  display: inline-block;
  padding: 2px 8px;
  background: rgba(77, 142, 255, 0.1);
  border-radius: var(--radius-sm);
  font-size: .75rem;
  font-weight: 600;
  color: var(--primary);
}
.admin-role-badge {
  display: inline-block;
  padding: 2px 8px;
  background: rgba(66, 71, 84, 0.2);
  border-radius: var(--radius-sm);
  font-size: .75rem;
  font-weight: 600;
  color: var(--on-surface-variant);
}
.admin-role-admin {
  background: rgba(255, 170, 50, 0.15);
  color: #ffaa32;
}
.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: var(--radius-sm);
  border: none;
  background: rgba(66, 71, 84, 0.15);
  color: var(--on-surface-variant);
  cursor: pointer;
  transition: all 0.15s;
}
.btn-icon:hover {
  background: rgba(77, 142, 255, 0.15);
  color: var(--primary);
}
.btn-icon .material-symbols-outlined {
  font-size: 1rem;
}
.btn-icon-danger:hover {
  background: rgba(255, 80, 80, 0.15);
  color: #ff5050;
}
.btn-icon-save {
  background: rgba(50, 205, 100, 0.1);
  color: #32cd64;
}
.btn-icon-save:hover {
  background: rgba(50, 205, 100, 0.2);
}
.btn-icon-cancel:hover {
  background: rgba(255, 80, 80, 0.15);
  color: #ff5050;
}
.admin-appeal-pending {
  background: rgba(255, 170, 50, 0.15) !important;
  color: #ffaa32 !important;
}
.admin-appeal-accepted {
  background: rgba(50, 205, 100, 0.1) !important;
  color: #32cd64 !important;
}
.admin-appeal-rejected {
  background: rgba(255, 75, 75, 0.15) !important;
  color: #ff5050 !important;
}
.admin-status-banned {
  display: inline-block;
  padding: 2px 8px;
  background: rgba(255, 75, 75, 0.15);
  border-radius: var(--radius-sm);
  font-size: .75rem;
  font-weight: 600;
  color: #ff5050;
}
.admin-status-active {
  display: inline-block;
  padding: 2px 8px;
  background: rgba(50, 205, 100, 0.1);
  border-radius: var(--radius-sm);
  font-size: .75rem;
  font-weight: 600;
  color: #32cd64;
}
.btn-icon-resolve {
  background: rgba(255, 152, 0, 0.1);
  color: #ff9800;
}
.btn-icon-resolve:hover {
  background: rgba(255, 152, 0, 0.2);
  color: #ff9800;
}
.admin-trade-status {
  display: inline-block;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-size: .7rem;
  font-weight: 700;
  letter-spacing: .05em;
  text-transform: uppercase;
}
.admin-trade-open {
  background: rgba(77, 142, 255, 0.1);
  color: var(--primary);
}
.admin-trade-won {
  background: rgba(76, 175, 80, 0.15);
  color: #4caf50;
}
.admin-trade-lost {
  background: rgba(244, 67, 54, 0.15);
  color: #f44336;
}
.admin-trade-sold {
  background: rgba(255, 152, 0, 0.15);
  color: #ff9800;
}
.admin-resolved-badge {
  display: inline-block;
  margin-left: var(--sp-2);
  padding: 1px 6px;
  background: rgba(255, 152, 0, 0.15);
  border: 1px solid rgba(255, 152, 0, 0.3);
  border-radius: var(--radius-sm);
  font-size: .65rem;
  font-weight: 700;
  color: #ff9800;
  text-transform: uppercase;
  letter-spacing: .05em;
}
.admin-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-4);
  padding: var(--sp-4) var(--sp-8);
  border-top: 1px solid rgba(66, 71, 84, 0.15);
}

.admin-create-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-4);
  margin-bottom: var(--sp-4);
}

/* Responsive admin */
@media (max-width: 47.9rem) {
  .admin-create-grid {
    grid-template-columns: 1fr;
  }
  .admin-tabs {
    overflow-x: auto;
    flex-wrap: nowrap;
  }
  .admin-tab {
    white-space: nowrap;
    padding: var(--sp-2) var(--sp-4);
    font-size: .75rem;
  }
  .admin-search-wrap {
    width: 100%;
  }
  .admin-search-wrap input {
    width: 100%;
    min-width: 0;
  }
  .glass-panel > div:first-child {
    padding: var(--sp-4) !important;
  }
}
</style>
