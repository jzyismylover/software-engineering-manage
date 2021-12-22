<template>
  <base-nav title="用户信息管理" />
  <a-button class="btn--create" type="primary" @click="handleAdd">新增</a-button>
  <div class="table">
    <a-table :columns="columns" :data-source="data" :pagination="{ defaultPageSize: 9 }" bordered rowKey="userId">
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
    title: '电话号码',
    // className: 'column-money',
    dataIndex: 'loginName',
  },
  {
    title: '所在地（省市区）',
    dataIndex: 'address',
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
    
    const { getUsers, deleteUsers, updateUsers, createUsers } = useHandleUser()

    const data = ref();
    onMounted(async () => {
      data.value = await getUsers()
    })

    /*records存储的是每一行的记录*/
    const handleShow = (record: any) => {
      console.log(record)
      router.push('/home/user-update')
    }
    const handleUpdate = (record: any) => {
      console.log(record)
      router.push('/home/user-update')
    }
    const handleDelete = (record: any) => { }

    const handleAdd = () => {}

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
