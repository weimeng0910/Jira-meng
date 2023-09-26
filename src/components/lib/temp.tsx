/**
 * @author meng
 * @version 1.0
 * @date 2022/11/23
 * CSS-IN-JS
 * 以 grid布局，实例展示 emotion 的用法
 */

/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

// 1.引入emotion
import '@/css/style.css';

function App() {
    // 3.提取公共的css组件
    const BgColor = styled.div<{ color?: string }>`
        background-color: ${props => props.color ?? 'initial'};
    `;
    const MyBorder = styled.div<{ border?: string }>`
        border: ${props => (props.border ? `${props.border} solid` : 'none')};
    `;

    // 2.使用emotion 创建css组件
    const Container = styled.div`
        display: grid;
        grid-template-rows: 5rem 1fr 5rem;
        grid-template-columns: 10rem 1fr 10rem;
        grid-template-areas:
            'header header header'
            'nav main aside'
            'footer footer footer';
        height: 100vh;
    `;
    const Header = styled(BgColor)`
        grid-area: header;
    `;
    const Nav = styled.nav`
        grid-area: nav;
    `;
    const Main = styled(MyBorder)`
        grid-area: main;
    `;
    const Aside = styled.aside`
        grid-area: aside;
    `;
    const Footer = styled(BgColor)`
        grid-area: footer;
    `;

    return (
        <div className='App'>
            {/* 4.在html代码中使用css组件 */}
            <Container>
                <Header
                    color='#aaa'
                    as='header'
                >
                    header
                </Header>
                <Nav>nav</Nav>
                <Main
                    border='1px red'
                    as='main'
                >
                    <div css={{ backgroundColor: '#ccc' }}>main</div>
                    {/* emotion行内样式 */}
                </Main>
                <Aside>aside</Aside>
                <Footer
                    color='#eee'
                    as='footer'
                >
                    footer
                </Footer>
            </Container>
        </div>
    );
}

export default App;
