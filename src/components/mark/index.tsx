import { nanoid } from 'nanoid';

/*
 *  搜索数据高亮关键字
 *  @param  name, keyword
 */
//接收name这个名字，keyword是搜索的关键字（例如：name是‘项目管理的项目’ keyword就是‘项目’
export const Mark = ({ name, keyword }: { name: string; keyword: string }) => {
    if (!keyword) {
        // eslint-disable-next-line react/jsx-no-useless-fragment
        return <>{name}</>;
    }
    //String.prototype.split()方法
    //'Paul Steve Panakkal'.split(' '); // returns ["Paul", "Steve", "Panakkal"]
    const arr = name.split(keyword);
    return (
        <>
            {arr.map((str, index) => (
                <span key={nanoid()}>
                    {str}
                    {index === arr.length - 1 ? null : (
                        <span style={{ color: '#257AFD' }}>{keyword}</span>
                    )}
                </span>
            ))}
        </>
    );
};
