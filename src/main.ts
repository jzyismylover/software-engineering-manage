import { createApp } from 'vue'
import App from './App.vue'
import { setupAntd } from './plugin/antd'
import router, { setupRouter } from './router'
import setupComponent from './components/index'

const app = createApp(App)

// 注册全局常用的ant-design-vue组件
setupAntd(app)
// 挂载路由
setupRouter(app)
// 注册自定义全局组件
setupComponent(app)

router.isReady().then(() => app.mount('#app'))
