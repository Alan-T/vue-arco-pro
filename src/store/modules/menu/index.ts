import { defineStore } from 'pinia';
import { getRoutesInfo } from '@/api/menu';
import { MenuState, RouteRecord } from './types';

const useMenuStore = defineStore('menu', {
  state: (): MenuState => ({
    routeList: [],
  }),

  getters: {},

  actions: {
    async getRoutesInfo() {
      const res = await getRoutesInfo();

      this.routeList = [
        {
          path: 'workplace',
          name: 'workplace',
          component: '/workplace/index',
          meta: {
            locale: '工作台',
            requiresAuth: true,
            icon: 'icon-dashboard',
            roles: ['*'],
            order: 0,
          },
        },
        ...(res.data as unknown as RouteRecord[]),
      ];
    },
  },
});

export default useMenuStore;
