/**
 * @author meng
 * @version 1.0
 * @date 2022/11/23
 * restHandlers：项目数据处理
 */
import { rest } from 'msw';
import qs from 'qs';
import { customAlphabet } from 'nanoid/non-secure';

import { Project, DisplayBoard, Task, Epic } from './type/handlersType';
// 引入处理数据的文件
import * as db from './data/restDb';
// 导入开发URL
import { API_URL, projectDB, displayBoardDB, taskDB, taskTypeDB, epicDB } from '../config';
import { TaskType } from '@/types/taskType';



export const getRestHandlers = [
  /****************************************************
    * 响应各种project项目数据请求
    * @todo 响应get请求获得项目数据
    */

  rest.get<Partial<Project>>(`${API_URL}/projects`, async (req, res, ctx) => {

    // 获得前瑞发送的参数
    const personId: string = req.url.searchParams.get('personId')!;
    const name: string = req.url.searchParams.get('name')!;

    //组装数据
    const query = { personId, name };

    //调用写入数据的函数
    const projectData = await db.ScreensProjectsData(projectDB, query);
    if (projectData) {
      return res(
        //延迟两秒返回数据
        //ctx.delay(6000),
        ctx.status(200),
        ctx.json(projectData)
      );
    }
    return res(ctx.status(500));

  }),
  /**
   * @todo 响应post请求获得项目数据
   */

  rest.post<Partial<Project>>(`${API_URL}/projects`, async (req, res, ctx) => {

    // 获得前瑞发送的参数,

    const body = await req.json();

    const addProject = qs.parse(body);
    //const { name, organization, personId } = addProject;
    //类型守卫
    const name: string = typeof addProject.name === 'string' ? addProject.name : '';

    const organization: string = typeof addProject.organization === 'string' ? addProject.organization : '';
    const personId: string = typeof addProject.personId === 'string' ? addProject.personId : '';
    console.log(addProject, 'add001');

    const nanoid = customAlphabet('1234567890', 10);
    //组装数据
    const addProjectItem = { created: Date.now(), id: Number(nanoid()), name, organization, personId: Number(personId), pin: false };




    //调用写入数据的函数
    const projectData = await db.addProjectsData(projectDB, addProjectItem);

    return res(
      //延迟
      //ctx.delay(1000 * 60),

      ctx.json({ projectData })
    );



  }),
  /**
  * @todo 响应put请求
  */

  rest.put<Partial<Project>>(`${API_URL}/projects/:id`, async (req, res, ctx) => {

    // 获得前瑞发送的参数
    const { id } = req.params;

    const updates: Partial<Project> = await req.json();

    const projectData = await db.projectsUpdata(projectDB, id as string, updates);


    return res(
      //延迟
      //ctx.delay(1000 * 60),
      ctx.json({ projectData })
    );


  }),

  /**
  * @todo 响应delete请求
  */

  rest.delete<Partial<Project>>(`${API_URL}/projects/:id`, async (req, res, ctx) => {
    // 获得前瑞发送的参数
    const { id } = req.params;
    const projectData = await db.projectDetele(projectDB, id as string);
    return res(
      //延迟
      //ctx.delay(1000 * 60),
      ctx.json({ projectData })
    );
  }),

  /**
   * @todo 根据id请求project
   */

  rest.get<Partial<Project>>(`${API_URL}/project/:id`, async (req, res, ctx) => {
    // 获得前瑞发送的参数
    const { id } = req.params;
    const projectData = await db.ScreensProjectData(projectDB, id as string);
    return res(
      //延迟
      //ctx.delay(1000 * 60),
      ctx.json(projectData)
    );
  }),

  /****************************************************
   * 响应各种displayBoard项目数据请求
   *  displayBoard项目数据请求
   * @todo 响应get请求获得项目数据
   */

  rest.get<DisplayBoard>(`${API_URL}/displayBoards`, async (_req, res, ctx) => {

    //调用写入数据的函数
    //const projectData = [{ name: '待完成' }, { name: '开发中' }, { name: '完成' }];
    const displayBoardsData = await db.ScreensDisplayBoards(displayBoardDB);
    if (displayBoardsData) {
      return res(
        //延迟两秒返回数据
        //ctx.delay(6000),
        ctx.status(200),
        ctx.json(displayBoardsData)
      );
    }
    return res(ctx.status(500));

  }),

  /**
   * @todo 响应post请求增加displayBoard项目数据
   */

  rest.post<Partial<DisplayBoard>>(`${API_URL}/displayBoards`, async (req, res, ctx) => {

    // 获得前瑞发送的参数,
    //Request 接口的 json() 方法读取请求体并将其作为一个 promise 返回一个对象
    const body = await req.json();
    //console.log(body, '002');

    //通过qs.parse方法把url中的参数（name=sdf&projectId=1 002）解析成对象
    const addDisplayBoard = qs.parse(body);

    //类型守卫
    const name: string = typeof addDisplayBoard.name === 'string' ? addDisplayBoard.name : '';

    const projectId: string = typeof addDisplayBoard.projectId === 'string' ? addDisplayBoard.projectId : '';

    const nanoid = customAlphabet('1234567890', 10);
    //组装数据
    const addDisplayBoardItem = { ownerId: Date.now(), id: Number(nanoid()), name, projectId: Number(projectId) };

    //调用写入数据的函数
    const displayBoardtData = await db.addDisplayBoardData(displayBoardDB, addDisplayBoardItem);

    return res(
      //延迟
      //ctx.delay(1000 * 60),

      ctx.json({ displayBoardtData })

    );

  }),

  /**
    * @todo 响应delete请求删除displayBoard项目数据
    */

  rest.delete<Partial<DisplayBoard>>(`${API_URL}/displayBoards/:id`, async (req, res, ctx) => {
    // 获得前瑞发送的参数
    const { id } = req.params;
    const displayBoardData = await db.displayBoardsDetele(displayBoardDB, id as string);
    return res(
      //延迟
      //ctx.delay(1000 * 60),
      ctx.json({ displayBoardData })
    );
  }),

  /****************************************************
   * 响应各种tasks数据请求
   * @todo 响应get请求获得项目数据
  */
  rest.get<Task>(`${API_URL}/tasks`, async (req, res, ctx) => {
    // 获得前瑞发送的参数
    const typeId: string = req.url.searchParams.get('typeId')!;

    const name: string = req.url.searchParams.get('name')!;

    const processorId: string = req.url.searchParams.get('processorId')!;

    //组装数据
    const query = { typeId, name, processorId };
    //调用写入数据的函数
    const tasksAllData = await db.ScreensTasks(taskDB, query);
    if (tasksAllData) {
      return res(
        //延迟两秒返回数据
        //ctx.delay(6000),
        ctx.status(200),
        ctx.json(tasksAllData)
      );
    }
    return res(ctx.status(500));

  }),
  /**
 * @todo 响应post响应add请求返回tasks数据
 */

  rest.post<Partial<Task>>(`${API_URL}/tasks`, async (req, res, ctx) => {

    // 获得前瑞发送的参数,
    //Request 接口的 json() 方法读取请求体并将其作为一个 promise 返回一个对象
    const body = await req.json();
    console.log(body, '002');

    //通过qs.parse方法把url中的参数（name=sdf&projectId=1 002）解析成对象
    const addTask = qs.parse(body);

    //类型守卫
    const name: string = typeof addTask.name === 'string' ? addTask.name : '';

    const projectId: string = typeof addTask.projectId === 'string' ? addTask.projectId : '';

    const displayBoardId: string = typeof addTask.displayBoardId === 'string' ? addTask.displayBoardId : '';

    const nanoid = customAlphabet('1234567890', 10);

    //组装数据

    const addTaskItem = {
      ownerId: Date.now(),
      id: Number(nanoid()),
      name,
      projectId: Number(projectId),
      displayBoardId: Number(displayBoardId),
      typeId: 1
    };

    //调用写入数据的函数
    const tasktData = await db.addTaskData(taskDB, addTaskItem);

    return res(
      //延迟
      //ctx.delay(1000 * 60),

      ctx.json({ tasktData })

    );

  }),

  /**
    * @todo 响应put请求
    */

  rest.put<Partial<Task>>(`${API_URL}/tasks/:id`, async (req, res, ctx) => {

    // 获得前瑞发送的参数
    const { id } = req.params;

    const updates: Partial<Task> = await req.json();
    console.log(updates, '001');


    const taskData = await db.taskUpdata(taskDB, id as string, updates);


    return res(
      //延迟
      //ctx.delay(1000 * 60),
      ctx.json({ taskData })
    );


  }),
  /**
  * @todo 响应delete请求
  */

  rest.delete<Partial<Task>>(`${API_URL}/tasks/:id`, async (req, res, ctx) => {
    // 获得前瑞发送的参数
    const { id } = req.params;
    const taskData = await db.taskDetele(taskDB, id as string);
    return res(
      //延迟
      //ctx.delay(1000 * 60),
      ctx.json({ taskData })
    );
  }),
  /**
  * @todo 根据id响应get请求taskModal数据
  */

  rest.get<Partial<Task>>(`${API_URL}/tasks/:id`, async (req, res, ctx) => {
    // 获得前瑞发送的参数
    const { id } = req.params;
    const taskData = await db.ScreensTaskData(taskDB, id as string);
    return res(
      //延迟
      //ctx.delay(1000 * 60),
      ctx.json(taskData)
    );
  }),

  /****************************************************
  * 响应各种taskType数据请求
  * @todo 响应get请求获得项目数据
  */
  rest.get<TaskType>(`${API_URL}/taskTypes`, async (_req, res, ctx) => {

    //调用写入数据的函数
    const taskTypeAllData = await db.ScreensTaskTypes(taskTypeDB);
    if (taskTypeAllData) {
      return res(
        //延迟两秒返回数据
        //ctx.delay(6000),
        ctx.status(200),
        ctx.json(taskTypeAllData)
      );
    }
    return res(ctx.status(500));

  }),
  /****************************************************
   * 响应各种epics数据请求
   * @todo 响应get请求获得任务数据
  */
  rest.get<Epic>(`${API_URL}/epics`, async (_req, res, ctx) => {
    // 获得前瑞发送的参数

    //调用写入数据的函数
    const epicsData = await db.ScreensEpic(epicDB);
    if (epicsData) {
      return res(
        //延迟两秒返回数据
        //ctx.delay(6000),
        ctx.status(200),
        ctx.json(epicsData)
      );
    }
    return res(ctx.status(500));

  }),
  /**
   * @todo 响应post响应add请求返回epics数据
   */

  rest.post<Partial<Epic>>(`${API_URL}/epics`, async (req, res, ctx) => {

    // 获得前瑞发送的参数,
    //Request 接口的 json() 方法读取请求体并将其作为一个 promise 返回一个对象
    const body = await req.json();
    console.log(body, '002');

    //通过qs.parse方法把url中的参数（name=sdf&projectId=1 002）解析成对象
    const addEpic = qs.parse(body);

    //类型守卫
    const name: string = typeof addEpic.name === 'string' ? addEpic.name : '';

    const projectId: string = typeof addEpic.projectId === 'string' ? addEpic.projectId : '';

    //const displayBoardId: string = typeof addTask.displayBoardId === 'string' ? addTask.displayBoardId : '';

    const nanoid = customAlphabet('1234567890', 10);

    //组装数据

    const addTaskItem = {
      ownerId: Date.now(),
      id: Number(nanoid()),
      name,
      projectId: Number(projectId),

    };

    //调用写入数据的函数
    const epicData = await db.addEpicData(epicDB, addTaskItem);

    return res(
      //延迟
      //ctx.delay(1000 * 60),

      ctx.json({ epicData })

    );

  }),
  /**
    * @todo 响应delete请求删除epics任务数据
    */

  rest.delete<Partial<Epic>>(`${API_URL}/epics/:id`, async (req, res, ctx) => {
    // 获得前瑞发送的参数
    const { id } = req.params;
    const epicsData = await db.epicsDetele(epicDB, id as string);
    return res(
      //延迟
      //ctx.delay(1000 * 60),
      ctx.json({ epicsData })
    );
  }),
];
