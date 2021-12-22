<template>
  <base-nav title="书本信息管理" />
  <a-button class="btn--create" type="primary" @click="handleAdd">新增</a-button>
  <div class="table">
    <a-table :columns="columns" :data-source="data" :pagination="{ defaultPageSize: 9 }" rowKey='id' bordered>
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
import { useHandleBook  } from '../../../controller/book'

// 设置标题头
const columns = [
  {
    title: '书名',
    dataIndex: 'bookName',
    slots: { customRender: 'name' },
  },
  {
    title: '作者',
    // className: 'column-money',
    dataIndex: 'author',
  },
  {
    title: '定价',
    dataIndex: 'originalPrice',
  },
  {
    title: '出版社',
    dataIndex: 'publishingHouse',
  },
  {
    title: '出版年',
    dataIndex: 'yearOfPublication',
  },
  {
    title: '评分',
    dataIndex: 'score'
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

    const { createBooks, deleteBooks, updateBooks, getBooks }  = useHandleBook()

    const data = ref()
    onMounted(async () => {
      data.value = await getBooks()
    })

    /*records存储的是每一行的记录*/
    const handleUpdate = (record: any) => {
      console.log(record)
      router.push('/home/book-update/' + record.id)
    }
    const handleDelete = () => { }

    const handleAdd = () => {
      router.push('/home/book-update/add')
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
<style scoped>
.ant-tag {
  cursor: pointer;
}

</style>

<style>
.btn--create {
  position: absolute;
  top: 25px;
  right: 50px;
}
.btn--create::before {
  clear: both
}
</style>
