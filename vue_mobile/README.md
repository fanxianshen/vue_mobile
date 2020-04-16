# vue_mobile

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

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



# vue-cli3使用lib-flexible和px2rem搭建项目

安装

```
npm i lib-flexible --save
npm install px2rem-loader
```



引入
进入 main.js

```
import 'lib-flexible/flexible'
```


进入index.html

```
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```


根目录新建 vue.config.js 文件
复制如下代码， 重启， 搞定

```
// vue.config.js

module.exports = {

  chainWebpack: config => {

    config.module

      .rule('css')

        .test(/.css$/)

        .oneOf('vue')

        .resourceQuery(/\?vue/)

        .use('px2rem')

          .loader('px2rem-loader')

          .options({

            remUnit: 75

          })

  }

}

```

