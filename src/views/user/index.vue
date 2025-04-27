<script lang="ts" setup>
import type { RoleList } from '@/api/role'
import type { User, UserList } from '@/api/user'
import { getRoleList } from '@/api/role'
import { getUserList, updateUserRole } from '@/api/user'
import { onMounted, reactive, ref, watch } from 'vue'

interface IQuery {
  nickname: string
  roleId: number
}

const roleWithAutn = ref<RoleList>([])

const userList = ref<UserList>([])

const editShow = ref(false)
const editUser = reactive<User & { roleIds: number[] }>({
  id: 0,
  nickname: '',
  role: [],
  roleIds: [],
})

// 获取用户列表
async function fetchUserList() {
  const res = await getUserList()
  userList.value = res.data
}

// 获取角色列表
async function fetchRoleList() {
  const res = await getRoleList()
  roleWithAutn.value = res.data
}

// 搜索数据信息
const searchData = reactive<IQuery>({
  nickname: '',
  roleId: 0,
})

// 查询角色信息
function onSearch() {
  let res: UserList = []
  if (searchData.nickname || searchData.roleId) {
    if (searchData.nickname) {
      res = userList.value.filter((item) => {
        return item.nickname.includes(searchData.nickname)
      })
    }
    if (searchData.roleId) {
      res = searchData.nickname ? res : userList.value
      res = res.filter((item) => {
        return item.role.find((value) => {
          return value.roleId === searchData.roleId
        })
      })
    }
  }
  else {
    res = userList.value
  }
  userList.value = res
}

// 确认回调
async function ensureEditUser() {
  editShow.value = false
  editUser.role = editUser.roleIds.map((roleId) => {
    const role = roleWithAutn.value.find(r => r.roleId === roleId)
    return {
      roleId: role?.roleId as number,
      roleName: role?.roleName as string,
    }
  })
  await updateUserRole(editUser)
  fetchUserList()
}

// 弹出编辑弹窗并完成数据回显
function handleEditUser(row: User) {
  editShow.value = true
  // 保持响应式
  Object.assign(editUser, {
    ...row,
    roleIds: row.role.map(item => item.roleId),
  })
}

watch([() => searchData.nickname, () => searchData.roleId], () => {
  if (searchData.nickname === '' || searchData.roleId === 0) {
    fetchUserList()
  }
})

onMounted(() => {
  fetchUserList()
  fetchRoleList()
})
</script>

<template>
  <div>
    <el-form :inline="true" class="search-form" :model="searchData">
      <el-form-item label="姓名">
        <el-input v-model="searchData.nickname" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="searchData.roleId" placeholder="select" style="width: 200px">
          <el-option label="全部" :value="0" />
          <el-option v-for="item in roleWithAutn" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSearch">
          查询
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="userList" :border="true" style="width: 100%;">
      <el-table-column prop="id" label="编号" width="180" />
      <el-table-column prop="nickname" label="姓名" />
      <el-table-column prop="role" label="角色">
        <template #default="scope">
          <el-button v-for="item in scope.row.role" :key="item.role" type="primary" size="small">
            {{ item.roleName }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEditUser(scope.row)">
            编辑
          </el-button>
          <el-button type="warning" size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="editShow" title="编辑用户信息">
      <el-form :model="editUser">
        <el-form-item label="昵称" label-width="120px">
          <el-input v-model="editUser.nickname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色" label-width="120px">
          <el-select v-model="editUser.roleIds" multiple placeholder="请选择角色">
            <el-option v-for="item in roleWithAutn" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editShow = false">取消</el-button>
          <el-button type="primary" @click="ensureEditUser">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped></style>
