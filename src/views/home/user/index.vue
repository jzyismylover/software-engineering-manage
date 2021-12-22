<template>
  <base-nav title="用户信息管理" />
  <a-table :columns="columns" :data-source="data" bordered>
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>
  </a-table>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Table } from 'ant-design-vue'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    slots: { customRender: 'name' },
  },
  {
    title: 'Cash Assets',
    className: 'column-money',
    dataIndex: 'money',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
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
];

/* 
  展示用户的用户名等
  逻辑简单而且容易实现
*/

export default defineComponent({
  components: {
    [Table.name]: Table
  },
  setup() {
    return {
      data,
      columns,
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
