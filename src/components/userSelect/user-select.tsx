/**
 * @author meng
 * @version 1.0
 * @date 2023/01/04
 * @file 抽像select组件
 */
import { ComponentProps } from 'react';

import { IdSelect } from '@/components/idSelect/id-select';
import { useUser } from '@/utils/hooks/users';

export const UserSelect = (props: ComponentProps<typeof IdSelect>) => {
    //加载用户数据，users获取工程用户列表
    const { data: users } = useUser();
    return (
        <IdSelect
            options={users || []}
            {...props}
        />
    );
};
