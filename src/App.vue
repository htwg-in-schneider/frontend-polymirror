<script setup>
import { watch, ref } from 'vue';
import NavBar from '@/components/NavBar.vue';
import FooterBar from '@/components/FooterBar.vue';
import { useAuth0 } from '@auth0/auth0-vue';
import { useUserStore } from '@/stores/userStore.js';
import axios from 'axios';
import { API_BASE } from '@/config.js';

const { isAuthenticated, getAccessTokenSilently, logout } = useAuth0();
const userStore = useUserStore();

const showWelcome = ref(false);
const chosenUsername = ref('');
const chosenGender = ref('neutral');
const savingWelcome = ref(false);

// Banned state
const showBanned = ref(false);
const banReason = ref('');
const appealText = ref('');
const appealSending = ref(false);
const appealSent = ref(false);
const bannedUserId = ref(null);

function doLogout() {
  logout({ logoutParams: { returnTo: window.location.origin + import.meta.env.BASE_URL } });
}

async function submitAppeal() {
  if (!appealText.value.trim() || !bannedUserId.value) return;
  appealSending.value = true;
  try {
    const token = await getAccessTokenSilently();
    await axios.post(`${API_BASE}/appeals`, {
      userId: bannedUserId.value,
      reason: appealText.value.trim(),
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    appealSent.value = true;
  } catch (e) {
    alert('Failed to submit appeal. You may have already submitted one.');
  } finally {
    appealSending.value = false;
  }
}

watch(isAuthenticated, async (loggedIn) => {
  if (loggedIn) {
    const user = await userStore.loadProfile(getAccessTokenSilently);
    if (userStore.error === 'banned') {
      showBanned.value = true;
      banReason.value = userStore.currentUser?.banReason || 'No reason provided';
      bannedUserId.value = userStore.currentUser?.id || null;
      appealSent.value = false;
      appealText.value = '';
      return;
    }
    if (user?.isNew) {
      chosenUsername.value = '';
      chosenGender.value = 'neutral';
      showWelcome.value = true;
    }
  } else {
    userStore.clearUser();
    showBanned.value = false;
  }
}, { immediate: true });

async function saveWelcome() {
  if (!chosenUsername.value.trim()) return;
  savingWelcome.value = true;
  try {
    await userStore.updateProfile({
      username: chosenUsername.value.trim(),
      gender: chosenGender.value,
    }, getAccessTokenSilently);
    showWelcome.value = false;
  } catch (e) {
    alert('Username could not be saved. It may already be taken.');
  } finally {
    savingWelcome.value = false;
  }
}
</script>

<template>
  <NavBar />
  <router-view></router-view>
  <FooterBar />

  <!-- Banned Modal -->
  <Teleport to="body">
    <div v-if="showBanned" class="welcome-overlay">
      <div class="welcome-modal" style="border-color:rgba(255,75,75,0.3);max-width:30rem;">
        <div class="welcome-icon">
          <span class="material-symbols-outlined" style="color:var(--error);">block</span>
        </div>
        <h2 style="color:var(--error);">Account Suspended</h2>
        <p>Your account has been banned by an administrator.</p>
        <div style="background:rgba(255,75,75,0.08);border:1px solid rgba(255,75,75,0.2);border-radius:var(--radius-md);padding:var(--sp-4);margin-bottom:var(--sp-6);text-align:left;">
          <p style="font-size:.7rem;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:var(--error);margin-bottom:var(--sp-1);">Reason</p>
          <p style="font-size:.875rem;color:var(--on-surface);">{{ banReason }}</p>
        </div>

        <!-- Appeal Form -->
        <div v-if="!appealSent" style="text-align:left;margin-bottom:var(--sp-6);">
          <p style="font-size:.7rem;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:var(--on-surface-variant);margin-bottom:var(--sp-2);">Submit an Appeal</p>
          <textarea
            v-model="appealText"
            placeholder="Explain why you believe this ban is unjustified..."
            style="width:100%;min-height:5rem;padding:var(--sp-3);background:rgba(30,33,40,0.8);border:1px solid rgba(66,71,84,0.3);border-radius:var(--radius-md);color:var(--on-surface);font-size:.875rem;outline:none;resize:vertical;"
          ></textarea>
          <button
            class="btn btn-secondary btn-sm"
            style="margin-top:var(--sp-3);width:100%;"
            :disabled="!appealText.trim() || appealSending"
            @click="submitAppeal"
          >
            {{ appealSending ? 'Submitting...' : 'Submit Appeal' }}
          </button>
        </div>
        <div v-else style="background:rgba(50,205,100,0.08);border:1px solid rgba(50,205,100,0.2);border-radius:var(--radius-md);padding:var(--sp-4);margin-bottom:var(--sp-6);text-align:center;">
          <span class="material-symbols-outlined" style="color:#32cd64;font-size:1.5rem;">check_circle</span>
          <p style="font-size:.875rem;color:#32cd64;margin-top:var(--sp-2);">Appeal submitted. An admin will review it.</p>
        </div>

        <button class="btn btn-ghost" @click="doLogout">
          Sign Out
        </button>
      </div>
    </div>
  </Teleport>

  <!-- Welcome Modal -->
  <Teleport to="body">
    <div v-if="showWelcome" class="welcome-overlay" @click.self="showWelcome = false">
      <div class="welcome-modal">
        <div class="welcome-icon">
          <span class="material-symbols-outlined">waving_hand</span>
        </div>
        <h2>Welcome to PolyMirror</h2>
        <p>Set up your profile to get started.</p>

        <label class="welcome-label">Username</label>
        <input
          v-model="chosenUsername"
          class="welcome-input"
          type="text"
          placeholder="Your username"
          maxlength="30"
        >

        <label class="welcome-label">Gender</label>
        <div class="welcome-gender">
          <button :class="['welcome-gender-btn', { active: chosenGender === 'male' }]" @click="chosenGender = 'male'">
            <span class="material-symbols-outlined">male</span> Male
          </button>
          <button :class="['welcome-gender-btn', { active: chosenGender === 'female' }]" @click="chosenGender = 'female'">
            <span class="material-symbols-outlined">female</span> Female
          </button>
          <button :class="['welcome-gender-btn', { active: chosenGender === 'neutral' }]" @click="chosenGender = 'neutral'">
            <span class="material-symbols-outlined">radio_button_unchecked</span> Neutral
          </button>
        </div>

        <div class="welcome-actions">
          <button class="btn btn-primary" :disabled="!chosenUsername.trim() || savingWelcome" @click="saveWelcome">
            {{ savingWelcome ? 'Saving...' : 'Continue' }}
          </button>
          <button class="btn btn-ghost btn-sm" @click="showWelcome = false">Skip</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.welcome-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.welcome-modal {
  background: var(--surface-container);
  border: 1px solid rgba(66, 71, 84, 0.3);
  border-radius: var(--radius-xl, 1rem);
  padding: var(--sp-10) var(--sp-10);
  max-width: 26rem;
  width: 90%;
  text-align: center;
}
.welcome-icon {
  margin-bottom: var(--sp-4);
}
.welcome-icon .material-symbols-outlined {
  font-size: 3rem;
  color: var(--primary);
}
.welcome-modal h2 {
  font-family: var(--font-headline);
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: var(--sp-2);
}
.welcome-modal p {
  color: var(--on-surface-variant);
  font-size: .9rem;
  margin-bottom: var(--sp-6);
}
.welcome-label {
  display: block;
  font-family: var(--font-label);
  font-size: .7rem;
  font-weight: 600;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--on-surface-variant);
  text-align: left;
  margin-bottom: var(--sp-2);
}
.welcome-input {
  width: 100%;
  padding: var(--sp-3) var(--sp-4);
  background: rgba(30, 33, 40, 0.8);
  border: 1px solid rgba(66, 71, 84, 0.3);
  border-radius: var(--radius-md);
  color: var(--on-surface);
  font-size: 1rem;
  outline: none;
  margin-bottom: var(--sp-6);
}
.welcome-input:focus {
  border-color: var(--primary);
}
.welcome-gender {
  display: flex;
  gap: var(--sp-2);
  margin-bottom: var(--sp-6);
}
.welcome-gender-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-1);
  padding: var(--sp-3) var(--sp-2);
  background: rgba(30, 33, 40, 0.8);
  border: 1px solid rgba(66, 71, 84, 0.3);
  border-radius: var(--radius-md);
  color: var(--on-surface-variant);
  font-size: .85rem;
  cursor: pointer;
  transition: all 0.15s;
}
.welcome-gender-btn .material-symbols-outlined {
  font-size: 1.1rem;
}
.welcome-gender-btn:hover {
  border-color: var(--primary);
  color: var(--on-surface);
}
.welcome-gender-btn.active {
  background: rgba(77, 142, 255, 0.1);
  border-color: var(--primary);
  color: var(--primary);
}
.welcome-actions {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}
.welcome-actions .btn-primary {
  width: 100%;
}
</style>
