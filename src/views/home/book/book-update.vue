<template>
  <base-nav title="修改书本信息" />
  <a-form ref="formRef" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item class="row-half" label="封面图片地址">
      <a-input v-model:value="formState.imgUrl" />
    </a-form-item>
    <a-form-item class="row-half" label="书名">
      <a-input v-model:value="formState.bookName" />
    </a-form-item>
    <a-form-item class="row-half" label="作者">
      <a-input v-model:value="formState.author" />
    </a-form-item>
    <a-form-item class="row-half" label="译者">
      <a-input v-model:value="formState.translator" />
    </a-form-item>
    <a-form-item class="row-half" label="出版社">
      <a-input v-model:value="formState.publishingHouse" />
    </a-form-item>
    <a-form-item class="row-half" label="出版年">
      <a-input v-model:value="formState.yearOfPublication" />
    </a-form-item>
    <a-form-item class="row-half" label="原价">
      <a-input v-model:value="formState.originalPrice" />
    </a-form-item>
    <a-form-item class="row-half" label="当前价">
      <a-input v-model:value="formState.currentPrice" />
    </a-form-item>
    <a-form-item class="row-half" label="IBSN">
      <a-input v-model:value="formState.isbn" />
    </a-form-item>
    <a-form-item class="row-half" label="评价">
      <a-input v-model:value="formState.score" />
    </a-form-item>
    <a-form-item class="row-half" label="简介">
      <a-textarea
        v-model:value="formState.briefIntroduction"
        :auto-size="{ minRows: 2, maxRows: 3 }"
      />
    </a-form-item>
    <a-form-item class="row-whole" label="作者简介">
      <a-textarea
        v-model:value="formState.authorIntroduction"
        :auto-size="{ minRows: 2, maxRows: 3 }"
      />
    </a-form-item>
    <a-form-item class="row-whole" label="内容简介">
      <a-textarea v-model:value="formState.catalog" :auto-size="{ minRows: 2, maxRows: 3 }" />
    </a-form-item>
    <a-form-item class="row-whole" label="标签">
      <active-tag v-model:tags="formState.label" />
    </a-form-item>
  </a-form>
  <div class="btn">
    <a-button type="primary" @click="onSubmit">确认</a-button>
    <a-button style="margin-left: 10px" @click="setBack">返回</a-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRaw } from 'vue';
import { Tag, Textarea } from 'ant-design-vue'
import router from '../../../router';
import { useRoute } from 'vue-router';
import { useHandleBook } from '../../../controller/book'

/*
  设定规则书名、作者、出版社、定价、简介一定要填写
*/

export default defineComponent({
  components: {
    [Tag.name]: Tag,
    [Textarea.name]: Textarea
  },
  setup() {
    const route = useRoute()
    const { getBookByID, updateBooks, createBooks } = useHandleBook()
    const isAdd = ref(route.params.id)

    /*新增和修改共用一套页面 => 通过判定一个变量判别是add还是update*/
    onMounted(async () => {
      if (isAdd.value !== 'add') {
        const res = await getBookByID(route.params.id as string)
        const labels = res.label ? res.label.split('/') : []
        Object.assign(formState, res, { label: labels.slice(0, labels.length - 1) })
      }
    })

    const formRef = ref();
    const formState = reactive({});

    const onSubmit = async () => {
      /*具体的逻辑可以选择一些必选项目来进行 rules 验证*/
      const res = await (isAdd.value === 'add' ? setAdd() : setUpdate())
      if(res.code) router.go(-1)
    };

    // 提交的时候合并 tags
    const setUpdate = () => {
      const state = toRaw(formState)
      //移除不应该传的字段
      delete state.createTime
      delete state.updateTime
      return updateBooks(toRaw(Object.assign(state, { label: state.label.join('/') + '/' })))
    }
    const setAdd = () => {
      return createBooks(toRaw(formState))
    }

    const setBack = () => {
      router.go(-1)
    }
    return {
      formRef,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formState,
      onSubmit,
      setBack,
    };
  },
});
</script>


<style scoped>
.ant-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  margin-top: 60px;
}
.row-half {
  width: 50%;
}
.row-whole {
  width: 50%;
}

.btn {
  width: 100%;
  text-align: center;
}
</style>
