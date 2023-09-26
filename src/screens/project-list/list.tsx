/**
 * @author meng
 * @version 1.0
 * @date 2022/11/24
 * @file 创建了List 组件展示项目列表
 */
import { Menu, Table, TableProps, Dropdown, Modal } from 'antd';
import type { MenuProps } from 'antd';
//处理时间的库
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { useProjectModal } from './util';
import { ButtonNoPadding } from '@/components/lib/lib';
import { Pin } from '@/components/pin/pin';
import { Project } from '@/types/Project';
//定义类型
import { User } from '@/types/user';
import { useEditProject, useDeleteProject } from '@/utils/hooks/project';

//这个类型包含了TableProps中的所有属性，和users这个属性
interface ListProps extends TableProps<Project> {
    users: User[];
}

/**
 * @function LIST组件
 * type PropsType = Omit<ListProps,'users'>//...props的类型
 * 父组件传过来的{ users, ...props }这个props,里面包含了所有的TableProps
 * 还有users这个数据，先把users取出来，把loading等其它属性放在...props中
 */
const List = ({ users, ...props }: ListProps) => {
    //url获取状态
    const { startEdit } = useProjectModal();
    //这个纯函数mutate解构出来，可以在jsx中调用纯函数
    const { mutate } = useEditProject();
    //函数currying柯理化
    const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
    //编辑project
    const editProject = (id: number) => startEdit(id);
    //删除project
    const { mutate: deleteProject } = useDeleteProject();
    //删除前确认
    const confirmDeleteProject = (id: number) => {
        Modal.confirm({
            title: '确定删除这个项目吗?',
            content: '点击确定删除',
            okText: '确定',
            onOk() {
                deleteProject({ id });
            }
        });
    };

    //定义antd中menu组件中的items
    const Constants = () => {
        const EDIT = 'edit';
        const DELETE = 'delete';
        return {
            EDIT,
            DELETE
        };
    };

    const menuItems: MenuProps['items'] = [
        {
            key: 'edit',
            label: <ButtonNoPadding type='link'>编辑</ButtonNoPadding>
        },
        {
            key: 'delete',
            label: <ButtonNoPadding type='link'>删除</ButtonNoPadding>
        }
    ];

    return (
        <Table
            rowKey='id'
            //设置唯一的key
            pagination={false}
            columns={[
                {
                    //因为checed={true},所以这里简写

                    title: (
                        <Pin
                            checked
                            disabled
                        />
                    ),
                    render: (_value, project) => (
                        <Pin
                            checked={project.pin}
                            onCheckedChange={pinProject(project.id)}
                        />
                    )
                },
                {
                    title: '名称',
                    //dataIndex: 'name',
                    //localeCompare排序中文字符
                    sorter: (a, b) => a.name.localeCompare(b.name),
                    render: (_value, project) => (
                        <Link to={`/projects/${String(project.id)}`}>{project.name}</Link>
                    )
                },
                {
                    title: '部门',
                    dataIndex: 'organization'
                },
                {
                    title: '负责人',

                    render: (_value, project) => (
                        <span>
                            {(users.find(user => user.id === project.personId)?.name as string) ||
                                '未知'}
                        </span>
                    )
                },
                {
                    title: '创建时间',
                    dataIndex: 'created',
                    render: (_value, project) => (
                        <span>
                            {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '未知'}
                        </span>
                    )
                },
                {
                    render: (_value, project) => (
                        <Dropdown
                            overlay={
                                <Menu
                                    onClick={e => {
                                        // eslint-disable-next-line default-case
                                        switch (e.key) {
                                            case Constants().EDIT:
                                                editProject(project.id);
                                                break;
                                            case Constants().DELETE:
                                                confirmDeleteProject(project.id);
                                                break;
                                        }
                                    }}
                                    items={menuItems}
                                />
                            }
                            trigger={['click']}
                        >
                            <ButtonNoPadding type='link'>...</ButtonNoPadding>
                        </Dropdown>
                    )
                }
            ]}
            //type PropsType = Omit<ListProps,'users'>//...props的类型
            {...props}
        />
    );
};

export default List;
