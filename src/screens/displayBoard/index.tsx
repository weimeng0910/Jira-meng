import styled from '@emotion/styled';
import { Spin } from 'antd';
import { useCallback } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { CreateDisplayBoard } from './createDisplayBoard';
import { DisplayBoardColumn } from './displayBoardColumn';
import { SearchPanel } from './searchPanel';
import { TaskModal } from './taskModal';
import {
    useDisplayBoardSearchParams,
    useProjectInUrl,
    useTasksSearchParams,
    useDisplayBoardQueryKey,
    useTasksQueryKey
} from './util';
import { Drag, Drop, DropChild } from '@/components/dragAndDrop';
import { ScreenContainer } from '@/components/lib/lib';
import { useDisplayBoard, useReorderDisplayBoard } from '@/utils/hooks/displayBoard';
import { useTasks, useReorderTask } from '@/utils/hooks/task';
import { useDocumentTitle } from '@/utils/hooks/useDocumentTitle';

/**
 * @author meng
 * @version 1.0
 * * @date 2022/03/20
 * @file DisplayBoar看板页面
 */
//样式
const ColumnsContainer = styled('div')`
    display: flex;
    overflow-x: scroll;
    flex: 1;
`;
//拖拽的hook
export const useDragEnd = () => {
    //获取看板的列表数据
    const { data: displayBoards } = useDisplayBoard(useDisplayBoardSearchParams());
    //拖拽后的数据
    const { mutate: reorderDisplayBoard } = useReorderDisplayBoard(useDisplayBoardQueryKey());
    //获取tasks数据
    const { data: allTasks = [] } = useTasks(useTasksSearchParams());
    const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());
    //在hook中返回函数要用useCallback来包裹起来
    // eslint-disable-next-line consistent-return
    return useCallback(
        //source是提起来的看板，destination是目标
        // eslint-disable-next-line consistent-return
        ({ source, destination, type }: DropResult) => {
            //*如果没有拖动直接结束
            //如果没有destination，没有什么需要做，我们可以直接退出。
            if (!destination) {
                return false;
            }
            // 看板排序
            if (type === 'COLUMN') {
                //我们提起来拖动的看板id,我们从看板数据中取出source.index的那个看板，再取出id
                const fromId = displayBoards?.[source.index].id;
                //放置的目标id
                const toId = displayBoards?.[destination.index].id;
                if (!fromId || !toId || fromId === toId) {
                    return false;
                }
                const newType = destination.index > source.index ? 'after' : 'before';
                //把所需要的fromId，toId，type传入拖动的API请求数据，来保证持久化
                reorderDisplayBoard({ fromId, referenceId: toId, type: newType });
            }
            //任务排序
            if (type === 'ROW') {
                const fromKanbanId = +source.droppableId;
                const toKanbanId = +destination.droppableId;

                const fromTask = allTasks.filter(task => task.displayBoardId === fromKanbanId)[
                    source.index
                ];
                const toTask = allTasks.filter(task => task.displayBoardId === toKanbanId)[
                    destination.index
                ];
                if (fromTask?.id === toTask?.id) {
                    return false;
                }
                reorderTask({
                    fromId: fromTask?.id,
                    referenceId: toTask?.id,
                    fromKanbanId,
                    toKanbanId,
                    type:
                        fromKanbanId === toKanbanId && destination.index > source.index
                            ? 'after'
                            : 'before'
                });
            }
        },
        [displayBoards, reorderDisplayBoard, allTasks, reorderTask]
    );
};
//看板组件
export const DisplayBoardScreen = () => {
    useDocumentTitle('看板列表');
    //通过ID来获取相应的project
    const { data: currentProject } = useProjectInUrl();
    //获得所有看板列表
    const { data: displayBoards, isLoading: displayBoardLoding } = useDisplayBoard(
        useDisplayBoardSearchParams()
    );
    const { isLoading: tasksLoading } = useTasks(useTasksSearchParams());

    const isLoading = tasksLoading || displayBoardLoding;
    //组件中不能直接使用hook，必须转成纯函数
    const onDragEnd = useDragEnd();
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <ScreenContainer>
                <h1>{currentProject?.name}display</h1>
                <SearchPanel />
                {isLoading ? (
                    <Spin size='large' />
                ) : (
                    <ColumnsContainer>
                        <Drop
                            type='COLUMN'
                            direction='horizontal'
                            droppableId='displayBoard'
                        >
                            <DropChild style={{ display: 'flex' }}>
                                {displayBoards?.map((board, index) => (
                                    <Drag
                                        key={board.id}
                                        draggableId={`board${board.id}`}
                                        index={index}
                                    >
                                        <DisplayBoardColumn
                                            displayBoard={board}
                                            key={board.id}
                                        />
                                    </Drag>
                                ))}
                            </DropChild>
                        </Drop>
                        <CreateDisplayBoard />
                    </ColumnsContainer>
                )}
                <TaskModal />
            </ScreenContainer>
        </DragDropContext>
    );
};
