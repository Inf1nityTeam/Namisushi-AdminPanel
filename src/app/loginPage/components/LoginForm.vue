<template>
  <form class="login-page__form login-page-form"
        @submit.prevent="submitForm">
    <div class="login-page-form__input">
      <login-input
          v-model="credentials.email"
          placeholder="Адрес электронной почты">
        <svg-icon :icon="require('@/assets/image/login/email.svg')"/>
      </login-input>
    </div>
    <div class="login-page-form__input">
      <login-input
          v-model="credentials.password"
          placeholder="Пароль">
        <svg-icon :icon="require('@/assets/image/login/locked-padlock.svg')"/>
      </login-input>
    </div>
    <div class="login-page-form__actions">
      <el-checkbox v-model="rememberMe" label="Запомнить меня"></el-checkbox>
      <router-link to="/" class="login-page-form__forgot">Забыли пароль?</router-link>
    </div>
    <button class="login-page-form__button">Войти в систему</button>
  </form>
</template>

<script>
import LoginInput from "@/app/loginPage/components/LoginInput";
import SvgIcon from "@/app/common/SvgIcon";
import {userInstanceController} from "@/app/userInstance/user-instance.controller";

export default {
  name: "login-form",
  components: { LoginInput, SvgIcon },
  data() {
    return {
      credentials: {
        email: null,
        password: null
      },
      rememberMe: null
    }
  },
  methods: {
    submitForm() {

      userInstanceController.signIn(this.credentials)
          .then(data => {
            console.log(data)
          })

      console.log('submit')
    }
  }
}
</script>

<style scoped lang="scss">
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
