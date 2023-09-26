import { Button, Input } from 'antd';

import { useTasksSearchParams } from './util';
import { Row } from '@/components/lib/lib';
import { TaskTypeSelect } from '@/components/taskTypeSelect';
import { UserSelect } from '@/components/userSelect/user-select';
import { useSetUrlSearchParam } from '@/utils/hooks/useUrlQueryParam';

/**
 * @author meng
 * @version 1.0
 * * @date 2023/03/31
 * @file DisplayBoar看板搜索页
 */
export const SearchPanel = () => {
    //获取task中的参数
    const searchParams = useTasksSearchParams();
    //设置参数
    const setSearchParams = useSetUrlSearchParam();
    //重置
    const reset = () => {
        setSearchParams({
            typeId: undefined,
            processorId: undefined,
            tagId: undefined,
            name: undefined
        });
    };
    return (
        <Row
            marginBottom={4}
            gap
        >
            <Input
                style={{ width: '20rem' }}
                placeholder='任务名'
                value={searchParams.name}
                onChange={evt => setSearchParams({ name: evt.target.value })}
            />
            <UserSelect
                defaultOptionName='经办人'
                value={searchParams.processorId}
                onChange={value => setSearchParams({ processorId: value })}
            />
            <TaskTypeSelect
                defaultOptionName='类型'
                value={searchParams.typeId}
                onChange={value => setSearchParams({ typeId: value })}
            />
            <Button onClick={reset}>清除筛选器</Button>
        </Row>
    );
};
