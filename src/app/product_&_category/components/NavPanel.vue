<template>
  <div class="products-group-nav">
    <div class="products-group-nav__title">Продукты</div>

    <div class="products-group-nav__btn-setup">
      <div>
        <!-- <router-link :to="'/products'"> -->
        <CommonButton
          :btnConfig="btnOpenProducts"
          @click="openPage('/products')"
        />
        <!-- </router-link>

        <router-link :to="'/categories'"> -->
        <CommonButton
          :btnConfig="btnOpenCategories"
          @click="openPage('/categories')"
        />
        <!-- </router-link> -->
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
.products-group-nav {
  height: 110px;
  position: relative;
  display: flex;
  gap: 10px;
  flex-direction: column;
  box-sizing: border-box;

  &__btn-setup {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    width: 100%;

    > div:first-child {
      display: flex;
      gap: 20px;
    }
    > div {
      > a {
        text-decoration: none;
      }
    }
  }

  &__title {
    font-family: Raleway;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 28px;
    color: #07103a;
  }
}
</style>
