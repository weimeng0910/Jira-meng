/**
 * @author meng
 * @version 1.0
 *@file 用户登陆后的主界面
 */
import styled from '@emotion/styled';

//导入样式文件
import { Row } from '@/components/lib/lib';
/**
 * grid和flex应用场景
 * 1.要考虑是一维布局还是二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2.是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容 (数量一般不固定)，然后希望他们均匀的分布在容器中，由内容自已的大小决定占据的空间
 * 从布局出发：先规划网格，然后再把元素往里填充
 * 从内容出发用flex
 * 从布局出发用grid
*/
//grid主容器
export const Container = styled.div`
    display: grid;
    /*grid-template-rows: 6rem calc(100vh-6rem) auto;*/
    /* hand高6rem,footer高6rem,中间设置1fr,让尺寸自适应减去的 */
    grid-template-rows: 6rem 1fr;
    /* 栅格的列 */
    /*grid-template-columns: 20rem 1fr 20rem;*/
    grid-template-areas:
        'header '
        ' main ';
    height: 100vh;
    /* 各单位之间的距离 */
    /*grid-gap: 10rem;*/
`;
// grid-area 用来给栅格grid子元素起名字
export const Header = styled(Row)`
    padding: 3.2rem;
`;
export const HeaderLeft = styled(Row)``;

export const HeaderRight = styled.div``;
export const Main = styled.main`
    grid-area: main;
    display: flex;
    overflow: hidden;
`;
