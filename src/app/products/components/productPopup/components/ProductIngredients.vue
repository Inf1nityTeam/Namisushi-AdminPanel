<template>
  <div class="product-ingredients">
    <div class="product-ingredients__label" v-if="showIngredientList"><span>Ингридиенты</span></div>
    <ul v-if="showIngredientList" class="product-ingredients__list">
      <li
          class="product-ingredients__item"
          v-for="(ingredient, index) in ingredientList"
          :key="ingredient">
        <span>{{ingredient}}</span>
        <button type="button" @click="$emit('deleteIngredient', index)"><el-icon><delete-filled /></el-icon></button>
      </li>
    </ul>
    <div v-show="showInput" class="product-ingredients__input">
      <base-input
          :model-value="newIngredient"
          placeholder="Название ингридиента"
          @update:modelValue="newIngredient = $event"
      />
      <button @click="hideInput" type="button">
        <el-icon><delete-filled /></el-icon>
      </button>
    </div>
    <base-button @click="addIngredient" class-name="outline">
      <el-icon><plus /></el-icon>
      Добавить ингридиент
    </base-button>
  </div>
</template>

<script>
import BaseInput from "@/app/common/BaseInput";
import BaseButton from "@/app/common/BaseButton";

import {Plus, DeleteFilled} from '@element-plus/icons-vue'

export default {
  name: "product-ingredients",
  components: {BaseButton, BaseInput, Plus, DeleteFilled},
  props: {
    ingredientList: {type: Array}
  },
  data() {
    return {
      newIngredient: "",
      showInput: false
    }
  },
  methods: {
    hideInput() {
      this.newIngredient = ""
      this.showInput = !this.showInput
    },
    addIngredient() {
      if (!this.showInput) {
        this.showInput = true
        return
      }

      if (!this.newIngredient) return

      this.$emit('addIngredient', this.newIngredient)
      this.newIngredient = ""
      this.showInput = false
    }
  },
  computed: {
    showIngredientList() {
      return this.ingredientList.length > 0
    }
  }
}
</script>


<style scoped lang="scss">
.product-ingredients {
  &__input {
    position: relative;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    button {
      position: absolute;

      right: 17px;
      top: 50%;
      transform: translate(0, -50%);

      background-color: transparent;
      border: none;

      cursor: pointer;
      @media (any-hover: hover) {
        &:hover {
          .el-icon {
            color: #F92C23;
          }
        }
      }
    }
    .el-icon {
      width: auto;
      height: auto;

      color: #F97066;
      transition: color 0.3s ease 0s;
      svg {
        width: 18px;
        height: 18px;
      }

    }
  }
  &__label {
    margin-bottom: -8px;
    padding-left: 13px;
    position: relative;
    z-index: 3;

    font-family: Manrope, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;

    color: #585858;

    span {
      display: inline-block;
      padding: 0 3px;
      background-color: #fff;
    }
  }
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 50px;

    border: 1px solid #E8E8E8;
    border-radius: 8px;

    margin-bottom: 10px;
    padding: 3px 17px;


    > span {
      margin-right: 10px;
      font-family: Manrope, sans-serif;
      color: #121212;
    }
    button {
      background-color: transparent;
      border: none;
      cursor: pointer;

      @media (any-hover: hover) {
        &:hover {
          .el-icon {
            color: #F92C23;
          }
        }
      }
    }
    .el-icon {
      width: auto;
      height: auto;

      color: #F97066;
      transition: color 0.3s ease 0s;
      svg {
        width: 18px;
        height: 18px;
      }

    }
  }
}
</style>

<style lang="scss">
.product-ingredients {
  .base-input {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    input {
      padding-right: 45px !important;
    }
  }
}

</style>


