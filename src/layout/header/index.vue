<template>
  <ALayoutHeader class="layout-header">
    <div class="left-options">
      <span @click="() => $emit('update:collapsed', !collapsed)" class="menu-fold">
        <component :is="collapsed ? 'menu-unfold-outlined' : 'menu-fold-outlined'" />
    </span>
    </div>
    <div class="right-options">
      <template v-for="item in iconList" :key="item.icon.name">
        <a-tooltip placement="bottom">
          <template #title>
            <span>{{ item.tips }}</span>
          </template>
          <component v-on="item.eventObject || {}" :is="item.icon" />
        </a-tooltip>
      </template>
    <!--切换全屏-->
      <!-- <component :is="fullscreenIcon" @click="toggleFullScreen" /> -->
      <Dropdown>
        <a-avatar>jzyismylover</a-avatar>
        <template v-slot:overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;">个人中心</a>
            </a-menu-item>
            <a-menu-divider/>
            <a-menu-item>
              <a @click.prevent="doLogout"><poweroff-outlined /> 退出登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </Dropdown>
    </div>
  </ALayoutHeader>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, createVNode} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import components from "./component";
import {message, Modal} from 'ant-design-vue'
import {QuestionCircleOutlined} from '@ant-design/icons-vue'

export default defineComponent({
  name: "PageHeader",
  components: {...components },
  props: {
    collapsed: {
      type: Boolean,
    }
  },
  setup() {
    /*const state = reactive({
      username: store.getters.userInfo.username,
      fullscreenIcon: 'FullscreenOutlined'
    })*/

    const router = useRouter()
    const route = useRoute()

    // 切换全屏图标
    // const toggleFullscreenIcon = () => (state.fullscreenIcon = document.fullscreenElement !== null ? 'FullscreenExitOutlined' : 'FullscreenOutlined')

    // 监听全屏切换事件
    // document.addEventListener("fullscreenchange", toggleFullscreenIcon)

    // 全屏切换
    const toggleFullScreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }

    const doLogout = () => {}

    // 图标列表
    const iconList = [
      {
        icon: 'SearchOutlined',
        tips: '搜索'
      },
      {
        icon: 'GithubOutlined',
        tips: 'github',
        eventObject: {
          click: () => window.open('https://github.com/buqiyuan/vue3-antd')
        }
      },
      {
        icon:  'SettingOutlined',
        tips: '网站设置'
      },
      {
        icon: 'LockOutlined',
        tips: '锁屏',
        eventObject: {
          // click: () => store.commit('lockscreen/setLock', true)
        }
      },
    ]

    return {
      // ...toRefs(state),
      iconList,
      toggleFullScreen,
      doLogout,
      route
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #fff;
  padding: 0;
  height: 64px;

  .left-options {
    display: flex;
    align-items: center;

    .menu-fold {
      padding: 0 24px;
      cursor: pointer;
    }
  }

  .right-options {
    display: flex;
    align-items: center;

    > * {
      margin-right: 20px;
      cursor: pointer;
    }
  }
}
</style>
