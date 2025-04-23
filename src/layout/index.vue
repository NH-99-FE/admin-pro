<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import Header from './components/Header.vue'

const router = useRouter()
const route = useRoute()

const menuList = router.getRoutes().filter((route) => {
  return route.meta.isShow
})

const activeMenu = route.path
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            :default-active="activeMenu" router
          >
            <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path">
              {{ item.meta.title }}
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.el-header {
  padding: 0;
  margin-bottom: 5px;
}

.el-container {
  height: calc(100vh - 60px);
  .el-menu {
    height: 100%;
  }
}
</style>
