export default {
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
};
