import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router';

import { useProject } from '@/utils/hooks/project';
import { useUrlQueryParam } from '@/utils/hooks/useUrlQueryParam';
import { useTask } from '@/utils/hooks/task';

/**
 * @author meng
 * @version 1.0
 * * @date 2022/03/20
 * @file DisplayBoar看板util
 */

//获取url中的id
export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();//这个钩子返回当前location历史对象
  const id = pathname.match(/projects\/(\d+)/)?.[1];//用正则表达式取出id
  return Number(id);
};

//通过id来获得整个project
export const useProjectInUrl = () => useProject(useProjectIdInUrl());

/* 对pathname进行正则取值
var pathname='www.google.com/projects/123';pathname.match(/projects\/(\d+)/)
* 输出
(2)['projects/123', '123', index: 15, input: 'www.google.com/projects/123', groups: undefined]
*/
//获取url中的Id
export const useDisplayBoardSearchParams = () => ({ projectId: useProjectIdInUrl() });

//设置看板的querykey
export const useDisplayBoardQueryKey = () => ['displayBoards', useDisplayBoardSearchParams()];

//获取tasks的url参数
export const useTasksSearchParams = () => {
  //name用来搜索任务名称，typeId用来搜索task类型，processorId用来搜索负责人，tagId用来搜素
  const [param] = useUrlQueryParam([
    'name',
    'typeId',
    'processorId',
    'tagId'
  ]);
  const projectId = useProjectIdInUrl();
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name,
    }),
    [projectId, param]
  );

};

//设置Tasks的querykey
export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()];

//点击task弹出的Modal数据获取
export const useTasksModal = () => {
  //通过useUrlQueryParam这个hook来获取编辑task时的URL中id并获取设置方法
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([

    'editingTaskId',

  ]);

  //通过ID获取相对应的task数据和loading
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));

  //定义开始编辑的方法，这里使用useCallback,是因为这个startEdit要返回出来
  //useCallback 返回一个记忆化的回调函数，这个函数只有在依赖项改变时才会发生变化。这是对回调函数进行性能优化的一种方式，以确保子组件不会在父组件重新渲染时重复渲染。
  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );

  //定义关闭的方法
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: '' });
  }, [setEditingTaskId]);
  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading,
  };
};
