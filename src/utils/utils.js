
/**
 * 获取URL参数
 *
 * @param {*} name
 * @returns
 */
function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return r[2];
  return null;
}

/**
 * 防抖函数就是在一定时间内，再次触发函数就会清除定时器重新设置延迟时间执行,适用于非高频率操作。
 * @param  {Function} fn                [执行函数]
 * @param  {Number}   [interval=1000]       [间隔时间]
 * @param  {Boolean}  [immediate=false] [是否立即执行]
 * @return {[type]}                     [function]
 */
function debounce(fn, interval = 1000, immediate = false) {
  // 定时器
  let timer;
  return function () {
    const self = this;

    // 保存参数

    const args = arguments;
    if (timer) clearTimeout(timer);
    // 是否立即执行
    if (immediate) {
      fn.apply(self, args);
      immediate = false;
    }
    timer = setTimeout(() => {
      fn.apply(self, args);
    }, interval);
  };
}

/**
 * 节流函数就是只允许一个函数在一定时间内执行一次,适用于高频率事件。
 * @param  {Function} fn                [执行函数]
 * @param  {Number}   [interval=1000]       [间隔时间]
 * @return {[type]}                   [function]
 */
function throttle(fn, interval = 2000) {
  let timer;

  let preTime = +new Date();
  return function () {
    const self = this;

    const args = arguments;

    const curTime = +new Date();
    if (timer) clearTimeout(timer);
    // 超过间隔时间执行,并记录当前时间是新的时间点
    if (curTime - preTime >= interval) {
      preTime = curTime;
      fn.apply(self, arguments);
    } else {
      // 间隔时间内设置定时器,保证即使停止操作也至少执行一次
      timer = setTimeout(() => {
        fn.apply(self, args);
      }, interval);
    }
  };
}

/**
 * 无缝轮播图，可触摸左右移动
 * @param selector
 */
function initSwiper(selector) {
  var oDiv = document.querySelector(selector);
  var oUl = oDiv.getElementsByTagName('ul')[0];
  var aLi = oDiv.getElementsByTagName('li');
  var speed = -1;
  var timer = null;
  let isTouch = false;
  let touchStartX = 0;
  let touchEndX = 0;
  let num = 0;
  oUl.innerHTML += oUl.innerHTML;
  oUl.style.width = aLi[0].offsetWidth * aLi.length + 'px';

  const wWidth = $('.scroll').width();
  const oUlWidth = parseInt(oUl.style.width);
  timer = setInterval(function () {
    oUl.style.left = oUl.offsetLeft + speed + 'px';
    if (oUl.offsetLeft < -oUl.offsetWidth / 2) {
      oUl.style.left = '0';
    } else if (oUl.offsetLeft > 0) {
      oUl.style.left = -oUl.offsetWidth / 2 + 'px';
    }
  }, 30);
  oUl.addEventListener(
    'touchstart',
    e => {
      clearInterval(timer);
      isTouch = true;
      touchStartX = e.touches[0].pageX;
    },
    false
  );
  oUl.addEventListener(
    'touchmove',
    e => {
      touchEndX = e.touches[0].pageX;
      let diff = touchEndX - touchStartX;
      touchStartX = touchEndX;
      num = diff + parseInt(oUl.style.left);
      num >= 0 && (num = num - oUlWidth / 2);
      num <= -oUlWidth + wWidth && (num = -oUlWidth + wWidth);
      oUl.style.left = `${Math.floor(num)}px`;
    },
    false
  );
  oUl.addEventListener(
    'touchend',
    () => {
      timer = setInterval(function () {
        oUl.style.left = parseInt(oUl.style.left) + speed + 'px';
        if (oUl.offsetLeft <= -oUl.offsetWidth / 2) {
          if (parseInt(oUl.style.left) > -wWidth - oUl.offsetWidth) {
            oUl.style.left = isTouch ?
              -oUl.offsetWidth / 2 + wWidth :
              parseInt(oUl.style.left) + oUl.offsetWidth / 2 + 'px';
          } else {
            oUl.style.left = oUl.offsetLeft + oUl.offsetWidth / 2 + 'px';
          }
        } else if (oUl.offsetLeft > 0) {
          oUl.style.left = -oUl.offsetWidth / 2 + 'px';
        }
      }, 30);
      isTouch = false;
    },
    false
  );
}

let top = 0;

function stopBodyScroll(isFixed) {
  let bodyEl = document.body;
  if (isFixed) {
    top = window.scrollY;

    bodyEl.style.position = 'fixed';
    bodyEl.style.top = -top + 'px';
  } else {
    bodyEl.style.position = 'static';
    bodyEl.style.top = 'unset';

    window.scrollTo(0, top); // 回到原先的top
  }
}


/**
 *  咪呀头像规则
 *  @params { String } icon, 服务端返回的路径
 *  @params { Number } iconType, 图像对应的尺寸0, 1, 2
 */
function miyaParsingPath(icon = '', iconType) {
  if (/https?:\/\//i.test(icon)) {
    return oldWay(icon);
  } else {
    iconType = typeof iconType !== 'undefined' ? iconType : 0;
    return `https://res.miyachat.com/${icon}` + (iconType ? `?x-oss-process=style/icon_${iconType}_jpg` : '');
  }
}



/**
 * 前置补零
 *
 * @param {*} val 数字
 * @param {number} [len=2] 期望长度
 * @returns
 */
function addZero(val, len = 2) {
  return `${new Array(len).join(0)}${val}`.slice(-len);
}

// 时间戳转天时分秒
function formatDuring(mss) {
  if (mss < 0) {
    return {
      total: '00',
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00'
    };
  }

  var days = addZero(parseInt(mss / (1000 * 60 * 60 * 24)));
  var hours = addZero(
    parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  var minutes = addZero(parseInt((mss % (1000 * 60 * 60)) / (1000 * 60)));
  var seconds = addZero(Math.floor((mss % (1000 * 60)) / 1000));
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }
  if (minutes === 60) {
    hours++;
    minutes = 0;
  }
  if (hours === 24) {
    days++;
    hours = 0;
  }
  return {
    total: mss,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

function isEmptyObject(obj) {
  return (
    Object.prototype.toString.call(obj) === '[object Object]' &&
    JSON.stringify(obj) === '{}'
  );
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function isArray(ary) {
  return Object.prototype.toString.call(ary) === '[object Array]';
}

function isString(str) {
  return Object.prototype.toString.call(str) === '[object String]';
}

/**
 * 截取字符
 * 说明：汉字、中文标点、emoji、日文、韩文算作 1个字
 * ASCII, 英文、英文标点、数字算作 0.5个字
 * @params { String } 待处理的字符串
 * @params { Number } 需要截取的长度
 * @params { String } 超出字符代替，默认"..."
 * @returns { String } 还回的字符串
 */
const interceptStr = (str, len, outMsg) => {
  // 绝大部分emoji
  let reg = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi;

  let strArr = str ? str.split('') : []; // 字符数组
  let strEmojiArr = []; // emoji对象
  let tempArr;

  let countLen = 0; // 需要转为2倍长度处理，避免小数点
  let strIndex = 0; // 字符数组对应的指针
  let emojiIndex = 0; // emoji对象对应的指针
  let newStrArr = []; // 新字符数组

  outMsg = typeof outMsg !== 'undefined' ? outMsg : '...';

  len = len * 2; // 转为2倍长度处理，避免小数点

  if (!str) {
    return str;
  }

  // 获取到对应的emoji位置
  while ((tempArr = reg.exec(str)) !== null) {
    let word = tempArr[0]; // 获取到emoji
    let wordLen = word.length; // emoji长度
    let startIndex = reg.lastIndex - wordLen; // 出现开始位置

    // console.log('序号：', strIndex, startIndex, endIndex, wordLen);
    strEmojiArr.push({
      word, // emoji字符
      startIndex, // emoji出现的开始位置
      wordLen // emoji长度
    });
  }

  for (var i = 0; i < strArr.length; i++) {
    // 判断指针是否大于字符数组下标
    if (strIndex > i) {
      continue;
    }

    // 判断是否是emoji
    let emojis = strEmojiArr.filter(item => {
      emojiIndex++;
      return item.startIndex == strIndex;
    });

    if (emojis.length > 0) {
      countLen += 2;
      if (countLen > len) {
        newStrArr.push(outMsg);
        break;
      }
      let emoji = emojis[0];
      strEmojiArr.splice(emojiIndex, 1); // 删掉已显示过的emoji
      strIndex += Number(emoji.wordLen);
      newStrArr.push(emoji.word);
    } else {
      if (/[\x00-\xff]+/g.test(strArr[i])) {
        countLen += 1;
      } else {
        countLen += 2;
      }
      if (countLen > len) {
        newStrArr.push(outMsg);
        break;
      }
      newStrArr.push(strArr[i]);
      strIndex += 1;
    }
  }

  return newStrArr.join('');
};

/**
 * 将相对地址转绝地地址
 * @params { String } 相对地址
 * @returns { String } 绝对地址
 */
const getAbsoluteURL = url => {
  let link = document.createElement('a');
  let absoluteURL = '';

  link.href = url;
  absoluteURL = link.href;
  link = null;

  return absoluteURL;
};

/**
 * 获取清除缓存的链接
 */
const getClearCacheUrl = (url, key, version) => {
  var key = (key || '_t') + '='; // 默认是 "_t"
  var reg = new RegExp(key + '(\\d+\\.)*\\d+'); // 正则：t=1472286066028/1.x.x
  var timestamp = version || +new Date();

  if (url.indexOf(key) > -1) {
    // 有时间戳，直接更新
    return url.replace(reg, key + timestamp);
  } else {
    // 没有时间戳，加上时间戳
    var newUrlArr = [];
    var urlArr = url.split('#');
    var baseUrl = urlArr[0];
    var hash = urlArr[1] ? '#' + urlArr[1] : '';

    if (baseUrl.indexOf('?') > -1) {
      var tmpUrlArr = baseUrl.split('?');
      newUrlArr.push(tmpUrlArr[0]);
      newUrlArr.push('?' + key + timestamp);
      newUrlArr.push('&' + tmpUrlArr[1]);
    } else {
      newUrlArr.push(urlArr[0]);
      newUrlArr.push('?' + key + timestamp);
    }
    newUrlArr.push(hash);

    return newUrlArr.join('');
  }
};

/**
 * replace 无效, 浏览器有效
 * 出处：https://stackoverflow.com/questions/14333620/android-webview-location-replace-doesnt-work
 */
const locationReplace = url => {
  if (history.replaceState) {
    history.replaceState(null, document.title, url);
    history.go(0);
    location.reload();
  } else {
    location.replace(url);
  }
};

/**
 *  强制清理缓存
 *  @params { B }
 */
const cleanCache = (url, isForce, act) => {
  act = act || 'webVer';

  url = url || './static/app.json';
  url = getAbsoluteURL(url);
  url += `?t=${new Date().getTime()}`;

  let webVer = localStorage.getItem(act);

  if (isForce) {
    location.replace(getClearCacheUrl(location.href));
    return;
  }

  axios.get(url).then(res => {
    // 如果没打开过，或者版本号不一样，则刷新
    if ((webVer && webVer !== res.data.version) || (window.webVer && window.webVer !== res.data.version)) {
      localStorage.setItem(act, res.data.version);
      location.replace(getClearCacheUrl(location.href, '_t', res.data.version));
    } else {
      localStorage.setItem(act, res.data.version);
    }
  }).catch(err => { });
};

function createFormSubmit(url, params, target) {
  var tempform = document.createElement('form');
  tempform.action = url;
  tempform.method = 'post';
  tempform.style.display = 'none';
  if (target) {
    tempform.target = target;
  }

  for (var x in params) {
    var _opt = document.createElement('input');
    _opt.name = x;
    _opt.value = params[x];
    tempform.appendChild(_opt);
  }

  var opt = document.createElement('input');
  opt.type = 'submit';
  tempform.appendChild(opt);
  document.body.appendChild(tempform);
  tempform.submit();
  document.body.removeChild(tempform);
}

function createBigPic(url) {
  var tempform = document.createElement('div');
  tempform.style;
}

var isWechat = (function () {
  let ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
})();
// 判断浏览器内核、手机系统等，使用 browser.version.ios
var browser = (function () {
  var u = navigator.userAgent;
  return {
    trident: u.indexOf('Trident') > -1, // IE内核
    presto: u.indexOf('Presto') > -1, // opera内核
    webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // IOS终端
    android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // 安卓终端
    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iphone或QQHD浏览器
    iPad: u.indexOf('iPad') > -1, // 是否为iPad
    webApp: u.indexOf('Safari') == -1, // 是否web应用程序，没有头部与底部
    QQbrw: u.indexOf('MQQBrowser') > -1, // QQ浏览器
    weiXin: u.indexOf('MicroMessenger') > -1, // 微信
    QQ: /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(u) || /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(u), // QQ
    QZ: u.indexOf(/Qzone/i) > -1, // QQ
    weiBo: u.indexOf(/WeiBo/i) > -1, // 微博
    ucLowEnd: u.indexOf('UCWEB7.') > -1, //
    ucSpecial: u.indexOf('rv:1.2.3.4') > -1,
    webview:
      !(u.match(/Chrome\/([\d.]+)/) || u.match(/CriOS\/([\d.]+)/)) &&
      u.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
    ucweb: (function () {
      try {
        return (
          parseFloat(
            u
              .match(/ucweb\d+\.\d+/gi)
              .toString()
              .match(/\d+\.\d+/)
              .toString()
          ) >= 8.2
        );
      } catch (e) {
        if (u.indexOf('UC') > -1) {
          return true;
        }
        return false;
      }
    })(),
    Symbian: u.indexOf('Symbian') > -1,
    ucSB: u.indexOf('Firofox/1.') > -1
  };
})();

/**
 *
 * @param {最小值} m
 * @param {最大值} n
 */
function createRandom(m, n) {
  return Math.random() * (+n + 1 - m) + m;
}

// 获取对应的scheme
function getScheme(type) {
  const UA = navigator.userAgent;
  let scheme = 'huhuyy://m.mizhua.com';

  // 如果是安卓则用回原来的
  if (/Android|Adr/i.test(UA)) {
    scheme = 'mizhua://m.mizhua.com';
  }

  switch (type) {
  case 1: // 小呼吸
    scheme = 'xhx://m.xiaohuxi.cn';
    break;
  case 2: // 咪呀
    scheme = 'miya://m.miya.com';
    break;
  case 3: //
    scheme = 'huhuyy://m.huhuyy.com';
    break;
  default:
    break;
  }

  return scheme;
}

/**
 * 刷新app里面的webview
 * @params { Object } {url, title, type}
 */
function tryCallApp(data) {
  let type = data.type;
  let scheme = getScheme(data.type);

  if (!data) {
    return;
  }

  data.url = data.url ? data.url : location.href;
  data.url = encodeURIComponent(data.url);
  data.title = data.title || '';

  // 和app协定的scheme
  let url = scheme + '?dyaction=web&url=' + data.url + '&title=' + data.title;

  if (data.isRefresh) {
    url += '&isrefresh=1';
  }

  location.href = url;
}

/**
 *
 * @param {水平数量} wn
 * @param {竖直数量} hn
 * @param {阻挡坐标} blockList
 */
function createGrid(wn, hn, blockList) {
  var gridList = {
    coordinate: [],
    num: []
  }; // 映射数据
  var i = 0;
  var j = 0;

  function check(direction) {
    var coordinate = {
      x: i,
      y: j,
      direction: direction
    };
    var isBlock = blockList.filter(function (item) {
      return item.x === coordinate.x && item.y === coordinate.y;
    }).length;
    if (!isBlock) {
      gridList.coordinate.push(coordinate);
      gridList.num.push(wn * j + i);
    }
    return isBlock;
  }

  // →方向
  while (i < wn) {
    if (check('right')) {
      i--;
      j++;
      continue;
    }
    i++;
  }

  // 转移↓方向
  i--;
  j++;
  while (j < hn) {
    if (check('bottom')) {
      i--;
      j--;
      continue;
    }
    j++;
  }

  // 转移←方向
  i--;
  j--;
  while (i > 0) {
    if (check('left')) {
      i++;
      j--;
      continue;
    }
    i--;
  }

  // 转移↑方向
  while (j > 0) {
    if (check('top')) {
      i++;
      j++;
      continue;
    }
    j--;
  }

  return gridList;
}



/**
 *
 * 格式化数字为字符串
 * @param {*} num
 * @param {*} padStart 不足两位时,是否在首为填'0'
 */
function formatNum(num, padStart = true) {
  if (padStart) {
    return num > 9 ? '' + num : '0' + num;
  } else {
    return '' + num;
  }
}

/**
 * 格式化时间为字符串,
 * @param { Date | Number | String (Date String)} date 日期Date对象或可作为Date参数的字符串,数字
 * @param {string} [formatStr='YYYY-MM-DD hh:mm:ss'] 输出格式
 */
function formatDate(date, formatStr = 'YYYY-MM-DD hh:mm:ss') {
  if (!date) {
    date = new Date();
  } else {
    // 后台时间戳, 需 x 1000
    if(typeof date === 'number' && date < 10000000000){
      date *= 1000;
    }
    date = new Date(date);
  }
  let year = date.getFullYear();
  let mon = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  return formatStr.replace(/[Y|M|D|h|m|s]+/g, function (s) {
    // 是否需要补0 'Y-M-D h:m:s' 这样的格式不补0
    let padStart = s.length > 1;
    switch (s[0]) {
    case 'Y':
      return formatNum(year);
    case 'M':
      return formatNum(mon, padStart);
    case 'D':
      return formatNum(day, padStart);
    case 'h':
      return formatNum(hour, padStart);
    case 'm':
      return formatNum(min, padStart);
    case 's':
      return formatNum(sec, padStart);
    default:
      return s;
    }
  });
}
/**
 * 睡眠若干毫秒, 与async/await配合使用, 多用于等待动画结束
 * @param {Number} ms 毫秒值
 */
function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
/**
 * 时间戳是不是今天
 * @param {Number} t 时间戳
 */
function isToday(t) {
  let now = new Date();
  // 后台时间戳 需 x1000
  if(typeof t === 'number' && t < 10000000000){
    t *= 1000;
  }
  let d = new Date(t);
  return now.getFullYear() === d.getFullYear() &&
    now.getMonth() === d.getMonth() &&
    now.getDate() === d.getDate();
}

// 返回零点时间
function getZeroDate(time) {
  return time ?
    dayjs(time).format('YYYY-MM-DD') + ' 00:00:00' :
    dayjs().format('YYYY-MM-DD') + ' 00:00:00';
}

/**
 *
 *
 * @param {开始日期} startTime
 * @param {截止日期} endTime
 * @returns 两个日期内间隔的日期数组,例如[2018-01-01 00:00:00,]
 */
function createDateAry(startTime, endTime) {
  const ary = [];
  const start = getZeroDate(startTime * 1000);
  const end =
    endTime * 1000 <= +new Date() ? getZeroDate(endTime * 1000) : getZeroDate();
  const diff = dayjs(end).diff(dayjs(start), 'day') + 1;

  for (let i = 0; i < diff; i++) {
    let dateStr = dayjs(start)
      .add(i, 'day')
      .format('M月DD日');
    let timestamp = Math.round(
      dayjs(
        dayjs(start)
          .add(i, 'day')
          .format('YYYY-MM-DD') + ' 00:00:00'
      ) / 1000
    );
    let item = {
      dateStr,
      timestamp
    };

    ary.push(item);
  }
  return ary;
}

/**
 * 禁止IOS双击自动滚动
 */

function fixedIOSScroll() {
  // 屏蔽IOS双击
  var agent = navigator.userAgent.toLowerCase();
  var iLastTouch = null;
  if (agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0) {
    document.body.addEventListener(
      'touchend',
      function (event) {
        var a = new Date().getTime();
        iLastTouch = iLastTouch || a + 1;
        var c = a - iLastTouch;
        if (c < 500 && c > 0) {
          event.preventDefault();
          return false;
        }
        iLastTouch = a;
      },
      false
    );
  }
}

//动态创建a标签并跳转
function createHref(href) {
  const aDom = document.createElement('a'); // 创建a标签
  aDom.setAttribute('href', href); // href链接
  aDom.setAttribute('id', 'startHref');
  aDom.setAttribute('target', '_blank');

  // 防止反复添加
  if (document.getElementById('startHref')) {
    document.body.removeChild(document.getElementById('startHref'));
  }
  document.body.appendChild(aDom);

  aDom.click(); // 自执行点击事件
}


export {
  fixedIOSScroll,
  tryCallApp,
  getScheme,
  getClearCacheUrl,
  cleanCache,
  interceptStr,
  getAbsoluteURL,
  getQueryString,
  debounce,
  throttle,
  initSwiper,
  stopBodyScroll,
  miyaParsingPath,
  formatDuring,
  isEmptyObject,
  isArray,
  isObject,
  isString,
  createFormSubmit,
  createBigPic,
  createRandom,
  createGrid,
  formatNum,
  formatDate,
  sleep,
  isToday,
  getZeroDate,
  createDateAry,
  createHref,
  addZero
};
