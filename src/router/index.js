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
      meta: {
        title: "排行榜"
      },
      component: () => import('../components/rankList')
    }, {
      path: '/gift',
      name: 'gift',
      meta: {
        title: "连储送豪礼"
      },
      component: () => import('../components/sendGift')
    }, {
      path: '/surprise',
      name: 'surprise',
      meta: {
        title: "首储大惊喜"
      },
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
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to, '前置第一个参数')
  console.log(from, '前置第二个参数')
  console.log(next, '前置第三个参数')
  next();
});



export default router