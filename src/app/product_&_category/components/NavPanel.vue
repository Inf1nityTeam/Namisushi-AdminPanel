<template>
  <div class="nav-panel">
    <div class="nav-panel__title">Продукты</div>

    <div class="nav-panel__setup">
      <div>
        <CommonButton
          :btnConfig="btnOpenProducts"
          @click="openPage('/products')"
        />
        <CommonButton
          :btnConfig="btnOpenCategories"
          @click="openPage('/categories')"
        />
      </div>

      <ProductsModalWindow />
    </div>
  </div>
</template>

<script>
import ProductsModalWindow from "@/app/product_&_category/modalWindow/ProductsModalWindow.vue";
import CommonButton from "@/app/product_&_category/components/CommonButton.vue";
export default {
  name: "navPanel",
  components: { ProductsModalWindow, CommonButton },
  data() {
    return {
      btnOpenProducts: {
        title: "Продукты",
        height: "38px",
        width: "103px",
        isNotActive: false,
      },
      btnOpenCategories: {
        title: "Категории",
        height: "38px",
        width: "107px",
        isNotActive: true,
      },
    };
  },
  methods: {
    openPage(page) {
      this.btnOpenCategories.isNotActive = !this.btnOpenCategories.isNotActive;
      this.btnOpenProducts.isNotActive = !this.btnOpenProducts.isNotActive;
      this.$router.push(page);
    },
  },
};
</script>

<style lang="scss">
</style>
