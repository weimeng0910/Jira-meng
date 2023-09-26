/**
 * @author meng
 * @version 1.0
 * @date 2022/11/23
 * CSS-IN-JS
 */
//引入Emotion
import styled from '@emotion/styled';
import { Spin, Typography, Button } from 'antd';

//创建CSS组件
export const Row = styled.div<{
    gap?: number | boolean; //定义props中携带的属性
    between?: boolean;
    marginBottom?: number;
}>`
    display: flex;
    /* 为了使我们的盒子居中，通过align-items属性，可以将交叉轴上的 item 对齐 */
    align-items: center;
    //props的between属性要在传入的泛型中定义类型
    justify-content: ${props => (props.between ? 'space-between' : undefined)};
    margin-bottom: ${props => `${props.marginBottom}rem`};
    /* 子元素的 margin-top bottom 会影响垂直居中，所以下面设置 优先级*/
    > * {
        margin-top: 0 !important;
        margin-right: ${props =>
            typeof props.gap === 'number' ? `${props.gap}rem` : props.gap ? '2rem' : undefined};
        margin-bottom: 0 !important;
    }
`;
const FullPage = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
/**
 * @function 加载loading的组件
 */
export const FullPageLoading = () => (
    <FullPage>
        <Spin size='large' />
    </FullPage>
);

/**
 * 类型守卫-判断传入的值是否存在message属性时候，并且value is Error是类型保护
 * 例如，message属性是Error对象
 */

const isError = (value: any): value is Error => value?.message;

/**
 * @function 判断error是否属于真正的Error
 */
export const ErrorBox = ({ error }: { error: unknown }) => {
    if (isError(error)) {
        //typescript如果是unknow类型是不可以读取任何属性，所以在这里要用isError来判断，类型守卫
        return <Typography.Text type='danger'>{error?.message}</Typography.Text>;
    }
    return null;
};
/**
 * @function 页面错误回退
 */
export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
    <FullPage>
        <ErrorBox error={error} />
    </FullPage>
);
/**
 * @cssinjs 消除Button的pading
 */
export const ButtonNoPadding = styled(Button)`
    padding: 0;
`;
export const ScreenContainer = styled.div`
    padding: 3.2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
`;
