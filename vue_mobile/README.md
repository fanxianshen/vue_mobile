# my-project

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

# [vue3的配置和踩坑（安装、配置vue-router、px转rem、热更新、less、axios）](https://www.cnblogs.com/miaSlady/p/11492074.html)

一：安装

1.vue create 工程名（注vue3： build没了、config没了，3.0的安装项目时自动下载node-model。）

2.在根目录下创建一个vue.config.js

```
function getIPAdress(){
  var interfaces = require('os').networkInterfaces();
  for(var devName in interfaces){
    var iface = interfaces[devName];
    for(var i=0;i<iface.length;i++){
      var alias = iface[i];
      if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
        return alias.address;
      }
    }
  }
}
module.exports = {
  // baseUrl: process.env.NODE_ENV === 'production' ? '/online/' : '/',
    publicPath:'./',//vue-cli3.3+新版本使用
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: 'static',
  // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
  // outputDir: 'dist',
  // pages:{ type:Object,Default:undfind }
    //生产环境是否生成 sourceMap 文件，一般情况不建议打开
  productionSourceMap: false,
  css:{
        // 是否使用css分离插件
        extract: true,
        // 开启 CSS source maps，一般不建议开启
        sourceMap: false,
    },
  devServer: {
    port: 1818, // 端口号
    host: getIPAdress(),
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    compress: true,//配置热更新
    proxy: {
      '/api': {
        target: 'http://image.hn8718.com:8777', //API服务器的地址
        ws: true, //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {  //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          '^/api': ''
        }
      }
    },//跨域
  },
 
} 


　或者：

module.exports = {

    baseUrl: process.env.NODE_ENV === 'production' ? '/online/' : '/',
    // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
    // outputDir: 'dist',
    // pages:{ type:Object,Default:undfind }
    devServer: {
        port: 8888, // 端口号
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
        proxy: {
            '/api': {
                target: '<url>',
                ws: true,
                changeOrigin: true
            },
            '/foo': {
                target: '<other_url>'
            }
        },  // 配置多个代理
    }
}
```

二、配置vue-router

cnpm install vue-router --save

1.在src增加router文件加入js

 ![img](https://img2018.cnblogs.com/blog/1286543/201909/1286543-20190909151151487-1919796171.png)

 2.进行路由配置（图+代码）

![img](https://img2018.cnblogs.com/blog/1286543/201909/1286543-20190909151253353-554302848.png)

 

 

```
import Vue from 'vue'

import Router from 'vue-router'

Vue.use(Router)

const Routes = [

  { path: '*', redirect: '/welcome' },

  {

    path: '/welcome',

    name: '欢迎页面',

    component:() => import('@/views/demo/pages/welcome')

  },

  {

    path: '/page1',

    name: 'page1',

    component: () => import('@/views/demo/pages/page1')

  },

]

const createRouter = () => new Router({

  routes: Routes

})

const router = createRouter()

export default router；

```



 

3.在main.js中引入

 ![img](https://img2018.cnblogs.com/blog/1286543/201909/1286543-20190911114618773-894901019.png)

4.修改app.vue

　　

```
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
 
<script>
import HelloWorld from './components/HelloWorld.vue'
 
export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
 
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
```

 

三、px转rem

1.cnpm install `postcss-px2rem`

2.在public中添加rem.js

```
// 基准大小
const baseSize = 32
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 750
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function() {
  setRem()
}
```

3.在vue.config.js中添加（图加代码）

![img](https://img2018.cnblogs.com/blog/1286543/201909/1286543-20190909151620426-1535926008.png)

```
const px2rem = require('postcss-px2rem')

const postcss = px2rem({
  remUnit: 32   //基准大小 baseSize，需要和rem.js中相同
})

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  }
}
```

```
4.在main.js中添加
```

```
;(function(){

  var rem = document.createElement('script');

  rem.src = './rem.js';

  document.body.appendChild(rem)

})()

```

四、热更新

 ![img](https://img2018.cnblogs.com/blog/1286543/201909/1286543-20190909152242054-389793389.png)

 五、配置less

1.cnpm install less less-loader --save-dev

六、配置axios

1.cnpm install axios --save

2.为了解决跨域问题，我配置了withCredential。

```
import axios from 'axios'

import {Message} from 'element-ui'

axios.defaults.withCredentials=true; //请求携带cookie

var baseURL='http://192.168.0.169:8080/api';//王帅

const instance = axios.create({

   baseURL

 })

instance.interceptors.response.use(response => {

   if(response.data.code==401){

    // toLogin();

    return;

   }

   return response;

 })

 export let myAxiosGet = (url, params)=>{

  return new Promise((resolve, reject) => {

    instance.get(url, {params,withCredentials:true}).then(function (response) { 

      resolve(response.data)

      if(!response.data.success){

        Message({

          message: response.data.message,

          type: 'error'

        });

      }

    })

    .catch(function (err) {

      Message({

        message: '获取信息失败',

        type: 'error'

      });

      reject(err);

    })

  })

}

export let myAxios = (method,url, params)=>{

  return new Promise((resolve, reject) => {

    instance({

      method: method,

      url,

      data: params,

    },{

      withCredentials:true

    })

    .then(function (response) {

      resolve(response.data);

      if(!response.data.success){

        Message({

          message: response.data.message,

          type: 'error'

        });

      }

    })

    .catch(function (err) {

      Message({

        message: '获取信息失败',

        type: 'error'

      });

      reject(err);
    });
  })
}

```

