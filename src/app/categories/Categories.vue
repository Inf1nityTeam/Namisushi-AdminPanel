<template>
  <div class="categories"
       v-loading="loading"
  >
      <categories-table
          @edit="editCategory"
          @delete="deleteCategory"/>
  </div>
</template>

<script>
import CategoriesTable from "@/app/categories/components/CategoriesTable";
import {categoriesState} from "@/app/categories/categories.state";

export default {
  name: "categories",
  components: { CategoriesTable },
  computed: {
    loading() {
      return categoriesState.loading
    }
  },
  methods: {
    createCategory() {
      this.$refs.popup.open(null)
    },
    editCategory(category) {
      this.$refs.popup.open(category)
    }
  }
}
</script>

<style scoped lang="scss">
.categories {

  &__header {
    &--button {
      max-width: 240px;
      margin-left: auto;
    }

  }

}
</style>
