<template>
  <div class="users-table">
    <el-table
        :data="users"
        :total="total"
        class="base-table"
        style="min-height: calc(100vh - 363px); width: 100%"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
          prop="avatar"
          width="80"
      >
        <template #default="scope">
          <base-user-avatar
              :avatar="scope.row.avatar"/>
        </template>
      </el-table-column>
      <el-table-column
          prop="email"
          label="Email"
      >
        <template #default="scope">
          <span v-if="scope.row.email">{{scope.row.email}}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="name"
          label="Имя"
      >
        <template #default="scope">
          <span v-if="scope.row.name">{{scope.row.name}}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="phone"
          label="Номер телефона"
      >
        <template #default="scope">
          <span v-if="scope.row.phone">{{scope.row.phone}}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="strict"
          label="Ban"
      >
        <el-switch
            class="ml-2"
            active-color="#13ce66"
            inactive-color="#ff4949"
        />
      </el-table-column>
      <el-table-column width="180">
        <template #default="scope">
          <div style="display: flex">
            <base-circle-button
                icon="edit"
                @click="$emit('edit-user', scope.row)"/>
            <base-circle-button
                icon="order"/>
          </div>
        </template>
<!--        @click="$emit('edit', scope.row)"-->
      </el-table-column>
    </el-table>
    <div class="users-table__pagination">
      <el-pagination
          background layout="prev, pager, next"
          :page-size="20"
          :total="total" />
    </div>
  </div>
</template>

<script>
import BaseUserAvatar from "@/app/common/BaseUserAvatar";
import UsersService from "@/app/users/users.service";
import BaseCircleButton from "@/app/common/BaseCircleButton";

export default {
  name: "users-table",
  components: { BaseUserAvatar, BaseCircleButton },
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
      const response = await UsersService.getUsers()
      this.users = response.data
      this.total = response.total
      console.log(this.users)
    }
  }
}
</script>


<style lang="scss" scoped>
.users-table {
  background-color: #FFFFFF;
  border-radius: 8px;

  &__pagination {
    display: flex;
    justify-content: center;
    align-items: center;

    padding-top: 10px;
    padding-bottom: 24px;
    box-sizing: border-box;

    width: 100%;
  }

}
</style>

<style lang="scss">
.base-table {
  padding: 10px 24px!important;
  border-radius: 8px;

  .el-checkbox, .el-checkbox__input, .el-checkbox__inner {
    width: 24px;
    height: 24px;
  }
  .el-checkbox__inner::after, .el-checkbox__inner::before {
    top: 0!important;
    bottom: 0!important;
    left: 0!important;
    right: 0!important;
    margin: auto!important;
  }

  .cell {
    font-family: Manrope, sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #6A6A6A;
  }

  th.el-table__cell {
    border-color: #A7BFFA!important;
  }

}
</style>
