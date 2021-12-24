/**
 * 书本信息增删查改
 */

import { message } from "ant-design-vue"
import { API } from "../enum/api"
import { XRequest } from "../utils/axios"

export function useHandleBook() {

  const deleteBooks = async (id: number) => {
    return XRequest({
      url: API.BOOK,
      method: 'delete',
      param: {
        id: Number(id)
      }
    }).then(res => {
      if(res.code === 200) {
        message.success('删除成功')
        return getBooks()
      }
    })
  }

  const createBooks = async (param) => {
    return XRequest({
      url: API.BOOK,
      method: 'post',
      param: param
    }).then(res => {
      return res
    })
  }


  const getBooks = async () => { 
    return XRequest({
      url: API.BOOK
    }).then(res => {
      return res.data
    })
  }

  /*经过验证 id 是必传的*/
  const updateBooks = async (param: any) => {
    return XRequest({
      url: API.BOOK,
      method: 'PUT',
      param: param
    }).then(res => {
      if(res.code === 200) {
        message.success('修改成功！')
      }
      return res
    })
  }

  /*ok*/
  const getBookByID = async (id: string) => {
    return XRequest({
      url: API.BOOK + '/' + Number(id)
    }).then(res => {
      return res.data
    })
  }

  return {
    deleteBooks,
    createBooks,
    getBooks,
    updateBooks,
    getBookByID
  }
}