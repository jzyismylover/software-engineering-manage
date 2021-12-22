import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { API } from '../../enum/api'
import { HEADERS } from './headers'

export const http: AxiosInstance = axios.create({

  // 代理服务在打包后就不存在了 => 可以通过执行服务器地址来解决跨域问题
  baseURL: import.meta.env.MODE === 'development'
    ? 'http://192.168.131.143:8080/'
    : 'http://120.77.245.193/blog-system-hou',
    headers: {
      'Content-Type': HEADERS.FORM
    },
  withCredentials: true
})

// 请求拦截配置(针对当前项目一般是 application/json)
http.interceptors.request.use((config: AxiosRequestConfig) => {
  config.withCredentials = true
  return config
})

// 响应拦截配置(针对当前项目存在一些不同的 responseType)
http.interceptors.response.use((response: AxiosResponse) => {
  console.log(response);
  return response
})
