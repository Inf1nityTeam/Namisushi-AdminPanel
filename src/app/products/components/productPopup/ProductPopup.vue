<template>
  <div class="product-popup">
    <base-popup :title="title" ref="popup">
      <div class="product-popup__images">
        <add-product-image
            @select-images="selectImages"
            @delete-image="deleteImage"
            :imagesUrl="imagesUrl" />
      </div>
      <div class="product-popup__type">
        <product-type
            :product-type="productType"
            @update:modelValue="productType = $event" />
      </div>
      <div class="product-popup__category">
        <categories-select
            label="Категория"
            :category="productCategory"
            @update:modelValue="productCategory = $event" />
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
            @update:modelValue="price = $event"/>
      </div>
      <div class="product-popup__ingredients">
        <product-ingredients
            :ingredient-list="ingredientList"
            @add-ingredient="addIngredient"
            @delete-ingredient="deleteIngredient"
        />
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
import CategoriesSelect from "@/app/common/CategoriesSelect";
import ProductType from "@/app/products/components/productPopup/components/ProductType";
import ProductIngredients from "@/app/products/components/productPopup/components/ProductIngredients";

export default {
  name: "product-popup",
  components: {
    ProductIngredients,
    ProductType,
    CategoriesSelect, BaseInputNumber, SetProductDescription, BasePopup, AddProductImage, ProductTags},
  data() {
    return {
      isEdit: false,
      imagesUrl: [],
      productType: "variousFillings",
      selectedTags: [],
      price: 0,
      productTitle: "",
      productDescription: "",
      productCategory: "",
      ingredientList: [],
    }
  },

  methods: {
    open(product = null) {
      if (product) {
        this.isEdit = true
      }
      this.$refs.popup.open()
    },
    addIngredient(ingredient) {
      this.ingredientList.push(ingredient)
    },
    deleteIngredient(ingredientIndex) {
      this.ingredientList.splice(ingredientIndex, 1)
    },
    selectImages($event) {
      const images = $event.target.files

      Array.from(images).forEach(file => {
        const imageUrl = URL.createObjectURL(file)
        this.imagesUrl.push(imageUrl)
      })

      $event.target.value = null
    },
    deleteImage(url) {
      this.imagesUrl.splice(this.imagesUrl.indexOf(url), 1)
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
  &__type {
    &:not(:last-child) {
      margin-bottom: 26px;
    }
  }
  &__ingredients {
    margin-bottom: 26px;
  }
  &__category {
    &:not(:last-child) {
      margin-bottom: 26px;
    }
  }
}
</style>
