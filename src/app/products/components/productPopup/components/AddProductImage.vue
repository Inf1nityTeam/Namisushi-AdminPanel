<template>
  <div class="product-images">
    <ul class="product-images__list">
      <li
          :key="imageUrl"
          v-for="imageUrl in imagesUrl"
          class="product-images__list--item"
      >
        <el-image
            fit="cover"
            :src="imageUrl"
            :preview-src-list="imagesUrl"
            :hide-on-click-modal="true"
        />
        <el-icon @click="deleteImage"><close/></el-icon>
      </li>
      <li class="product-images__list--item">
        <button @click="addImages" type="button" class="product-images__add-image-btn">
          <el-icon>
            <plus/>
          </el-icon>
        </button>
      </li>
    </ul>

    <input
        type="file"
        style="display: none;"
        @change="selectImages"
        multiple
        accept="image/*"
        ref="file"
    />
  </div>
</template>

<script>
import {Plus, Close} from "@element-plus/icons-vue";

export default {
  name: "add-product-image",
  components: {Plus, Close},
  data() {
    return {
      imagesUrl: []
    }
  },
  methods: {
    addImages() {
      this.$refs.file.click()
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
}
</script>

<style scoped lang="scss">
.product-images {
  &__add-image-btn {
    width: 100%;
    height: 100%;

    border: 1px dashed #E8E8E8;
    border-radius: 8px;

    background-color: #fff;

    transition: all 0.3s ease 0s;
    cursor: pointer;

    .el-icon {
      transition: all 0.3s ease 0s;
      color: #464646;
    }

    &:not(:first-child) {
      margin-left: 8px;
    }

    @media (any-hover: hover) {
      &:hover {
        border-color: transparent;
        background-color: rgba(0, 74, 255, 0.5);
      }
    }
  }

  &__list {
    display: flex;
    flex-wrap: wrap;

    &--item {
      height: 80px;
      flex: 0 0 80px;

      position: relative;
      cursor: pointer;

      margin-bottom: 8px;
      &:not(:last-child) {
        margin-right: 8px;
      }
    }
  }
}
</style>

<style lang="scss">
.product-images {
  .el-image {
    height: 100%;
    width: 100%;

    padding: 8px;
    border-radius: 8px;
    border: 1px solid #E8E8E8;
  }

  &__list--item {
    .el-image + .el-icon {
      position: absolute;

      top: 5px;
      right: 5px;

      width: 20px;
      height: 20px;



      background-color: #F92C23;
      color: #fff;

      border-radius: 4px;

      display: inline-flex;
      justify-content: center;
      align-items: center;
      svg {
        width: 12px;
        height: 12px;
      }
      @media (any-hover: hover) {
        transition: all 0.3s ease 0s;
        opacity: 0;
        visibility: hidden;
      }
    }
    @media (any-hover: hover) {
      &:hover {
        .el-image + .el-icon {
          opacity: 1;
          visibility: visible;
        }
      }
    }
  }
  &__add-image-btn {
    .el-icon {
      svg {
        width: 15px;
        height: 15px;
      }
    }

    @media (any-hover: hover) {
      &:hover {
        .el-icon {
          color: #fff;
        }
      }
    }
  }
}
</style>
