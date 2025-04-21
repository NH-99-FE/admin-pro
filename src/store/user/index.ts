import type { LoginRequest } from '@/api/user'
import type { UserState } from './types'
import { refreshUserInfo, userLogin } from '@/api/user'
// 组合式写法 Pinia 用户模块
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// defineStore 第一个参数为 store 名称，第二个参数为 setup 函数（组合式写法）
export const useUserStore = defineStore(
  'user',
  () => {
    // 用户名
    const username = ref<string>('')
    // 访问令牌
    const accessToken = ref<string>('')
    // 角色列表
    const roles = ref<Array<string>>([])

    // 是否已登录
    const isLoggedIn = computed(() => !!accessToken.value)

    // 用于更新 store 数据
    function updateInfo(partial: Partial<UserState>) {
      if (partial.username !== undefined)
        username.value = partial.username
      if (partial.accessToken !== undefined)
        accessToken.value = partial.accessToken
      if (partial.roles !== undefined)
        roles.value = partial.roles
    }

    // 登录
    async function storeUserLogin(data: LoginRequest) {
      const res = await userLogin(data)
      username.value = res.username
      roles.value = res.roles
      accessToken.value = res.accessToken
      return res
    }

    // 刷新用户信息
    async function storeRefreshUserInfo() {
      if (username.value && accessToken.value) {
        try {
          const res = await refreshUserInfo({
            accessToken: accessToken.value,
          })
          username.value = res.username
          roles.value = res.roles
          accessToken.value = res.accessToken
        }
        catch {
          username.value = ''
          roles.value = []
          accessToken.value = ''
        }
      }
    }

    // 返回暴露给外部的 state、getter、action
    return {
      username,
      accessToken,
      roles,
      isLoggedIn,
      updateInfo,
      storeUserLogin,
      storeRefreshUserInfo,
    }
  },
  {
    // 持久化配置，保持 accessToken 在 sessionStorage
    persist: {
      key: 'userInfo',
      storage: sessionStorage,
      pick: ['accessToken'],
    },
  },
)
