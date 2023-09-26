/**
 * @author meng
 * @version 1.0
 * @date 2023/03/29
 * @file 获取taskType的自定义hook
 */
import { useQuery } from 'react-query';

//导入API请求

import { http } from '@/api/http';
//导入类型
import { TaskType } from '@/types/taskType';

/**
* @function
* 通过useQuery获取isplayBoard数据
*/

export const useTaskTypes = () =>

  useQuery<TaskType[]>(['taskTypes'], () =>

    http({
      url: 'taskTypes',
      method: 'get'
    })
  );
