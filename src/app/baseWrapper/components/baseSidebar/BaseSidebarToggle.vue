<template>
  <a href="#"
     :class="[isCollapsed,'arrow']"
     @click="sidebarToggle"
  >
    <img src="@/assets/image/sidebar/icon-arrow.svg">
  </a>
</template>

<script>
import {baseSidebarState} from "@/app/baseWrapper/components/baseSidebar/baseSidebar.state";

export default {
  name: "BaseSidebarToggle",
  methods: {
    sidebarToggle() {
      baseSidebarState.isCollapsed = !baseSidebarState.isCollapsed
    }
  },
  computed: {
    isCollapsed() {
      return baseSidebarState.isCollapsed ? 'arrow--open' : 'arrow--close'
    }
  }
}
</script>

<style scoped lang="scss">
.arrow {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  transition: all 350ms ease-in-out;

  &--open {
    top: 20px;
    left: 244px;
    transform: rotate(180deg);
  }

  &--close {
    top: 63px;
    left: 30px;
    transform: rotate(0deg);
  }
}
</style>