import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import Index from '@/pages/index'

export default new Router({
    routes: [{
        path: '/',
        name: 'Index',
        component: Index
    }]
})


Vue.use(Router)