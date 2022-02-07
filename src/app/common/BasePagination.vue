<template>
  <div class="base-pagination">
    <el-pagination
        v-model:currentPage="pagination.page"
        :default-page-size="pagination.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
    />
  </div>
</template>

<script>
export default {
  name: "base-pagination",
  props: {
    total: { type: Number, default: 100 },
  },
  data() {
    return {
      pagination: {
        limit: 20,
        page: 1
      }
    }
  }
};
</script>

<style lang="scss">
.products-pagination {
  width: 100%;
}
</style>
