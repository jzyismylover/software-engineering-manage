<template>
  <template v-for="(tag, index) in tags" :key="tag">
    <a-tooltip v-if="tag.length > 20" :title="tag">
      <a-tag :closable="index !== 0" @close="handleClose(tag)">
        {{ `${tag.slice(0, 20)}...` }}
      </a-tag>
    </a-tooltip>
    <a-tag v-else :closable="index !== 0" @close="handleClose(tag)">
      {{ tag }}
    </a-tag>
  </template>
  <a-input
    v-if="inputVisible"
    ref="inputRef"
    type="text"
    size="small"
    :style="{ width: '78px' }"
    v-model:value="inputValue"
    @blur="handleInputConfirm"
    @keyup.enter="handleInputConfirm"
  />
  <a-tag v-else @click="showInput" style="background: #fff; border-style: dashed">
    <plus-outlined />
    New Tag
  </a-tag>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs, nextTick, toRaw, onMounted, watchEffect } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { Tooltip, Tag } from 'ant-design-vue'

export default defineComponent({
  name: 'ActiveTag',
  components: {
    PlusOutlined,
    [Tooltip.name]: Tooltip,
    [Tag.name]: Tag
  },
  props: {
    tags: {
      type: Array,
      default() { return [] }
    }
  },
  emits: ['update:tags'],
  setup(props, { emit }) {
    const inputRef = ref();

    const state = reactive({
      inputVisible: false,
      inputValue: '',
    });

    // 移除某个 tag
    const handleClose = (removedTag: string) => {
      const tags = props.tags.filter(tag => tag !== removedTag);
      emit('update:tags', tags)
    };
    
    // 触发文本框显示
    const showInput = () => {
      state.inputVisible = true;
      nextTick(() => {
        inputRef.value.focus();
      });
    };

    // 确认新增 tag
    const handleInputConfirm = () => {
      const inputValue = state.inputValue;
      let tags = props.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      emit('update:tags', tags)
      Object.assign(state, {
        tag: tags,
        inputVisible: false,
        inputValue: '',
      });
    };

    return {
      ...toRefs(state),
      handleClose,
      showInput,
      handleInputConfirm,
      inputRef,
    };
  },
});
</script>

