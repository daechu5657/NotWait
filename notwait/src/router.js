import { createWebHistory, createRouter } from 'vue-router';
import CustomerPage from './components/CustomerPage.vue';
import CustomerModal from './components/CustomerModal.vue';
import Owner from './components/Owner.vue';
import Code from './components/Code.vue';
import MenuList from './components/MenuList.vue';

const routes = [
  {
    path: '/Customer/:id',
    component: CustomerPage,
    CustomerModal,
  },
  {
    path: '/Owner',
    component: Owner,
    Code,
    MenuList,
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
