import styled from '@emotion/styled';
import { Card, Dropdown, Button, Menu, Modal } from 'antd';
import React from 'react';

import { CreateTask } from './createTask';
import bugIcon from '@/assets/bug.svg';
import taskIcon from '@/assets/task.svg';
import { Drag, Drop, DropChild } from '@/components/dragAndDrop';
import { Row } from '@/components/lib/lib';
import { Mark } from '@/components/mark';
import {
    useTasksModal,
    useTasksSearchParams,
    useDisplayBoardQueryKey
} from '@/screens/displayBoard/util';
import { DisplayBoard } from '@/types/displayBoard';
import { Task } from '@/types/task';
import { useDeleteDisplayBoard } from '@/utils/hooks/displayBoard';
import { useTasks } from '@/utils/hooks/task';
import { useTaskTypes } from '@/utils/hooks/taskType';

/**
 * @author meng
 * @version 1.0
 * * @date 2022/03/20
 * @file DisplayBoard看板页面的每一个task列表
 */
//外部容器样式
export const Container = styled.div`
    min-width: 27rem;
    border-radius: 6px;
    background-color: rgb(244, 245, 247);

    display: flex;
    flex-direction: column;
    padding: 0.7rem 0.7rem 1rem;
    margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
    overflow: scroll;
    flex: 1;
    ::-webkit-scrollbar {
        display: none;
    }
`;
//新建组件来获取taskType的列表，然后根据ID来渲染对应的图片
const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data: taskTypes } = useTaskTypes();
    const name = taskTypes?.find(taskType => taskType.id === id)?.name;
    if (!name) {
        return null;
    }
    return (
        <img
            alt=''
            src={name === 'task' ? taskIcon : bugIcon}
        />
    );
};

/**
 * @todo 抽像Card，让看板组件和Crad组件各司其职
 * @param task
 */

const TaskCard = ({ task }: { task: Task }) => {
    //打开编辑modal
    const { startEdit } = useTasksModal();
    //获取URL中的参数
    const { name: keyword } = useTasksSearchParams();
    return (
        <Card
            onClick={() => startEdit(task.id)}
            style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
            key={task.id}
        >
            <p>
                <Mark
                    keyword={keyword}
                    name={task.name}
                />
            </p>

            <TaskTypeIcon id={task.typeId} />
        </Card>
    );
};
/**
 * @todo 看板列表删除
 * @param displayBoard
 */
const More = ({ displayBoard }: { displayBoard: DisplayBoard }) => {
    //获取删除看板的方法
    const { mutateAsync } = useDeleteDisplayBoard(useDisplayBoardQueryKey());
    const startDelete = () => {
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            title: '确定删除看板吗',
            onOk() {
                return mutateAsync({ id: displayBoard.id });
            }
        });
    };
    //
    const overlay = (
        <Menu>
            <Menu.Item>
                <Button
                    type='link'
                    onClick={startDelete}
                >
                    删除
                </Button>
            </Menu.Item>
        </Menu>
    );
    return (
        <Dropdown overlay={overlay}>
            <Button type='link'>...</Button>
        </Dropdown>
    );
};
/**
 * @todo 看板列表
 * @param displayBoard
 */
// eslint-disable-next-line react/display-name
export const DisplayBoardColumn = React.forwardRef<HTMLDivElement, { displayBoard: DisplayBoard }>(
    ({ displayBoard, ...props }, ref) => {
        const { data: allTasks } = useTasks(useTasksSearchParams());
        const tasks = allTasks?.filter(task => task.displayBoardId === displayBoard.id);
        //下面的<DropChild style={{ minHeight: '1rem' }}>，加这个style是防止在看板中没有任务时能拖动回来
        return (
            <Container
                {...props}
                ref={ref}
            >
                <Row between>
                    <h3>{displayBoard.name}</h3>
                    <More
                        displayBoard={displayBoard}
                        key={displayBoard.id}
                    />
                </Row>
                <TasksContainer>
                    <Drop
                        type='ROW'
                        direction='vertical'
                        droppableId={String(displayBoard.id)}
                    >
                        <DropChild style={{ minHeight: '5rem' }}>
                            {tasks?.map((task, taskIndex) => (
                                <Drag
                                    key={task.id}
                                    index={taskIndex}
                                    draggableId={`task${task.id}`}
                                >
                                    <div key={task.id}>
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                        />
                                    </div>
                                </Drag>
                            ))}
                            <CreateTask displayBoardId={displayBoard.id} />
                        </DropChild>
                    </Drop>
                </TasksContainer>
            </Container>
        );
    }
);
