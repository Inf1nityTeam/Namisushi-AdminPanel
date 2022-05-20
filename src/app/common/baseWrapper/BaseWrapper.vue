<template>
  <div class="base-wrapper">
    <div class="base-wrapper__sidebar"
         :style="{ minWidth: isCollapsed ? '292px' : '84px' }">
      <base-sidebar/>
    </div>

    <div class="base-wrapper__content"
         :style="{
            width: isCollapsed ? 'calc(100% - 292px)' : 'calc(100% - 84px)',
         }">
      <div class="base-wrapper__header">
        <base-header/>
      </div>

      <div class="base-wrapper__view"
           :style="{ height: 'calc(100vh - 64px)' }">
        <transition name="el-fade-in-linear">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from "./baseHeader/BaseHeader";
import BaseSidebar from "./baseSidebar/BaseSidebar";
import { baseSidebarState } from "@/app/common/baseWrapper/baseSidebar/baseSidebar.state";
import {categoriesController} from "@/app/categories/categories.controller";

export default {
  name: "base-wrapper",
  components: { BaseHeader, BaseSidebar },
  computed: {
    isCollapsed() {
      return baseSidebarState.isCollapsed;
    },
  },
  created() {
    categoriesController.getCategories()
  }
};
</script>

<style scoped lang="scss">
.base-wrapper {
  display: flex;
  z-index: 3000;

  &__sidebar {
    transition: 350ms ease-in-out;
    height: 100vh;
    z-index: 3001;
  }

  &__content {
    transition: 350ms ease-in-out;
  }

  &__view {
    padding: 16px;
  }

  &__header {
    width: 100%;
    height: 64px;
  }
}
</style>
