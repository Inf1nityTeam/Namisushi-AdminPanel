<template>
  <div class="users">
    <div class="users__title">
      <h2>Управление пользователями</h2>
    </div>
    <div class="users__filters">
      <users-filters/>
      <div class="users__sms-btn">
        <button @click="openSmsPopup">Отправить сообщения</button>
      </div>
    </div>
    <div class="users__table">
      <users-table
          @edit-user="openEditUserPopup"/>
    </div>
    <send-sms-popup ref="smsPopup"/>
    <user-popup ref="userPopup"/>
  </div>
</template>

<script>
import UsersTable from "@/app/usersPage/components/UsersTable";
import UsersFilters from "@/app/usersPage/components/UsersFilters";
import SendSmsPopup from "@/app/usersPage/components/SendSmsPopup";
import UserPopup from "@/app/usersPage/components/UserPopup";

export default {
  name: "users-page",
  components: { UsersTable, UsersFilters, SendSmsPopup, UserPopup },
  methods: {
    openSmsPopup() {
      this.$refs.smsPopup.open()
    },
    openEditUserPopup() {
      this.$refs.userPopup.open()
    }
  }
};
</script>

<style scoped lang="scss">
.users {

  &__title {
    > h2 {
      font-family: Raleway, sans-serif;
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 28px;
      color: #11162A;
    }
  }

  &__filters {
    display: flex;
    align-items: center;
  }

  &__sms-btn {
    margin-left: auto;
    > button {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 220px;
      height: 50px;

      font-family: Manrope, sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      text-align: center;
      color: #FFFFFF;

      background: #1857F3;
      border-radius: 8px;
      border: none;

      cursor: pointer;
      transition: 200ms;

      &:hover {
        background: rgba(24, 87, 243, 0.8);
      }
    }
  }

}
</style>
