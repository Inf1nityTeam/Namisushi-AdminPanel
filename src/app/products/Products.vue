<template>
  <div class="products">
    <products-search />

    <div class="products__table">
      <products-table
          ref="productsTable"
          @edit="editProduct"
      />
    </div>
    <product-popup ref="productPopup" />

  </div>
</template>

<script>
import ProductsTable from "@/app/products/components/ProductsTable";
import ProductPopup from "@/app/products/components/productPopup/ProductPopup";
import ProductsSearch from "@/app/products/components/ProductsSearch";
export default {
  name: "products",
  components: {ProductsTable, ProductPopup, ProductsSearch },
  methods: {
    editProduct(product) {
      this.$refs.productPopup.open(product)
    },
  }
}
</script>

<style scoped lang="scss">
.products {
  &__table {
    margin-top: 20px;
    margin-bottom: 25px;
  }
}
</style>
