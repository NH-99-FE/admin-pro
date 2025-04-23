<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import { Lock, User } from '@element-plus/icons-vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const userInfo = reactive({
  username: 'admin',
  password: 'admin',
})
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符之间', trigger: 'blur' },
  ],
})
async function userLogin() {
  try {
    await userStore.storeUserLogin(userInfo)
  }
  finally {
    router.push('/')
  }
}
</script>

<template>
  <div class="login-box">
    <div class="login-form">
      <h1>企业中后台管理系统</h1>
      <el-form :model="userInfo" :rules="rules" center class="login-info">
        <el-form-item prop="username">
          <el-input v-model="userInfo.username" :prefix-icon="User" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="userInfo.password" :prefix-icon="Lock" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-button type="primary" style="width:100%" @click="userLogin">
          登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: var(--main-bg-color);
  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;
    h1 {
      color: var(--text-color);
      font-size: 15px;
      margin: 10px;
    }
    .login-info {
      height: max-content;
    }
  }
}
</style>
