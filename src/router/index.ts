import { message } from 'ant-design-vue'
import { App } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {/*登录*/
    path: '/login',
    name: 'Login',
    meta: {
      Login: false
    },
    component: () => import('../views/user/Login.vue')
  },
  {/*注册*/
    path: '/regist',
    name: 'Regist',
    component: () => import('../views/user/Login.vue')
  },
  {/*首页*/
    path: '/home',
    name: 'Home',
    meta: {
      Login: true
    },
    component: () => import('../views/home/index.vue'),
    children: [
      {/*书籍管理*/
        path: 'book',
        name: 'Book',
        component: () => import('../views/home/book/index.vue')
      },
      {/*类别管理*/
        path: 'category',
        name: 'Category',
        component: () => import('../views/home/category/index.vue')
      },
      {/*用户管理*/
        path: 'user',
        name: 'User',
        component: () => import('../views/home/user/index.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

/*路由拦截器设置 */
router.beforeEach((from, to, next) => {
  if(from.meta.Login) {//必须经过登录操作
    message.warn('未进行有效登录！')
    next(false)
  } else {
    next()
  }
})


export function setupRouter(app: App) {
  app.use(router)
}

export default router