import { post } from '@/http/request'

export interface LoginRequest {
  username: string
  password: string
}
// 刷新登录信息需要的参数
export interface reLoginRequest {
  accessToken: string
}
export interface LoginResponse {
  username: string
  roles: string[]
  accessToken: string
}
// 定义的接口
export async function userLogin(data?: LoginRequest) {
  return post<LoginResponse>('/login', data)
}

export async function refreshUserInfo(data?: reLoginRequest) {
  return post<LoginResponse>('/getUserInfo', data)
}
