import styled from '@emotion/styled';
import { Divider, List, Popover, Typography } from 'antd';

import { useUser } from '@/utils/hooks/users';

const ContentContainer = styled.div`
    min-width: 30rem;
`;
export const UserPopover = () => {
    const { data: users, refetch } = useUser();

    const content = (
        <ContentContainer>
            <Typography.Text type='secondary'>组员列表</Typography.Text>
            <List>
                {users?.map(user => (
                    <List.Item key={user.id}>
                        <List.Item.Meta title={user.name} />
                    </List.Item>
                ))}
            </List>
            <Divider />
        </ContentContainer>
    );

    return (
        <Popover
            onVisibleChange={() => refetch()}
            placement='bottom'
            content={content}
        >
            <span>组员</span>
        </Popover>
    );
};
