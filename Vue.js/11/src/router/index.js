import { createRouter, createWebHistory } from 'vue-router';

//static load
//@ oznacza katalog /src

import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import PromotionView from '@/views/PromotionView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import SearchView from '@/views/SearchView.vue';

//lazy load - renderuje się tylko gdy jest potrzebny a nie z góry

const NotFoundView = () => import('@/views/NotFoundView.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'AboutView',
      component: AboutView,
    },
    {
      path: '/promotion/:id',
      name: 'PromotionView',
      component: PromotionView,
    },
    {
      path: '/register',
      name: 'RegisterView',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView,
    },
    {
      path: '/search',
      name: 'SearchView',
      component: SearchView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFoundView',
      component: NotFoundView,
    },
  ],
});

export default router;
