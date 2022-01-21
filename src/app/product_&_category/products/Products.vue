<template>
  <div class="products">
    <ProductsNavigationBar />

    <ProductsTable />

    <ProductsPagination />
  </div>
</template>

<script>
import ProductsTable from "@/app/product_&_category/products/components/ProductsTable";
import ProductsNavigationBar from "@/app/product_&_category/products/components/ProductsNavigationBar";
import ProductsPagination from "@/app/product_&_category/products/components/ProductsPagination";

export default {
  components: { ProductsPagination, ProductsNavigationBar, ProductsTable },
};
</script>

<style scoped lang="scss">
.products {
  //height: 100%;
  position: relative;
  //overflow: auto;
  // overflow-y: scroll;
  //padding: 10px 20px 20px 20px;
}
</style>
