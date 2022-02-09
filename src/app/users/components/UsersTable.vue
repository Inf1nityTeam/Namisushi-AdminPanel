<template>
  <el-table
      :data="users"
      :total="total"
      class="general-table"
      style="min-height: calc(100vh - 363px); width: 100%"
  >
    <el-table-column
        prop="avatar"
        width="36"
    >
      <template #default="scope">
        <img :src="scope.row.avatar" alt="" />
      </template>
    </el-table-column>
    <el-table-column
        prop="email"
        label="Email"
    >

    </el-table-column>
    <el-table-column
        prop="name"
        label="Имя"
    >

    </el-table-column>
    <el-table-column
        prop="phone"
        label="Номер телефона"
    >

    </el-table-column>
    <el-table-column
        prop="strict"
        label="Ban"
    >

    </el-table-column>
  </el-table>

</template>

<script>
import {usersController} from "@/app/users/users.controller";

export default {
  name: "users-table",
  data() {
    return {
      users: [],
      total: 0
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      const response = await usersController.getUsers()
      this.users = response.users
      this.total = response.total
      console.log(this.users)
    }
  }
}
</script>


<style scoped lang="scss">

</style>
