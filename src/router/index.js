import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Routes = [
  { path: '*', redirect: '/welcome' },
  {
    path: '/welcome',
    name: '欢迎页面',
    component:() => import('@//components/HelloWorld.vue')
  },

]

const createRouter = () => new Router({
  routes: Routes
})

const router = createRouter()

export default router;
