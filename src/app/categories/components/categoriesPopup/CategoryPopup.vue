<template>
  <div class="categories-popup">
    <base-popup
        title="Добавить категорию"
        :loading="loading"
        @submit="submit"
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

export default {
  name: "categories-popup",
  components: { BasePopup, BaseInput },
  props: {
    editCategory: { type: Object, default: null }
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
      categoriesController.createCategory(this.category)
          .then(() => this.close())
          .finally(() => this.loading = false)
    },
    open() {
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
