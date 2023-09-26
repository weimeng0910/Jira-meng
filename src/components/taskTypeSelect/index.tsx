import React from 'react';

import { IdSelect } from '@/components/idSelect/id-select';
import { useTaskTypes } from '@/utils/hooks/taskType';

/**
 * @author meng
 * @version 1.0
 * * @date 2023/03/31
 * @file 看板搜索选择
 */
export const TaskTypeSelect = (props: React.ComponentProps<typeof IdSelect>) => {
    const { data: taskTypes } = useTaskTypes();
    return (
        <IdSelect
            options={taskTypes || []}
            {...props}
        />
    );
};
