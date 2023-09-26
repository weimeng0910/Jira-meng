/**
 * @author meng
 * @version 1.0
 * @date 2022/11/23
 * 拖动数据处理
 */
import { rest } from 'msw';
import qs from 'qs';

// 引入处理数据的文件

import * as db from './data/reorderDb';
import { taskUpdata } from './data/restDb';
// 导入开发URL
import { API_URL, displayBoardDB, taskDB } from '../config';
import { DisplayBoard, Task } from './type/handlersType';

export const reorderHandlers = [

  /**
   * @todo 响应post请求拖动displayBoard项目数据
   * @param fromId
   * @param type 'after'|'before'
   * @param toId
   * 数组中为元素的ID
   * 元素在数组中的序号，表示了元素的位置
   * 例如，ID为3的元素，排序为 1，ID为2的元素，排序为2 [3, 2, 4, 1]
 */
  rest.post<Partial<DisplayBoard>>(`${API_URL}/displayBoards/reorder`, async (req, res, ctx) => {

    // 获得前瑞发送的参数,
    //Request 接口的 json() 方法读取请求体并将其作为一个 promise 返回一个对象
    const body = await req.json();

    //通过qs.parse方法把url中的参数（name=sdf&projectId=1 002）解析成对象
    const reorderDisplayBoard = qs.parse(body);

    //类型守卫
    const fromId: string = typeof reorderDisplayBoard.fromId === 'string' ? reorderDisplayBoard.fromId : '';

    const referenceId: string = typeof reorderDisplayBoard.referenceId === 'string' ? reorderDisplayBoard.referenceId : '';

    const type: string = typeof reorderDisplayBoard.type === 'string' ? reorderDisplayBoard.type : '';


    //组装数据
    const reorderDisplayBoardItem = { fromId: Number(fromId), referenceId: Number(referenceId), type };

    //调用写入数据的函数
    const displayBoardtData = await db.reorderDisplayBoardData(displayBoardDB, reorderDisplayBoardItem);
    return res(
      //延迟
      //ctx.delay(1000 * 60),
      ctx.json({ displayBoardtData })

    );

  }),
  /**
   * @todo 响应post请求拖动tasks任务数据
   * @param fromId
   * @param type 'after'|'before'
   * @param toId
 */
  rest.post<Partial<Task>>(`${API_URL}/tasks/reorder`, async (req, res, ctx) => {

    // 获得前瑞发送的参数,
    //Request 接口的 json() 方法读取请求体并将其作为一个 promise 返回一个对象
    const body = await req.json();

    //通过qs.parse方法把url中的参数（name=sdf&projectId=1 002）解析成对象
    const reorderTasks = qs.parse(body);



    //类型守卫
    const fromId: string = typeof reorderTasks.fromId === 'string' ? reorderTasks.fromId : '';

    const referenceId: string = typeof reorderTasks.referenceId === 'string' ? reorderTasks.referenceId : '';

    const type: string = typeof reorderTasks.type === 'string' ? reorderTasks.type : '';

    const fromKanbanId: string = typeof reorderTasks.fromKanbanId === 'string' ? reorderTasks.fromKanbanId : '';


    const toKanbanId: string = typeof reorderTasks.toKanbanId === 'string' ? reorderTasks.toKanbanId : '';
    console.log(toKanbanId, 'toKanbanId');
    //如果task提起来的看板ID不等于拖动到看板ID
    if (fromKanbanId !== toKanbanId) {


      await taskUpdata(taskDB, fromId, { displayBoardId: Number(toKanbanId) });

    } else {
      const reorderTasksItem = { fromId: Number(fromId), referenceId: Number(referenceId), type };


      await db.reorderTasksData(taskDB, reorderTasksItem);
    }

    return res(
      //延迟
      //ctx.delay(1000 * 60),
      ctx.json({})

    );

  }),
];
