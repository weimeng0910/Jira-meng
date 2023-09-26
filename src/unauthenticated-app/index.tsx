/**
 * @author meng
 * @version 1.0
 * @date 2022/12/2
 * @file 注册和登陆
 */
import styled from '@emotion/styled';
import { Button, Card, Divider } from 'antd';
import { useState, ReactElement } from 'react';

import LoginScreen from './login';
import RegisterScreen from './register';
import left from '@/assets/left.svg';
import logo from '@/assets/logo.svg';
import right from '@/assets/right.svg';
import { ErrorBox } from '@/components/lib/lib';
import { useDocumentTitle } from '@/utils/hooks/useDocumentTitle';

/**
 * css-in-js
 * 样式布局定义
 */
export const LongButton = styled(Button)`
    width: 100%;
`;
const Title = styled.h2`
    margin-bottom: 2.4rem;
    color: rgb(94, 108, 132);
`;
const Background = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-attachment: fixed; // 决定背景图片是否会随页面滑动而滑动
    background-position: left bottom, right bottom;
    background-size: calc(((100vw - 40rem) / 2) - 3.2rem), calc(((100vw - 40rem) / 2) - 3.2rem),
        cover;
    background-image: url(${left}), url(${right});
`;
const Header = styled.header`
    background: url(${logo}) no-repeat center;
    padding: 5rem 0;
    background-size: 8rem;
    width: 100%;
`;
const NewCard = styled(Card)`
    width: 40rem;
    /* min-height 属性设置元素的最小高度。 */
    min-height: 36rem;
    padding: 3.6rem 4rem;
    /* 边框出现圆角 */
    border-radius: 0.3rem;
    /* 在css3中border-box是box-sizing属性的一个值。
     box-sizing 属性允许您以特定的方式定义匹配某个区域的特定元素。
      例如，假如您需要并排放置两个带边框的框，可通过将box-sizing 设置为"border-box"。
       这可令浏览器呈现出带有指定宽度和高度的框，并把边框和内边距放入框中 */
    box-sizing: border-box;
    /* box-shadow 属性向框添加一个或多个阴影。 */
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
    text-align: center;
`;
const Container = styled.div`
    /* 弹性布局 */
    display: flex;
    /* 选择column或者column-reverse者时，你的主轴会沿着下面方向延展 — 也就是块排列的方向。 */
    flex-direction: column;
    align-items: center;
    /* min-height 属性设置元素的最小高度。 */
    min-height: 100vh;
`;

export const UnauthenticatedAPP = (): ReactElement => {
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    useDocumentTitle('请注册登陆以继续');
    return (
        <Container>
            <Header />
            <Background />
            <NewCard>
                <Title>{isRegister ? '请注册' : '请登录'}</Title>
                <ErrorBox error={error} />
                {isRegister ? (
                    <RegisterScreen onError={setError} />
                ) : (
                    <LoginScreen onError={setError} />
                )}
                <Divider />
                <Button
                    onClick={() => setIsRegister(!isRegister)}
                    style={{ justifyContent: 'center' }}
                >
                    {isRegister ? '已经有账号了？直接登录' : '没有账号？注册新账号'}
                </Button>
            </NewCard>
        </Container>
    );
};
