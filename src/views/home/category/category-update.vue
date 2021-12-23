<template>
  <base-nav title="修改分类信息" />
  <a-form :label-col="labelCol" :wrapperCol="wrapperCol">
    <a-form-item label="分类名称">
      <a-input v-model:value="categoryName"></a-input>
    </a-form-item>
    <a-form-item label="分类父标签">
      <a-space>
        <a-select v-model:value="selectVal" style="width: 120px">
          <a-select-option
            v-for="item in data"
            :key="item.categoryId"
            :value="item.categoryName"
          >{{ item.categoryName  }}</a-select-option>
        </a-select>
      </a-space>
    </a-form-item>
    <a-form-item label="分类级别">
        <a-select v-model:value="categorylevel" style="width: 120px">
          <a-select-option value="1">1</a-select-option>
          <a-select-option value="2">2</a-select-option>
        </a-select>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 14, offset: 4 }" class="form-btn row-whole">
      <a-button type="primary" @click="setSubmit">确认</a-button>
      <a-button style="margin-left: 10px" @click="setBack">返回</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRaw, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHandleCategory } from '../../../controller/category'
import { Space, Select } from 'ant-design-vue'

export default defineComponent({
  components: {
    [Space.name]: Space,
    [Select.name]: Select,
    'a-select-option': Select.Option
  },
  setup() {
    const route = useRoute()
    const router = useRouter()


    const { getCategorys, updateCategorys, createCategorys } = useHandleCategory()

    const data = ref()
    const selectVal = ref() 

    const record = reactive({
      categorylevel: '1',
      categoryName: '',
      parentId: 0,
    })

    onMounted(async () => {
      data.value = await getCategorys()
      handleCategory()
      selectVal.value = data.value[0].categoryName
    })

    // 类别数据清洗
    const handleCategory = () => {
      if(route.params.id === 'add') return

      data.value = data.value.filter(item => {
        if (item.categoryId == route.params.id) {
          record.categoryName = item.categoryName
        }
        if (item.categoryLevel <= 1) return true
        else return false
      })
    }

    // 根据记录获取某个父类的 parentId
    const getParentId = () => {
      data.value.forEach(item => {
        if(item.categoryName === record.categoryName) {
          record.parentId = item.categoryId
        }
      })
    }

    // 更新
    const setUpdate = async () => { 
      if(record.categorylevel === '1') record.parentId = 0
      Object.assign(record, { categoryId: route.params.id })
      updateCategorys(toRaw(record))
    }
    const setAdd = async () => {
      getParentId()
      await createCategorys(toRaw(record))
    }

    // 提交逻辑
    const setSubmit = () => {
      Object.assign(record, { categoryLevel: Number(record.categorylevel) })
      if (route.params.id === 'add') {
        setAdd()
      } else {
        setUpdate()
      }
      router.go(-1)
    }
    const setBack = () => {
      router.go(-1)
    }

    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 10 },
      ...toRefs(record),
      data,
      selectVal,
      setSubmit,
      setBack,
    }
  },
})
</script>

<style scoped>
.ant-form {
  margin-top: 100px;
}
</style>
