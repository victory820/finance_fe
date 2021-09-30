import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/monthlist',
    name: 'monthList',
    component: () => import(/* webpackChunkName: 'monthsList' */ '../views/count/MonthsList.vue')
  },
  {
    path: '/datelist',
    name: 'dateList',
    component: () => import(/* webpackChunkName: 'dateList' */ '../views/count/DateList.vue')
  },
  {
    path: '/datecreate',
    name: 'dateCreate',
    component: () => import(/* webpackChunkName: 'dateCreate' */ '../views/count/Create.vue')
  },
  {
    path: '/dateedit',
    name: 'dateEdit',
    component: () => import(/* webpackChunkName: 'dateEdit' */ '../views/count/Edit.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
