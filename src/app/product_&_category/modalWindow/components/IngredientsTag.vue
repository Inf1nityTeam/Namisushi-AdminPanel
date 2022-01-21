<template>
  <div style="display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 18px;">
    <el-tag
        v-for="tag in ingredientsList"
        :key="tag"
        closable
        :disable-transitions="false"
        @close="deleteTag(tag)">
      {{ tag }}
    </el-tag>

    <el-input
        v-if="inputVisible"
        ref="InputRef"
        v-model="inputValue"
        class="ml-1 w-20"
        size="small"
        @keyup.enter="addNewTag"/>

    <el-button v-else class="button-new-tag products-modal__btn"
               @click="showInput"
               style="width:100%;
               margin-right: 0 !important;
               background: linear-gradient(180deg, #719DF2 0%, #1454F2 100%);
               font-size: 14px">
      Добавить ингридиент
    </el-button>
  </div>
</template>

<script>
export default {
  name: "IngredientsTag",
  methods: {
    deleteTag(tag) {
      this.ingredientsList.splice(this.ingredientsList.indexOf(tag), 1)
    },
    addNewTag() {
      if (this.inputValue) {
        this.ingredientsList.push(this.inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.InputRef.$refs.input.focus();
      })
    }
  },
  data() {
    return {
      ingredientsList: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  props: ['ingredients'],
  mounted() {
   this.ingredientsList = this.ingredients
  },
  watch:{
    ingredientsList(){
      this.$emit('getProductIngredients',this.ingredientsList)
    },
    ingredients(){
      this.ingredientsList = this.ingredients
    }
  }
}
</script>

<style lang="scss">
.el-tag {
  width: max-content !important;
  font-family: Manrope;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  padding-top: 11px;
  color: #1454F2;
  box-sizing: border-box;
}

</style>