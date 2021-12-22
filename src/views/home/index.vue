<template>
  <div class="home">
    <base-menu />
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseMenu from '../../layout/menu/index.vue'

export default defineComponent({
  components: {
    BaseMenu
  },
  setup() {
    
  },
})
</script>

<style>
.home {
  display: flex;
  height: 100%;
}
</style>
