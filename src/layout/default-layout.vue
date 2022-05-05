<template>
  <a-layout class="layout">
    <div v-if="navbar" class="layout-navbar">
      <NavBar>
        <TabBar v-if="appStore.tabBar" />
      </NavBar>
    </div>
    <a-layout>
      <a-layout>
        <a-layout-sider
          v-if="renderMenu"
          class="layout-sider"
          breakpoint="xl"
          :collapsed="collapsed"
          :collapsible="true"
          :width="menuWidth"
          :style="{ paddingTop: navbar ? '60px' : '' }"
          :hide-trigger="true"
          @collapse="setCollapsed"
        >
          <div class="menu-wrapper">
            <Menu />
          </div>
        </a-layout-sider>
        <a-layout class="layout-content" :style="paddingStyle">
          <div class="layout-main">
            <PageLayout />
          </div>
          <Footer v-if="footer" />
        </a-layout>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
  import { computed, watch } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useAppStore, useUserStore } from '@/store';
  import NavBar from '@/components/navbar/index.vue';
  import Menu from '@/components/menu/index.vue';
  import Footer from '@/components/footer/index.vue';
  import TabBar from '@/components/tab-bar/index.vue';
  import usePermission from '@/hooks/permission';
  import useResponsive from '@/hooks/responsive';
  import PageLayout from './page-layout.vue';

  const appStore = useAppStore();
  const userStore = useUserStore();
  const router = useRouter();
  const route = useRoute();
  const permission = usePermission();
  useResponsive(true);
  const navbar = computed(() => appStore.navbar);
  const renderMenu = computed(() => appStore.menu);
  const footer = computed(() => appStore.footer);
  const menuWidth = computed(() => {
    return appStore.menuCollapse ? 48 : appStore.menuWidth;
  });
  const collapsed = computed(() => {
    return appStore.menuCollapse;
  });
  const paddingStyle = computed(() => {
    const paddingLeft = renderMenu.value
      ? { paddingLeft: `${menuWidth.value}px` }
      : {};
    return { ...paddingLeft };
  });
  const setCollapsed = (val: boolean) => {
    appStore.updateSettings({ menuCollapse: val });
  };
  watch(
    () => userStore.role,
    (roleValue) => {
      if (roleValue && !permission.accessRouter(route))
        router.push({ name: 'workplace' });
    }
  );
</script>

<style scoped lang="less">
  @nav-size-height: 60px;
  @layout-max-width: 1100px;

  .layout {
    width: 100%;
    height: 100%;
  }

  .layout-navbar {
    z-index: 100;
    width: 100%;
    height: @nav-size-height;
  }

  .layout-sider {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    height: 100%;
    transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
    &::after {
      position: absolute;
      top: 0;
      right: -1px;
      display: block;
      width: 1px;
      height: 100%;
      background-color: var(--color-border);
      content: '';
    }

    > :deep(.arco-layout-sider-children) {
      overflow-y: hidden;
    }
  }

  .menu-wrapper {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
    :deep(.arco-menu) {
      ::-webkit-scrollbar {
        width: 12px;
        height: 4px;
      }

      ::-webkit-scrollbar-thumb {
        border: 4px solid transparent;
        background-clip: padding-box;
        border-radius: 7px;
        background-color: var(--color-text-4);
      }

      ::-webkit-scrollbar-thumb:hover {
        background-color: var(--color-text-3);
      }
    }
  }

  .layout-content {
    height: calc(100vh - 60px);
    overflow-y: hidden;
    background-color: var(--color-fill-2);
    transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  }
  .layout-main {
    overflow-y: auto;
    height: calc(100vh - 84px);
  }
</style>
