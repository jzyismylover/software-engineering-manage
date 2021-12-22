<template>
  <base-nav title="修改分类信息" />
  <a-form :label-col="labelCol" :wrapperCol="wrapperCol">
    <a-form-item label="分类名称">
      <a-input></a-input>
    </a-form-item>
    <a-form-item label="分类父标签">
      <a-input></a-input>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {

    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    }
  },
})
</script>

<style scoped>
.ant-form {
  margin-top: 100px;
}
</style>
