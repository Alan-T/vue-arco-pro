<template>
  <div class="tab-bar-container">
    <a-tabs
      type="text"
      :editable="true"
      auto-switch
      :active-key="activedTab"
      @tab-click="goto"
      @delete="tagClose"
    >
      <a-tab-pane
        v-for="(item, index) of tagList"
        :key="item.name"
        :title="item.title"
        :closable="index !== 0"
      >
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import type { RouteLocationNormalized } from 'vue-router';
  import { listenerRouteChange } from '@/utils/route-listener';
  import { useTabBarStore } from '@/store';
  import type { TagProps } from '@/store/modules/tab-bar/types';

  const tabBarStore = useTabBarStore();
  const activedTab = ref('home');

  const router = useRouter();

  const tagList = computed(() => {
    return tabBarStore.getTabList;
  });

  listenerRouteChange((route: RouteLocationNormalized) => {
    activedTab.value = route.name as string;
    if (
      !route.meta.noAffix &&
      !tagList.value.some((tag) => tag.fullPath === route.fullPath)
    ) {
      tabBarStore.updateTabList(route);
    }
  }, true);
  const tagClose = (name: string) => {
    tabBarStore.deleteTag(name);
    const latest = tagList.value[tagList.value.length - 1];
    router.push({ name: latest.name });
  };
  const goto = (tag: string) => {
    router.push({ name: tag });
  };
</script>

<style scoped lang="less">
  .tab-bar-container {
    display: flex;
    align-items: flex-end;
    height: 100%;
  }
  :deep(.arco-tabs-tab-active) {
    font-weight: normal;
  }
  :deep(.arco-tabs-tab-title:hover) {
    font-weight: normal;
  }
  :deep(.arco-tabs-tab-active:hover) {
    font-weight: normal;
  }
  :deep(.arco-tabs-content) {
    padding-top: 0;
  }
</style>
