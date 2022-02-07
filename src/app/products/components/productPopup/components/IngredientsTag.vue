<template>
  <div class="add-product-ingredients">
    <el-tag
      v-for="tag in ingredientsList"
      :key="tag"
      closable
      :disable-transitions="false"
      @close="deleteTag(tag)"
    >
      {{ tag }}
      <img
        src="@/assets/image/products/icon-delete.svg"
        @click="deleteTag(tag)"
      />
    </el-tag>

    <el-input
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      class="ml-1 w-20"
      size="small"
      placeholder="Название ингридиента"
      @keyup.enter="addNewTag"
    />

    <button v-else class="add-product-ingredients__btn" @click="showInput">
      <SvgIcon :icon="require('@/assets/image/products/icon-btn-add.svg')" alt="+" />
      Добавить ингридиент
    </button>
  </div>
</template>

<script>
import SvgIcon from "@/app/common/baseWrapper/SvgIcon";
export default {
  name: "IngredientsTag",
  methods: {
    deleteTag(tag) {
      this.ingredientsList.splice(this.ingredientsList.indexOf(tag), 1);
    },
    addNewTag() {
      if (this.inputValue) {
        this.ingredientsList.push(this.inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.InputRef.$refs.input.focus();
      });
    },
  },
  data() {
    return {
      ingredientsList: [],
      inputVisible: false,
      inputValue: "",
    };
  },
  props: ["ingredients"],
  mounted() {
    this.ingredientsList = this.ingredients;
  },
  watch: {
    ingredientsList() {
      this.$emit("getProductIngredients", this.ingredientsList);
    },
    ingredients() {
      this.ingredientsList = this.ingredients;
    },
  },
  components: { SvgIcon },
};
</script>

<style lang="scss">
.add-product-ingredients {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 18px;
  .el-tag {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    font-family: Manrope;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    color: #121212;
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    > img {
      cursor: pointer;
    }
  }

  &__btn {
    background: #fff;
    cursor: pointer;
    font-family: Manrope;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    height: 50px;
    border: 1px solid #1454f2;
    color: #1454f2;
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    margin-right: 0 !important;

    &:hover {
      color: #fff;
      background: linear-gradient(180deg, #719df2 0%, #1454f2 100%);
      border: 1px solid #fafafa;
      > svg {
        > path {
          fill: #ffffff;
        }
      }
    }
  }

  .el-tag .el-tag__close {
    display: none;
  }
}
</style>
