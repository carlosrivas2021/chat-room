import { createRouter, createWebHistory } from 'vue-router'
import AccessView from './components/AccessView.vue'
import HomeView from './components/HomeView.vue'

const routes = [
  {
    path: '/',
    component: AccessView,
    name: 'AccessView',
  },
  {
    path: '/home',
    component: HomeView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
