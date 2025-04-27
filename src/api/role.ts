import type { Response } from './types/response'
import { get } from '@/http/request'

interface IRoleWithAuth {
  roleName: string
  roleId: number
  authority: Array<number>
}

export type RoleList = IRoleWithAuth[]

export function getRoleList(): Promise<Response<RoleList>> {
  return get<Response<RoleList>>('/role')
}
