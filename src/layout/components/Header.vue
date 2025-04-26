<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showSetting = ref(false)
function handleSetting() {
  showSetting.value = !showSetting.value
}
function handleClose() {
  showSetting.value = false
}
const userStore = useUserStore()
const { username } = storeToRefs(userStore)
function logout() {
  userStore.resetInfo()
  sessionStorage.removeItem('userInfo')
  ElMessage({
    message: '退出成功',
    type: 'success',
  })
  router.push('/login')
}
</script>

<template>
  <div class="header">
    <div class="flex-center">
      logo区域
    </div>
    <div class="flex-grow" />
    <div class="flex-center m05 bg-color-light">
      <i-ep-user />
      {{ username }}
    </div>
    <div class="flex-center m05 bg-color-light setting" @click="handleSetting">
      <i-ep-setting />
    </div>
    <el-drawer
      v-model="showSetting"
      :show-close="false"
      :with-header="false"
      size="300px"
      direction="rtl"
    >
      <div class="setting-header">
        <h2>系统设置</h2>
        <i-ep-close @click="handleClose" />
      </div>
      <div class="out">
        <el-popconfirm
          class="box-item"
          title="确定退出系统吗"
          placement="top"
          @confirm="logout"
        >
          <template #reference>
            <el-button type="primary">
              退出
            </el-button>
          </template>
        </el-popconfirm>
      </div>
    </el-drawer>
  </div>
</template>

<style lang="less" scoped>
.header {
  display: flex;
  padding: 0 15px;
  width: 100%;
  height: 60px;
  .setting {
    cursor: pointer;
  }
  .setting-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    color: var(--text-color);
  }
  .out {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
