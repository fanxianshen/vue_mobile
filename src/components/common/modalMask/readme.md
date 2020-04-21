## 弹窗遮罩组件

### usage

```html
<modal-mask :show="showModal">
  <!-- // TODO: -->
  Your HTML Code Here 
</modal-mask>
```

```js
import ModalMask from 'CMT/modalMask';

export default {
  ...
  components:{
    ModalMask
  }
}

```

```js
// 属性说明
{
  // 是否显示
  show: {
    type: Boolean,
    default: false
  },
  // 点击蒙层是否关闭 , 需监听close事件
  maskCloseable: {
    type: Boolean,
    default: false
  },
  // 背景色透明度
  opacity: {
    type: Number,
    default: 0.7
  },
  /**
   * 进入动画:
   *    可选:[
   *      fadeZoomIn:渐变放大 (默认),
   *      slideInUp: 上方滑入
   *      slideInRight: 右侧滑入
   *      slideInDown: 下方滑入
   *      slideInLeft: 左侧滑入
   *      flipInX: X轴翻转进入
   *      flipInY: Y轴翻转进入
   *    ]
   */
  showAnimation: {
    type: String,
    default: "fadeZoomIn"
  },
  /**
   * 离开动画:
   *    可选:[
   *      fadeZoomOut:渐变缩小 (默认),
   *      slideOutUp: 上方滑出
   *      slideOutRight: 右侧滑出
   *      slideOutDown: 下方滑出
   *      slideOutLeft: 左侧滑出
   *      flipOutX: X轴翻转离开
   *      flipOutY: Y轴翻转离开
   *    ]
   */
  leaveAnimation: {
    type: String,
    default: "fadeZoomOut"
  },
  // 位置: 支持格式 'center','top','bottom','top:200','bottom:200px;','top:10vw'
  position: {
    type: String,
    default: "center"
  }
}
```

### feature
当前支持动画类型
#### 进入动画:
   *      fadeZoomIn:渐变放大 (默认),
   *      slideInUp: 上方滑入
   *      slideInRight: 右侧滑入
   *      slideInDown: 下方滑入
   *      slideInLeft: 左侧滑入
   *      flipInX: X轴翻转进入
   *      flipInY: Y轴翻转进入

#### 离开动画:
   *      fadeZoomOut:渐变缩小 (默认),
   *      slideOutUp: 上方滑出
   *      slideOutRight: 右侧滑出
   *      slideOutDown: 下方滑出
   *      slideOutLeft: 左侧滑出
   *      flipOutX: X轴翻转离开
   *      flipOutY: Y轴翻转离开