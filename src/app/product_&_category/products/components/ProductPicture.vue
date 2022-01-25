<template>
  <div class="product-picture" v-if="pathToImg !== 1">
    <div class="product-picture__img1" >
      <img :src="pathToImg" />
    </div>

    <div class="product-picture__img2">
      <img :src="pathToImg" />
    </div>

    <div class="product-picture__img3">
      <img :src="pathToImg" />
    </div>
  </div>
  <div v-else>
    {{pathToImg}}
  </div>
</template>

<script>
export default {
  name: "ProductPicture",
  props: {
    imgPath: { type: String },
  },
  computed: {
    pathToImg() {
      return this.imgPath? `https://dev.namisushi.dn.ua${this.imgPath}` : 1;
    },
  },
};
</script>

<style scoped lang="scss">
.product-picture {
  display: flex;
  align-items: center;

  &__img1,
  &__img3 {
    opacity: 0.6;
    background: rgba(172, 170, 170, 0.9);
    border: none;
    border-radius: 8px;
    width: 60px;
    height: 60px;
    > img {
      width: 50px;
      height: 50px;
    }
  }

  &__img3 {
    margin-left: -50px;
  }

  &__img2 {
    background: white;
    z-index: 2;
    margin-left: -50px;
    width: 80px;
    height: 80px;
    > img {
      width: 70px;
      height: 70px;
    }
  }

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
