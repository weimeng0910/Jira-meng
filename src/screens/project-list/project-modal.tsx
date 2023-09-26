/**
 * @author meng
 * @version 1.0
 * @date 2023/2/14
 * @file  编辑和添加功能的modal页
 */
import styled from '@emotion/styled';
import { Drawer, Button, Spin, Form, Input } from 'antd';
import { useEffect } from 'react';

import { useProjectModal } from './util';
import { ErrorBox } from '@/components/lib/lib';
import { UserSelect } from '@/components/userSelect/user-select';
import { useAddProject, useEditProject } from '@/utils/hooks/project';

const Container = styled.div`
    /*height: 80vh;*/
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

/**
 *  编辑和添加功能
 */
export const ProjectModal = () => {
    //解构打开，关闭，添加编辑和loading的方法，从自定义hook useProjectModal中
    const { projectModalOpen, close, editingProject, isLoading } = useProjectModal();
    //根据获取的editingProject来判断是编辑还是添加状态
    const useMutateProject = editingProject ? useEditProject : useAddProject;

    //useMutateProject不能直接在函数中使用，所以这里要把更新缓存的方法解构
    const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject();
    //useForm是antd在react hooks中的函数组件，对表单数据域进行交互
    const [form] = Form.useForm();
    //表单中定义的方法，完成form表单数据的更新
    const onFinish = (values: any) => {
        // eslint-disable-next-line promise/catch-or-return, promise/always-return
        mutateAsync({ ...editingProject, ...values }).then(() => {
            form.resetFields(); //表单重置状态和值的方法

            close();
        });
    };
    const closeModal = () => {
        form.resetFields();
        close();
    };
    //根据传入的editingProject来显示title;
    const title = editingProject ? '编辑项目' : '创建项目';

    useEffect(() => {
        form.setFieldsValue(editingProject);
    }, [editingProject, form]);

    return (
        <Container>
            <Drawer
                forceRender
                onClose={closeModal}
                width='100%'
                visible={projectModalOpen}
            >
                {/* isloading说明正在获取数据的时候，显示Spin */}
                {isLoading ? (
                    <Spin size='large' />
                ) : (
                    <>
                        <h1>{title}</h1>
                        <ErrorBox error={error} />
                        <Form
                            form={form}
                            layout='vertical'
                            style={{ width: '40rem' }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label='名称'
                                name='name'
                                rules={[{ required: true, message: '请输入项目名' }]}
                            >
                                <Input placeholder='请输入项目名' />
                            </Form.Item>
                            <Form.Item
                                label='部门'
                                name='organization'
                                rules={[{ required: true, message: '请输入部门名称' }]}
                            >
                                <Input placeholder='请输入部门名称' />
                            </Form.Item>
                            <Form.Item
                                label='负责人'
                                name='personId'
                            >
                                <UserSelect defaultOptionName='负责人' />
                            </Form.Item>
                            <Form.Item style={{ textAlign: 'right' }}>
                                <Button
                                    loading={mutateLoading}
                                    type='primary'
                                    htmlType='submit'
                                >
                                    提交
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                )}
            </Drawer>
        </Container>
    );
};
