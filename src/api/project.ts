import { get } from '@/http/request'

export function getProjectList(data?: any) {
  return get('projects', data)
}
