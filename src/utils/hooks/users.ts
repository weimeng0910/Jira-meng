/**
 * @author meng
 * @version 1.0
 * @date 2022/11/30
 * 获取工程用户列表的自定义hook
 */
import { useQuery } from 'react-query';

//导入API请求
import { getUsersList } from '@/api/index';
//导入类型
import { User } from '@/types/user';

export const useUser = (param?: Partial<User>) => useQuery<User[]>(['users', param], () =>

  getUsersList());
