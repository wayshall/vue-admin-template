import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
// import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单

// https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%AE%88%E5%8D%AB

router.beforeEach((to, from, next) => {
  NProgress.start()
  const isLogin = store.getters.login
  console.log(`to: ${to.path}, isLogin: ${isLogin}`)
  if (isLogin === true) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      const username = store.getters.username
      if (!username || username.length < 1) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          next({ ...to, replace: true })
          // sotre.dispatch('getRouters').then(res => {
          //   router.addRoutes(store.getters.roleRouters)
          //   next({ ...to, replace: true }) // hack方法确保addRoutes已完成
          // })
        }).catch((err) => {
          console.log('get user info error:' + e)
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
