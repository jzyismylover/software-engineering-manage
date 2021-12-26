<template>
  <base-nav title="用户地址管理" />
  <a-button class="btn--create" type="primary" @click="handleAdd">新增</a-button>
  <div class="table">
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="{ defaultPageSize: 9 }"
      bordered
      rowKey="userId"
    >
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
import { useHandleUser } from '../../../../controller/user';
import { useHandleAddress } from '../../../../controller/address';

// 设置标题头
const columns = [
  {
    title: '用户名',
    dataIndex: 'userName',
    slots: { customRender: 'name' },
  },
  {
    title: '省',
    dataIndex: 'provinceName',
  },
  {
    title: '市',
    dataIndex: 'cityName',
  },
  {
    title: '区',
    dataIndex: 'regionName',
  },
  {
    title: '电话号码',
    dataIndex: 'userPhone',
  },
  {
    title: '详细住址',
    dataIndex: 'detailAddress',
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

    const { getAddress, deleteAddress } = useHandleAddress()

    const data = ref();
    onMounted(async () => {
      data.value = await getAddress()
    })

    const handleUpdate = (record: any) => {
      console.log(record)
      router.push('/home/address-update/' + record.userId)
    }

    const handleDelete = async (record: any) => {
      data.value = await deleteAddress(record.userId)
    }

    const handleAdd = () => {
      router.push('/home/address-update/add')
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
