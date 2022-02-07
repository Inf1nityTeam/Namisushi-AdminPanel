<template>
  <div class="products">

    <products-table/>


    <product-popup/>

  </div>
</template>

<script>
import ProductsTable from "@/app/products/components/ProductsTable";
// import BasePopup from "@/app/common/BasePopup";
import ProductPopup from "@/app/products/components/productPopup/ProductPopup";

export default {
  name: "products",
  components: { ProductsTable, ProductPopup }
}
</script>

<style scoped lang="scss">

</style>
