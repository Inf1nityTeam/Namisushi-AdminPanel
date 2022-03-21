<template>
  <div class="product-images">
    <ul class="product-images__list">
      <li
          :key="imageUrl"
          v-for="(imageUrl, index) in imagesUrl"
          class="product-images__list--item"
      >
        <el-image
            fit="cover"
            :src="imageUrl"
            :preview-src-list="imagesUrl"
            :hide-on-click-modal="true"
        />
        <button
            class="product-images__delete-btn"
            @click="$emit('delete-image', imageUrl, index)"
        >
          <el-icon>
            <close/>
          </el-icon>
        </button>
      </li>
      <li class="product-images__list--item">
        <button
            @click="addImages"
            type="button"
            class="product-images__add-image-btn"
            v-if="!isHiddenBtn"
        >
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
import {notificationsHelper} from "@/helpers/notifications.helper";
import {v4 as uuidv4} from "uuid";

export default {
  name: "add-product-image",
  components: {Plus, Close},
  emits: ['delete-image', 'add-image'],
  props: {
    images: {type: Array, required: true}
  },
  data() {
    return {
      maxImageSize: 10485760,
      maxImageCount: 20,
    }
  },
  methods: {
    addImages() {
      this.$refs.file.click()
    },
    selectImages($event) {
      const images = $event.target.files

      for (let i = 0; i < images.length; ++i) {
        const image = images[i]

        if (image.size > this.maxImageSize) {
          // задержка нужна для того, чтобы нотификаторы не накладывались друг на друга
          setTimeout(() => {
            notificationsHelper.error({
              message: `Файл ${image.name} имеет слишком большой размер. Размер файла не должен превышать 10 мегабайт.`
            })
          }, 0)
          continue
        }

        if (this.images.length >= 20) return

        const _id = uuidv4()
        this.$emit('add-image', {_id, image})

      }

      $event.target.value = null
    },
  },
  computed: {
    imagesUrl() {
      return this.images.map(item => {
        if (typeof item.image !== 'string') {
          return URL.createObjectURL(item.image)
        }
        return item.image
      })
    },
    isHiddenBtn() {
      return this.images.length >= this.maxImageCount
    }
  }
}
</script>

<style scoped lang="scss">
.product-images {
  &__add-image-btn {
    width: 100%;
    height: 100%;

    border: 1px dashed #E8E8E8;
    border-radius: 8px;
    outline: none;

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

  &__delete-btn {
    position: absolute;

    top: 5px;
    right: 5px;

    background-color: transparent;
    border: none;

    cursor: pointer;
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

  &__delete-btn {
    .el-icon {
      width: 20px;
      height: 20px;

      background-color: #F92C23;
      color: #fff;
      transition: all 0.3s ease 0s;

      border-radius: 4px;

      display: inline-flex;
      justify-content: center;
      align-items: center;

      opacity: 0;
      visibility: hidden;

      svg {
        width: 12px;
        height: 12px;
      }
    }

    @media (any-hover: hover) {
      &:hover {
        .el-icon {
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
