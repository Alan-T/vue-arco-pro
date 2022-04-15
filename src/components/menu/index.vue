<script lang="tsx">
  import { defineComponent, ref, h, compile, computed } from 'vue';
  import { useRouter, RouteRecordRaw, RouteRecordNormalized } from 'vue-router';
  import { useAppStore, useMemuStore } from '@/store';
  import usePermission from '@/hooks/permission';
  import { listenerRouteChange } from '@/utils/route-listener';

  export default defineComponent({
    emit: ['collapse'],
    setup() {
      const appStore = useAppStore();
      const menuSrore = useMemuStore();
      const permission = usePermission();
      const router = useRouter();
      const collapsed = computed({
        get() {
          if (appStore.device === 'desktop') return appStore.menuCollapse;
          return false;
        },
        set(value: boolean) {
          appStore.updateSettings({ menuCollapse: value });
        },
      });

      const menuTree = computed(() => {
        const copyRouter = JSON.parse(JSON.stringify(menuSrore.routeList));
        copyRouter.sort(
          (a: RouteRecordNormalized, b: RouteRecordNormalized) => {
            return (a.meta.order || 0) - (b.meta.order || 0);
          }
        );
        function travel(_routes: RouteRecordRaw[], layer: number) {
          if (!_routes) return null;
          const collector: any = _routes.map((element) => {
            // no access
            if (!permission.accessRouter(element)) {
              return null;
            }

            // leaf node
            if (!element.children) {
              return element;
            }

            // route filter hideInMenu true
            element.children = element.children.filter(
              (x) => x.meta?.hideInMenu !== true
            );

            // Associated child node
            const subItem = travel(element.children, layer);
            if (subItem.length) {
              element.children = subItem;
              return element;
            }
            // the else logic
            if (layer > 1) {
              element.children = subItem;
              return element;
            }

            if (element.meta?.hideInMenu === false) {
              return element;
            }

            return null;
          });
          return collector.filter(Boolean);
        }
        return travel(copyRouter, 0);
      });

      // In this case only two levels of menus are available
      // You can expand as needed

      const selectedKey = ref<string[]>([]);
      const goto = (item: RouteRecordRaw) => {
        router.push({
          name: item.name,
        });
      };
      listenerRouteChange((newRoute) => {
        if (newRoute.meta.requiresAuth && !newRoute.meta.hideInMenu) {
          const key = newRoute.name as string;
          selectedKey.value = [key];
        }
      }, true);
      const setCollapse = (val: boolean) => {
        if (appStore.device === 'desktop')
          appStore.updateSettings({ menuCollapse: val });
      };

      const renderSubMenu = () => {
        function loopMenu(_route: RouteRecordRaw[]) {
          return _route.map((element) => {
            const icon = element?.meta?.icon ? `<${element?.meta?.icon}/>` : '';
            if (element.children) {
              return (
                <a-sub-menu
                  key={element?.name}
                  v-slots={{
                    icon: () => h(compile(icon)),
                    title: () => h(compile(element?.meta?.locale || '')),
                  }}
                >
                  {loopMenu(element.children ?? [])}
                </a-sub-menu>
              );
            }
            return (
              <a-menu-item
                key={element.name}
                onClick={() => goto(element)}
                v-slots={
                  icon !== ''
                    ? {
                        icon: () => h(compile(icon)),
                        title: () => h(compile(element?.meta?.locale || '')),
                      }
                    : {
                        title: () => h(compile(element?.meta?.locale || '')),
                      }
                }
              >
                {element?.meta?.locale || ''}
              </a-menu-item>
            );
          });
        }
        return loopMenu(menuTree.value);
      };

      return () => (
        <a-menu
          v-model:collapsed={collapsed.value}
          show-collapse-button={appStore.device !== 'mobile'}
          auto-open={false}
          selected-keys={selectedKey.value}
          auto-open-selected={true}
          level-indent={34}
          style="height: 100%"
          onCollapse={setCollapse}
        >
          {renderSubMenu()}
        </a-menu>
      );
    },
  });
</script>

<style lang="less" scoped>
  :deep(.arco-menu-inner) {
    .arco-menu-inline-header {
      display: flex;
      align-items: center;
    }
    .arco-icon {
      &:not(.arco-icon-down) {
        font-size: 18px;
      }
    }
  }
</style>
