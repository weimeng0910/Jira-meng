//import { ChangeEvent } from 'react';

////定义类型
//export interface User {
//    id: number;
//    name: string;
//    email: string;
//    title: string;
//    organization: string;
//}
//interface SearchPanelProps {
//    param: {
//        name: string;
//        personId: string;
//    };
//    users: User[];
//    setParam: (param: SearchPanelProps['param']) => void;
//}

//export default function SearchPanel({ param, setParam, users }: SearchPanelProps) {
//    //input输入框触发函数
//    //要在 React 中键入元素的 onChange 事件，
//    //请将其类型设置为 React.ChangeEvent<HTMLInputElement>。
//    //该ChangeEvent类型具有target 引用元素的属性。元素的值可以在 上访问 event.target.value。
//    function handleChangeInput(evt: ChangeEvent<HTMLInputElement>) {
//        console.log(evt.target.value);
//        //Object.assign()基本用法： Object.assign方法用来将源对象（source）的所有可枚举属性，
//        //复制到目标对象（target）。 它至少需要两个对象作为参数，第一个参数是目标对象，后面的参数都是源对象
//        //  setParam(Object.assign({},param,{name:evt.target.value}))
//        setParam({
//            ...param, //解构对象
//            name: evt.target.value //重新为对象中的属性赋值
//        });
//    }
//    //handleChangeSelect
//    const handleChangeSelect = (evt: ChangeEvent<HTMLSelectElement>) => {
//        setParam({
//            ...param,
//            personId: evt.target.value
//        });
//    };
//    return (
//        <form>
//            <div>
//                <input
//                    type='text'
//                    value={param.name}
//                    onChange={handleChangeInput}
//                />
//                <select
//                    value={param.personId}
//                    onChange={handleChangeSelect}
//                >
//                    <option value=''>负责人</option>
//                    {/* 遍历读取用户列表数据 */}
//                    {users.map(user => (
//                        <option
//                            key={user.id}
//                            value={user.id}
//                        >
//                            {user.name}
//                        </option>
//                    ))}
//                </select>
//            </div>
//        </form>
//    );
//}
