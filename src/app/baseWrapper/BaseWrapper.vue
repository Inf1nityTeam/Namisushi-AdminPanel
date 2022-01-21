<template>
  <div class="base-wrapper">
    <div
      class="base-wrapper__sidebar"
      :style="{ minWidth: isCollapsed ? '292px' : '84px' }"
    >
      <base-sidebar />
    </div>

    <div
      class="base-wrapper__content"
      :style="{
        width: isCollapsed ? 'calc(100% - 292px)' : 'calc(100% - 84px)',
      }"
    >
      <div class="base-wrapper__header">
        <base-header />
      </div>

      <div :style="{ height: 'calc(100vh - 64px)' }">
        <component v-if="layout" :is="layout">
          <router-view />
        </component>
        <router-view v-else />
      </div>
    </div>
  </div>
</template>

<script>
import GroupWrapper from "@/app/product_&_category/GroupWrapper.vue";
import BaseHeader from "./components/baseHeader";
import BaseSidebar from "./components/baseSidebar/BaseSidebar";
import { baseSidebarState } from "@/app/baseWrapper/components/baseSidebar/baseSidebar.state";

export default {
  name: "base-wrapper",
  components: { BaseHeader, BaseSidebar, GroupWrapper },
  computed: {
    isCollapsed() {
      return baseSidebarState.isCollapsed;
    },
    layout() {
      return this.$route.meta.layout || null;
    },
  },
};
</script>

<style scoped lang="scss">
.base-wrapper {
  display: flex;

  &__sidebar {
    transition: 350ms ease-in-out;
    height: 100vh;
  }

  &__content {
    transition: 350ms ease-in-out;
    // width: 100%;
  }

  &__header {
    width: 100%;
    height: 64px;
  }
}
</style>
