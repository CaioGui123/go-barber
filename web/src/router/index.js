import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/client/login',
    name: 'ClientLogin',
    component: () => import('../views/Client/Login.vue'),
  },
  {
    path: '/client/profile',
    name: 'ClientProfile',
    component: () => import('../views/Client/Profile.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
