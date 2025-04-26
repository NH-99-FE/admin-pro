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

interface UserState {
  username: string
  accessToken: string
  refereshToken?: string
  roles: Array<string>
}

export interface LoginResponse {
  code: number
  message: string
  data: UserState
}

// 定义的接口
export async function userLogin(data?: LoginRequest): Promise<LoginResponse> {
  return post<LoginResponse>('/login', data)
}

export async function refreshUserInfo(data?: reLoginRequest): Promise<LoginResponse> {
  return post<LoginResponse>('/getUserInfo', data)
}
