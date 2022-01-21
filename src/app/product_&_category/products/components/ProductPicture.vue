<template>
  <div class="product-picture">
    <div class="img1">
      <img :src="imgPath" />
    </div>

    <div class="img2">
      <img :src="imgPath" />
    </div>

    <div class="img3">
      <img :src="imgPath" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductPicture",
  props: {
    imgPath: { type: String },
  },
};
</script>

<style scoped lang="scss">
.product-picture {
  display: flex;
  align-items: center;

  > .img1,
  .img3 {
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

  > .img3 {
    margin-left: -50px;
  }

  > .img2 {
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
