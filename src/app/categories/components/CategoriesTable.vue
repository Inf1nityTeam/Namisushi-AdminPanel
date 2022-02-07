<template>
  <div class="categories">
    <el-table
        class="general-table"
        :data="categories"
        style="min-height: calc(100vh - 363px); width: 100%">

      <el-table-column
          label="Наименование"
          prop="title"
          width="auto">
      </el-table-column>

      <el-table-column
          label="Действия"
          width="120">
        <base-circle-button/>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import BaseCircleButton from "@/app/common/BaseCircleButton";
import {categoriesState} from "@/app/categories/categories.state";

export default {
  name: "products-table",
  components: { BaseCircleButton },
  computed: {
    categories() {
      return categoriesState.categories
    }
  }
}
</script>

<style scoped lang="scss">

</style>
