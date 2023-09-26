/**
 * @author meng
 * @version 1.0
 * @date 2022/11/23
 * 模拟一个后端
 * 本地存储中的数据备份
 */
import { Project, DisplayBoard, Task, TaskType, Epic } from '../type/handlersType';

/**
 *  @function loadScreensData
 *  @param storageKey
 *  @description 加载存在 localStorage里的项目数据
 */

const loadScreensData = (storageKey: string) => {

  const screensData = JSON.parse(window.localStorage.getItem(storageKey)!) || []; // 非空断言运算符告诉 typescript 您知道自己在做什么

  return screensData ?? []; // ??在value1和value2之间，只有当value1为null或者 undefined 时取value2，否则取value1
};


/**
 *  @function ScreensProjectsData
 *  @param storageKey
 *  @description 根据传入参数响应数据
 */

async function ScreensProjectsData(storageKey: string, query: { personId: string, name: string }) {
  // 加载localStorage里的项目数据
  const projectsData = loadScreensData(storageKey);
  //定义一个空数组
  const projectList: Project[] = [];
  //localStorage是string|null,personId传入的是string，所以只需要if(personId)
  if (query.personId) {
    const result = projectsData.filter((item: Project) => item.personId === Number(query.personId!));
    result.map((item: Project) => projectList.push(item));

  } if (query.name) {
    const result = projectsData.filter((item: Project) => item.name.includes(query.name!));
    result.map((item: Project) => projectList.push(item));
  }

  /*
   * 得到的数据去重
   */

  //const list = ArrayDeduplication(projectList, Number(query.personId!));
  const obj: { [key: string]: boolean; } = {};//定义一个空对象
  //通过reduce来给数组去重
  const list = projectList.reduce<Project[]>((item, next) => {
    if (!obj[next.id]) {
      item.push(next);
      obj[next.id] = true;
    }
    return item;
  }, []);
  return list.length > 0 ? list : projectsData;

};


/**
 *  @function projectsUpdata
 *  @param storageKey
 *  @description 根据传入参数响应数据
 */

async function projectsUpdata(storageKey: string, id: string, updates: Partial<Project>) {

  // 加载localStorage里的项目数据
  const projectsData: Project[] = loadScreensData(storageKey);

  if ('name' in updates) {
    //通过ID查找对应的数据
    const project = projectsData.find((item: Project) => item.id === Number.parseInt(id!, 10))!;

    projectsData[projectsData.indexOf(project)] = { ...project, ...updates };

  } else {
    //console.log(updates, 'push');
    const project = projectsData.find((item: Project) => item.id === Number.parseInt(id!, 10))!;
    //改变pin的boolean
    project.pin = !project.pin;
  }
  //重新写入数据
  return window.localStorage.setItem(storageKey, JSON.stringify(projectsData));
}

/**
 *  @function addProjectsData
 *  @param storageKey
 *  @description 根据传入的project增加数据
 */

async function addProjectsData(storageKey: string, project: Project) {

  // 加载localStorage里的项目数据
  const projectsData: Project[] = loadScreensData(storageKey);
  const projectsList = [...projectsData, project];

  //重新写入数据
  return window.localStorage.setItem(storageKey, JSON.stringify(projectsList));
}

/**
 *  @function  projectDetele
 *  @param storageKey
 *  @description 根据传入参数响应数据
 */


async function projectDetele(storageKey: string, id: string) {

  // 加载localStorage里的项目数据
  const projectsData: Project[] = loadScreensData(storageKey);
  let projectList: Project[] = [];
  if (id) {
    //通过ID查找对应的数据
    projectList = projectsData.filter((item: Project) => item.id !== Number.parseInt(id!, 10))!;

  }
  //重新写入数据
  return window.localStorage.setItem(storageKey, JSON.stringify(projectList));
}
/**
 *  @function ScreensProjectData
 *  @param storageKey
 *  @description 加载查找到的项目数据
 */

async function ScreensProjectData(storageKey: string, id: string) {

  // 加载localStorage里的项目数据
  const projectsData: Project[] = loadScreensData(storageKey);
  //通过ID查找对应的数据
  const project = projectsData.find((item: Project) => item.id === Number.parseInt(id!, 10))!;
  return project;

}

/**
 *  @function ScreensDisplayBoards
 *  @param storageKey
 *  @description 加载查找到的看板数据
 */

async function ScreensDisplayBoards(storageKey: string) {

  // 加载localStorage里的项目数据
  const data: DisplayBoard[] = loadScreensData(storageKey);

  return data;

}

/**
 *  @function addDisplayBoards
 *  @param storageKey
 *  @description 加载查找到的看板数据
 */

async function addDisplayBoardData(storageKey: string, displayBoard: DisplayBoard) {

  // 加载localStorage里的项目数据
  const displayBoardData: DisplayBoard[] = loadScreensData(storageKey);
  const displayBoardList = [...displayBoardData, displayBoard];

  //重新写入数据
  return window.localStorage.setItem(storageKey, JSON.stringify(displayBoardList));
}


/**
 *  @function displayBoardsDetele
 *  @param storageKey
 *  @description 加载查找到的看板数据
 */
async function displayBoardsDetele(storageKey: string, id: string) {

  // 加载localStorage里的项目数据
  const displayBoardsData: DisplayBoard[] = loadScreensData(storageKey);
  let displayBoardsList: DisplayBoard[] = [];
  if (id) {
    //通过ID查找对应的数据
    displayBoardsList = displayBoardsData.filter((item: DisplayBoard) => item.id !== Number.parseInt(id!, 10))!;

  }
  //重新写入数据
  return window.localStorage.setItem(storageKey, JSON.stringify(displayBoardsList));
}
/**
 *  @function ScreensTasks
 *  @param storageKey
 *  @description 加载查找到的task数据
 */

async function ScreensTasks(storageKey: string, query: { typeId: string, name: string, processorId: string }) {

  // 加载localStorage里的项目数据
  const data: Task[] = loadScreensData(storageKey);
  //定义一个空数组
  const tasksList: Task[] = [];
  //根据tasktyp
  if (query.typeId) {
    const result = data.filter((item) => item.typeId === Number(query.typeId!));
    result.map((item: Task) => tasksList.push(item));
  } if (query.name) {
    const result = data.filter((item: Task) => item.name.includes(query.name!));
    result.map((item: Task) => tasksList.push(item));
  } if (query.processorId) {
    const result = data.filter((item) => item.processorId === Number(query.processorId!));
    result.map((item: Task) => tasksList.push(item));
  }
  /*
   * 得到的数据去重
   */

  //const list = ArrayDeduplication(projectList, Number(query.personId!));
  const obj: { [key: string]: boolean; } = {};//定义一个空对象
  //通过reduce来给数组去重
  const list = tasksList.reduce<Task[]>((item, next) => {
    if (!obj[next.id]) {
      item.push(next);
      obj[next.id] = true;
    }
    return item;
  }, []);
  return list.length > 0 ? list : data;


}
/**
 *  @function addTask
 *  @param storageKey
 *  @description 加载查找到的看板数据
 */

async function addTaskData(storageKey: string, task: Partial<Task>) {

  // 加载localStorage里的项目数据
  const taskData: Task[] = loadScreensData(storageKey);
  const tasksList = [...taskData, task];

  //重新写入数据
  return window.localStorage.setItem(storageKey, JSON.stringify(tasksList));
}

/**
 *  @function taskUpdata
 *  @param storageKey
 *  @description 根据传入参数响应数据
 */

async function taskUpdata(storageKey: string, id: string, updates: Partial<Task>) {

  // 加载localStorage里的项目数据
  const tasksData: Task[] = loadScreensData(storageKey);


  //通过ID查找对应的数据
  const task = tasksData.find((item: Task) => item.id === Number.parseInt(id!, 10))!;

  tasksData[tasksData.indexOf(task)] = { ...task, ...updates };


  //重新写入数据
  return window.localStorage.setItem(storageKey, JSON.stringify(tasksData));
}
/**
 *  @function  taskDetele
 *  @param storageKey
 *  @description 根据传入参数响应数据
 */


async function taskDetele(storageKey: string, id: string) {

  // 加载localStorage里的项目数据
  const taskData: Task[] = loadScreensData(storageKey);
  let taskList: Task[] = [];
  if (id) {
    //通过ID查找对应的数据
    taskList = taskData.filter((item: Task) => item.id !== Number.parseInt(id!, 10))!;

  }
  //重新写入数据
  return window.localStorage.setItem(storageKey, JSON.stringify(taskList));
}
/**
 *  @function ScreensTaskData
 *  @param storageKey
 *  @description 加载查找到的项目数据
 */

async function ScreensTaskData(storageKey: string, id: string) {

  // 加载localStorage里的项目数据
  const taskData: Task[] = loadScreensData(storageKey);
  //通过ID查找对应的数据
  const task = taskData.find((item: Task) => item.id === Number.parseInt(id!, 10))!;
  return task;

}
/**
 *  @function ScreensTaskTypes
 *  @param storageKey
 *  @description 加载查找到的TaskTypes数据
 */

async function ScreensTaskTypes(storageKey: string) {

  // 加载localStorage里的项目数据
  const data: TaskType[] = loadScreensData(storageKey);

  return data;

}
/**
 *  @function ScreensEpic
 *  @param storageKey
 *  @description 加载查找到的任务数据
 */

async function ScreensEpic(storageKey: string) {

  // 加载localStorage里的项目数据
  const epicData: Epic[] = loadScreensData(storageKey);
  return epicData;

}
/**
 *  @function addEpic
 *  @param storageKey
 *  @description 加载查找到的看板数据
 */

async function addEpicData(storageKey: string, epic: Partial<Epic>) {

  // 加载localStorage里的项目数据
  const epicData: Epic[] = loadScreensData(storageKey);
  const epicList = [...epicData, epic];

  //重新写入数据
  return window.localStorage.setItem(storageKey, JSON.stringify(epicList));
}
/**
 *  @function  taskDetele
 *  @param storageKey
 *  @description 根据传入参数响应数据
 */


async function epicsDetele(storageKey: string, id: string) {

  // 加载localStorage里的项目数据
  const epicsData: Epic[] = loadScreensData(storageKey);
  let epicsList: Epic[] = [];
  if (id) {
    //通过ID查找对应的数据
    epicsList = epicsData.filter((item: Epic) => item.id !== Number.parseInt(id!, 10))!;

  }
  //重新写入数据
  return window.localStorage.setItem(storageKey, JSON.stringify(epicsList));
}
// 导出注册方法createUser，登陆方法authenticate
export {
  ScreensProjectsData,
  projectsUpdata,
  ScreensProjectData,
  addProjectsData,
  projectDetele,

  ScreensDisplayBoards,
  addDisplayBoardData,
  displayBoardsDetele,

  ScreensTasks,
  addTaskData,
  taskUpdata,
  taskDetele,
  ScreensTaskData,

  ScreensTaskTypes,
  ScreensEpic,
  addEpicData,
  epicsDetele

};
