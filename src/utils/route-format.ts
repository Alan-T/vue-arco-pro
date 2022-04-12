export default function formatRoute(routeTree: any) {
  const modules0 = import.meta.glob('../views/*/*.vue');
  const modules1 = import.meta.glob('../views/*/*/*.vue');
  const modules2 = import.meta.glob('../views/*/*/*/*.vue');
  // 此处只获取三层目录，更多嵌套需再获取更深路由
  const modules = { ...modules0, ...modules1, ...modules2 };
  const copyRouter = JSON.parse(JSON.stringify(routeTree));
  function loopTree(routes: any) {
    return routes.map((elment: any) => {
      if (!elment.children) {
        return {
          ...elment,
          component: modules[`../views${elment.component}.vue`],
        };
      }
      return {
        ...elment,
        component: () => import('@/layout/empty-layout.vue'),
        children: loopTree(elment.children),
      };
    });
  }
  return loopTree(copyRouter);
}
