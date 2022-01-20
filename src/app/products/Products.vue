<template>
  <div class="products">
    <!-- <el-scrollbar height="100%" > -->
      <ProductsNavigationBar />

      <ProductsTable />

      <ProductsPagination />
    <!-- </el-scrollbar> -->
  </div>
</template>

<script>
import ProductsTable from "@/app/products/components/ProductsTable";
import ProductsNavigationBar from "@/app/products/components/ProductsNavigationBar";
import ProductsPagination from "@/app/products/components/ProductsPagination";

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
  padding: 20px 20px 0 20px;
}
</style>
