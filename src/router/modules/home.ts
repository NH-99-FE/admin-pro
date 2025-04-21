import type { RouteRecordRaw } from 'vue-router'

export default {
  path: '/home',
  name: 'home',
  component: () => import('@/views/home/index.vue'),
  meta: {
  },
  children: [],
} as RouteRecordRaw
