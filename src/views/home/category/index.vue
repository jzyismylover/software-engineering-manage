<template>
  <base-nav title="类别信息管理" />
  <a-button class="btn--create" type="primary" @click="handleAdd">新增</a-button>
  <div class="table">
    <a-table :columns="columns" :data-source="data" :pagination="{ defaultPageSize: 9 }" bordered>
      <template #name="{ text }">
        <a>{{ text }}</a>
      </template>
      <template #operation="{ record }">
        <a-tag @click="handleUpdate(record)">修改</a-tag>
        <a-tag @click="handleDelete(record)">删除</a-tag>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
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
    // className: 'column-money',
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

    const { getCategorys } = useHandleCategory()
    const data = ref()
    onMounted(async () => {
      data.value = await getCategorys()
    }) 
    
    // 跳转更新
    const handleUpdate = (record: any) => {
      console.log(record)
      router.push('/home/book-update')
    }

    // 确定删除记录
    const handleDelete = (record: any) => { }

    // 新增
    const handleAdd = () => {}

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
<style>
th.column-money,
td.column-money {
  text-align: right !important;
}
.btn--create {
  position: absolute;
  top: 25px;
  right: 50px;
}
.btn--create::before {
  clear: both
}
</style>
