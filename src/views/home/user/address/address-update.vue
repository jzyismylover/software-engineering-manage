<template>
  <base-nav title="修改用户信息" />
  <a-form :label-col="labelCol" :wrapperCol="wrapperCol" :model="state">
    <a-form-item label="用户名">
      <a-input v-model:value="state.userName"></a-input>
    </a-form-item>
    <a-form-item label="电话号码">
      <a-input v-model:value="state.userPhone"></a-input>
    </a-form-item>
    <a-form-item label="所在地（省市区）">
      <template #default>
        <base-space ref="space" :provinceData="provinceData" :cityData="cityData" :regionData="regionData" />
      </template>
    </a-form-item>
    <a-form-item label="详细住址">
      <a-input v-model:value="state.detailAddress"></a-input>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }" class="form-btn row-whole">
      <a-button type="primary" @click="setSubmit">确认</a-button>
      <a-button style="margin-left: 10px" @click="setBack">返回</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { provinceData, cityData, regionData } from '../../../../constant/area'
import { useHandleAddress } from '../../../../controller/address'

export default defineComponent({
  setup() {

    const state = reactive({})
    const router = useRouter()
    const route = useRoute()
    const param = route.params.id

    // 子组件ref
    const space = ref()

    const { createAddress, updateAddress, getAddressById } = useHandleAddress()

    onMounted(async () => {
      if(param !== 'add') { Object.assign(state, await getAddressById(Number(param))) }
    })

    const setSubmit = async () => {
      const states = toRaw(state)
      delete states.createTime
      delete states.updateTime
      Object.assign(state, { 
        provinceName: space.value.state.provinceName, 
        cityName: space.value.state.cityName,
        regionName: space.value.state.regionName })
      const res = await (param === 'add' ? createAddress(states) : updateAddress(states))
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
      state,
      space
    }
  },
})
</script>

<style scoped>
.ant-form {
  margin-top: 100px;
}
</style>
