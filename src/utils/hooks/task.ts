/**
 * @author meng
 * @version 1.0
 * @date 2023/03/20
 * @file 获取task数据的自定义hook
 */
import { QueryKey, useMutation, useQuery, useQueryClient } from 'react-query';

//导入API请求

import { http } from '@/api/http';
//导入类型
import { Task } from '@/types/task';
import { SortProps } from './displayBoard';
import { reorder } from '@/utils/hooks/reorder';
/**
* @function
* 通过useQuery获取isplayBoard数据
*/

export const useTasks = (param?: Partial<Task>) =>

  useQuery<Task[]>(['tasks', param], () =>

    http({
      url: 'tasks',
      data: param,
      method: 'get'
    })
  );

/**
* @function
* 通过useQuery增加tasks数据
*/

export const useAddTask = (queryKey: QueryKey) => {

  const queryClient = useQueryClient();

  return useMutation((params: Partial<Task>) =>

    http({
      url: 'tasks',
      data: params,
      method: 'post'
    }),
    {
      // queryClient.invalidateQueries： 在提交成功/失败之后都进行重新查询更新状态
      onSuccess: () => queryClient.invalidateQueries(queryKey),

      async onMutate(target) {
        //组装对象写入缓存数据
        const newTarget = { ...target, ownerId: Date.now() };
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
        queryClient.setQueryData(queryKey, (context as { previousItems: Task[] }).previousItems);
      },
      // 总是在错误或成功后重新获取
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );

};

/**
* @function
* 编辑task
*/

export const useEditTask = (queryKey: QueryKey) => {

  const queryClient = useQueryClient();
  //const [searchParams] = useProjectSearchParam();
  //定义对应的缓存数据的key
  //const queryKey = ['projects', searchParams];
  const mutation = useMutation(

    (params: Partial<Task>) =>

      http({
        url: `tasks/${params.id}`,
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
        queryClient.setQueryData(queryKey, (old?: Task[]) => old?.map(task => task.id === target.id ? { ...task, ...target } : task) || []);
        return { previousItems };
      },
      //出现错误后回滚
      onError(error: Error, newItem, context) {
        console.log(error, newItem);

        queryClient.setQueryData(queryKey, (context as { previousItems: Task[] }).previousItems);
      },
    }
  );

  return mutation;
};

/**
* @function
* useDeleteTask
*/

export const useDeleteTask = (queryKey: QueryKey) => {

  const queryClient = useQueryClient();

  const mutation = useMutation(

    ({ id }: { id: number }) =>

      http({
        url: `tasks/${id}`,
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
        queryClient.setQueryData(queryKey, (context as { previousItems: Task[] }).previousItems);
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
* @function 通过ID获取task的详情数据
*/
export const useTask = (id?: number) => {

  const result = useQuery<Task>(['task', { id }], () =>

    http({
      url: `tasks/${id}`,
      method: 'get'
    }),
    {
      //第三个参数处理传入的id为undefined时不触发获取，当ID有值时触发获取数据
      enabled: Boolean(id)
    }
  );
  return result;
};

/**
* @function 拖拽task数据
*/
export const useReorderTask = (queryKey: QueryKey) => {

  const queryClient = useQueryClient();
  return useMutation((params: SortProps) =>

    http({
      url: 'tasks/reorder',
      data: params,
      method: 'post'
    }),
    {
      // queryClient.invalidateQueries： 在提交成功/失败之后都进行重新查询更新状态
      onSuccess: () => queryClient.invalidateQueries(queryKey),

      async onMutate(target) {


        //取消任何传出的重新获取（这样它们就不会覆盖我们的乐观更新）
        await queryClient.cancelQueries(queryKey);
        //query缓存中的数据
        const previousItems = queryClient.getQueryData(queryKey);

        //向缓存中设置数据,这里会出现形参和实参不符的问题，解决是在old后面加？
        queryClient.setQueryData(queryKey, (old?: any[]) => {
          const orderedList = reorder({ list: old?.map((item: { id: number, name: string, displayBoardId: number, typeId: number }) => ({ id: item.id, name: item.name, displayBoardId: item.displayBoardId, typeId: item.typeId })) as Task[], ...target }) as Task[];

          return orderedList.map((item) => item.id === target.fromId
            ? { ...item, displayBoardId: target.toKanbanId }
            : item);
        });

        return { previousItems };
      },
      //出现错误后回滚
      onError(_error: Error, _newItem, context) {
        queryClient.setQueryData(queryKey, (context as { previousItems: Task[] }).previousItems);
      },
      // 总是在错误或成功后重新获取
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );
};
