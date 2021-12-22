<template>
  <base-nav title="书本信息管理" />
  <div class="table">
    <a-table :columns="columns" :data-source="data" :pagination='{defaultPageSize: 6}'  bordered>
      <template #name="{ text }">
        <a>{{ text }}</a>
      </template>
      <template #operation="{ record }">
        <a-tag @click="handleShow(record)">查看</a-tag>
        <a-tag @click="handleUpdate(record)">修改</a-tag>
        <a-tag @click="handleDelete(record)">删除</a-tag>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Table, Tag } from 'ant-design-vue'

// 设置标题头
const columns = [
  {
    title: '书名',
    dataIndex: 'name',
    slots: { customRender: 'name' },
  },
  {
    title: '作者',
    // className: 'column-money',
    dataIndex: 'money',
  },
  {
    title: '定价',
    dataIndex: 'address',
  },
  {
    title: '出版社',
    dataIndex: 'address',
  },
  {
    title: '出版年',
    dataIndex: 'address',
  },
  {
    title: '出版社',
    dataIndex: 'address',
  },
  {
    title: '操作',
    slots: { customRender: 'operation' },
  }
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
    {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
    {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
    {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
      {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
      {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
        {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
        {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
        {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
  
];

export default defineComponent({
  components: {
    [Table.name]: Table,
    [Tag.name]: Tag
  },
  setup() {
    /*records存储的是每一行的记录*/
    const handleShow = (record: any) => {
      console.log(record)
    }
    const handleUpdate = () => {}
    const handleDelete= () => {}

    return {
      data,
      columns,
      handleShow,
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
</style>
