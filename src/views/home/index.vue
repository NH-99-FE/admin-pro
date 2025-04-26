<script lang="ts" setup>
import { getProjectList } from '@/api/project'
import { computed, onMounted, reactive, ref, watch } from 'vue'

interface Iproject {
  id: number
  userId: number
  title: string
  introduction: string
}

// 全部数据列表
const projectList = ref<Iproject[]>([])
const searchDate = reactive({
  title: '',
  introduction: '',
  currentPage: 1,
  dataCount: 0,
  pageSize: 5,
})

// 从接口获取数据
async function fetchData() {
  const res = await getProjectList()
  projectList.value = res.data
  searchDate.dataCount = res.data.length
}

// 当前页面/分页大小时触发
function handleChange(currentPage: number, pageSize: number) {
  searchDate.currentPage = currentPage
  searchDate.pageSize = pageSize
}

// 当前分页数据
const dataList = computed(() => {
  return projectList.value.slice(
    (searchDate.currentPage - 1) * searchDate.pageSize,
    searchDate.currentPage * searchDate.pageSize,
  )
})

// 查询数据
function onSearch() {
  let res: Iproject[] = []
  if (searchDate.title || searchDate.introduction) {
    if (searchDate.title) {
      res = projectList.value.filter((item) => {
        return item.title.includes(searchDate.title)
      })
    }
    if (searchDate.introduction) {
      res = projectList.value.filter((item) => {
        return item.title.includes(searchDate.introduction)
      })
    }
  }
  else {
    res = projectList.value
  }
  projectList.value = res
  searchDate.currentPage = 1
  searchDate.dataCount = projectList.value.length
}

// 搜索数据发生变化，重新获取原始数据
watch([
  () => searchDate.title,
  () => searchDate.introduction,
], () => {
  fetchData()
})

onMounted(async () => {
  fetchData()
})
</script>

<template>
  <div class="warp-content">
    <el-form :inline="true" :model="searchDate" class="search-form">
      <el-form-item label="项目名称" placeholder="请输入项目名称">
        <el-input v-model="searchDate.title" />
      </el-form-item>
      <el-form-item label="项目详情" placeholder="请输入项目详情">
        <el-input v-model="searchDate.introduction" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">
          查询
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="dataList" :border="true" style="width: 100%">
      <el-table-column prop="id" label="编号" width="180" />
      <el-table-column prop="title" label="名称" width="180" />
      <el-table-column prop="introduction" label="详情" />
    </el-table>
    <el-pagination
      layout="prev, pager, next, sizes"
      :total="searchDate.dataCount"
      :page-sizes="[5, 10, 15, 20]"
      @change="handleChange"
    />
  </div>
</template>

<style lang="less" scoped></style>
