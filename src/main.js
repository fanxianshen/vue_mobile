import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

;(function(){
  var rem = document.createElement('script');
  rem.src = './rem.js';
  document.body.appendChild(rem)
})()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
