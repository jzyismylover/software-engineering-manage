<template>
  <base-nav title="用户信息管理" />
  <a-button class="btn--create" type="primary" @click="handleAdd">新增</a-button>
  <div class="table">
    <a-table :columns="columns" :data-source="data" :pagination="{ defaultPageSize: 9 }" bordered rowKey="userId">
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
import { defineComponent, onMounted, ref } from 'vue';
import { Table, Tag } from 'ant-design-vue'
import { useRouter } from 'vue-router';
import { useHandleUser } from '../../../controller/user';

// 设置标题头
const columns = [
  {
    title: '用户名',
    dataIndex: 'loginName',
    slots: { customRender: 'name' },
  },
  {
    title: '密码',
    dataIndex: 'passwordMd5',
  },
  {
    title: '昵称',
    // className: 'column-money',
    dataIndex: 'nickName',
  },
  {
    title: '详细住址',
    dataIndex: 'address',
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
    
    const { getUsers, deleteUsers } = useHandleUser()

    const data = ref();
    onMounted(async () => {
      data.value = await getUsers()
    })

    const handleUpdate = (record: any) => {
      console.log(record)
      router.push('/home/user-update/' + record.userId)
    }
    
    const handleDelete = async (record: any) => {
      data.value = await deleteUsers(record.userId)
    }

    const handleAdd = () => {
      router.push('/home/user-update/add')
    }

    return {
      data,
      columns,
      handleAdd,
      handleUpdate,
      handleDelete,
    };
  },
});
</script>
