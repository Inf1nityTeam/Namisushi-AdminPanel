<template>
  <div class="login-page">
    <div class="login-page__banner">
      <img src="../../assets/image/login/banner.jpg" alt="">
    </div>
    <div class="login-page__content">
      <div class="login-page__body">
        <div class="login-page__logo">
          <img src="../../assets/image/login/logo.png" alt="">
        </div>
        <h1 class="login-page__title">Войти в систему</h1>
        <login-form/>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/app/loginPage/components/LoginForm";

export default {
  name: 'login-page',
  components: { LoginForm }
}
</script>

<style scoped lang="scss">
.login-page {
  display: flex;
  min-height: 100vh;
  &__actions {
    display: flex;
    justify-content: space-between;
  }
  &__banner {
    flex: 0 1 53.55%;
    min-height: 100vh;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__title {
    text-align: center;
    color: #011627;
    font-size: 18px;
    font-family: "Raleway";

    &:not(:last-child) {
      margin-bottom: 162px;
    }
  }

  &__content {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__body {
    max-width: 600px;
    width: 100%;
  }

  &__logo {
    max-width: 308px;
    margin: 0 auto;
    position: relative;

    img {
      max-width: 100%;
    }

    &:not(:last-child) {
      margin-bottom: 12px;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 0);
      width: 200px;
      height: 3px;
      background-color: #2a2a2a;
    }
  }
}
</style>
