/**
 * @author meng
 * @version 1.0
 * @date 2022/11/23
 * 初始化数据
 */
import * as initalData from './data/initialData';
import { epicDB, displayBoardDB, projectDB, tagDB, taskDB, taskTypeDB, userDB } from '../config';

/**
 * 初始化数据
 * LocalStorage 本地存储兼容函数
 * getItem: 获取属性
 * setItem: 设置属性
 * 将初始化数据存入 window.localStorage
 */
const store = (storageKey: string, data: any[]) =>
  window.localStorage.getItem(storageKey) || window.localStorage.setItem(storageKey, JSON.stringify(data));

//写入数据
export const bootstrap = () => {
  store(projectDB, initalData.projects);
  store(userDB, initalData.users);
  store(epicDB, initalData.epics);
  store(displayBoardDB, initalData.kanbans);
  store(tagDB, initalData.tags);
  store(taskDB, initalData.tasks);
  store(taskTypeDB, initalData.taskTypes);
};
