import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '@/views/Tasks.vue';
import Account from '@/views/Account.vue';

const routes = [
  {'path': '/tasks', 'component' : Tasks},
  {'path' : '/', 'component' : Account}
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
