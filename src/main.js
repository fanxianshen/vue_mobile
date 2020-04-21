import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/style/reset.css';
import mizToast from './plugins/mizToast';
import api from './api' // 导入api接口
require('./mock');

Vue.config.productionTip = false
Vue.use(mizToast);

Vue.prototype.$api = api; // 将api挂载到vue的原型上
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
