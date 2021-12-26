<template>
  <!--左侧菜单栏-->
  <div class="menu">
    <img class="menu-avatar" src="../../assets/image/avatar.jpg" alt="">
    <div class="menu-blank"></div>
    <div class="menu-item" @click="setBookManage">书本管理</div>
    <div class="menu-item" @click="setCategoryManage">分类管理</div>
    <div class="menu-item" @click="setUserManage">用户信息管理</div>
    <div class="menu-item" @click="setAddressManage">用户地址管理</div>
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
    const setAddressManage = () => { router.push('/home/address') }

    return {
      setBookManage,
      setCategoryManage,
      setUserManage,
      setAddressManage
    }
  },
})
</script>


<style lang="scss">
@import url(../../assets/scss/menu.scss);
</style>