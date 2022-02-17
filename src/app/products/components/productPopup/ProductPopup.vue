<template>
  <div class="product-popup">
    <base-popup :title="title" ref="popup">
      <div class="product-popup__images">
        <add-product-image />
      </div>
      <div class="product-popup__base-desc">
        <set-product-description
            @update:productType="productType = $event"
            v-model:productType="productType"
            :title="productTitle"
            :description="productDescription"
        />
      </div>
      <div class="product-popup__input-numbers">
        <base-input-number
            :model-value="price"
            :step="50"
            label="Стоимость"
            :min="0"
            :max="100"
            @update:modelValue="price = $event" />
      </div>
      <div class="product-popup__tags">
        <product-tags
            @update:modelValue="selectedTags = $event"
            :selectedTags="selectedTags"/>
      </div>

    </base-popup>
  </div>
</template>

<script>
import BasePopup from "@/app/common/BasePopup";
import AddProductImage from "@/app/products/components/productPopup/components/AddProductImage";

import ProductTags from "@/app/products/components/productPopup/components/ProductTags";
import SetProductDescription from "@/app/products/components/productPopup/components/SetProductDescription";
import BaseInputNumber from "@/app/common/BaseInputNumber";

export default {
  name: "product-popup",
  components: {BaseInputNumber, SetProductDescription, BasePopup, AddProductImage, ProductTags },
  data() {
    return {
      isEdit: false,
      productType: "variousFillings",
      selectedTags: [],
      price: 0,
      productTitle: "",
      productDescription: ""
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
.product-popup {
  &__images {
    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }

  &__base-desc {
    &:not(:last-child) {
      margin-bottom: 26px;
    }
  }

  &__input-numbers {
    &:not(:last-child) {
      margin-bottom: 26px;
    }
  }

  &__tags {
    &:not(:last-child) {
      margin-bottom: 32px;
    }
  }
}
</style>
