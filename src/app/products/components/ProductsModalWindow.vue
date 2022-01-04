<template>

  <el-button type="text"
             class="products-modal__btn"
             @click="dialogVisible = true">
    Новый продукт
  </el-button>

  <el-dialog
      v-model="dialogVisible"
      title="Добавить продукт"
      style="max-height: 889px"
      width="462px"
      center
      :before-close="handleClose">

    <div class="products-modal__type">

      <div class="products-modal__title">Тип продукта</div>

      <div class="products-modal__section">

        <label class="radio">
          <input type="radio" name="ordinary" class="radio__input">
          <div class="radio__radio"></div>
          Обычный
        </label>

        <label class="radio">
          <input type="radio" name="ordinary" class="radio__input" checked>
          <div class="radio__radio"></div>
          С различными начинками
        </label>

      </div>

    </div>

    <div class="products-modal__category modal-section">

      <div class="modal-section__title products-modal__title">Категория</div>

      <transition name="currentCategoryWrapperIcon">
        <div v-if="productCategory"
             class="img-select-wrapper--active img-select-wrapper"
             style="position: absolute;z-index: 1; top: 13px; left: 12px;">
          <!--        <SvgIcon :icon="require(`@/assets/image/products/${imgActiveCategory}`)"-->
          <!--                 style="height: 24px;"/>-->
          <img :src="require(`@/assets/image/products/${imgActiveCategory}`)"
               style="height: 24px;"
               :key="productCategory"/>
        </div>
      </transition>

      <el-select v-model="productCategory" class="m-2"
                 placeholder="Выберите категорию"
                 size="large"
                 :class="{'selectCategory':productCategory}"
                 @change="changeCategory">
        <el-option
            v-for="(item, i) in categoriesList"
            :key="i"
            :label="item.title"
            :value="item.title"
            style="height: 56px;
                      display: flex;
                      align-items: center;">
          <div :class="[{'img-select-wrapper--active':item.title===productCategory},'img-select-wrapper']">
            <SvgIcon :icon="require(`@/assets/image/products/${item.imgUrl}`)"
                     style="height: 24px;"/>
          </div>
          <span>{{ item.title }}</span>
        </el-option>
      </el-select>

    </div>

    <div class="products-modal__name modal-section">
      <div class="products-modal__title modal-section__title">Наименование продукта</div>
      <el-input placeholder="Введите название продукта" v-model="productName"/>
    </div>

    <div class="products-modal__description modal-section">
      <div class="products-modal__title modal-section__title">Описание</div>
      <el-input type="textarea" placeholder="Введите название продукта" v-model="productDescription"/>
    </div>

    <div class="products-modal__another products-modal__section">

      <div class="modal-section">
        <div class="products-modal__title modal-section__title">Стоимость</div>
        <el-input-number :min="100" :max="5990" step="10" v-model="productCost"/>
      </div>

      <div class="modal-section">
        <div class="products-modal__title modal-section__title">Вес (граммы)</div>
        <el-input-number :min="1" :max="5990" v-model="productWeight"/>
      </div>

      <div class="modal-section">
        <div class="products-modal__title modal-section__title">Ингридиенты</div>
        <el-input placeholder="Добавить ингридиент" v-model="productIngredients"/>
      </div>

    </div>

    <div class="products-modal__teg"></div>

    <template #footer>
                <span class="dialog-footer">
                  <el-button class="products-modal__btn"
                             type="primary"
                             @click="addNewProduct"
                             style="width: 412px;
                             background: linear-gradient(180deg, #719DF2 0%, #1454F2 100%);
                             margin: auto">
                    <img src="@/assets/image/products/icon-check.svg" style="margin-right: 10px">
                    Сохранить
                  </el-button>
                </span>
    </template>

  </el-dialog>
  <div></div>
</template>

<script>
import {ElMessageBox, ElNotification} from 'element-plus'
import {categoriesState} from "@/app/products/category.state";
import SvgIcon from '@/helpers/SvgIcon'
import '@element-plus/icons-vue/dist/es/arrow-up.mjs'

export default {
  name: "ProductsModalWindow",
  data() {
    return {
      dialogVisible: true,
      productCategory: '',
      productName: '',
      productDescription: '',
      productCost: 1000,
      productWeight: 10,
      productIngredients: '',
      categoryImgs: [
        {title: "Роллы", imgUrl: 'roll-icon-black.svg'},
        {title: "Суши и гунканы", imgUrl: 'sushi-icon-black.svg'},
        {title: "Горячие блюда", imgUrl: 'steak-icon-black.svg'},
        {title: "Салаты", imgUrl: 'salad-icon-black.svg'},
        {title: "Сеты", imgUrl: 'sets-icon-black.svg'},
        {title: "Лапша и рис", imgUrl: 'pasta-icon-black.svg'},
      ],
      imgActiveCategory: ''
    }
  },
  methods: {
    handleClose(done) {
      ElMessageBox.confirm(
          'Отменить создание нового продукта?',
          {
            confirmButtonText: 'Да',
            cancelButtonText: 'Нет',
            type: 'warning',
          }).then(() => {
                  done()
                  ElNotification({
                      message: 'Вы отменили создание продукта',
                      type: 'info',
                  })
          })
          .catch(() => {
          })
    },
    changeCategory(val) {
      this.imgActiveCategory = this.categoryImgs.find(({title}) => title === val).imgUrl
    },
    addNewProduct() {
      this.dialogVisible = false
      ElNotification({
        message: 'Продукт добавлен',
        type: 'success',
      })
    }
  },
  computed: {
    categoriesList() {
      categoriesState.categoriesList.forEach((el) => {
        const imgUrl = this.categoryImgs.find(({title}) => title === el.title)
        el.imgUrl = imgUrl.imgUrl
      })
      return categoriesState.categoriesList
    }
  },
  components: {SvgIcon},
}
</script>

<style lang="scss">
.products-modal {
  &__btn {
    height: 36px;
    border-radius: 8px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    font-family: Ubuntu;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    color: #FFFFFF;
    width: 142px;
    background: #004AFF;
    margin-right: 15px;
  }

  &__title {
    font-family: Manrope;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    color: #585858;
  }

  &__section {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  &__type {
    > .products-modal__section {
      margin-top: 10px;
      gap: 42px;

      .radio {
        display: inline-flex;
        align-items: center;
        font-family: Manrope;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 18px;
        color: #585858;
        cursor: pointer;
      }

      .radio__input:checked + .radio__radio::after {
        transform: scale(1);
      }

      .radio__radio::after {
        content: "";
        width: 100%;
        height: 100%;
        display: block;
        background: #1454F2;
        border-radius: 50%;
        border: none;
        transform: scale(0);
      }

      .radio__input {
        display: none;
      }

      .radio__radio {
        width: 24px;
        height: 24px;
        border: 2px solid #1454F2;
        border-radius: 50%;
        margin-right: 10px;
        box-sizing: border-box;
        padding: 5px;
      }
    }
  }

  &__category {
    > img {
      z-index: 1;
      width: 10px;
      position: absolute;
      top: 27px;
      left: 390px;
    }

    .selectCategory {
      .el-input__inner {
        padding-left: 60px;
      }
    }

    .el-select .el-input__inner {
      height: 62px !important;
    }

    .el-select {
      width: 412px;
    }

    .el-select__caret {
      content: url('../../../assets/image/products/arrow-in-select-of-category-in-modal-products.svg');
      width: 10px;
      margin-left: -18px;
    }

    .el-select .el-input .el-select__caret.is-reverse {
      transform: rotateZ(180deg) !important;
    }

    .el-select .el-input .el-select__caret {
      transform: rotateZ(0) !important;
    }

    .el-input__inner {
      color: #1454F2 !important;
    }
  }

  &__description {
    .el-textarea__inner {
      height: 120px !important;
      padding-top: 15px;
    }
  }

  &__another {
    justify-content: space-between;

    > .modal-section:nth-of-type(1), > .modal-section:nth-of-type(2) {
      width: 200px;

      .el-input-number {
        width: 100%;
      }

      .el-input-number__decrease, .el-input-number__increase {
        top: 14px;
        width: 24px;
        height: 24px;
        background: rgba(106, 106, 106, 0.26);
        border-radius: 6px;
        border: none;
        color: var(--el-text-color-regular);
        font-size: 13px;
      }

      .el-input-number__decrease {
        left: 12px;
      }

      .el-input-number__increase {
        right: 12px;
      }

      .el-icon {
        color: #FFFFFF;
        font-weight: 600;
      }

      .el-input-number .el-icon {
        vertical-align: super;
      }
    }

    > .modal-section:nth-of-type(3) {
      width: 100%;
    }
  }
}

.el-icon-arrow-down:before {
  content: url('../../../assets/image/products/arrow-in-select-of-category-in-modal-products.svg');
}

.modal-section {
  margin-top: 26px;
  position: relative;

  &__title {
    position: absolute;
    z-index: 2;
    top: -9px;
    left: 10px;
    background: white;
    padding: 0 2px;
  }

  .el-input__inner, .el-textarea__inner {
    height: 50px;
    font-family: Manrope;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    //color: #1454F2;
    color: #121212;
  }

  .el-input__inner::placeholder, .el-textarea__inner::placeholder {
    color: #C4C4C4;
  }
}

.el-select-dropdown__item.selected {
  color: #1454F2 !important;
  font-weight: normal !important;
}

.el-dialog__headerbtn .el-dialog__close {
  color: #000000;
}

.img-select-wrapper {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  margin-right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    transition: all 50ms linear;
  }
}

.img-select-wrapper--active {
  background: linear-gradient(180deg, #719DF2 0%, #1454F2 100%);

  > svg {
    > path {
      fill: #FFFFFF;
    }
  }
}

.currentCategoryWrapperIcon-enter-active, .currentCategoryWrapperIcon-leave-active {
  transition: all 300ms;
}

.currentCategoryWrapperIcon-enter-from, .currentCategoryWrapperIcon-leave-to {
  opacity: 0;
  transform: scale3d(0, 0, 0);
}

.el-message-box__btns {
  > button {
    margin: 0 10px;
  }
}
</style>