import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import MarketsView from '@/views/MarketsView.vue';
import MarketDetailView from '@/views/MarketDetailView.vue';
import DashboardView from '@/views/DashboardView.vue';
import LeaderboardView from '@/views/LeaderboardView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import ProfileView from '@/views/ProfileView.vue';
import FaqView from '@/views/FaqView.vue';

const routes = [
  { path: '/',             component: HomeView },
  { path: '/markets',      component: MarketsView },
  { path: '/market/:id',   component: MarketDetailView },
  { path: '/dashboard',    component: DashboardView },
  { path: '/leaderboard',  component: LeaderboardView },
  { path: '/login',        component: LoginView },
  { path: '/register',     component: RegisterView },
  { path: '/profile',      component: ProfileView },
  { path: '/faq',          component: FaqView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
