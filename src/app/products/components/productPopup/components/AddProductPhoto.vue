<template>
  <div class="product-picture">
    <span class="product-picture__input">
      <p>+</p>
      <input
        multiple
        name="inp"
        type="File"
        placeholder="+"
        v-model="photo"
        accept="image/*"
        @change="addPhoto"
    /></span>
  </div>
</template>

<script>
export default {
  name: "AddProductPicture",
  data() {
    return {
      imagesList: "",
      imagesUrl: [],
    };
  },
  methods: {
    addPhoto($event) {
      const productPicture =
        document.getElementsByClassName("product-picture")[0];
      const el = $event.target.files;
      for (let image of el) {
        if (!this.imagesList.has(image.name)) {
          this.imagesList.set(image.name, image);
          const img = document.createElement("img");
          const imgWrapper = document.createElement("div");
          img.src = URL.createObjectURL(image);
          img.classList.add("product-picture__img");
          imgWrapper.classList.add("product-picture__img-wrapper");
          imgWrapper.appendChild(img);
          productPicture.prepend(imgWrapper);
          imgWrapper.addEventListener("click", () => {
            imgWrapper.parentNode.removeChild(imgWrapper);
            this.imagesList.delete(image.name);
            this.$emit("sendProductImgs", this.imagesList);
          });
        }
        this.$emit("sendProductImgs", this.imagesList);
      }
    },
  },
  mounted() {
    this.imagesList = new Map();
  },
  props: ["isClearList"],
  watch: {
    isClearList() {
      if (this.isClearList) {
        const imgsWrapper = document.getElementsByClassName(
          "product-picture__img-wrapper"
        );
        for (let i = imgsWrapper.length - 1; i >= 0; --i) {
          imgsWrapper[i].parentNode.removeChild(imgsWrapper[i]);
        }
        this.imagesList.clear();
      }
    },
  },
};
</script>

<style lang="scss">
.product-picture {
  min-height: 80px;
  display: flex;
  gap: 13px;
  flex-wrap: wrap;
  &__input {
    width: 80px;
    height: 80px;
    padding: 0;
    background: #ffffff;
    border: 1px dashed #e8e8e8;
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding-top: 5px;
    outline: none;
    font-size: 20px;
    cursor: pointer;
    > input {
      opacity: 0;
      width: 80px;
      height: 80px;
      cursor: pointer;
    }
    > p {
      position: absolute;
    }
  }
  &__img {
    width: 80px;
    height: 80px;
  }

  &__img-wrapper {
    position: relative;
    width: 80px;
    height: 80px;
    overflow: hidden;
    border-radius: 8px;
    border: 1px solid #e8e8e8;
    &::after {
      content: url("../../../../../assets/image/products/icon-delete.svg");
      position: absolute;
      background: rgba(#000000, 0.3);
      width: 80px;
      height: 80px;
      border-radius: 8px;
      top: 0;
      left: 0;
      opacity: 0;
      transition: 200ms;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    &:hover:after,
    &:focus:after {
      opacity: 1;
    }
  }
}
</style>
