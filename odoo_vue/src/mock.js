// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
const produceNewsData = function() {

}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/get/orders', 'post', produceNewsData);
