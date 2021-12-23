<template>
  <div class="products">
    <el-scrollbar height="100%">

      <ProductsNavigationBar/>

<!--      <div style="height: calc(100% - 140px); min-height: calc(100% - 140px)">-->
        <ProductsTable/>
<!--      </div>-->

      <ProductsPagination/>

    </el-scrollbar>
  </div>
</template>

<script>
import ProductsTable from "@/app/products/components/ProductsTable";
import ProductsNavigationBar from "@/app/products/components/ProductsNavigationBar";
import ProductsPagination from "@/app/products/components/ProductsPagination";

export default {
  components: {ProductsPagination, ProductsNavigationBar, ProductsTable},
}
</script>

<style scoped lang="scss">
.products {
  height: 100%;
  position: relative;
  // overflow-y: scroll;
}
</style>
