/**
 * @author meng
 * @version 1.0
 * @file 任务页面
 */
import { Button, List, Modal } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { CreateEpic } from './createEpic';
import { ScreenContainer, Row } from '@/components/lib/lib';
import { useEpicSearchParams, useEpicsQueryKey } from '@/screens/epic/util';
import { Epic } from '@/types/epic';
import { useDeleteEpic, useEpics } from '@/utils/hooks/epic';
// eslint-disable-next-line import/order
import { useTasks } from '@/utils/hooks/task';

import { useProjectInUrl } from '../displayBoard/util';

export const EpicScreen = () => {
    const { data: currentProject } = useProjectInUrl();
    const { data: epics } = useEpics(useEpicSearchParams());
    const { data: tasks } = useTasks({ projectId: currentProject?.id });
    console.log(tasks, '001tasks');

    const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());
    const [epicCreateOpen, setEpicCreateOpen] = useState(false);

    const confirmDeleteEpic = (epic: Epic) => {
        Modal.confirm({
            title: `确定删除项目组：${epic.name}`,
            content: '点击确定删除',
            okText: '确定',
            onOk() {
                deleteEpic({ id: epic.id });
            }
        });
    };

    return (
        <ScreenContainer>
            <Row between>
                <h1>{currentProject?.name}任务组</h1>
                <Button
                    onClick={() => setEpicCreateOpen(true)}
                    type='link'
                >
                    创建任务组
                </Button>
            </Row>
            <List
                style={{ overflow: 'scroll' }}
                dataSource={epics}
                itemLayout='vertical'
                renderItem={epic => (
                    <List.Item>
                        <List.Item.Meta
                            title={
                                <Row between>
                                    <span>{epic.name}</span>
                                    <Button
                                        onClick={() => confirmDeleteEpic(epic)}
                                        type='link'
                                    >
                                        删除
                                    </Button>
                                </Row>
                            }
                            description={
                                <div>
                                    <div>开始时间：{dayjs(epic.start).format('YYYY-MM-DD')}</div>
                                    <div>结束时间：{dayjs(epic.end).format('YYYY-MM-DD')}</div>
                                </div>
                            }
                        />
                        <div>
                            {tasks
                                ?.filter(task => task.epicId === epic.id)
                                .map(task => (
                                    <Link
                                        to={`/projects/${currentProject?.id}/displayBoard?editingTaskId=${task.id}`}
                                        key={task.id}
                                    >
                                        {task.name}
                                    </Link>
                                ))}
                        </div>
                    </List.Item>
                )}
            />
            <CreateEpic
                onClose={() => setEpicCreateOpen(false)}
                visible={epicCreateOpen}
            />
        </ScreenContainer>
    );
};
