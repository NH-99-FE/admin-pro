import type { RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import { createRouter, createWebHashHistory } from 'vue-router'
import 'nprogress/nprogress.css' // Progress 进度条样式

export const aboutRouter = {
  path: '/about',
  name: 'about',
  component: () => import('@/views/about/index.vue'),
  meta: {},
  children: [],
} as RouteRecordRaw
// // 配置路由
// const routes:Array<RouteRecordRaw> = [{
//     path: '/',
//     name: 'home',
//     component: () => import('@/views/home/index.vue'),
//     meta: {},
//     children: []
// }]
// 组合路由信息
// 它可以将模块中全部内容导入并返回一个Record<string, any>对象
// eager: true表示立即加载模块
const modules: Record<string, any> = import.meta.glob(['./modules/*.ts'], {
  eager: true,
})

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
]
Object.keys(modules).forEach((key) => {
  const module = modules[key].default
  if (module) {
    routes.push(module)
  }
})

routes.push(aboutRouter)

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(async (_to, _from, next) => {
  NProgress.start()
  next()
})
router.afterEach((_to) => {
  NProgress.done()
})

export default router
