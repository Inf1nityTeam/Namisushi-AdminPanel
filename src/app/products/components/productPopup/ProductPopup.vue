<template>
  <div class="product-popup">
    <base-popup :title="title" ref="popup">

      <div>
        <add-product-photo/>
      </div>

      <div>
        <ingredients-tag/>
      </div>

      <div>
        <product-tag/>
      </div>

    </base-popup>
  </div>
</template>

<script>
import BasePopup from "@/app/common/BasePopup";
import AddProductPhoto from "@/app/products/components/productPopup/components/AddProductPhoto";
// Cat select
import IngredientsTag from "@/app/products/components/productPopup/components/IngredientsTag";
import ProductTag from "@/app/products/components/productPopup/components/ProductTag";

export default {
  name: "product-popup",
  components: { BasePopup, AddProductPhoto, IngredientsTag, ProductTag },
  data() {
    return {
      isEdit: false
    }
  },

  methods: {
    open(product = null) {
      if (product) {
        this.isEdit = true
      }

      this.$refs.popup.open()
    }
  },
  computed: {
    title() {
      return this.isEdit ? "Редактировать продукт" : "Добавить продукт"
    }
  }
}
</script>

<style scoped lang="scss">

</style>
