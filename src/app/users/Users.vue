<template>
  <div class="users">
    <div class="users__title">
      <h2>Управление пользователями</h2>
    </div>
    <div class="users__filters">
      <users-filters/>
    </div>
    <users-table />
  </div>
</template>

<script>
import UsersTable from "@/app/users/components/UsersTable";
import UsersFilters from "@/app/users/components/UsersFilters";

export default {
  name: "users",
  components: {UsersTable, UsersFilters},
  methods: {}
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

}
</style>
