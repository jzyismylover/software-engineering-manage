/**
 * 类别信息增删查改
 */

import { API } from "../enum/api"
import { XRequest } from "../utils/axios"

export function useHandleCategory() {

  const deleteCategorys = async () => { }

  const createCategorys = async () => { }

  const getCategorys = async () => {
    return XRequest({
      url: API.CATEGORY
    }).then(res => {
      return res.data
    })
  }


  const updateCategorys = () => { }

  return {
    createCategorys,
    deleteCategorys,
    getCategorys,
    updateCategorys
  }
}