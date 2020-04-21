//mock.js 文件

import Mock from 'mockjs' // 引入mockjs

const Random = Mock.Random // Mock.Random 是一个工具类，用于生成各种随机数据

const dataList = [] // 用于接受生成数据的数组


// const template = {
//   'Boolean': Random.boolean, // 可以生成基本数据类型
//   'Natural': Random.natural(1, 10), // 生成1到100之间自然数
//   'Integer': Random.integer(1, 100), // 生成1到100之间的整数
//   'Float': Random.float(0, 100, 0, 5), // 生成0到100之间的浮点数,小数点后尾数为0到5位
//   'Character': Random.character(), // 生成随机字符串,可加参数定义规则
//   'String': Random.string(2, 10), // 生成2到10个字符之间的字符串
//   'Range': Random.range(0, 10, 2), // 生成一个随机数组
//   'Date': Random.date(), // 生成一个随机日期,可加参数定义日期格式
//   'Image': Random.image(Random.size, '#02adea', 'Hello'), // Random.size表示将从size数据中任选一个数据
//   'Color': Random.color(), // 生成一个颜色随机值
//   'Paragraph': Random.paragraph(2, 5), // 生成2至5个句子的文本
//   'Name': Random.name(), // 生成姓名
//   'Url': Random.url(), // 生成web地址
//   'Address': Random.province() // 生成地址
// }

for (let i = 1; i <= 200; i++) { // 可自定义生成的个数

  const template = {
    'sort': i,
    'id': Random.integer(1, 10000), // 生成1到100之间的整数
    "id2": Random.string(2, 10), // 生成2到10个字符之间的字符串
    "name": Random.name(), // 生成姓名
    "icon": Random.image(Random.size, '#02adea', 'Hello'), // Random.size表示将从size数据中任选一个数据
    "gold": Random.integer(1, 10000), // 生成1到100之间的整数
    "point": Random.integer(1, 10000), // 生成1到100之间的整数
    "num": Random.integer(1, 20), // 生成1到100之间的整数
    "roomId": Random.integer(1, 20), // 生成1到100之间的整数
    "roomName": Random.string(2, 10), // 生成2到10个字符之间的字符串
    "likeNum": 0,
    "isLike": false,
    "msg": "",
    "lastPlayerId": 0,
    "resource": "",
    "resultCreateTime": 0,
  }

  dataList.push(template)

}


export default {
  'post|/parameter/rank': option => {
    let params = JSON.parse(option.body)
    let [page, size, total] = [params.page, params.pageSize, dataList.length]
    page--
    let totalPages = Math.ceil(total / size)
    var newDataList = dataList.slice(page * size, (page + 1) * size)
    return {
      status: 200,
      message: 'success',
      data: {
        list: newDataList,
        'total': total,
        'totalPages': totalPages
      }
    };
  }
}