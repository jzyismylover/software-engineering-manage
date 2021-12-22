<template>
  <base-nav title="修改用户信息" />
  <a-form :label-col="labelCol" :wrapperCol="wrapperCol">
    <a-form-item label="用户名">
      <a-input></a-input>
    </a-form-item>
    <a-form-item label="昵称">
      <a-input></a-input>
    </a-form-item>
    <a-form-item label="用户密码">
      <a-input></a-input>
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
      <a-button type="primary" @click="onSubmit">确认</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">返回</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { provinceData, cityData, regionData } from '../../../constant/area'

export default defineComponent({
  setup() {

    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      provinceData,
      cityData,
      regionData
    }
  },
})
</script>

<style scoped>
.ant-form {
  margin-top: 100px;
}
</style>
