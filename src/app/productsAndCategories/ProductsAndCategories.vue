<template>
  <div class="products-and-categories">
    <view-header @open-popup="openPopup" />
    <router-view />

    <product-popup ref="productPopup" />
    <categories-popup ref="categoriesPopup" />
  </div>
</template>

<script>
import ProductPopup from "@/app/products/components/productPopup/ProductPopup";
import CategoriesPopup from "@/app/categories/components/CategoryPopup";
import ViewHeader from "@/app/productsAndCategories/components/ViewHeader";

export default {
  name: "products-and-categories",
  components: {ViewHeader, ProductPopup, CategoriesPopup},
  methods: {
    openPopup() {
      if (this.$route.path === '/products') {
        this.$refs.productPopup.open()
      } else {
        this.$refs.categoriesPopup.open()
      }
    },
  },
}
</script>


<style scoped lang="scss">

</style>
