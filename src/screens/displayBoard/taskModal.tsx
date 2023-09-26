import { Form, Button, Modal, Input } from 'antd';
import { useEffect } from 'react';

import { useTasksModal, useTasksQueryKey } from './util';
import { EpicSelect } from '@/components/epicSelect';
import { TaskTypeSelect } from '@/components/taskTypeSelect';
import { UserSelect } from '@/components/userSelect/user-select';
import { useDeleteTask, useEditTask } from '@/utils/hooks/task';

/**
 * @author meng
 * @version 1.0
 * @date 2023/04/18
 * taskModal
 */
//antd自带样式
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};
export const TaskModal = () => {
    //useForm是antd在react hooks中的函数组件，对表单数据域进行交互
    const [form] = Form.useForm();
    //获取方法
    const { editingTaskId, editingTask, close } = useTasksModal();
    //获取编辑task的数据
    const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(useTasksQueryKey());
    //获取删除task的方法
    const { mutateAsync: deleteTask } = useDeleteTask(useTasksQueryKey());
    //关闭modal
    const onCancel = () => {
        //关闭窗口
        close();
        //重置表单
        form.resetFields();
    };
    //完成后提交
    const onOk = async () => {
        //解构获取的editingTask数据，在上面覆盖表单中的数据
        await editTask({ ...editingTask, ...form.getFieldsValue() });
        //关闭
        close();
    };
    //删除相关task
    const startDelete = () => {
        close();
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            title: '确定删除任务吗',
            onOk() {
                return deleteTask({ id: Number(editingTaskId) });
            }
        });
    };
    //Modal打开时，加载数据到表单
    useEffect(() => {
        form.setFieldsValue(editingTask);
    }, [form, editingTask]);

    return (
        <Modal
            forceRender
            onCancel={onCancel}
            onOk={onOk}
            okText='确认'
            cancelText='取消'
            confirmLoading={editLoading}
            title='编辑任务'
            visible={!!editingTaskId}
        >
            <Form
                {...layout}
                initialValues={editingTask}
                form={form}
            >
                <Form.Item
                    label='任务名'
                    name='name'
                    //要求必须输入，不输入弹出提示
                    rules={[{ required: true, message: '请输入任务名' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='任务组'
                    name='epicId'
                >
                    <EpicSelect defaultOptionName='任务组' />
                </Form.Item>
                <Form.Item
                    label='经办人'
                    name='processorId'
                >
                    <UserSelect defaultOptionName='经办人' />
                </Form.Item>
                <Form.Item
                    label='类型'
                    name='typeId'
                >
                    <TaskTypeSelect />
                </Form.Item>
            </Form>
            <div style={{ textAlign: 'right' }}>
                <Button
                    onClick={startDelete}
                    style={{ fontSize: '14px' }}
                    size='small'
                >
                    删除
                </Button>
            </div>
        </Modal>
    );
};
