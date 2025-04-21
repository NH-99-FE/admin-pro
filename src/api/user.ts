import { post } from '@/http/request'

export interface LoginRequest {
  username: string
  password: string
}

export interface reLoginRequest {
  accessToken: string
}

export interface LoginResponse {
  username: string
  roles: string[]
  accessToken: string
}

export function userLogin(data: LoginRequest) {
  return post<LoginResponse>('/login', data)
}

export async function refreshUserInfo(data: reLoginRequest) {
  return post<LoginResponse>('/getUserInfo', data)
}
