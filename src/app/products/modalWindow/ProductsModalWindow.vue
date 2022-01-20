<template>
  <!-- <el-button
    type="text"
    class="products-modal__btn"
    @click="dialogVisible = true"
  >
    Новый продукт
  </el-button> -->
  <ProductsBtn
    :btnConfig="{ title: 'Добавить продукт', height: '50px', width: '218px' }"
    @click="dialogVisible = true"
  />

  <el-dialog
    class="products-modal"
    v-model="dialogVisible"
    title="Добавить продукт"
    width="462px"
    center
    :before-close="beforeCloseModalWindow"
  >
    <template #title>
      <div class="products-modal__header">
        <img src="@/assets/image/products/modal-icon-edit.svg" />
        <span>Добавить продукт</span>
      </div>
    </template>

    <div class="products-modal__type">
      <div class="products-modal__title">Тип продукта</div>

      <div class="products-modal__section">
        <label class="radio">
          <input
            type="radio"
            name="modal-radio-btn"
            class="radio__input"
            v-model="productType"
            value="ordinary"
          />
          <div class="radio__radio"></div>
          Обычный
        </label>

        <label class="radio">
          <input
            type="radio"
            name="modal-radio-btn"
            class="radio__input"
            value="differentFillings"
            v-model="productType"
            checked
          />
          <div class="radio__radio"></div>
          С различными начинками
        </label>
      </div>
    </div>

    <div class="products-modal__category modal-section">
      <div class="modal-section__title products-modal__title">Категория</div>
      <CategoriesSelect
        class="products-modal-window-select"
        :currentClass="'products-modal-window-select'"
        @getSelectedCategories="getSelectedCategories"
        :isClearList="isClearCategoriesList"
        :isMultiple="true"
      />
      <!-- <CategoriesSelect @func12="func12"/> -->
    </div>

    <div class="products-modal__name modal-section">
      <div class="products-modal__title modal-section__title">
        Наименование продукта
      </div>
      <el-input placeholder="Введите название продукта" v-model="productName" />
    </div>

    <div class="products-modal__description modal-section">
      <div class="products-modal__title modal-section__title">Описание</div>
      <el-input
        type="textarea"
        placeholder="Введите название продукта"
        v-model="productDescription"
      />
    </div>

    <div class="products-modal__another products-modal__section">
      <div class="modal-section">
        <div class="products-modal__title modal-section__title">Стоимость</div>
        <el-input-number
          :min="100"
          :max="5990"
          :step="10"
          v-model="productCost"
        />
      </div>

      <div class="modal-section">
        <div class="products-modal__title modal-section__title">
          Вес (граммы)
        </div>
        <el-input-number :min="1" :max="5990" v-model="productWeight" />
      </div>

      <div class="modal-section">
        <div class="products-modal__title modal-section__title">
          Ингридиенты
        </div>
        <IngredientsTag
          @sendIngredients="getProductIngredients"
          :ingredients="productIngredients"
        />
      </div>
    </div>

    <div class="products-modal__teg modal-section">
      <div class="products-modal__title">Тег</div>

      <div class="products-modal__section"></div>
    </div>

    <template #footer>
      <span class="dialog-footer modal-section">
        <el-button
          class="products-modal__btn"
          @click.prevent="addNewProduct"
          style="
            width: 412px;
            background: linear-gradient(180deg, #719df2 0%, #1454f2 100%);
            margin: auto;
          "
        >
          <img
            src="@/assets/image/products/icon-check.svg"
            style="margin-right: 10px"
          />
          Сохранить
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
/*eslint-disable*/
import { ElMessageBox, ElNotification } from "element-plus";
import CategoriesSelect from "@/app/products/modalWindow/components/CategoriesSelect";
import IngredientsTag from "@/app/products/modalWindow/components/IngredientsTag";
import { CREATE_PRODUCT } from "@/app/products/product.state";
import { categoriesState } from "../category.state";
import { productsState } from "../product.state";
import ProductsBtn from "@/app/products/ProductsBtn.vue";

export default {
  name: "ProductsModalWindow",
  data() {
    return {
      dialogVisible: false,
      productName: "",
      productDescription: "",
      productCost: 1000,
      productWeight: 10,
      productIngredients: ["Дракон Хото", "Ролл Темпура с креветкой", "Тунец"],
      productType: "differentFillings",
      productCategories: [],
      isClearCategoriesList: false,
    };
  },
  methods: {
    beforeCloseModalWindow(done) {
      ElMessageBox.confirm("Отменить создание нового продукта?", {
        confirmButtonText: "Да",
        cancelButtonText: "Нет",
        type: "warning",
      })
        .then(() => {
          done();
          this.closeModalWindow();
          ElNotification({
            message: "Вы отменили создание продукта",
            type: "info",
          });
        })
        .catch(() => {});
    },
    async addNewProduct() {
      const newProduct = {
        show: false,
        title: this.productName,
        description: this.productDescription,
        cost: +this.productCost,
        ingredients: JSON.parse(JSON.stringify(this.productIngredients)),
        weight: +this.productWeight,
        categories: this.productCategories,
      };
      //console.log(newProduct);
      if (!newProduct.title || !newProduct.cost) {
        ElNotification({
          message: "Данные заполнены некорректно",
          type: "error",
        });
      } else {
        this.dialogVisible = false;
        //метод state, который должен отправить данные
        await CREATE_PRODUCT(newProduct).then(() => {
          this.closeModalWindow();
        });
        ElNotification({
          message: "Запрос на создание продукта отправлен",
          type: "success",
        });
      }
    },
    getProductIngredients(pr) {
      this.productIngredients = pr;
    },
    closeModalWindow() {
      this.productName = "";
      this.productDescription = "";
      this.productCost = 1000;
      this.productWeight = 10;
      this.productIngredients = [
        "Дракон Хото",
        "Ролл Темпура с креветкой",
        "Тунец",
      ];
      this.productType = "differentFillings";
      this.productCategories = [];
      this.isClearCategoriesList = true;
    },
    getSelectedCategories(val) {
      this.productCategories = JSON.parse(JSON.stringify(val));
      this.isClearCategoriesList = false;
    },
  },
  components: { IngredientsTag, CategoriesSelect, ProductsBtn },
};
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
    color: #ffffff;
    width: 142px;
    background: #004aff;
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
        background: #1454f2;
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
        border: 2px solid #1454f2;
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

    .el-select .el-input,
    .el-input__inner {
      min-height: 62px !important;
    }

    .el-select {
      width: 412px;
    }

    .el-select__caret {
      content: url("../../../assets/image/products/arrow-in-select-of-category-in-modal-products.svg");
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
      color: #1454f2 !important;
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

    > .modal-section:nth-of-type(1),
    > .modal-section:nth-of-type(2) {
      width: 200px;

      .el-input-number {
        width: 100%;
      }

      .el-input-number__decrease,
      .el-input-number__increase {
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
        color: #ffffff;
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

  &__header {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;

    > span {
      font-family: Manrope;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: #121212;
    }
  }
}

.el-icon-arrow-down:before {
  content: url("../../../assets/image/products/arrow-in-select-of-category-in-modal-products.svg");
}

.modal-section {
  margin-top: 26px;
  position: relative;

  &__title {
    position: absolute;
    z-index: 2;
    top: -9px;
    left: 10px;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 1) 60%,
      rgba(255, 255, 255, 0.3)
    );
    border-radius: 2px;
    border: none;
    padding: 0 3px;
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);
  }

  .el-input__inner,
  .el-textarea__inner {
    height: 50px;
    font-family: Manrope;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    //color: #1454F2;
    color: #121212;
  }

  .el-input__inner::placeholder,
  .el-textarea__inner::placeholder {
    color: #c4c4c4;
  }
}

.el-select-dropdown__item.selected {
  color: #1454f2 !important;
  font-weight: normal !important;
}

.el-dialog__headerbtn .el-dialog__close {
  color: #000000;
}

.el-message-box__btns {
  > button {
    margin: 0 10px;
  }
}

.el-select-dropdown__item:hover {
  background: linear-gradient(
    180deg,
    rgba(162, 192, 250, 0.08) 0%,
    rgba(10, 56, 171, 0.07) 100%
  ) !important;
}
</style>
