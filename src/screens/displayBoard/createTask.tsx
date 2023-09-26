import { Card, Input } from 'antd';
import { useState, useEffect } from 'react';

import { useProjectIdInUrl, useTasksQueryKey } from './util';
import { useAddTask } from '@/utils/hooks/task';

/**
 * @author meng
 * @version 1.0
 * * @date 2022/04/04
 * @file 创建task页面
 */

export const CreateTask = ({ displayBoardId }: { displayBoardId: number }) => {
    //设置task的状态
    const [name, setName] = useState('');
    //增加task数据
    const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
    //获取项目id
    const projectId = useProjectIdInUrl();
    // 设置输入状态，添加完毕后关闭
    const [inputMode, setInputMode] = useState(false);
    //创建点击响应
    const submit = async () => {
        await addTask({ projectId, name, displayBoardId });
        setInputMode(false);
        setName('');
    };
    //
    const toggle = () => setInputMode(!inputMode);

    useEffect(() => {
        //如果是iinputMode就设置为空
        if (!inputMode) {
            setName('');
        }
    }, [inputMode]);
    //如果不是就创建Mode
    if (!inputMode) {
        return <div onClick={toggle}>+创建事物</div>;
    }
    return (
        <Card>
            <Input
                onBlur={toggle}
                placeholder='需要做些什么'
                autoFocus
                onPressEnter={submit}
                value={name}
                onChange={evt => setName(evt.target.value)}
            />
        </Card>
    );
};
