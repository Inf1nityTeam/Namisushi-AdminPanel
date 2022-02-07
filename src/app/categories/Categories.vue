<template>
  <div class="categories">

    <div>
      <button @click="createCategory">afasfasfa</button>
    </div>

    <categories-table/>

    <category-popup ref="popup"/>

  </div>
</template>

<script>
import CategoriesTable from "@/app/categories/components/CategoriesTable";
import CategoryPopup from "@/app/categories/components/categoriesPopup/CategoryPopup";

export default {
  name: "categories",
  components: { CategoriesTable, CategoryPopup },
  methods: {
    createCategory() {
      this.$refs.popup.open()
    }
  }
}
</script>

<style scoped lang="scss">
.categories {

}
</style>
