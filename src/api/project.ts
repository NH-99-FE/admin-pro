import type { Response } from './types/response'
import { get } from '@/http/request'

interface Iproject {
  id: number
  userId: number
  title: string
  introduction: string
}

export type ProjectList = Iproject[]

// 获取项目列表
export function getProjectList(data?: any): Promise<Response<ProjectList>> {
  return get<Response<ProjectList>>('projects', data)
}
