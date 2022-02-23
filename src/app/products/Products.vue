<template>
  <div class="products">
    <products-header
        @open-popup="openProductPopup"
        @update-search-product = "updateSearchProductData"
    />
    <products-table ref="productsTable" />

    <product-popup ref="productPopup" />

  </div>
</template>

<script>
import ProductsTable from "@/app/products/components/ProductsTable";
import ProductPopup from "@/app/products/components/productPopup/ProductPopup";
import ProductsHeader from "@/app/products/components/ProductsHeader";

export default {
  name: "products",
  components: {ProductsHeader, ProductsTable, ProductPopup },

  methods: {
    openProductPopup() {
      this.$refs.productPopup.open()
    },
    updateSearchProductData(productInfo) {
      this.$refs.productsTable.updateSearchProductData(productInfo)
    },
  }
}
</script>

<style scoped lang="scss">

</style>
