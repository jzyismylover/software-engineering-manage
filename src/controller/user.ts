/**
 * 用户信息增删查改
 */

import { API } from "../enum/api"
import { XRequest } from "../utils/axios"

export function useHandleUser() {
  const deleteUsers = () => { }

  const createUsers = () => { }

  const getUsers = async () => { 
    return XRequest({
      url: API.USER
    }).then(res => {
      return res.data
    })
  }

  const updateUsers = () => { }

  return {
    deleteUsers,
    createUsers,
    getUsers,
    updateUsers
  }
}