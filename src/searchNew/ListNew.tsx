////import React from 'react';
//import { User } from '@/screens/project-list/search-panel';

//interface Project {
//    id: number;
//    name: string;
//    personId: number;
//    pin: boolean;
//    organization: string;
//}
//interface ListProps {
//    list: Project[];
//    users: User[];
//}

//const List = ({ users, list }: ListProps) => (
//    <table>
//        <thead>
//            <tr>
//                <th>名称</th>
//                <th>负责人</th>
//            </tr>
//        </thead>
//        <tbody>
//            {list.map(project => (
//                <tr key={project.id}>
//                    <td>{project.name}</td>
//                    {/* undefined.name */}
//                    <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
//                </tr>
//            ))}
//        </tbody>
//    </table>
//);

//export default List;
