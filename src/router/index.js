import { createRouter, createWebHistory } from 'vue-router';
import { authGuard } from '@auth0/auth0-vue';
import HomeView from '@/views/HomeView.vue';
import MarketsView from '@/views/MarketsView.vue';
import MarketDetailView from '@/views/MarketDetailView.vue';
import EventDetailView from '@/views/EventDetailView.vue';
import DashboardView from '@/views/DashboardView.vue';
import LeaderboardView from '@/views/LeaderboardView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import ProfileView from '@/views/ProfileView.vue';
import FaqView from '@/views/FaqView.vue';
import ImprintView from '@/views/ImpressumView.vue';
import PrivacyView from '@/views/DatenschutzView.vue';
import AdminView from '@/views/AdminView.vue';

const routes = [
  { path: '/',             component: HomeView },
  { path: '/markets',      component: MarketsView },
  { path: '/market/:id',   component: MarketDetailView },
  { path: '/event/:eventId', component: EventDetailView },
  { path: '/dashboard',    component: DashboardView,   beforeEnter: authGuard },
  { path: '/leaderboard',  component: LeaderboardView },
  { path: '/login',        component: LoginView },
  { path: '/register',     component: RegisterView },
  { path: '/profile',      component: ProfileView,     beforeEnter: authGuard },
  { path: '/faq',          component: FaqView },
  { path: '/imprint',      component: ImprintView },
  { path: '/privacy',      component: PrivacyView },
  { path: '/admin',        component: AdminView,       beforeEnter: authGuard },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
