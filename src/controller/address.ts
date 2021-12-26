/**
 * 用户地址信息增删查改
 */

 import { message } from "ant-design-vue"
 import { API } from "../enum/api"
 import { XRequest } from "../utils/axios"
 
 export function useHandleAddress() {
   const deleteAddress = (id: number) => { 
     return XRequest({
       url: API.ADDRESS,
       method: 'delete',
       param: {
         id: id
       }
     }).then(res => {
       if(res.code === 200) {
         message.success('删除成功！')
         return getAddress()
       }
     })
   }
 
   const createAddress = async (params: any) => { 
     return XRequest({
       url: API.ADDRESS,
       method: 'post',
       param: params
     }).then(res => {
       if(res.code === 200) {
         message.success('新建用户成功')
       }
       return res
     })
   }
 
   const getAddress = async () => { 
     return XRequest({
       url: API.ADDRESS
     }).then(res => {
       return res.data
     })
   }
 
   const updateAddress = async (params: any) => { 
     return XRequest({
       url: API.ADDRESS,
       method: 'put',
       param: params
     }).then(res => {
       if(res.code === 200) {
         message.success('修改用户成功')
       }
       return res
     })
   }
 
   const getAddressById = (id: number) => {
     return XRequest({
       url: API.ADDRESS + '/' + id
     }).then(res => {
       return res.data
     })
   }
 
   return {
     deleteAddress,
     createAddress,
     getAddress,
     updateAddress,
     getAddressById
   }
 }