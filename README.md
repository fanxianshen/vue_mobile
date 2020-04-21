# vue_project

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

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



# VUE项目中使用MOCK

自从有了mockjs，我们前端工程师再也不用等后端人员开发好之后再测数据了，因为mockjs可以拦截ajax请求，有了mockjs我们可以模拟后台返回数据，以方便的进行一系列的操作。接下来就介绍一下在项目中如何使用mockjs。

首先安装mockjs

```
npm install mockjs
```

我们可以使用数据模板生成模拟数据。

```
Mock.mock( rurl?, rtype?, template ) )
// 或者
Mock.mock( rurl, rtype, function( options ) )
```

> **Mock.mock( rurl, rtype, template )**
> 表示当拦截到rurl和rtype的ajax请求时，将根据数据模板template生成模拟数据，并作为响应数据返回。

> **Mock.mock( rurl, rtype, function( options ) )**
> 记录用于生成响应数据的函数。当拦截到匹配 rurl 和 rtype 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回。

其中：

- **rurl 可选**
  表示要拦截的url，可以使字符串，也可以是正则
- **rtype 可选**
  表示要拦截的ajax请求方式，如get、post
- **template 可选**
  数据模板，可以是对象也可以是字符串
- **function(option) 可选**
  表示用于生成响应数据的函数

参数介绍完，就该说说怎么使用了

> 在我们的项目中，是直接注册所有的mock服务，所以我们只需要按照一定的格式编写mock即可。

首先在mock文件夹下创建index.js文件，这里就是我们注册所有mock服务的地方

```
// 首先引入Mock
const Mock = require('mockjs');

// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: '200-600'
});

let configArray = [];

// 使用webpack的require.context()遍历所有mock文件
const files = require.context('.', true, /\.js$/);
files.keys().forEach((key) => {
  if (key === './index.js') return;
  configArray = configArray.concat(files(key).default);
});

// 注册所有的mock服务
configArray.forEach((item) => {
  for (let [path, target] of Object.entries(item)) {
    let protocol = path.split('|');
    Mock.mock(new RegExp('^' + protocol[1]), protocol[0], target);
  }
});
```

服务注册好之后，在main.js中引入

```
// main.js
require('./mock');
```

在mock文件夹下随便创建一个文件demoList.js
在该文件中，我们可以按照index注册服务的格式来写我们的mock

```
let demoList = [{
        id: 1,
        name: 'zs',
        age: '23',
        job: '前端工程师'
    },{
        id: 2,
        name: 'ww',
        age: '24',
        job: '后端工程师'
    }]

export default {
    'get|/parameter/query':  option => {
    return {
      status: 200,
      message: 'success',
      data: demoList
    };
  }
}
```

当我们在页面发起了ajax请求，路径是'/parameter/query'，并且请求方式是get时，就会返回我们写好的mock数据。

我们也可以使用template返回

```
let demoList = {
    status: 200,
    message: 'success',
    data: [{
        id: 1,
        name: 'zs',
        age: '23',
        job: '前端工程师'
    },{
        id: 2,
        name: 'ww',
        age: '24',
        job: '后端工程师'
    }]
}
export default {
    'get|/parameter/query': demoList
}
```

当然，当我们想要展示大量数据时，不可能一个一个的写，那样又费时又费力，这是我们就可以根据mockjs的语法规范来快速生成一系列的数据

```
let demoList = {
  status: 200,
  message: 'success',
  data: {
    total: 100,
    'rows|10': [{
      id: '@guid',
      name: '@cname',
      'age|20-30': 23,
      'job|1': ['前端工程师', '后端工程师', 'UI工程师', '需求工程师']
    }]
  }
};
export default {
    'get|/parameter/query': demoList
}
```

这样我们就可以每次随机生成10条数据，总数为100条，其中id和name使用的占位符，age是随机取出20-30中的数字，job是随机取出其后数组中的某一项，这在[mock文档](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fnuysoft%2FMock%2Fwiki%2FSyntax-Specification)里都有说明。

## 在card.vue中使用store里的数据

```
<template>
  <div>
      显示卡列表：<button @click="onAdd">追加卡信息</button>
      <ul>
        <li v-for="(result, index) in cardArr" :key="index">
          卡号：{{result.no}} <br>
          昵称：{{result.name}}
        </li>
      </ul>
  </div>
</template>
<script>
  // 导入state、mapMutations、actions   
  import { mapState, mapMutations, actions   } from 'vuex';
  export default {
    data(){
      return {
      }
    },
    computed:{
      // 映射带有命名空间的state，第一个参数模块名
      ...mapState('card', [
        cardArr: state => state.cardArr
      ])
    },
    methods: {
      // 映射带有命名空间的mutations，第一个参数模块名
      ...mapMutations('card' ,[
        'addCard',
      ]),
      // 映射带有命名空间的actions，第一个参数模块名
      ...mapActions('card', [
        'addCardFun'
      ])
      onAdd(){
        ...
        //this.$store.commit('card/addCard', data);
        this.addCard(data);
        // 通过actions调用
        //this.$store.dispatch('card/addCardFun', data)
        this.addCardFun(data);
      }
    }
  }
</script>
```

