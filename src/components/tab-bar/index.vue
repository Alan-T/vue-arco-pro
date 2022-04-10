<template>
  <div class="tab-bar-container">
    <div class="tab-bar-box">
      <div class="tab-bar-scroll">
        <div ref="tagsRef" class="tags-wrap" :style="offsetStyle">
          <span
            v-for="(tag, index) in tagList"
            :key="tag.fullPath"
            class="arco-tag arco-tag-size-medium arco-tag-checked"
            :class="{ 'link-actived': tag.fullPath === $route.fullPath }"
            @click="goto(tag)"
          >
            <span class="tag-link">
              {{ $t(tag.title) }}
            </span>
            <span
              class="arco-icon-hover arco-tag-icon-hover arco-icon-hover-size-medium arco-tag-close-btn"
              @click.stop="tagClose(tag, index)"
            >
              <icon-close />
            </span>
          </span>
        </div>
      </div>
    </div>
    <div class="action">
      <div class="translate-btn"><icon-left @click="onleft" /></div>
      <div class="translate-btn"><icon-right @click="onRight" /></div>
    </div>
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
  const tagsRef = ref();
  const data = reactive({
    offset: 0,
  });

  const offsetStyle = computed(() => {
    return `transform:translateX(${data.offset}px)`;
  });

  const router = useRouter();

  const tagList = computed(() => {
    return tabBarStore.getTabList;
  });

  listenerRouteChange((route: RouteLocationNormalized) => {
    if (
      !route.meta.noAffix &&
      !tagList.value.some((tag) => tag.fullPath === route.fullPath)
    ) {
      tabBarStore.updateTabList(route);
    }
  }, true);
  const tagClose = (tag: TagProps, idx: number) => {
    tabBarStore.deleteTag(idx, tag);
    if (idx === tagList.value.length) {
      const latest = tagList.value[tagList.value.length - 1];
      router.push({ name: latest.name });
    }
  };
  const goto = (tag: TagProps) => {
    router.push({ ...tag });
  };
  const onleft = () => {
    if (data.offset + 68 > 0) {
      data.offset = 0;
    } else {
      data.offset += 68;
    }
  };
  const onRight = () => {
    const maxOffset = tagsRef.value.scrollWidth - tagsRef.value.clientWidth;
    if (data.offset - 68 + maxOffset > 0) {
      data.offset -= 68;
    } else {
      data.offset = -maxOffset;
    }
  };
</script>

<style scoped lang="less">
  .tab-bar-container {
    position: relative;
    display: flex;
    background-color: var(--color-bg-2);
    margin-top: 27px;
    .tab-bar-box {
      flex-grow: 1;
      display: flex;
      background-color: var(--color-bg-2);
      .tab-bar-scroll {
        width: calc(100vw - 580px);
        overflow-x: hidden;
        height: 32px;
        flex: 1;
        .tags-wrap {
          white-space: nowrap;

          :deep(.arco-tag) {
            margin-right: 6px;
            cursor: pointer;
            &:first-child {
              .arco-tag-close-btn {
                display: none;
              }
            }
          }
        }
      }
    }

    .action {
      width: 40px;
      height: 24px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .translate-btn {
        height: 16px;
        width: 16px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        &:hover {
          background-color: rgb(242 243 245);
        }
      }
    }
  }

  .tag-link {
    color: var(--color-text-2);
    text-decoration: none;
  }
  .link-actived {
    color: rgb(var(--link-6));
    .tag-link {
      color: rgb(var(--link-6));
    }
    & + .arco-tag-close-btn {
      color: rgb(var(--link-6));
    }
  }
  :deep(.arco-affix) {
    z-index: 90;
    background-color: var(--color-bg-2);
    overflow-x: auto;
  }
</style>
