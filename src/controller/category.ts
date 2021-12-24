/**
 * 类别信息增删查改
 */

interface CategoryItem {
  categoryId: number | string,
  categoryName: string,
  categoryLevel: string | number,
}


import { message } from "ant-design-vue"
import { API } from "../enum/api"
import { XRequest } from "../utils/axios"

export function useHandleCategory() {

  const deleteCategorys = async (params: any) => { 
    return XRequest({
      url: API.CATEGORY,
      method: 'delete',
      param: {
        id: params.id
      }
    }).then(res => {
      if(res.code == 200) message.success(`删除成功`)
      return getCategorys()
    })
  }

  const createCategorys = async (params: any) => {
    return XRequest({
      url: API.CATEGORY,
      method: 'post',
      param: params
    }).then(res => {
      if(res.code == 200) {
        message.success(`新增成功`)
      }     
      return res
    })
  }

  const getCategorys = async () => {
    return XRequest({
      url: API.CATEGORY
    }).then(res => {
      return res.data
    })
  }


  const updateCategorys = (params: any) => { 
    return XRequest({
      url: API.CATEGORY,
      method: 'put',
      param: params
    }).then(res => {
      if(res.code == 200) message.success(`修改成功`)
      return res
    })
  }

  return {
    createCategorys,
    deleteCategorys,
    getCategorys,
    updateCategorys
  }
}