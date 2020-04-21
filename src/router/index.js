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
        title: "累储返金币"
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
    meta: {
      title: "关于"
    },
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
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
});



export default router