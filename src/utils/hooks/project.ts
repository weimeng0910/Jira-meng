/**
 * @author meng
 * @version 1.0
 * @date 2022/11/30
 * @file 获取工程列表的自定义hook project.ts
 * @date 2023/02/08利用react-query来获取缓存数据
 */

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { nanoid } from 'nanoid';

//导入API请求
import { http } from '@/api/http';
//导入类型
import { Project } from '@/types/Project';
// eslint-disable-next-line import/no-cycle
import { useProjectSearchParam } from '@/screens/project-list/util';
/**
* @function
* 通过useQuery获取project数据
*/

export const useProjects = (param?: Partial<Project>) =>

  useQuery<Project[]>(['projects', param], () =>

    http({
      url: 'projects',
      data: param,
      method: 'get'
    })
  );
/**
* @function
* 编辑project
*/

export const useEditProject = () => {

  const queryClient = useQueryClient();
  const [searchParams] = useProjectSearchParam();
  //定义对应的缓存数据的key
  const queryKey = ['projects', searchParams];
  const mutation = useMutation(

    (params: Partial<Project>) =>

      http({
        url: `projects/${params.id}`,
        data: params,
        method: 'put'
      }),

    {
      //queryClient.invalidateQueries： 在提交成功/失败之后都进行重新查询更新状态
      onSuccess: () => queryClient.invalidateQueries(queryKey),
      async onMutate(target) {
        //query缓存中的数据,queryClient.getQueryData：获取缓存的旧值
        const previousItems = queryClient.getQueryData(queryKey);
        //向缓存中设置数据,这里会出现形参和实参不符的问题，解决是在old后面加？,queryClient.setQueryData：设置值
        queryClient.setQueryData(queryKey, (old?: Project[]) => {
          console.log(old, '0098');
          return old?.map(project => project.id === target.id ? { ...project, ...target } : project) || [];
        });
        return { previousItems };
      },
      //出现错误后回滚
      onError(error: Error, newItem, context) {
        console.log(error, newItem);

        queryClient.setQueryData(queryKey, (context as { previousItems: Project[] }).previousItems);
      },
      // 总是在错误或成功后重新获取
      //onSettled: () => {
      //  queryClient.invalidateQueries(queryKey);
      //},
    }
  );

  return mutation;
};

/**
* @function
* 增加project
*/

export const useAddProject = () => {

  const queryClient = useQueryClient();
  const [searchParams] = useProjectSearchParam();
  //定义对应的缓存数据的key
  const queryKey = ['projects', searchParams];
  return useMutation((params: Partial<Project>) =>

    http({
      url: 'projects',
      data: params,
      method: 'post'
    }),
    {
      // queryClient.invalidateQueries： 在提交成功/失败之后都进行重新查询更新状态
      onSuccess: () => queryClient.invalidateQueries(queryKey),
      async onMutate(target) {
        //组装对象写入缓存数据
        const newTarget = { ...target, id: nanoid(), created: Date.now(), };
        //取消任何传出的重新获取（这样它们就不会覆盖我们的乐观更新）
        await queryClient.cancelQueries(queryKey);
        //query缓存中的数据
        const previousItems = queryClient.getQueryData(queryKey);
        //向缓存中设置数据,这里会出现形参和实参不符的问题，解决是在old后面加？
        queryClient.setQueryData(queryKey, (old?: any[]) => (old ? [...old, newTarget] : []));
        // 返回具有快照值的上下文对象


        return { previousItems };
      },
      //出现错误后回滚
      onError(_error: Error, _newItem, context) {
        queryClient.setQueryData(queryKey, (context as { previousItems: Project[] }).previousItems);
      },
      // 总是在错误或成功后重新获取
      //onSettled: () => {
      //  queryClient.invalidateQueries(queryKey);
      //},
    }
  );

};
/**
* @function
* useDeleteProject
*/

export const useDeleteProject = () => {
  const [searchParams] = useProjectSearchParam();

  //定义对应的缓存数据的key
  const queryKey = ['projects', searchParams];


  const queryClient = useQueryClient();

  const mutation = useMutation(

    ({ id }: { id: number }) =>

      http({
        url: `projects/${id}`,
        method: 'delete'
      }),

    {
      async onMutate(target) {

        //取消任何传出的重新获取（这样它们就不会覆盖我们的乐观更新）
        await queryClient.cancelQueries(queryKey);
        //query缓存中的数据
        const previousItems = queryClient.getQueryData(queryKey);
        //向缓存中设置数据,这里会出现形参和实参不符的问题，解决是在old后面加？
        queryClient.setQueryData(queryKey, (old?: any[]) => (old?.filter((item) => item.id !== target.id) || []));
        // 返回具有快照值的上下文对象
        return { previousItems };
      },
      //出现错误后回滚
      onError(_error: Error, _newItem, context) {
        queryClient.setQueryData(queryKey, (context as { previousItems: Project[] }).previousItems);
      },
      // 总是在错误或成功后重新获取
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );

  return mutation;

};
/**
* @function 通过ID获取project的详情数据
*/
export const useProject = (id?: number) => {
  //根据['project', { id }]中的id来更新project的数据，useQuery
  const result = useQuery<Project>(['project', { id }], () =>

    http({
      url: `project/${id}`,
      method: 'get'
    }),
    {
      //第三个参数处理传入的id为undefined时不触发获取，当ID有值时触发获取数据
      enabled: Boolean(id)
    }
  );
  return result;
};
