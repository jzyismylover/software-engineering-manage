<template>
  <base-nav title="修改用户信息" />
  <a-form :label-col="labelCol" :wrapperCol="wrapperCol" :model="state">
    <a-form-item label="用户名">
      <a-input v-model:value="state.loginName"></a-input>
    </a-form-item>
    <a-form-item label="昵称">
      <a-input v-model:value="state.nickName"></a-input>
    </a-form-item>
    <a-form-item label="用户密码">
      <a-input v-model:value="state.password"></a-input>
    </a-form-item>
    <a-form-item label="个人简介">
      <a-input v-model:value="state.introduceSign"></a-input>
    </a-form-item>
    <a-form-item label="电话号码">
      <a-input></a-input>
    </a-form-item>
    <a-form-item label="所在地（省市区）">
      <template #default>
        <base-space :provinceData="provinceData" :cityData="cityData" :regionData="regionData" />
      </template>
    </a-form-item>
    <a-form-item label="详细住址">
      <a-input></a-input>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }" class="form-btn row-whole">
      <a-button type="primary" @click="setSubmit">确认</a-button>
      <a-button style="margin-left: 10px" @click="setBack">返回</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { provinceData, cityData, regionData } from '../../../constant/area'
import { useHandleUser } from '../../../controller/user'
import md5 from 'md5'

export default defineComponent({
  setup() {

    const state = reactive({})
    const router = useRouter()
    const route = useRoute()
    const param = route.params.id

    const { createUsers, updateUsers, getUserById } = useHandleUser()

    onMounted(async () => {
      if(param !== 'add') { Object.assign(state, await getUserById(Number(param))) }
    })

    const setSubmit = async () => {
      const psw = md5(state.password)
      const states = toRaw(state)
      Object.assign(states, { passwordMd5: psw })
      delete states.createTime
      const res = await (param === 'add' ? createUsers(states) : updateUsers(states))
      res.code && router.go(-1)
    }
    
    const setBack = () => { 
      router.go(-1)
    }

    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      provinceData,
      cityData,
      regionData,
      setSubmit,
      setBack,
      state
    }
  },
})
</script>

<style scoped>
.ant-form {
  margin-top: 100px;
}
</style>
