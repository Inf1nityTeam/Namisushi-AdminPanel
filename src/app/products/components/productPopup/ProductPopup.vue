<template>
  <div class="product-popup">
    <base-popup :title="title" ref="popup">

      <div>
        <add-product-image />
      </div>
      <div>
        <set-product-description @update:productType="productType = $event" v-model:productType="productType" />
      </div>

      <div>
        <product-tags  @update:modelValue="selectedTags = $event" :selectedTags="selectedTags"/>
      </div>

    </base-popup>
  </div>
</template>

<script>
import BasePopup from "@/app/common/BasePopup";
import AddProductImage from "@/app/products/components/productPopup/components/AddProductImage";

import ProductTags from "@/app/products/components/productPopup/components/ProductTags";
import SetProductDescription from "@/app/products/components/productPopup/components/SetProductDescription";

export default {
  name: "product-popup",
  components: {SetProductDescription, BasePopup, AddProductImage, ProductTags },
  data() {
    return {
      isEdit: false,
      productType: "variousFillings",
      selectedTags: [],
    }
  },

  methods: {
    open(product = null) {
      if (product) {
        this.isEdit = true
      }

      this.$refs.popup.open()
    },
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
