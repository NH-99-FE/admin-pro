<script lang="ts" setup>
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
userStore.username = 'admin'
</script>

<template>
  <div>login</div>
</template>

<style lang="less" scoped></style>
