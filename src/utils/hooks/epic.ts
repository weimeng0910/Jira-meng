/**
 * @author meng
 * @version 1.0
 * @date 2023/05/16
 * @file 获取任务列表的自定义hook project.ts
 */

import { QueryKey, useQuery, useMutation, useQueryClient } from 'react-query';
import { nanoid } from 'nanoid';

//导入API请求
import { http } from '@/api/http';
//导入类型
import { Epic } from '@/types/epic';
//// eslint-disable-next-line import/no-cycle
//import { useProjectSearchParam } from '@/screens/project-list/util';
/**
* @function
* 通过useQuery获取Epics数据
*/

export const useEpics = (param?: Partial<Epic>) =>

  useQuery<Epic[]>(['epics', param], () =>

    http({
      url: 'epics',
      data: param,
      method: 'get'
    })
  );


/**
* @function
* 增加Epic
*/

export const useAddEpic = (queryKey: QueryKey) => {

  const queryClient = useQueryClient();

  //定义对应的缓存数据的key

  return useMutation((params: Partial<Epic>) =>

    http({
      url: 'epics',
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
        queryClient.setQueryData(queryKey, (context as { previousItems: Epic[] }).previousItems);
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

export const useDeleteEpic = (queryKey: QueryKey) => {

  const queryClient = useQueryClient();

  const mutation = useMutation(

    ({ id }: { id: number }) =>

      http({
        url: `epics/${id}`,
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
        queryClient.setQueryData(queryKey, (context as { previousItems: Epic[] }).previousItems);
      },
      // 总是在错误或成功后重新获取
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );

  return mutation;

};
