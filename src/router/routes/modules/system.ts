export default {
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
};
