import { AxiosRequestHeaders } from 'axios'

// 请求方法
export type Method = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'DELETE' | 'delete'

// 返回消息列表 => 前后端约定好的数据返回
export interface IResponse {
  code: string | number,
  data: any,
  msg?: string,
}

// request options 相关的配置
export interface RequestOptions {
  isMock?: boolean, // 是否开启 mock 服务
  loading?: boolean,
  isToken?: boolean
}

// request 方法参数列表
export interface RequestParam<D = any> {
  url: string,
  method?: Method,
  param?: D,
  headers?: AxiosRequestHeaders
  options?: RequestOptions
}
