import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{ // 首页模板
    path: '/',
    name: 'main',
    component: () => import('../views/Home'),
    redirect: '/rank',
    children: [{
      path: '/rank',
      name: 'rank',
      component: () => import('../components/rankList') // 寻宝页
    }, {
      path: '/gift',
      name: 'gift',
      component: () => import('../components/sendGift') // 榜单页
    }, {
      path: '/surprise',
      name: 'surprise',
      component: () => import('../components/surprise') // 兑换页
    }]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '*',
    redirect: '/rank'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router