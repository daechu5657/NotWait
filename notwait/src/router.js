import { createWebHistory, createRouter } from 'vue-router';
import CustomerPage from './components/CustomerPage.vue';
import Owner from './components/Owner.vue';
const routes = [
  {
    path: '/Customer/:id',
    component: CustomerPage,
  },
  {
    path: '/Owner',
    component: Owner,
  },
  //   {
  //     path: '/404',
  //     name: 'notFound',
  //     component: NotFound,
  //   },
  //   {
  //     path: '/:pathMatch(.*)*',
  //     redirect: '/404',
  //   },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
