<template>
  <el-select
    :clearable="!isMultiple"
    v-model="selectedCategories"
    :multiple="isMultiple"
    placeholder="Выберите категорию"
    @change="changeCategory"
    @clear="clearSelect"
  >
    <el-option
      v-for="(item, i) in categoriesList"
      :key="i"
      :label="item.title"
      :value="item.title"
      style="height: 56px; display: flex; align-items: center"
    >
      <div
        :class="[
          { 'img-select-wrapper--active': item.showIcon },
          'img-select-wrapper',
        ]"
      >
        <SvgIcon
          :icon="require(`@/assets/image/products/${item.imgUrl}`)"
          style="height: 24px"
        />
      </div>

      <span>{{ item.title }}</span>
    </el-option>
  </el-select>
</template>

<script>
import SvgIcon from "@/app/common/baseWrapper/SvgIcon";
import { categoriesState } from "@/app/products/category.state";
import { imgToSvgByRef } from "@/helpers/imgToSvg";

export default {
  name: "CategoriesSelect",
  data() {
    return {
      selectedCategories: [],
      categoryIcons: [
        { title: "Роллы", imgUrl: "roll-icon-black.svg" },
        { title: "Суши и гунканы", imgUrl: "sushi-icon-black.svg" },
        { title: "Горячие блюда", imgUrl: "steak-icon-black.svg" },
        { title: "Салаты", imgUrl: "salad-icon-black.svg" },
        { title: "Сеты", imgUrl: "sets-icon-black.svg" },
        { title: "Лапша и рис", imgUrl: "pasta-icon-black.svg" },
      ],
    };
  },
  methods: {
    changeCategory(val) {
      // const modalWindow = document.getElementsByClassName(this.parrentClass)[0];
      const modalWindow = document.getElementsByClassName(this.currentClass)[0];
      this.categoriesList.forEach((el) => {
        const indexEl = val.indexOf(el.title);
        if (indexEl !== -1) {
          if (!el.showIcon) {
            el.showIcon = true;
            //Создание иконки для выбранной категории
            this.$nextTick(() => {
              //Добавление иконок, если select multiple
              //т.е. можно выбрать несколько категорий
              if (this.isMultiple) {
                const selectedTags = modalWindow.getElementsByClassName(
                  "el-tag el-tag--info el-tag--small el-tag--light"
                )[indexEl];

                let { divImgWrapper, img } = this.createdIcon(el);

                selectedTags.appendChild(divImgWrapper);
                imgToSvgByRef(img);
              }
              //Select с выбором только одной категории
              else {
                let span = modalWindow.getElementsByClassName(
                  "img-select-wrapper--active img-select-wrapper"
                )[0];
                //Удаление иконки предыдущей категории,
                //если такая существовала
                if (span) {
                  modalWindow
                    .getElementsByClassName("el-input")[0]
                    .removeChild(span);
                }
                modalWindow.getElementsByClassName(
                  "el-input__inner"
                )[0].style.paddingLeft = "60px";

                let { divImgWrapper, img } = this.createdIcon(el);

                modalWindow
                  .getElementsByClassName("el-input")[0]
                  .appendChild(divImgWrapper);
                imgToSvgByRef(img);
              }
            });
          }
        } else el.showIcon = false;
      });
      const selectedCategories = categoriesState.categoriesList
        .filter((el) => val.includes(el.title))
        .map((el) => el._id);
      this.$emit(
        "getSelectedCategories",
        JSON.parse(JSON.stringify(selectedCategories))
      );
    },
    //вызывается только для select
    //с выбором одной категории
    clearSelect() {
      const modalWindow = document.getElementsByClassName(this.currentClass)[0];
      const divImgWrapper = modalWindow.getElementsByClassName(
        "img-select-wrapper--active img-select-wrapper"
      );
      modalWindow.getElementsByClassName(
        "el-input__inner"
      )[0].style.paddingLeft = "16px";
      modalWindow
        .getElementsByClassName("el-input")[0]
        .removeChild(divImgWrapper[0]);
    },
    createdIcon(el) {
      let divImgWrapper = document.createElement("div");
      divImgWrapper.className = "img-select-wrapper--active img-select-wrapper";
      divImgWrapper.style.cssText = this.isMultiple
        ? "position:absolute; !important; top:5px; left:6px; margin-right:0 !important;"
        : "position:absolute; !important; top:6.5px; left:12px; margin-right:0 !important;";
      const img = document.createElement("img");
      img.src = require(`@/assets/image/products/${el.imgUrl}`);
      img.style.cssText = "height:24px;";
      divImgWrapper.appendChild(img);
      return { divImgWrapper, img };
    },
  },
  computed: {
    categoriesList() {
      const changeList = JSON.parse(
        JSON.stringify(categoriesState.categoriesList)
      );
      changeList.forEach((el) => {
        const imgUrl = this.categoryIcons.find(
          ({ title }) => title === el.title
        );
        el.imgUrl = imgUrl.imgUrl;
        el.showIcon = false;
      });
      return changeList;
    },
  },
  components: { SvgIcon },
  // * currentClass - класс, которы находиться на этом компоненте
  props: ["isClearList", "isMultiple", "currentClass"],
  watch: {
    isClearList() {
      if (this.isClearList) {
        this.selectedCategories = [];
        this.categoriesList.forEach((el) => (el.showIcon = false));
      }
    },
  },
};
</script>

<style lang="scss">
//через слот селекта сделать стрелку как на макете
// и добавлять крестик для селекта с одной категорией

// .el-select__caret {
//   content: url("../../../../assets/image/products/arrow-in-select-of-category-in-modal-products.svg");
//   width: 10px;
//   margin-left: -18px;
// }

// .el-select .el-input .el-select__caret.is-reverse {
//   transform: rotateZ(180deg) !important;
// }

// .el-select .el-input .el-select__caret {
//   transform: rotateZ(0) !important;
// }
.el-tag {
  height: 48px;
  //padding-left: 50px;
  padding-top: 5px;
  position: relative;
  box-sizing: border-box;
}

.el-select__tags-text {
  font-family: Manrope;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: #1454f2;
}

.el-select .el-select__tags .el-tag {
  padding-top: 11px;
  padding-left: 50px;
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
  background: linear-gradient(180deg, #719df2 0%, #1454f2 100%);

  > svg {
    > path {
      fill: #ffffff;
    }
  }
}

.currentCategoryWrapperIcon-enter-active,
.currentCategoryWrapperIcon-leave-active {
  transition: all 300ms;
}

.currentCategoryWrapperIcon-enter-from,
.currentCategoryWrapperIcon-leave-to {
  opacity: 0;
  transform: scale3d(0, 0, 0);
}
</style>
