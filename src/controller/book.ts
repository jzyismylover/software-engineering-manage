/**
 * 书本信息增删查改
 */

import { message } from "ant-design-vue"
import { API } from "../enum/api"
import { XRequest } from "../utils/axios"

export function useHandleBook() {

  const deleteBooks = async (id: number) => {
    const res = await XRequest({
      url: API.BOOK,
      method: 'delete'
    })
    if(res.code) {
      message.success('删除成功')
    }
  }

  


  const createBooks = () => { }


  const getBooks = () => { }


  const updateBooks = () => { }
}