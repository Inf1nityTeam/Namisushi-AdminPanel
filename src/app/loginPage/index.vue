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
        <form class="login-page__form login-page-form">
          <div class="login-page-form__input">
            <login-input
                placeholder="Адрес электронной почты"
            >
              <SvgIcon :icon="require('@/assets/image/login/email.svg')"/>
            </login-input>
          </div>
          <div class="login-page-form__input">
            <login-input
                placeholder="Пароль"
            >
              <SvgIcon :icon="require('@/assets/image/login/locked-padlock.svg')"/>
            </login-input>
          </div>
          <div class="login-page-form__actions">
            <el-checkbox v-model="rememberMe" label="Запомнить меня"></el-checkbox>
            <router-link to="/" class="login-page-form__forgot">Забыли пароль?</router-link>
          </div>
          <button class="login-page-form__button">Войти в систему</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import LoginInput from "@/app/loginPage/components/LoginInput";
import SvgIcon from "@/app/baseWrapper/SvgIcon";

export default {
  name: 'login-page',
  components: {LoginInput, SvgIcon},
  data() {
    return {
      rememberMe: {type: Boolean, default: false}
    }
  }
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

.login-page-form {
  &__input {
    margin-bottom: 37px;
  }

  &__button {
    font-size: 20px;
    font-family: "Raleway";
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 72px;
    width: 100%;
    border: none;
    border-radius: 8px;
    background-color: #384673;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
  }
  &__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:not(:last-child) {
      margin-bottom: 61px;
    }
  }
  &__forgot {
    font-family: "Raleway";
    font-size: 18px;
    color: #676767;
    text-decoration: none;
  }
}
</style>

<style lang="scss">
.login-page-form {
  .el-checkbox {
    &__label {
      font-family: "Raleway";
      font-size: 18px;
      color: #676767;
    }
    &__input {
      &.is-checked {
        .el-checkbox__inner {
          background-color: #384673;
          border: 1px solid #384673;
        }
        & +.el-checkbox__label {
          color: #384673;
        }
      }
      &.is-focus {
        .el-checkbox__inner {
          border: 1px solid #384673;
        }
      }
    }

    &__inner {
      width: 32px;
      height: 32px;
      border-radius: 4px;
      border: 1px solid #C0C0C0;

      &::after {
        left: 10px;
        width: 10px;
        height: 19px;
      }
    }
  }
}

</style>
