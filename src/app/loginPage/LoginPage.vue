<template>
  <div class="login-page">
    <div class="login-page__banner"></div>
    <div class="login-page__content">
      <div class="login-page__body">
        <div class="login-page__logo">
          <img src="@/assets/image/login/logo.png" alt="">
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
  components: {LoginForm},
}
</script>

<style scoped lang="scss">
.login-page {
  min-height: 100vh;

  @media (min-width: $md2+px) {
    display: flex;
  }
  &__actions {
    height: 100%;
    display: flex;
    justify-content: space-between;
  }

  &__banner {
    @media (min-width: $md2+px) {
      flex: 0 0 53.55%;
      background: url("../../assets/image/login/banner.jpg") center center / cover no-repeat;
    }
    @media (max-width: $md2+px) {
      display: none;
    }
  }

  &__title {
    text-align: center;
    color: #011627;
    font-size: 18px;
    font-family: "Raleway", sans-serif;

    &:not(:last-child) {
      margin-bottom: 122px;
      @media (max-width: $md1+px) {
        margin-bottom: 70px;
      }
    }
  }

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 30px 20px;

    min-height: 100vh;
    height: 100%;
    @media (min-width: $md2+px) {
      flex: 1 1 auto;
    }
    @media (max-width: $md2+px) {
      background-color: #07103A;
    }
    @media (max-width: $md4+px) {
      padding: 10px;
    }
  }

  &__body {
    width: 100%;
    padding: 20px;

    @media (max-width: $md2+px) {
      background-color: #fff;
      border-radius: 8px;
    }

    @media (min-width: 767.98px) {
      max-width: 600px;
    }
    @media (max-width: $md4+px) {
      padding: 15px;
    }
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
      @media (max-width: 1399.98+px) {
        width: 150px;
        height: 1px;
      }
    }

    @media (max-width: 1399.98+px) {
      max-width: 200px;
    }
  }
}
</style>
