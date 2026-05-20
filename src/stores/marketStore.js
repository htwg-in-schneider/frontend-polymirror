import { defineStore } from 'pinia';
import axios from 'axios';

const API = 'http://localhost:8080/api';

export const useMarketStore = defineStore('market', {
  state: () => ({
    groups: [],           // EventGroupDto[]
    currentMarket: null,
    loading: false,
    error: null,
    page: 0,
    totalPages: 0,
    totalElements: 0,
    selectedCategory: '',
    selectedSubcategory: '',
    searchQuery: '',
  }),

  actions: {
    async fetchGroups(page = 0, category = '', subcategory = '', search = '') {
      this.loading = true;
      this.error = null;
      try {
        const params = { page, size: 20 };
        if (category)    params.category    = category;
        if (subcategory) params.subcategory = subcategory;
        if (search)      params.search      = search;

        const { data } = await axios.get(`${API}/markets/grouped`, { params });

        this.groups = data.content;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
        this.page = data.number;
        this.selectedCategory = category;
        this.selectedSubcategory = subcategory;
        this.searchQuery = search;
      } catch {
        this.error = 'Fehler beim Laden der Markets.';
      } finally {
        this.loading = false;
      }
    },

    async fetchMarketById(id) {
      this.loading = true;
      this.error = null;
      this.currentMarket = null;
      try {
        const { data } = await axios.get(`${API}/markets/${id}`);
        this.currentMarket = data;
      } catch {
        this.error = 'Market nicht gefunden.';
      } finally {
        this.loading = false;
      }
    },

    nextPage() {
      if (this.page < this.totalPages - 1) {
        this.fetchGroups(this.page + 1, this.selectedCategory, this.selectedSubcategory, this.searchQuery);
      }
    },

    prevPage() {
      if (this.page > 0) {
        this.fetchGroups(this.page - 1, this.selectedCategory, this.selectedSubcategory, this.searchQuery);
      }
    },

    filterByCategory(category) {
      // Sub-Kategorie zurücksetzen wenn Hauptkategorie wechselt
      this.fetchGroups(0, category, '', this.searchQuery);
    },

    setSubcategory(subcategory) {
      this.fetchGroups(0, this.selectedCategory, subcategory, this.searchQuery);
    },

    setSearch(query) {
      this.fetchGroups(0, this.selectedCategory, this.selectedSubcategory, query);
    },
  },
});
