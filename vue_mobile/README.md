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





# vue cli3 添加 px2rem-loader 样式嵌套问题

一开始在项目使用 px2rem-loader 的时候我是这样配置的：

```
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('scss')
      .use('px2rem-loader')
        .loader('px2rem-loader')
        .options({
          remUnit: 108,
          remPrecision: 8
        })
  }
}
```

一开始使用的时候没什么问题，直到要在 scss 里使用样式嵌套的时候出问题了，
报错：`"px2rem-loader", it will report "undefined missing '}'" error`

对比了能正常运行的项目，发现 `px2rem-loader` 是在 `sass-loader` 之前配置的，而用了 webpack-chain 后生产的配置中 `px2rem-loader` 是在 `sass-loader` 之后，所以解决的方法就是怎么配置可以让 `px2rem-loader` 的配置可以放在 `sass-loader` 之前。

翻看了 webpack-chain 的文档似乎都没有可以用来插入的，尝试将 rule 中 `sass-loader` 的配置清除，手动在 `vue.config.js` 里再写一次 `sass-loader` 也不行。

折腾了2个小时，决定在 vue-cli 的 issue 上找找，发现一找就找到了[捂脸]。

按 issue 的说法，原因确实是 `sass-loader` 和 `px2rem-loader` 的顺序问题，然后给了正确的插入方法：

```
config.module
  .rule('scss')
  .oneOf('vue')
  .use('px2rem-loader')
  .loader('px2rem-loader')
  .before('postcss-loader') // this makes it work.
  .options({ remUnit: 75, remPrecision: 8 })
  .end()
```

把 `px2rem-loader` 放在了 `postcss-loader` 之前。这也说明了，wepack 的rule 读取是从后往前读取的。正常情况下应该是先经过 `sass-loader` 转化为 css 后再经过 `px2rem-loader`，如果先经过`px2rem-loader` 就会有读不懂嵌套语法的情况所以报错了。

插入的语法就是用 `before()` 指定插在哪个 `use` 之前。

我把配置 `inspect` 出来发现 `oneOf` 有很多个，不知道单独在 `vue` 这个 oneOf 插入就可以生效。