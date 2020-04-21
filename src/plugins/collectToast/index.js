import Toast from './toast';

let VueToast;
let currentToast;

function install(Vue) {
  if (VueToast) return;
  VueToast = Vue.extend(Toast);
  Vue.prototype.$toast = function (message,duration) {
    if(!currentToast){
      currentToast = new VueToast();
      currentToast.$mount();
      document.body.appendChild(currentToast.$el);
    }
    currentToast.show(message,duration);
  }
}

export default {
  install
}