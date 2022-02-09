<template>
  <div class="users">
    <users-table />
  </div>
</template>

<script>
import UsersTable from "@/app/users/components/UsersTable";
export default {
  name: "users",
  components: {UsersTable},
  methods: {}
};
</script>

<style scoped lang="scss">
.users {
}
</style>
