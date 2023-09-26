/**
 * @author meng
 * @version 1.0
 * @date 2023/1/4
 * @file 获取项目列表搜索的参数，从url参数param获取
 * 返回页面url中，指定键的参数值
 */
import { useMemo } from 'react';

import { useSetUrlSearchParam, useUrlQueryParam } from '@/utils/hooks/useUrlQueryParam';
// eslint-disable-next-line import/no-cycle
import { useProject } from '@/utils/hooks/project';

export const useProjectSearchParam = () => {
  //要搜索的数据
  //返回新的对象，造成地址改变后不断渲染
  //用这个方法来设置路由地址跟随输入框变化
  //服务器返回string类型
  const [param, setParam] = useUrlQueryParam(['name', 'personId']);
  return [
    //采用useMemo解决重复调用的问题
    useMemo(
      () => ({
        ...param,
        personId: Number(param.personId) || undefined,
      }), [param]),
    setParam,
  ] as const;
  //在 TypeScript 中使用 as const 时，我们可以将对象的属性或数组的元素设置为只读，向语言表明表达式中的类型不会被扩大
  //const断言告诉编译器为表达式推断出它能推断出的最窄或最特定的类型。如果不使用它，
  //编译器将使用其默认类型推断行为，这可能会导致更广泛或更一般的类型。
};

export const useProjectsQueryKey = () => {
  const [params] = useProjectSearchParam();
  return ['projects', params];
};
/**
 * @hook 从url参数param获取状态，这个hook在这里扮演全局状态管理器的作用，可以取代redux和context的作用
 * 向需要使用这个状态的地方提供全局状态
 */
export const useProjectModal = () => {

  //获取url参数,来判断是否是创建
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    'projectCreate',
  ]);
  //判断当前是不是在编辑，解构出当前编辑项目的id
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    'editingProjectId',
  ]);


  const setUrlParams = useSetUrlSearchParam();
  //获取根据id获取project方法
  const { data: editingProject, isLoading } = useProject(

    Number(editingProjectId)

  );


  //open方法
  const open = () => setProjectCreate({ projectCreate: true });
  //关闭的方法
  const close = () => setUrlParams({ projectCreate: undefined, editingProjectId: undefined });

  //根据id编辑project数据
  const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id });
  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    isLoading,
    editingProject
  };


};
