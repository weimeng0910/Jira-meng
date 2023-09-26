/**
 * @author meng
 * @version 1.0
 * @date 2022/11/23
 * 模拟拖拽后端数据处理
 */
import { DisplayBoard, Task, SortProps } from '../type/handlersType';
import { loadScreensData } from './accountDb';
/**
 * 在list中，把from放在to的前边,拖动到前面的处理函数
 * @param storageKey
 * @param list
 * @param from
 * @param to
 */

const insertBefore = (storageKey: string, list: any[], from: number, to: number) => {
  //数组拖动到的Item
  const toItem = list[to];
  //从from 开始修改 arr：删除 1 个元素,最后返回被删除的元素所组成的数组的第一个元素。
  const removedItem = list.splice(from, 1)[0];
  //arr.indexOf这里是对数组元素进行操作：这里是返回数组中toItem这个元素在数组中的索引
  const toIndex = list.indexOf(toItem);
  //从得到的这个索引开始，插入移动的元素
  list.splice(toIndex, 0, removedItem);
  //重新写入数据
  return window.localStorage.setItem(storageKey, JSON.stringify(list));
};

/**
 * 在list中，把from放在to的后面,拖动到后方的处理函数
 * @param storageKey
 * @param list
 * @param from
 * @param to
 */

const insertAfter = (storageKey: string, list: any[], from: number, to: number) => {
  //数组的最后一个Item
  const toItem = list[to];
  //arr.splice 方法可以说是处理数组的瑞士军刀。它可以做所有事情：添加，删除和插入元素。
  //从from 开始修改 arr：删除 1 个元素,最后返回被删除的元素所组成的数组的第一个元素。
  const removedItem = list.splice(from, 1)[0];
  //arr.indexOf这里是对数组元素进行操作：这里是返回数组中toItem这个元素在数组中的索引
  const toIndex = list.indexOf(toItem);
  //从得到的这个索引开始，插入移动的元素
  list.splice(toIndex + 1, 0, removedItem);
  return window.localStorage.setItem(storageKey, JSON.stringify(list));
};

/**
 *  @function reorderDisplayBoardData
 *  @param storageKey
 *  @param { fromId, type, referenceId }
 *  @description 拖动看板数据
 */
async function reorderDisplayBoardData(storageKey: string, { fromId, type, referenceId }: SortProps) {

  // 加载localStorage里的项目数据
  const displayBoardData: DisplayBoard[] = loadScreensData(storageKey);

  //获得移动的看板索引
  //当数组中的元素在测试条件时返回 true 时, findIndex() 返回符合条件的元素的索引位置，之后的值不会再调用执行函数
  const movingItemIndex = displayBoardData.findIndex((item) => item.id === fromId);
  //如果referenceId不为空
  if (!referenceId) {
    //调用拖动后处理函数传入看板数据，和移动的项目索引，这里的数组长度减一是该数组中的最大值会被排除在外，
    //冒泡排序后数组是从小到大的排序
    insertAfter(storageKey, displayBoardData, movingItemIndex, displayBoardData.length - 1);

  }
  //目标索引
  const targetIndex = displayBoardData.findIndex((item) => item.id === referenceId);
  //type传入的值是不是after
  const insert = type === 'after' ? insertAfter : insertBefore;
  //调用函数来处理数据排序
  insert(storageKey, displayBoardData, movingItemIndex, targetIndex);
}

/**
 *  @function reorderTasksData
 *  @param storageKey
 *  @description 拖动任务数据处理
 */

async function reorderTasksData(storageKey: string, { fromId, type, referenceId }: SortProps) {

  // 加载localStorage里的项目数据
  const taskData: Task[] = loadScreensData(storageKey);

  //获得移动的task索引
  const movingItemIndex = taskData.findIndex((item) => item.id === fromId);
  //如果referenceId不为空
  if (!referenceId) {
    //调用拖动后处理函数传入看板数据，和移动的项目索引，这里的数组长度减一是该数组中的最大值会被排除在外，
    //冒泡排序后数组是从小到大的排序
    insertAfter(storageKey, taskData, movingItemIndex, taskData.length - 1);

  }
  //目标索引
  const targetIndex = taskData.findIndex((item) => item.id === referenceId);
  //type传入的值是不是after
  const insert = type === 'after' ? insertAfter : insertBefore;
  //调用函数来处理数据排序
  insert(storageKey, taskData, movingItemIndex, targetIndex);
}
// 导出注册方法createUser，登陆方法authenticate
export {
  reorderDisplayBoardData,
  reorderTasksData
};
