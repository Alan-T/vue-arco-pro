import { defineStore } from 'pinia';
import { getRoutesInfo } from '@/api/menu';
import type { RouteRecordRaw } from 'vue-router';
import { MenuState } from './types';

const useMenuStore = defineStore('menu', {
  state: (): MenuState => ({ routeList: [] }),

  getters: {},

  actions: {
    async getUserInfo() {
      const res = await getRoutesInfo();

      this.routeList = res.data as unknown as RouteRecordRaw[];
    },
  },
});

export default useMenuStore;
