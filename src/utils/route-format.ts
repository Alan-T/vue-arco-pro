export default function formatRoute(routeTree: any) {
  const modules0 = import.meta.glob('../views/*/*.vue');
  const modules1 = import.meta.glob('../views/*/*/*.vue');
  const modules2 = import.meta.glob('../views/*/*/*/*.vue');
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
        component: modules[`../views${elment.component}.vue`],
        children: loopTree(elment.children),
      };
    });
  }
  return loopTree(copyRouter);
}
