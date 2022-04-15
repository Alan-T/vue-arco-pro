import type { Router, LocationQueryRaw } from 'vue-router';
import NProgress from 'nprogress'; // progress bar

import usePermission from '@/hooks/permission';
import { useUserStore, useMemuStore } from '@/store';
import { isLogin } from '@/utils/auth';
import formatRoute from '@/utils/route-format';

export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const userStore = useUserStore();
    const useMenu = useMemuStore();
    async function crossroads() {
      const Permission = usePermission();
      if (Permission.accessRouter(to)) next();
      else {
        const destination = Permission.findFirstPermissionRoute(
          useMenu.routeList,
          userStore.role
        ) || {
          name: 'notFound',
        };
        next(destination);
      }
      NProgress.done();
    }
    if (isLogin()) {
      if (userStore.role) {
        crossroads();
      } else {
        try {
          await userStore.getUserInfo();
          await useMenu.getRoutesInfo();
          router.addRoute({
            name: 'root',
            path: '/',
            component: () => import('@/layout/default-layout.vue'),
            children: [
              {
                path: '/',
                redirect: 'workplace',
              },
              ...formatRoute(useMenu.routeList),
            ],
          });
          // 添加动态路由
          if (router.getRoutes().find((item) => item.name === to.name)) {
            next(to.fullPath);
            crossroads();
          } else {
            crossroads();
          }
        } catch (error) {
          next({
            name: 'login',
            query: {
              redirect: to.name,
              ...to.query,
            } as LocationQueryRaw,
          });
          NProgress.done();
        }
      }
    } else {
      if (to.name === 'login') {
        next();
        NProgress.done();
        return;
      }
      next({
        name: 'login',
        query: {
          redirect: to.name,
          ...to.query,
        } as LocationQueryRaw,
      });
      NProgress.done();
    }
  });
}
