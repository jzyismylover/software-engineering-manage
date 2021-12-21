import { createApp } from 'vue'
import App from './App.vue'
import { setupAntd } from './plugin/antd'
import router, { setupRouter } from './router'

const app = createApp(App)

// 注册全局常用的ant-design-vue组件
setupAntd(app)
// 挂载路由
setupRouter(app)

router.isReady().then(() => app.mount('#app'))
