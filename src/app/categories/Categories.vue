<template>
  <div class="categories"
       v-loading="loading">

    <div class="categories__header">
      <div class="categories__header--button">
        <base-button @click="createCategory">Добавить категорию</base-button>
      </div>
    </div>

    <div class="categories__content">
      <categories-table
          @edit="openPopup"/>
    </div>

    <category-popup ref="popup"/>
  </div>
</template>

<script>
import CategoriesTable from "@/app/categories/components/CategoriesTable";
import CategoryPopup from "@/app/categories/components/CategoryPopup";
import BaseButton from "@/app/common/BaseButton";
import {categoriesState} from "@/app/categories/categories.state";

export default {
  name: "categories",
  components: { CategoriesTable, CategoryPopup, BaseButton },
  computed: {
    loading() {
      return categoriesState.loading
    }
  },
  methods: {
    createCategory() {
      this.$refs.popup.open(null)
    },
    openPopup(category) {
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
