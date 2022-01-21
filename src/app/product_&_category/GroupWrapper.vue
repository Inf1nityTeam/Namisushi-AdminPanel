<template>
  <div class="products-group-wrapper">
    <NavPanel />

    <router-view />
  </div>
</template>

<script>
import NavPanel from "@/app/product_&_category/components/NavPanel.vue";
export default {
  components: { NavPanel },
  name: "GroupWrapper",
};
</script>

<style scoped lang="scss">
.products-group-wrapper {
  padding: 20px;
  width: 100%;
  //height: 180px;
  position: relative;
  //display: flex;
  //gap: 10px;
  //flex-direction: column;
  box-sizing: border-box;
  background: #f8f8fa;
}
</style>
