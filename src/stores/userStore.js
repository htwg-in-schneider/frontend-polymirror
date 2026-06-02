import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

const API = 'http://localhost:8080/api/users';

export const useUserStore = defineStore('user', () => {
  const currentUser = ref(JSON.parse(localStorage.getItem('polymirror_user') || 'null'));
  const loading = ref(false);
  const error = ref(null);

  function setUser(user) {
    currentUser.value = user;
    if (user) {
      localStorage.setItem('polymirror_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('polymirror_user');
    }
  }

  // CREATE — Registrierung
  async function register(username, email, password) {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await axios.post(API, { username, email, password });
      setUser(data);
      return data;
    } catch (e) {
      error.value = e.response?.data?.error || 'Registrierung fehlgeschlagen';
      throw error.value;
    } finally {
      loading.value = false;
    }
  }

  // LOGIN
  async function login(email, password) {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await axios.post(`${API}/login`, { email, password });
      setUser(data);
      return data;
    } catch (e) {
      error.value = e.response?.data?.error || 'Login fehlgeschlagen';
      throw error.value;
    } finally {
      loading.value = false;
    }
  }

  // READ — Profil neu laden
  async function loadProfile() {
    if (!currentUser.value?.id) return;
    loading.value = true;
    error.value = null;
    try {
      const { data } = await axios.get(`${API}/${currentUser.value.id}`);
      setUser(data);
      return data;
    } catch (e) {
      error.value = 'Profil konnte nicht geladen werden';
    } finally {
      loading.value = false;
    }
  }

  // UPDATE — Profil bearbeiten
  async function updateProfile(updates) {
    if (!currentUser.value?.id) return;
    loading.value = true;
    error.value = null;
    try {
      const { data } = await axios.put(`${API}/${currentUser.value.id}`, updates);
      setUser(data);
      return data;
    } catch (e) {
      error.value = e.response?.data?.error || 'Update fehlgeschlagen';
      throw error.value;
    } finally {
      loading.value = false;
    }
  }

  // DELETE — Account löschen
  async function deleteAccount() {
    if (!currentUser.value?.id) return;
    loading.value = true;
    error.value = null;
    try {
      await axios.delete(`${API}/${currentUser.value.id}`);
      setUser(null);
    } catch (e) {
      error.value = 'Löschen fehlgeschlagen';
      throw error.value;
    } finally {
      loading.value = false;
    }
  }

  function logout() {
    setUser(null);
  }

  return { currentUser, loading, error, register, login, loadProfile, updateProfile, deleteAccount, logout };
});
