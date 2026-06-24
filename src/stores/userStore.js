import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import { API_BASE } from '@/config.js';

const API = `${API_BASE}/users`;

export const useUserStore = defineStore('user', () => {
  const currentUser = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const isLoggedIn = computed(() => !!currentUser.value);
  const isAdmin = computed(() => currentUser.value?.role === 'ADMIN');

  // Load user profile from backend using Auth0 token
  async function loadProfile(getAccessTokenSilently) {
    loading.value = true;
    error.value = null;
    try {
      const token = await getAccessTokenSilently();
      const { data } = await axios.get(`${API}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      currentUser.value = data;
      return data;
    } catch (e) {
      if (e.response?.status === 403 && e.response?.data?.error === 'Account is banned') {
        error.value = 'banned';
        currentUser.value = { banned: true, banReason: e.response.data.banReason, id: e.response.data.userId };
      } else {
        error.value = 'Could not load profile';
        currentUser.value = null;
      }
    } finally {
      loading.value = false;
    }
  }

  // Update username
  async function updateProfile(updates, getAccessTokenSilently) {
    loading.value = true;
    error.value = null;
    try {
      const token = await getAccessTokenSilently();
      const { data } = await axios.put(`${API}/me`, updates, {
        headers: { Authorization: `Bearer ${token}` },
      });
      currentUser.value = data;
      return data;
    } catch (e) {
      error.value = e.response?.data?.error || 'Update failed';
      throw error.value;
    } finally {
      loading.value = false;
    }
  }

  // Delete own account
  async function deleteAccount(getAccessTokenSilently) {
    loading.value = true;
    error.value = null;
    try {
      const token = await getAccessTokenSilently();
      await axios.delete(`${API}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      currentUser.value = null;
    } catch (e) {
      error.value = 'Delete failed';
      throw error.value;
    } finally {
      loading.value = false;
    }
  }

  function clearUser() {
    currentUser.value = null;
  }

  return { currentUser, loading, error, isLoggedIn, isAdmin, loadProfile, updateProfile, deleteAccount, clearUser };
});
