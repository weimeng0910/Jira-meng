/**
 * @author meng
 * @version 1.0
 * @date 2022/11/30
 * @file 获取工程列表的自定义hook
 */
import { useEffect, useCallback } from 'react';

import { cleanObject } from '@/utils/cleanObject';
//导入处定义hook,处理异步加载
import { useAsync } from '@/utils/hooks/useAsync';
//导入API请求
import { getProjectsList } from '@/api/index';
import { http } from '@/api/http';
//导入类型
import { Project } from '@/types/Project';

export const useProjects = (param?: Partial<Project>) => {
  //定义请求的工程列表的状态
  const { run, ...result } = useAsync<Project[]>();

  /**
   * @function
   * 请求数据
   * */
  const fetchProjects = useCallback(() => getProjectsList(cleanObject(param || {})), [param]);

  useEffect(() => {
    run(fetchProjects(), {

      retry: fetchProjects
    });

    //非状态类型和基本类型是不可以放在依赖中，会造成无限循环
  }, [param, run, fetchProjects]);
  return result;
};

/**
   * @function
   * 编辑project
   * */

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();

  const mutate = (params: Partial<Project>) => {
    const result = run(http({
      url: `projects/${params.id}`,
      data: params,
      method: 'put'
    }));
    return result;
  };
  return {
    mutate,
    ...asyncResult
  };
};
/**
   * @function
   * 增加project
   * */

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();

  const mutate = (params: Partial<Project>) => {

    run(http({
      url: `projects/${params.id}`,
      data: params,
      method: 'post'
    }));
  };
  return {
    mutate,
    ...asyncResult//useAsync中的其它属性，例如isLoding
  };
};
