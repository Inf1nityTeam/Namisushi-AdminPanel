<template>
  <div class="base-wrapper">

    <div class="base-wrapper__sidebar">
      <base-sidebar/>
    </div>

    <div class="base-wrapper__content">

      <div class="base-wrapper__header">
        <base-header/>
      </div>

      <div>
        <router-view/>
      </div>

    </div>

  </div>
</template>

<script>
import BaseHeader from "./components/baseHeader";
import BaseSidebar from "./components/baseSidebar";

export default {
  name: 'base-wrapper',
  components: { BaseHeader, BaseSidebar }
}
</script>

<style scoped lang="scss">
.base-wrapper {
  display: flex;

  &__sidebar {
    width: 84px;
    height: 100vh;

    background-color: red;
  }

  &__content {
    width: 100%;
  }

  &__header {
    width: 100%;
    height: 70px;

    background-color: blue;
  }

}
</style>
