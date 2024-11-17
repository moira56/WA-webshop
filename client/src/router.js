import { createRouter, createWebHistory } from 'vue-router';
import Pocetna from './components/Pocetna.vue';
import Proizvod from './components/Proizvod.vue';

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Pocetna,
    },
    {
      path: '/proizvodi',
      name: 'Pocetna',
      component: Pocetna, 
    },
    {
      path: '/proizvodi/:id',
      name: 'Proizvod',
      component: Proizvod,
      props: true,
    },
  ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;