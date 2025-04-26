import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getMessageInfo } from './status'

interface BaseResponse<T = any> {
  code: number | string
  message: string
  data: T
  status?: number
}

const service = axios.create({
  // 启用 mock 就请求 mock 路径
  // 不启用 mock 就请求 正常后端路径
  baseURL: import.meta.env.VITE_APP_DEV_USE_MOCK === 'true'
    ? import.meta.env.VITE_APP_MOCK_BASEURL
    : import.meta.env.VITE_APP_API_BASEURL,
  // baseURL: import.meta.env.VITE_APP_MOCK_BASEURL,
  timeout: 5000,
})

// axios实例拦截请求
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在请求发送之前做一些处理，比如添加请求头、修改请求参数等
    return config
  },
  (error: AxiosError) => {
    // 处理请求错误
    return Promise.reject(error)
  },
)

// axios实例拦截响应
service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response
    }
    ElMessage({
      message: getMessageInfo(response.status),
      type: 'error',
    })
    return response.data
  },
  // 请求失败
  (error: any) => {
    // 处理响应错误
    const { response } = error
    if (response) {
      // 请求已发出，但不在 2xx 的范围
      ElMessage({
        message: getMessageInfo(response.status),
        type: 'error',
      })
      return Promise.reject(response.data)
    }
    ElMessage({
      message: '网络异常，请稍后重试',
      type: 'error',
    })
  },
)

// BaseResponse 为 res.data 的类型
// 此处相当于二次响应拦截
// 为响应数据进行定制化处理
function requestInstance<T = any>(config: AxiosRequestConfig): Promise<T> {
  const conf = config
  return new Promise((resolve, reject) => {
    service
      .request<any, AxiosResponse<BaseResponse>>(conf)
      .then((res: AxiosResponse<BaseResponse>) => {
        const data = res.data // 如果data.code为错误代码返回message信息
        if (data.code !== 0) {
          ElMessage({
            message: data.message,
            type: 'error',
          })
          reject(data.message)
        }
        else {
          ElMessage({
            message: data.message,
            type: 'success',
          })
          // 此处返回data信息 也就是 api 中配置好的 Response类型
          resolve(data as T)
        }
      })
  })
}

// 在最后使用封装过的axios导出不同的请求方式
export function get<T = any, U = any>(url: string, params?: U, config?: AxiosRequestConfig): Promise<T> {
  return requestInstance({
    ...config,
    url,
    method: 'GET',
    params,
  })
}

export function post<T = any, U = any>(url: string, data: U, config?: AxiosRequestConfig): Promise<T> {
  return requestInstance({
    ...config,
    url,
    method: 'POST',
    data,
  })
}

export function put<T = any, U = any>(url: string, params?: U, config?: AxiosRequestConfig): Promise<T> {
  return requestInstance({
    ...config,
    url,
    method: 'PUT',
    params,
  })
}

export function del<T = any, U = any>(url: string, data: U, config?: AxiosRequestConfig): Promise<T> {
  return requestInstance({
    ...config,
    url,
    method: 'DELETE',
    data,
  })
}
