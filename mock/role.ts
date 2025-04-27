import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/mock/api/role',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: '查询成功',
        data: [
          {
            roleName: '管理员',
            roleId: 1,
            authority: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          },
          {
            roleName: '普通用户',
            roleId: 2,
            authority: [1, 2, 3],
          },
          {
            roleName: '访客',
            roleId: 3,
            authority: [1],
          },
        ],
      }
    },
  },
] as MockMethod[]
