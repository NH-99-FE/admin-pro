export function getMessageInfo(status: number | string): string {
  let msg = ''
  switch (status) {
    case 400:
      msg = '请求错误'
      break
    case 401:
      msg = '未授权，请登录'
      break
    case 403:
      msg = '拒绝访问'
      break
    case 404:
      msg = '请求地址出错'
      break
    case 500:
      msg = '服务器内部错误'
      break
    case 503:
      msg = '服务不可用'
      break
    default:
      msg = `连接错误${status}`
  }
  return msg
}
