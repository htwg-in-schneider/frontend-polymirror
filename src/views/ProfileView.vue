<script setup>
import { ref, computed } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import { useUserStore } from '@/stores/userStore.js';

const { getAccessTokenSilently, logout } = useAuth0();
const userStore = useUserStore();

const editMode = ref(null);
const editUsername = ref('');
const editGender = ref('');
const editMsg = ref('');
const editError = ref('');
const showDeleteConfirm = ref(false);
const avatarUploading = ref(false);

const user = computed(() => userStore.currentUser);
const initials = computed(() => {
  const name = user.value?.username || '?';
  return name.slice(0, 2).toUpperCase();
});

const genderLabel = computed(() => {
  const map = { male: 'Male', female: 'Female', neutral: 'Neutral' };
  return map[user.value?.gender] || 'Not set';
});

function startEdit(field) {
  editMode.value = field;
  editMsg.value = '';
  editError.value = '';
  if (field === 'username') editUsername.value = user.value?.username || '';
  if (field === 'gender') editGender.value = user.value?.gender || 'neutral';
}

async function saveEdit() {
  editError.value = '';
  editMsg.value = '';
  const updates = {};
  if (editMode.value === 'username') updates.username = editUsername.value;
  if (editMode.value === 'gender') updates.gender = editGender.value;
  try {
    await userStore.updateProfile(updates, getAccessTokenSilently);
    editMsg.value = 'Saved!';
    editMode.value = null;
  } catch (e) {
    editError.value = e;
  }
}

async function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    editError.value = 'Only JPEG, PNG, GIF or WebP images are allowed';
    return;
  }
  if (file.size > 500000) {
    editError.value = 'Image must be under 500KB';
    return;
  }
  avatarUploading.value = true;
  editError.value = '';
  try {
    const reader = new FileReader();
    reader.onload = async () => {
      await userStore.updateProfile({ avatarUrl: reader.result }, getAccessTokenSilently);
      editMsg.value = 'Avatar updated!';
      avatarUploading.value = false;
    };
    reader.readAsDataURL(file);
  } catch (e) {
    editError.value = 'Upload failed';
    avatarUploading.value = false;
  }
}

function removeAvatar() {
  userStore.updateProfile({ avatarUrl: '' }, getAccessTokenSilently);
  editMsg.value = 'Avatar removed';
}

async function confirmDelete() {
  try {
    await userStore.deleteAccount(getAccessTokenSilently);
    logout({ logoutParams: { returnTo: window.location.origin } });
  } catch (e) {
    editError.value = e;
    showDeleteConfirm.value = false;
  }
}
</script>

<template>
  <div class="bg-glow-blob bg-glow-blob-tr"></div>

  <main style="padding-top:var(--nav-height);padding-bottom:var(--sp-24);">

    <!-- Page Header -->
    <div style="text-align:center;padding:calc(var(--sp-14) + 3rem) var(--sp-6) var(--sp-10);position:relative;">
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:24rem;height:16rem;background:rgba(173,198,255,0.05);border-radius:50%;filter:blur(4rem);pointer-events:none;"></div>
      <div style="position:relative;z-index:1;">
        <p class="section-eyebrow" style="text-align:center;font-size:1.5rem;letter-spacing:.05em;margin-bottom:var(--sp-6);">Account Settings</p>
        <div style="display:flex;justify-content:center;margin-bottom:var(--sp-5);">
          <label class="profile-avatar-ring" style="cursor:pointer;" title="Click to upload avatar">
            <img v-if="user?.avatarUrl" :src="user.avatarUrl" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">
            <span v-else class="profile-avatar-initials">{{ initials }}</span>
            <div class="avatar-overlay">
              <span class="material-symbols-outlined" style="font-size:1.5rem;color:#fff;">photo_camera</span>
            </div>
            <input type="file" accept="image/*" style="display:none;" @change="handleAvatarUpload">
          </label>
        </div>
        <p v-if="avatarUploading" style="font-size:.75rem;color:var(--primary);margin-bottom:var(--sp-2);">Uploading...</p>
        <button v-if="user?.avatarUrl" class="btn-edit" style="margin-bottom:var(--sp-3);font-size:.65rem;" @click="removeAvatar">Remove Avatar</button>
        <h1 style="font-family:var(--font-headline);font-size:clamp(1.75rem,4vw,2.5rem);font-weight:900;letter-spacing:-.02em;color:var(--primary);text-shadow:var(--glow-text);margin-bottom:var(--sp-2);">{{ user?.username }}</h1>
        <p style="font-family:var(--font-label);font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--on-surface-variant);">{{ user?.email }}</p>
        <p v-if="user?.role" style="font-family:var(--font-label);font-size:0.625rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--primary);opacity:0.7;margin-top:var(--sp-2);">{{ user?.role }}</p>
      </div>
    </div>

    <!-- Settings sections -->
    <div class="profile-section" style="display:flex;flex-direction:column;gap:var(--sp-6);">

      <!-- Feedback -->
      <div v-if="editMsg" style="color:#4caf50;font-size:.85rem;padding:var(--sp-3);border:1px solid rgba(76,175,80,0.3);border-radius:var(--radius-md);text-align:center;">{{ editMsg }}</div>
      <div v-if="editError" style="color:#ff6b6b;font-size:.85rem;padding:var(--sp-3);border:1px solid rgba(255,107,107,0.3);border-radius:var(--radius-md);text-align:center;">{{ editError }}</div>

      <!-- 1. Account Information -->
      <div class="settings-card">
        <p class="settings-card-title">Account Information</p>

        <!-- Email (read-only, managed by Auth0) -->
        <div class="settings-row">
          <div>
            <p class="settings-row-label">Email</p>
            <p class="settings-row-value">{{ user?.email }}</p>
          </div>
          <span style="font-family:var(--font-label);font-size:0.625rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--outline);background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-sm);padding:var(--sp-1) var(--sp-2);">Auth0</span>
        </div>

        <!-- Username -->
        <div class="settings-row">
          <div>
            <p class="settings-row-label">Username</p>
            <p v-if="editMode !== 'username'" class="settings-row-value">{{ user?.username }}</p>
            <div v-else style="display:flex;gap:var(--sp-2);margin-top:var(--sp-2);">
              <input class="form-input" v-model="editUsername" type="text" maxlength="50" style="flex:1;padding:var(--sp-2) var(--sp-3);font-size:.875rem;">
              <button class="btn-edit" @click="saveEdit">Save</button>
              <button class="btn-edit" @click="editMode=null">Cancel</button>
            </div>
          </div>
          <button v-if="editMode !== 'username'" class="btn-edit" @click="startEdit('username')"><span class="material-symbols-outlined" style="font-size:0.875rem;">edit</span>Edit</button>
        </div>

        <!-- Gender -->
        <div class="settings-row">
          <div>
            <p class="settings-row-label">Gender</p>
            <p v-if="editMode !== 'gender'" class="settings-row-value">{{ genderLabel }}</p>
            <div v-else style="display:flex;gap:var(--sp-2);margin-top:var(--sp-2);">
              <div class="gender-select">
                <button :class="['gender-option', { active: editGender === 'male' }]" @click="editGender = 'male'">
                  <span class="material-symbols-outlined">male</span> Male
                </button>
                <button :class="['gender-option', { active: editGender === 'female' }]" @click="editGender = 'female'">
                  <span class="material-symbols-outlined">female</span> Female
                </button>
                <button :class="['gender-option', { active: editGender === 'neutral' }]" @click="editGender = 'neutral'">
                  <span class="material-symbols-outlined">radio_button_unchecked</span> Neutral
                </button>
              </div>
              <button class="btn-edit" @click="saveEdit">Save</button>
              <button class="btn-edit" @click="editMode=null">Cancel</button>
            </div>
          </div>
          <button v-if="editMode !== 'gender'" class="btn-edit" @click="startEdit('gender')"><span class="material-symbols-outlined" style="font-size:0.875rem;">edit</span>Edit</button>
        </div>

        <!-- User ID -->
        <div class="settings-row">
          <div><p class="settings-row-label">User ID</p><p class="settings-row-value muted">#{{ user?.id }}</p></div>
          <span style="font-family:var(--font-label);font-size:0.625rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--outline);background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-sm);padding:var(--sp-1) var(--sp-2);">Fixed</span>
        </div>
      </div>

      <!-- 2. Security (managed by Auth0) -->
      <div class="settings-card">
        <p class="settings-card-title">Security</p>
        <div class="settings-row">
          <div>
            <p class="settings-row-label">Password</p>
            <p class="settings-row-value muted">Managed by Auth0</p>
          </div>
          <span style="font-family:var(--font-label);font-size:0.625rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--outline);background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-sm);padding:var(--sp-1) var(--sp-2);">Auth0</span>
        </div>
      </div>

      <!-- 3. Danger Zone -->
      <div class="settings-card danger">
        <p class="settings-card-title">Danger Zone</p>
        <div class="settings-row">
          <div>
            <p style="font-size:0.9375rem;color:var(--on-surface);font-weight:500;margin-bottom:var(--sp-1);">Delete Account</p>
            <p style="font-size:0.8125rem;color:var(--on-surface-variant);">This action cannot be undone.</p>
          </div>
          <button class="btn-danger" @click="showDeleteConfirm = true">
            <span class="material-symbols-outlined" style="font-size:1rem;">delete_forever</span>
            Delete
          </button>
        </div>

        <div v-if="showDeleteConfirm" style="padding:var(--sp-5) var(--sp-6);border-top:1px solid rgba(255,75,75,0.2);display:flex;flex-direction:column;gap:var(--sp-4);">
          <p style="font-size:.875rem;color:var(--on-surface);">Are you sure? Your account will be permanently deleted.</p>
          <div style="display:flex;gap:var(--sp-3);">
            <button class="btn-danger" @click="confirmDelete" :disabled="userStore.loading">
              <span class="material-symbols-outlined" style="font-size:1rem;">delete_forever</span>
              {{ userStore.loading ? 'Deleting...' : 'Yes, delete account' }}
            </button>
            <button class="btn-edit" @click="showDeleteConfirm = false">Cancel</button>
          </div>
        </div>
      </div>

    </div>
  </main>

  <!-- MOBILE NAV -->
  <nav class="mobile-nav">
    <router-link to="/markets" class="mobile-nav-item">
      <span class="material-symbols-outlined">explore</span>
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
    <router-link to="/profile" class="mobile-nav-item active">
      <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1;">account_circle</span>
      <span class="mobile-nav-label">Profile</span>
    </router-link>
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
.profile-avatar-ring { width: 6.25rem; height: 6.25rem; border-radius: 50%; background: linear-gradient(135deg, rgba(173,198,255,0.2), rgba(160,120,255,0.15)); border: 2px solid rgba(173,198,255,0.25); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
.profile-avatar-initials { font-family: var(--font-headline); font-size: 2rem; font-weight: 900; color: var(--primary); letter-spacing: -.02em; }
.avatar-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; border-radius: 50%; }
.profile-avatar-ring:hover .avatar-overlay { opacity: 1; }
.gender-select { display: flex; gap: var(--sp-2); }
.gender-option { display: flex; align-items: center; gap: var(--sp-1); padding: var(--sp-2) var(--sp-3); background: rgba(30, 33, 40, 0.8); border: 1px solid rgba(66, 71, 84, 0.3); border-radius: var(--radius-md); color: var(--on-surface-variant); font-size: .8rem; cursor: pointer; transition: all 0.15s; }
.gender-option .material-symbols-outlined { font-size: 1rem; }
.gender-option:hover { border-color: var(--primary); color: var(--on-surface); }
.gender-option.active { background: rgba(77, 142, 255, 0.1); border-color: var(--primary); color: var(--primary); }
</style>
