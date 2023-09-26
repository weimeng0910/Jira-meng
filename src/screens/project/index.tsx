import styled from '@emotion/styled';
import { Menu } from 'antd';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';

import { DisplayBoardScreen } from '../displayBoard';
import { EpicScreen } from '../epic';

/**
 * @author meng
 * @version 1.0
 * @file project二级路由页面
 */
//样式
const Aside = styled.aside`
    background-color: rgb(244, 245, 247);
    display: flex;
`;

const Main = styled.div`
    box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
    display: flex;
    overflow: hidden;
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: 16rem 1fr;
    width: 100%;
`;
// 用来作为 404 页面的组件
const NotFound = () => <div>路径错误</div>;

const useRouteType = () => {
    const units = useLocation().pathname.split('/');
    return units[units.length - 1];
};

export const ProjectScreen = () => {
    const routeType = useRouteType();
    const menuItems = [
        {
            key: 'displayBoard',
            label: <Link to='displayBoard'>看板</Link>
        },
        {
            key: 'epic',
            label: <Link to='epic'>任务组</Link>
        }
    ];
    return (
        <Container>
            <Aside>
                <Menu
                    mode='inline'
                    selectedKeys={[routeType]}
                    items={menuItems}
                />
            </Aside>
            <Main>
                <Routes>
                    {/*默认路由 */}
                    <Route
                        path='/'
                        element={
                            <Navigate
                                to={`${window.location.pathname}/displayBoard`}
                                //不会出现无限循环，会回退到需要的页['projects','projects/6',window.location.pathname}+'displayBoardš]
                                replace
                            />
                        }
                    />
                    <Route
                        path='displayBoard'
                        element={<DisplayBoardScreen />}
                    />
                    <Route
                        path='epic'
                        element={<EpicScreen />}
                    />

                    <Route
                        path='*'
                        element={<NotFound />}
                    />
                </Routes>
            </Main>
        </Container>
    );
};
