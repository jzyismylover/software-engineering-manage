<template>
  <base-nav title="类别信息管理" />
  <a-button class="btn--create" type="primary" @click="handleAdd">新增</a-button>
  <div class="table">
    <a-table :columns="columns" :data-source="data" :pagination="{ defaultPageSize: 9 }" bordered rowKey="categoryId">
      <template #name="{ text }">
        <a>{{ text }}</a>
      </template>
      <template #operation="{ record }">
        <a-tag @click="handleUpdate(record)" color="blue">修改</a-tag>
        <a-tag @click="handleDelete(record)" color="red">删除</a-tag>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { Table, Tag } from 'ant-design-vue'
import { useRouter } from 'vue-router';
import { useHandleCategory } from '../../../controller/category';

// 设置标题头
const columns = [
  {
    title: '类别名',
    dataIndex: 'categoryName',
    slots: { customRender: 'name' },
  },
  {
    title: '类别等级',
    dataIndex: 'categoryLevel',
  },
  {
    title: '操作',
    slots: { customRender: 'operation' },
  }
];


export default defineComponent({
  components: {
    [Table.name]: Table,
    [Tag.name]: Tag
  },
  setup() {
    const router = useRouter()

    const { getCategorys, deleteCategorys } = useHandleCategory()
    const data = ref()
    onMounted(async () => {
      data.value = await getCategorys()
    }) 
    
    // 跳转更新
    const handleUpdate = (record: any) => {
      router.push('/home/category-update/' + record.categoryId)
    }

    // 确定删除记录(后续可新增确认机制)
    const handleDelete = async (record: any) => {
      data.value = await deleteCategorys({ id: record.categoryId, name: record.categoryName })
    } 

    // 新增
    const handleAdd = () => {
      router.push('/home/category-update/add')
    }

    return {
      data,
      columns,
      handleUpdate,
      handleDelete,
      handleAdd,
    };
  },
});
</script>
