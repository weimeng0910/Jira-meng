/*
 * @Date: 2023-06-09 12:38:54
 * @Description: Do not edit
 */
import styled from '@emotion/styled';
import { Popover, Typography, List, Divider } from 'antd';

import { ButtonNoPadding } from '@/components/lib/lib';
import { useProjectModal } from '@/screens/project-list/util';
//定义类型
import { Project } from '@/types/Project';
import { useProjects } from '@/utils/hooks/project';

//样式
const ContentContainer = styled.div`
    min-width: 30rem;
`;
export const ProjectPopover = () => {
    //url获取状态
    const { open } = useProjectModal();
    //获取projects数据
    const { data: projects, refetch } = useProjects();
    console.log(projects, '001');

    //获得pin收藏项目数据
    const pinnedProjects = projects?.filter((project: Project) => project.pin);

    //Popover组件的内容
    const content = (
        <ContentContainer>
            <Typography.Text type='secondary'>收藏项目</Typography.Text>
            <List>
                {pinnedProjects?.map(project => (
                    <List.Item key={project.id}>
                        <List.Item.Meta title={project.name} />
                    </List.Item>
                ))}
            </List>
            <Divider />
            <ButtonNoPadding
                type='link'
                onClick={() => open()}
            >
                创建项目
            </ButtonNoPadding>
        </ContentContainer>
    );
    return (
        <Popover
            onVisibleChange={() => refetch()}
            placement='bottom'
            content={content}
        >
            <span>项目</span>
        </Popover>
    );
};
