/**
 * @author meng
 * @version 1.0
 * @date 2023/03/14
 * @file 获取看板数据的自定义hook
 */
import { QueryKey, useMutation, useQuery, useQueryClient } from 'react-query';
//导入API请求
import { nanoid } from 'nanoid';

import { http } from '@/api/http';
//导入类型
import { DisplayBoard } from '@/types/displayBoard';
import { reorder } from '@/utils/hooks/reorder';

/**
* @function
* 通过useQuery获取isplayBoard数据
*/

export const useDisplayBoard = (param?: Partial<DisplayBoard>) =>

  useQuery<DisplayBoard[]>(['displayBoards', param], () =>

    http({
      url: 'displayBoards',
      data: param,
      method: 'get'
    })
  );

/**
* @function
* 通过useQuery增加DisplayBoard数据
*/

export const useAddDisplayBoard = (queryKey: QueryKey) => {

  const queryClient = useQueryClient();
  //const [searchParams] = useDisplayBoardSearchParams();
  //定义对应的缓存数据的key
  //const queryKey = ['displayBoards ', searchParams];
  return useMutation((params: Partial<DisplayBoard>) =>

    http({
      url: 'displayBoards',
      data: params,
      method: 'post'
    }),
    {
      // queryClient.invalidateQueries： 在提交成功/失败之后都进行重新查询更新状态
      onSuccess: () => queryClient.invalidateQueries(queryKey),

      async onMutate(target) {
        //组装对象写入缓存数据
        const newTarget = { ...target, id: nanoid(), ownerId: Date.now() };
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
        queryClient.setQueryData(queryKey, (context as { previousItems: DisplayBoard[] }).previousItems);
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
*  useDeleteDisplayBoard通过useQuery删除isplayBoard数据
*/
export const useDeleteDisplayBoard = (queryKey: QueryKey) => {

  const queryClient = useQueryClient();

  const mutation = useMutation(

    ({ id }: { id: number }) =>

      http({
        url: `displayBoards/${id}`,
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
        queryClient.setQueryData(queryKey, (context as { previousItems: DisplayBoard[] }).previousItems);
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
* @function
*  useReorderDisplayBoard通过useQuer更新拖拽看板和任务的DisplayBoard数据
*/

//定义拖动的类型
export interface SortProps {
  // 要重新排序的 item
  fromId: number;
  // 目标 item
  referenceId: number;
  // 放在目标item的前还是后
  type: 'before' | 'after';
  fromKanbanId?: number;
  toKanbanId?: number;
}

export const useReorderDisplayBoard = (queryKey: QueryKey) => {

  const queryClient = useQueryClient();


  return useMutation((params: SortProps) =>

    http({
      url: 'displayBoards/reorder',
      data: params,
      method: 'post'
    }),
    {
      // queryClient.invalidateQueries： 在提交成功/失败之后都进行重新查询更新状态
      onSuccess: () => queryClient.invalidateQueries(queryKey),

      async onMutate(target) {

        //取消任何传出的重新获取（这样它们就不会覆盖我们的乐观更新）
        await queryClient.cancelQueries(queryKey);
        //query缓存中的数据,queryClient.getQueryData：获取缓存的旧值
        const previousItems = queryClient.getQueryData(queryKey);

        //向缓存中设置数据,这里会出现形参和实参不符的问题，解决是在old后面加？
        queryClient.setQueryData(queryKey, (old?: any[]) => reorder({ list: old?.map((item: { id: number, name: string }) => ({ id: item.id, name: item.name })) as DisplayBoard[], ...target }));
        // 返回具有快照值的上下文对象
        return { previousItems };
      },
      //出现错误后回滚
      onError(_error: Error, _newItem, context) {
        queryClient.setQueryData(queryKey, (context as { previousItems: DisplayBoard[] }).previousItems);
      },
      // 总是在错误或成功后重新获取
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );
};
