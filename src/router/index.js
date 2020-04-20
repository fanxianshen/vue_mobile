import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Routes = [{ // 首页模板
    path: '/',
    name: 'index',
    component: () => import('../pages/index'),
    redirect: '/rank',
    children: [{
      path: '/rank',
      name: 'rank',
      component: () => import('../components/rankList')
    }, {
      path: '/gift',
      name: 'gift',
      component: () => import('../components/sendGift')
    }, {
      path: '/surprise',
      name: 'surprise',
      component: () => import('../components/surprise')
    }]
  },
  {
    path: '*',
    redirect: '/rank'
  }
]

const createRouter = () => new Router({
  routes: Routes
})

const router = createRouter()

export default router;
