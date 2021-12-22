<template>
  <!--左侧菜单栏-->
  <div class="menu">
    <img class="menu-avatar" src="../../assets/image/avatar.jpg" alt="">
    <div class="menu-blank"></div>
    <div class="menu-item" @click="setBookManage">书本管理</div>
    <div class="menu-item" @click="setCategoryManage">分类管理</div>
    <div class="menu-item" @click="setUserManage">用户管理</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {  useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const setBookManage = () => { router.push('/home') }
    const setCategoryManage = () => { router.push('/home/category') }
    const setUserManage = () => { router.push('/home/user') }

    return {
      setBookManage,
      setCategoryManage,
      setUserManage
    }
  },
})
</script>


<style lang="scss">
@import url(../../assets/scss/menu.scss);
</style>