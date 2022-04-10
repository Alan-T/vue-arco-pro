import type { RouteRecordRaw } from 'vue-router';

const appRoutes: RouteRecordRaw[] = [
  {
    path: 'dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      locale: 'menu.dashboard',
      requiresAuth: true,
      icon: 'icon-dashboard',
      order: 0,
    },
    children: [
      {
        path: 'workplace',
        name: 'Workplace',
        component: () => import('@/views/dashboard/workplace/index.vue'),
        meta: {
          locale: 'menu.dashboard.workplace',
          requiresAuth: true,
          roles: ['*'],
        },
      },
    ],
  },
  {
    path: 'home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      locale: '首页',
      requiresAuth: true,
      icon: 'icon-home',
      roles: ['*'],
      order: 1,
    },
  },
  {
    path: 'settings',
    name: 'settings',
    component: () => import('@/views/settings/index.vue'),
    meta: {
      locale: '设置中心',
      requiresAuth: true,
      icon: 'icon-settings',
      order: 2,
    },
    children: [
      {
        path: 'personal',
        name: 'personal',
        component: () => import('@/views/settings/personal/index.vue'),
        meta: {
          locale: '个人信息',
          requiresAuth: true,
          roles: ['*'],
        },
      },
    ],
  },
  {
    path: 'system',
    name: 'system',
    component: () => import('@/views/system/index.vue'),
    meta: {
      locale: '系统设置',
      requiresAuth: true,
      icon: 'icon-settings',
      order: 3,
    },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/system/user/index.vue'),
        meta: {
          locale: '用户信息',
          requiresAuth: true,
          roles: ['*'],
        },
      },
      {
        path: 'log',
        name: 'log',
        component: () => import('@/views/system/log/index.vue'),
        meta: {
          locale: '日志',
          requiresAuth: true,
          roles: ['*'],
        },
        children: [
          {
            path: 'apilog',
            name: 'apilog',
            component: () => import('@/views/system/log/api/index.vue'),
            meta: {
              locale: 'api日志',
              requiresAuth: true,
              roles: ['*'],
            },
          },
        ],
      },
    ],
  },
];

export default appRoutes;
