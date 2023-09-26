import { setupServer } from 'msw/node';
//导入用来mork导步请求的setupServer,所有的请求都需要用mork的方法来模拟
import { rest } from 'msw';

//导入需要测试的hook
import { http } from '../api/http';
// 引入请求地址
import { API_URL } from '../config';
/*
 * @author meng
 * @version 1.0
 * @file 测试http请求
 */
const server = setupServer();

// jest 是对react最友好的一个测试库,主要做单元测试
// beforeAll 代表执行所有的测试之前，先来执行一下回调函数
beforeAll(() => server.listen());
// 每一个测试跑完以后，都重置mock路由
afterEach(() => server.resetHandlers());

// 所有的测试跑完后，关闭mock路由
afterAll(() => server.close());
//jest中的最常用的工具,第一个参数是描述要做什么
test('http方法发送异步请求测试', async () => {
  //test不应该真正去服务器请求数据，而是要模拟一个数据所以下面定义地址和返回的数据值
  //请求的地址
  const endpoint = 'test-endpoint';
  //mork请求要返回的值
  const mockResult = { mockValue: 'mock' };
  server.use(
    rest.get(`http://${API_URL}/${endpoint}`, (_req, res, ctx) =>
      res(ctx.json(mockResult))
    )

  );
  //调用http方法来获取测试结果
  const result = await http({ endpoint, method: 'get' });
  //期待返回的结果和自已定义的结果一致，这样测试就是正确的
  //在写测试的时候，我们经常需要检查值是否满足指定的条件。 expect 让你可以使用不同的“匹配器”去验证不同类型的东西
  //使用toEqual递归比较对象实例的所有属性（也称为“深度”相等）。
  //它调用Object.is来比较原始值，这比（toBe）===严格相等运算符更适合测试。
  expect(result).toEqual(mockResult);
});
