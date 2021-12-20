<template>
  <div class="pagination">
    <el-pagination layout="prev, pager, next" background
                   :total="productCount"
                   :page-count="pageCount"
                   :page-size="rowCount"
                   @current-change="openAnotherPage">
    </el-pagination>
  </div>
</template>

<script>
export default {
name: "ProductsPagination",
}
</script>

<style scoped lang="scss">
.pagination {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>