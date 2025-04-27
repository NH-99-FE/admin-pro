import type { MockMethod } from 'vite-plugin-mock'

// 全局用户数据，方便后续修改
const users = [
  {
    id: 1,
    nickname: 'jack',
    username: 'jackpp',
    role: [
      { roleId: 1, roleName: '管理员' },
      { roleId: 2, roleName: '普通用户' },
    ],
  },
  {
    id: 2,
    nickname: 'lucy',
    username: 'lucy88',
    role: [{ roleId: 2, roleName: '普通用户' }],
  },
  {
    id: 3,
    nickname: 'tom',
    username: 'tomcat',
    role: [{ roleId: 3, roleName: '访客' }],
  },
  {
    id: 4,
    nickname: 'alice',
    username: 'alice_w',
    role: [{ roleId: 1, roleName: '管理员' }],
  },
  {
    id: 5,
    nickname: 'bob',
    username: 'bobby',
    role: [
      { roleId: 2, roleName: '普通用户' },
      { roleId: 3, roleName: '访客' },
    ],
  },
]

export default [
  {
    // 前面的 /mock 为 mock 生效需要配置的根路径 后面会提到
    url: '/mock/api/login',
    method: 'post',
    // 使用 body 可以获取请求体
    response: ({ body }) => {
      // 简单编写一个逻辑
      // 用户名不等于密码就是密码错误
      if (body.username !== body.password) {
        // 返回JSON信息
        return {
          code: 1,
          message: '密码错误',
          data: {
            username: '',
            roles: [],
            accessToken: '',
          },
        }
      }
      // 其余的则显示登录成功
      if (body.username === 'admin') {
        return {
          code: 0,
          message: '登录成功',
          data: {
            username: 'admin',
            roles: ['admin'],
            accessToken: 'admin',
          },
        }
      }
      else {
        return {
          code: 0,
          message: '登录成功',
          data: {
            username: 'common',
            roles: ['common'],
            accessToken: 'common',
          },
        }
      }
    },
  },
  {
    // 获取用户信息的接口
    url: '/mock/api/users',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: '获取成功',
        data: users,
      }
    },
  },
  {
    // 修改用户信息的接口
    url: '/mock/api/users',
    method: 'post',
    response: ({ body }) => {
      const { id, role, nickname } = body
      const user = users.find(u => u.id === id)
      if (user) {
        user.nickname = nickname
        user.role = role
        return {
          code: 0,
          message: '用户权限更新成功',
          data: user,
        }
      }
      return {
        code: 1,
        message: '未找到该用户',
        data: null,
      }
    },
  },
] as MockMethod[]
