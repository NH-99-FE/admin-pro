import type { RouteRecordRaw } from 'vue-router'

export default {
  path: '/',
  name: 'layout',
  component: () => import('@/layout/index.vue'),
  meta: {
  },
  children: [
    {
      path: '/',
      name: 'HomePage',
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: '项目介绍',
        isShow: true,
      },
      children: [],
    },
    {
      path: '/user',
      name: 'UserPage',
      component: () => import('@/views/user/index.vue'),
      meta: {
        title: '用户管理',
        isShow: true,
      },
      children: [],
    },
    {
      path: '/role',
      name: 'RolePage',
      component: () => import('@/views/role/index.vue'),
      meta: {
        title: '角色管理',
        isShow: true,
      },
      children: [],
    },
    {
      path: '/auth',
      name: 'AuthPage',
      component: () => import('@/views/auth/index.vue'),
      meta: {
        title: '权限管理',
        isShow: true,
      },
      children: [],
    },
  ],
} as RouteRecordRaw
