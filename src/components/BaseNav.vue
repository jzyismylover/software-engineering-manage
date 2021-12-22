<template>
  <!--通用的只能小标题的组件-->
  <div class="Nav-Component">
    <Row>
      <Col :offset="1" :span="23" class="flex-center">
        {{ title }}
      </Col>
    </Row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Row, Col } from 'ant-design-vue'

export default defineComponent({
  name: 'BaseNav',
  components: {
    Row,
    Col
  },
  props: {
    title: {
      type: String,
      default: '',
    }
  },
})
</script>

<style scoped>
.Nav-Component {/**设置竖线*/
  width: 100%;
  margin: 1rem 0;
  height: 2rem;
  border-left: 4px rgb(0, 136, 255) solid;
  font-size: 1.2rem;
  color: rgb(0, 157, 255);
  font-weight: bold;
}
.flex-center {/**设置内部配置*/
  display: flex;
  /* align-content: center; */
  height: 100%;
}
</style>
