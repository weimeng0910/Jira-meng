/**
 * @author meng
 * @version 1.0
 * @date 2022/11/23
 * handlers： 主要为定义 API 逻辑的代码
 */

import { userHandlers } from './account';
import { getRestHandlers } from './restHandlers';
import { reorderHandlers } from './reorderHandlers';
import { bootstrap } from './bootstrap';


/**
 * 初始化数据
 */

bootstrap();


/**
 * @todo 处理各种请求把数据返回前端
 */
export const handlers = [

  //用户登陆
  ...userHandlers,
  //项目数据处理
  ...getRestHandlers,

  //拖拽数据处理
  ...reorderHandlers,
];
