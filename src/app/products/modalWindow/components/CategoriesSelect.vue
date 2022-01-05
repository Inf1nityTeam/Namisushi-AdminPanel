<template>

  <el-select v-model="selectedCategories"
             multiple
             placeholder="Выберите категорию"
             :class="{'selectCategory':selectedCategories}"
             @change="changeCategory">

    <el-option
        v-for="(item, i) in categoriesList"
        :key="i"
        :label="item.title"
        :value="item.title"
        style="height: 56px; display: flex; align-items: center;">

      <div :class="[{'img-select-wrapper--active':item.showIcon},'img-select-wrapper']">
        <SvgIcon :icon="require(`@/assets/image/products/${item.imgUrl}`)"
                 style="height: 24px;"/>
      </div>

      <span>{{ item.title }}</span>

    </el-option>

  </el-select>

</template>

<script>
import SvgIcon from '@/app/baseWrapper/SvgIcon'
import {categoriesState} from "@/app/products/category.state";
import {imgToSvgByRef} from '@/helpers/imgToSvg'

export default {
  name: "CategoriesSelect",
  data() {
    return {
      selectedCategories: [],
      categoryIcons: [
        {title: "Роллы", imgUrl: 'roll-icon-black.svg'},
        {title: "Суши и гунканы", imgUrl: 'sushi-icon-black.svg'},
        {title: "Горячие блюда", imgUrl: 'steak-icon-black.svg'},
        {title: "Салаты", imgUrl: 'salad-icon-black.svg'},
        {title: "Сеты", imgUrl: 'sets-icon-black.svg'},
        {title: "Лапша и рис", imgUrl: 'pasta-icon-black.svg'},
      ],
    }
  },
  methods: {
    changeCategory(val) {
      const modalWindow = document.getElementsByClassName('products-modal__category modal-section')[0]
      this.categoriesList.forEach(el => {
        const indexEl = val.indexOf(el.title)
        if (indexEl !== -1) {
          if(!el.showIcon) {
            el.showIcon = true
            this.$nextTick(() => {
              const selectedTags = modalWindow.getElementsByClassName('el-tag el-tag--info el-tag--small el-tag--light')[indexEl]
              const divImgWrapper = document.createElement("div")
              divImgWrapper.className = 'img-select-wrapper--active img-select-wrapper'
              divImgWrapper.style.cssText = 'position:absolute; !important; top:5px; left:5px; margin-right:0 !important;'
              const img = document.createElement("img")
              img.src = require(`@/assets/image/products/${el.imgUrl}`)
              img.style.cssText = 'height:24px;'
              divImgWrapper.appendChild(img)
              selectedTags.appendChild(divImgWrapper)
              imgToSvgByRef(img)
            })
          }
        } else el.showIcon = false
      })

      this.selectedCategories = val.slice(0)
      this.$emit('productCategories',this.selectedCategories)
    },
  },
  computed: {
    categoriesList() {
      categoriesState.categoriesList.forEach((el) => {
        const imgUrl = this.categoryIcons.find(({title}) => title === el.title)
        el.imgUrl = imgUrl.imgUrl
        el.showIcon = false
      })
      return categoriesState.categoriesList
    }
  },
  components: {SvgIcon}
}
</script>

<style lang="scss">

.el-tag {
  height: 48px;
  padding-left: 50px;
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
  color: #1454F2;
}
.el-select .el-select__tags .el-tag {
  padding-top: 11px;
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

</style>