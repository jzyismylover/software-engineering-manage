/**
 * 用户信息增删查改
 */

import { message } from "ant-design-vue"
import { API } from "../enum/api"
import { XRequest } from "../utils/axios"

export function useHandleUser() {
  const deleteUsers = (id: number) => { 
    return XRequest({
      url: API.USER,
      method: 'delete',
      param: {
        id: id
      }
    }).then(res => {
      if(res.code === 200) {
        message.success('删除成功！')
        return getUsers()
      }
    })
  }

  const createUsers = async (params: any) => { 
    return XRequest({
      url: API.USER,
      method: 'post',
      param: params
    }).then(res => {
      if(res.code === 200) {
        message.success('新建用户成功')
      }
      return res
    })
  }

  const getUsers = async () => { 
    return XRequest({
      url: API.USER
    }).then(res => {
      return res.data
    })
  }

  const updateUsers = async (params: any) => { 
    return XRequest({
      url: API.USER,
      method: 'put',
      param: params
    }).then(res => {
      if(res.code === 200) {
        message.success('修改用户成功')
      }
      return res
    })
  }

  const getUserById = (id: number) => {
    return XRequest({
      url: API.USER + '/' + id
    }).then(res => {
      return res.data
    })
  }

  return {
    deleteUsers,
    createUsers,
    getUsers,
    updateUsers,
    getUserById
  }
}