<template>
  <div class="categories">
    <el-table
        class="general-table"
        :data="categories"
        style="min-height: calc(100vh - 363px); width: 100%">

      <el-table-column
          label="Наименование"
          prop="title"
          width="auto"/>

      <el-table-column
          label="Действия"
          width="120">
        <template #default="scope">
          <div class="categories__table--actions">
            <base-circle-button
                icon="edit"
                @click="$emit('edit', scope.row)"/>
            <base-circle-button
                icon="delete"
                type="delete"
                @click="deleteCategory(scope.row._id)"/>
          </div>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import BaseCircleButton from "@/app/common/BaseCircleButton";
import {categoriesState} from "@/app/categories/categories.state";
import {categoriesController} from "@/app/categories/categories.controller";

export default {
  name: "products-table",
  components: { BaseCircleButton },
  computed: {
    categories() {
      return categoriesState.categories
    }
  },
  methods: {
    deleteCategory(categoryId) {
      categoriesController.deleteCategory(categoryId)
    }
  }
}
</script>

<style scoped lang="scss">
.categories {

  &__table {

    &--actions {
      display: flex;
    }

  }

}
</style>
