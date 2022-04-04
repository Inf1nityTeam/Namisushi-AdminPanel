<template>
  <form class="login-form"
        @submit.prevent="submitForm">
    <div class="login-form__input">
      <login-input
          v-model="credentials.login"
          @update:modelValue="updateLogin"
          :hasError="v$.credentials.login.$error"
          :error="v$.credentials.login.$errors?.[0]?.$message"
          placeholder="Логин">
        <svg-icon :icon="require('@/assets/image/login/user.svg')"/>
      </login-input>
    </div>
    <div class="login-form__input">
      <login-input
          v-model="credentials.password"
          @update:modelValue="updatePassword"
          :hasError="v$.credentials.password.$error"
          :error="v$.credentials.password.$errors?.[0]?.$message"
          type="password"
          placeholder="Пароль">
        <svg-icon :icon="require('@/assets/image/login/locked-padlock.svg')"/>
      </login-input>
    </div>
    <button class="login-form__button">Войти в систему</button>
  </form>
</template>

<script>
import LoginInput from "@/app/loginPage/components/LoginInput";
import SvgIcon from "@/app/common/SvgIcon";
import {userInstanceController} from "@/app/userInstance/user-instance.controller";
import useVuelidate from "@vuelidate/core";
import {helpers, required} from "@vuelidate/validators";

export default {
  name: "login-form",
  components: {LoginInput, SvgIcon},
  data() {
    return {
      credentials: {
        login: null,
        password: null
      }
    }
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      credentials: {
        login: {
          required: helpers.withMessage('Обязательное поле', required),
        },
        password: {
          required: helpers.withMessage('Обязательное поле', required),
        }
      }
    }
  },
  methods: {
    submitForm() {
      this.v$.credentials.$touch()
      if (this.v$.credentials.$invalid) return

      userInstanceController.signIn(this.credentials)
          .then(data => {
            console.log(data)
          })
    },
    updatePassword(value) {
      if (this.v$.credentials.password.$error) {
        this.v$.credentials.password.$reset()
      }
      this.credentials.password = value
    },
    updateLogin(value) {
      if (this.v$.credentials.login.$error) {
        this.v$.credentials.login.$reset()
      }
      this.credentials.login = value
    }
  }
}
</script>

<style scoped lang="scss">
.login-form {
  &__input {
    margin-bottom: 37px;
  }

  &__button {
    font-size: 20px;
    font-family: "Raleway", sans-serif;

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
    transition: background-color 0.3s ease 0s;

    @media (max-width: $md1+px) {
      font-size: 16px;
      min-height: 60px;
    }

    @media (any-hover: hover) {
      &:hover {
          background-color: #011627;
      }
    }
  }

}
</style>
