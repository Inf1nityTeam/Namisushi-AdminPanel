<template>
  <div class="categories-popup">
    <base-popup
        title="Добавить категорию"
        :loading="loading"
        @submit="submit"
        @close="close"
        ref="popup">
      <form action="">
        <base-input
            label="Наименование"
            v-model="category.title"/>
      </form>
    </base-popup>
  </div>
</template>

<script>
import BasePopup from "@/app/common/BasePopup";
import BaseInput from "@/app/common/BaseInput";
import {categoriesController} from "@/app/categories/categories.controller";
import {copyDeep} from "@/utils/copy-deep";

export default {
  name: "categories-popup",
  components: { BasePopup, BaseInput },
  props: {
    editCategory: { type: Object, default: null }
  },
  computed: {
    isEditMode() {
      return !!this.category._id
    }
  },
  data() {
    return {
      loading: false,
      category: {
        title: null
      }
    }
  },
  methods: {
    submit() {
      this.loading = true
      if (this.isEditMode) {
        categoriesController.updateCategory(this.category)
            .then(() => this.close())
            .finally(() => this.loading = false)
      } else {
        categoriesController.createCategory(this.category)
            .then(() => this.close())
            .finally(() => this.loading = false)
      }
    },
    open(category = null) {
      if (category) {
        this.category = copyDeep(category)
        debugger; // eslint-disable-line no-debugger
      }
      this.$refs.popup.open()
    },
    close() {
      this.category = { title: null }
      this.$refs.popup.close()
    }
  }
}
</script>

<style scoped lang="scss">

</style>
