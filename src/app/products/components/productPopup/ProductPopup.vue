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
            :imagesUrl="imagesUrl"/>
      </div>
      <div class="product-popup__type">
        <product-type
            :product-type="product.type"
            @update:modelValue="product.type = $event"/>
      </div>
      <div class="product-popup__category">
        <categories-select
            label="Категория"
            :model-value="product.categories"
            @update:modelValue="product.categories = $event"/>
      </div>
      <div class="product-popup__base-desc">
        <base-input
            :model-value="product.title"
            @update:modelValue="product.title = $event"
            label="Наименование продукта"
            placeholder="Введите название продукта"
            :hasError="v$.product.title.$error"
            :error="v$.product.title.$errors?.[0]?.$message"
        />
        <base-input
            :model-value="product.description"
            @update:modelValue="product.description = $event"
            label="Описание"
            placeholder="Введите описание продукта"
            tag="textarea"
            :hasError="v$.product.description.$error"
            :error="v$.product.description.$errors?.[0]?.$message"
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
            :error="v$.product.ingredients.$errors?.[0]?.$message"
        />
      </div>
<!--      <div class="product-popup__tags">-->
<!--        <product-tags-->
<!--            @update:modelValue="product.tags = $event"-->
<!--            :selectedTags="product.tags"/>-->
<!--      </div>-->

    </base-popup>
  </div>
</template>

<script>
import BasePopup from "@/app/common/BasePopup";
import AddProductImage from "@/app/products/components/productPopup/components/AddProductImage";
// import ProductTags from "@/app/products/components/productPopup/components/ProductTags";
import BaseInputNumber from "@/app/common/BaseInputNumber";
import CategoriesSelect from "@/app/common/CategoriesSelect";
import ProductType from "@/app/products/components/productPopup/components/ProductType";
import ProductIngredients from "@/app/products/components/productPopup/components/ProductIngredients";
import BaseInput from "@/app/common/BaseInput";

import useVuelidate from '@vuelidate/core';
import {minLength, maxLength, required, helpers} from '@vuelidate/validators';
import {productsController} from "@/app/products/products.controller";

export default {
  name: "product-popup",
  components: {
    BaseInput,
    ProductIngredients,
    ProductType,
    CategoriesSelect, BaseInputNumber, BasePopup, AddProductImage,
  },
  setup: () => ({v$: useVuelidate()}),
  data() {
    return {
      isEditMode: false,
      loading: false,
      product: {
        show: true,
        title: "test",
        description: "",
        ingredients: [],
        cost: 0,
        weight: 0,
        categories: [],
        images: [],
        // type: "variousFillings",
        // tags: [],
        _id: null
      }
    }
  },
  validations() {
    return {
      product: {
        description: {
          minLength: helpers.withMessage("Минимальная длина поля - 3 символа", minLength(3)),
          maxLength: helpers.withMessage("Максимальная длина поля - 1024 символа", maxLength(1024)),
        },
        title: {
          minLength: helpers.withMessage("Минимальная длина поля - 3 символа", minLength(3)),
          maxLength: helpers.withMessage("Максимальная длина поля - 64 символа", maxLength(64)),
          required: helpers.withMessage("Это обязательное поле", required)
        },
        ingredients: {
          maxLength: helpers.withMessage('Вы не можете указать больше, чем 100 продуктов', maxLength(100))
        }
      }

    }
  },
  methods: {
    open(product = null) {
      this.isEditMode = true
      if (product) {
        console.log('open')
        this.isEditMode = true
        this.product = product
      }

      this.$refs.popup.open()
    },
    submit() {
      this.v$.product.$touch()

      if (this.v$.product.$invalid) return
      // if (this.isEditMode) {
      //   console.log('edit')
      // } else {
      //   console.log('create')
      // }
      this.$emit('update', 123)
      // this.v$.$reset()
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

      Array.from(images).forEach(image => {
        this.product.images.push(image)
      })

      $event.target.value = null
    },
    deleteImage(url) {
      this.product.images.splice(this.product.images.indexOf(url), 1)
    },
    // createProduct() {
    //   this.loading = true
    //
    //   productsController.createProduct(this.product)
    //       .then(newProduct => {
    //         this.$emit('add-product', newProduct)
    //         debugger; // eslint-disable-line no-debugger
    //         console.log(newProduct)
    //         this.close()
    //         this.clearProduct()
    //       })
    //       .finally(() => this.loading = false)
    // },
    editProduct() {
      this.loading = true

      productsController.editProduct(this.product, this.product._id)
      .then(updatedProduct => {
        this.$emit('update-table', updatedProduct)
        this.close()
        this.clearProduct()
      })
      .finally(() => this.loading = false)
    },
    clearProduct() {
      this.product = {
        show: true,
        title: "",
        description: "",
        ingredients: [],
        cost: 0,
        weight: 0,
        categories: [],
        images: [],
        // type: "variousFillings",
        // tags: [],
        _id: null
      }
    }
  },
  computed: {
    title() {
      return this.isEditMode ? "Редактировать продукт" : "Добавить продукт"
    },
    imagesUrl() {
      return this.product.images.map(file => {
        if (typeof file !== 'string') {
          return URL.createObjectURL(file)
        }
        return file
      })
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
