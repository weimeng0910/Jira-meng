////导入qs和UI
//import { Button } from 'antd';
//// 外部依赖
//import axios from 'axios';
//import qs from 'qs';
//import { useEffect, useState } from 'react';

////导入内部组件
//import List from './list';
//import SearchPanel from './search-panel';
//import { API_URL } from '@/config';
//// 本地依赖
//import { cleanObject } from '@/utils/cleanObject';
//import { useDebounce } from '@/utils/hooks/useDebounce';

////import { useMount } from '@/utils/hooks/useMount';

//// import { useHttp } from '@/utils/http';

//export const ProjectListScreen = () => {
//    // 组件状态
//    const [param, setParam] = useState({
//        name: '',
//        personId: ''
//    });

//    //自定义hook
//    const debounceParam = useDebounce(param, 2000);

//    //定义请求的工程列表的状态
//    const [list, setList] = useState([]);

//    //user用户状态
//    const [users, setUsers] = useState([]);
//    // 导入自定义http请求
//    //请求用户数据
//    useEffect(() => {
//        // eslint-disable-next-line promise/catch-or-return
//        axios
//            .get(`${API_URL}/projects?${qs.stringify(cleanObject(debounceParam))}`)
//            //.get(`${API_URL}/projects?${qs.stringify(param)}`)
//            .then(async response => {
//                // eslint-disable-next-line promise/always-return
//                if (response) {
//                    console.log(response.data, 'w2');
//                    setList(await response.data);
//                }
//            });
//    }, [debounceParam]); //当用户点击下拉，param就会变化触发请求下拉数据

//    //自定义hook
//    //useMount(() => {
//    //    // eslint-disable-next-line promise/catch-or-return
//    //    axios.post(`${API_URL}/users`).then(async response => {
//    //        // eslint-disable-next-line promise/always-return
//    //        if (response) {
//    //            setUsers(await response.data);
//    //        }
//    //        return -1;
//    //    });
//    //});
//    useEffect(() => {
//        // eslint-disable-next-line promise/catch-or-return
//        axios.post(`${API_URL}/users`).then(async response => {
//            // eslint-disable-next-line promise/always-return
//            if (response) {
//                setUsers(await response.data);
//            }
//        });
//        console.log('加入只调用一次');
//    }, []);
//    return (
//        <div>
//            <SearchPanel
//                users={users || []}
//                param={debounceParam}
//                setParam={setParam}
//            />
//            <List
//                users={users || []}
//                list={list || []}
//            />
//            <Button type='primary'>Antd 按钮</Button>
//        </div>
//    );
//};
