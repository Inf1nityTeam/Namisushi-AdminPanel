<template>
  <div class="product-popup">
    <base-popup
        @submit="submit"
        :title="title"
        :loading="loading"
        ref="popup"
    >
      <div class="product-popup__images">
        <add-product-image
            @select-images="selectImages"
            @delete-image="deleteImage"
            :imagesUrl="product.images"/>
      </div>
      <div class="product-popup__type">
        <product-type
            :product-type="product.type"
            @update:modelValue="product.type = $event"/>
      </div>
      <div class="product-popup__category">
        <categories-select
            label="Категория"
            :category="product.categories"
            @update:modelValue="product.categories = $event"/>
      </div>
      <div class="product-popup__base-desc">
        <base-input
            :model-value="product.title"
            @update:modelValue="product.title = $event"
            label="Наименование продукта"
            placeholder="Введите название продукта"
        />
        <base-input
            :model-value="product.description"
            @update:modelValue="product.description = $event"
            label="Описание"
            placeholder="Введите описание продукта"
            tag="textarea"
        />
      </div>
      <div class="product-popup__input-numbers">
        <base-input-number
            :model-value="product.cost"
            :step="50"
            label="Стоимость"
            :min="0"
            :max="1000000"
            @update:modelValue="product.cost = $event"/>
        <base-input-number
            :model-value="product.weight"
            :step="100"
            label="Вес (граммы)"
            :min="0"
            :max="1000000"
            @update:modelValue="product.weight = $event"/>
      </div>
      <div class="product-popup__ingredients">
        <product-ingredients
            :ingredient-list="product.ingredients"
            @add-ingredient="addIngredient"
            @delete-ingredient="deleteIngredient"
        />
      </div>
      <div class="product-popup__tags">
        <product-tags
            @update:modelValue="product.tags = $event"
            :selectedTags="product.tags"/>
      </div>

    </base-popup>
  </div>
</template>

<script>
import BasePopup from "@/app/common/BasePopup";
import AddProductImage from "@/app/products/components/productPopup/components/AddProductImage";
import ProductTags from "@/app/products/components/productPopup/components/ProductTags";
import BaseInputNumber from "@/app/common/BaseInputNumber";
import CategoriesSelect from "@/app/common/CategoriesSelect";
import ProductType from "@/app/products/components/productPopup/components/ProductType";
import ProductIngredients from "@/app/products/components/productPopup/components/ProductIngredients";
import BaseInput from "@/app/common/BaseInput";

import useVuelidate from '@vuelidate/core';
import {minLength, maxLength, required} from '@vuelidate/validators';
import {productsController} from "@/app/products/products.controller";

export default {
  name: "product-popup",
  components: {
    BaseInput,
    ProductIngredients,
    ProductType,
    CategoriesSelect, BaseInputNumber, BasePopup, AddProductImage, ProductTags
  },
  setup: () => ({v$: useVuelidate()}),
  data() {
    return {
      isEditMode: false,
      loading: false,
      product: {
        images: [],
        title: "",
        description: "",
        ingredients: [],
        cost: 0,
        weight: 0,
        categories: "", // api требует массив; дизайн противоречит api
        type: "variousFillings",
        tags: [],
        _id: null
      }
    }
  },
  validations() {
    return {
      product: {
        description: {
          minLength: minLength(3),
          maxLength: maxLength(1024)
        },
        title: {
          minLength: minLength(3),
          maxLength: maxLength(64),
          required
        },
        cost: {required},
        ingredients: {
          maxLength: maxLength(100)
        }
      }

    }
  },
  methods: {
    open(product = null) {
      if (product) {
        this.isEditMode = true
        // this.product = copyDeep(product) TODO: (в будущем расскоментировать)

        // TODO: т.к некоторых данных недостает (type, tags), то делаю такой костыль; в будущем удалить две последующие инструкции:
        const self = this
        this.product = {
          ...self.product,
          _id: product._id,
          images: product.images,
          title: product.title,
          description: product.description,
          ingredients: product.ingredients,
          cost: product.cost,
          weight: product.weight,
          categories: product.categories, // !!! Несоответсвующий тип данных, могут быть ошибки в консоли (api требует массив; дизайн противоречит api)
        }
      }

      this.$refs.popup.open()
    },
    submit() {
      if (this.isEditMode) {
        this.editProduct()
      } else {
        this.createProduct()
      }
      this.close()
    },
    close() {
      this.$refs.popup.close()
    },
    addIngredient(ingredient) {
      this.product.ingredients.push(ingredient)
    },
    deleteIngredient(ingredientIndex) {
      this.product.ingredients.splice(ingredientIndex, 1)
    },
    selectImages($event) {
      const images = $event.target.files

      Array.from(images).forEach(file => {
        const imageUrl = URL.createObjectURL(file)
        this.product.images.push(imageUrl)
      })

      $event.target.value = null
    },
    deleteImage(url) {
      this.product.images.splice(this.product.images.indexOf(url), 1)
    },
    async createProduct() {
      // в API нету images, tags, type при создании продукта
      //TODO: убрать две последующие инструкции
      const self = this
      const product = {
        title: self.product.title,
        description: self.product.description,
        cost: self.product.cost,
        ingredients: self.product.ingredients,
        weight: self.product.weight,
        // categories: self.product.categories TODO: поменять тип данных на массив
      }

      await productsController.createProduct(product)
    },
    editProduct(product) {
      this.loading = true
      // TODO: т.к некоторых данных недостает (type, tags), то делаю такой костыль; в будущем удалить следующие инструкции:
      const id = this.product._id
      const self = this
      product = {
        images: self.product.images,
        title: self.product.title,
        description: self.product.description,
        ingredients: self.product.ingredients,
        cost: self.product.cost,
        weight: self.product.weight,
      }
      console.log(product)
      productsController.editProduct(id, product)
      .then(() => this.close())
      .finally(() => this.loading = false)
    }
  },
  computed: {
    title() {
      return this.isEditMode ? "Редактировать продукт" : "Добавить продукт"
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
    display: flex;
    @supports (column-gap: 24px) {
      column-gap: 24px;
      padding: 0;
    }

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

<style lang="scss">
.el-dialog {
  overflow: hidden;

  &__headerbtn {
    &::before {
      content: "";

      position: absolute;
      top: -105px;
      left: -40px;

      border-radius: 50%;
      transition: all 0.3s ease 0s;

      width: 150px;
      height: 150px;

      visibility: hidden;
      opacity: 0;
      background-color: #7DA2FE;
    }

    @media (any-hover: hover) {
      &:hover {
        .el-dialog__close {
          color: #fff !important;
        }

        &:before {
          opacity: 1;
          visibility: visible;
        }
      }
    }
  }

  &__close {
    position: relative;
    z-index: 3;

    color: #000000 !important;
    transition: color 0.3s ease 0s;
  }
}
</style>
