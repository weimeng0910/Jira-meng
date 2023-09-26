/**
 * @author meng
 * @version 1.0
 * @date 2022/11/23
 * @file 注册
 */
import styled from '@emotion/styled';
import { Form, Input, Button } from 'antd';

import { useAuth } from '@/context/AuthContext';
import { useAsync } from '@/utils/hooks/useAsync';

const LongButton = styled(Button)`
    width: 100%;
`;
interface OnError {
    onError: (error: Error) => void;
}

const RegisterScreen = ({ onError }: OnError) => {
    const { register } = useAuth();
    const { run, isLoading } = useAsync(undefined, { throwOnError: true });
    const handlSubmit = async ({
        cpassword,
        ...values
    }: {
        username: string;
        password: string;
        cpassword: string;
    }) => {
        if (cpassword !== values.password) {
            onError(new Error('请确认两次输入的密码相同'));
            return;
        }
        try {
            await run(register(values));
        } catch (error) {
            onError(error as Error);
        }
    };
    return (
        <Form onFinish={handlSubmit}>
            <Form.Item
                label='Username'
                name='username'
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input
                    placeholder='用户名'
                    type='text'
                    id='username'
                />
            </Form.Item>
            <Form.Item
                label='Password'
                name='password'
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input
                    placeholder='密码'
                    type='password'
                    id='password'
                />
            </Form.Item>
            <Form.Item
                label='Cpassword'
                name='cpassword'
                rules={[{ required: true, message: 'Please confirm your password!' }]}
            >
                <Input
                    placeholder='确认密码'
                    type='password'
                    id='cpassword'
                />
            </Form.Item>

            <Form.Item>
                <LongButton
                    loading={isLoading}
                    type='primary'
                    htmlType='submit'
                >
                    注册
                </LongButton>
            </Form.Item>
        </Form>
    );
};
export default RegisterScreen;
