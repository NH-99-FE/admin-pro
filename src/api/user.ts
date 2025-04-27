import type { Response } from './types/response'
import { get, post } from '@/http/request'

export interface LoginRequest {
  username: string
  password: string
}
// 刷新登录信息需要的参数
export interface reLoginRequest {
  accessToken: string
}

interface UserState {
  username: string
  accessToken: string
  refereshToken?: string
  roles: Array<string>
}

// 单个角色
export interface UserRole {
  roleId: number
  roleName: string
}

// 单个用户
export interface User {
  id: number
  nickname: string
  username?: string
  role: UserRole[]
}

// 更新用户角色的参数类型
export interface UpdateUserParams {
  id: number
  nickname: string
  role: UserRole[]
}

// 用户列表（其实就是 UserListItem 的数组）
export type UserList = User[]

// 定义的接口
export function userLogin(data?: LoginRequest): Promise<Response<UserState>> {
  return post<Response<UserState>>('/login', data)
}

export function refreshUserInfo(data?: reLoginRequest): Promise<Response<UserState>> {
  return post<Response<UserState>>('/getUserInfo', data)
}

// 获取用户列表接口
export function getUserList(): Promise<Response<UserList>> {
  return get<Response<UserList>>('/users')
}

// 更新用户权限
export function updateUserRole(params: UpdateUserParams): Promise<Response<User>> {
  return post<Response<User>>('/users', params)
}
