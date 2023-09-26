/**
 * @author meng
 * @version 1.0
 * @date 2023/01/04
 * @file 封装Antd的rate组件，实现自定义收藏
 */
import { Rate } from 'antd';
//保证新的组件有透传的能力，通过ComponentProps来获得props的所有属性
import { ComponentProps } from 'react';

//定义props类型,扩展两个自定义属性，来给Rate组件中的value和onChange赋值
interface PinProps extends ComponentProps<typeof Rate> {
    //checked这个属性来决定点亮星星的属性值value是1还是0,当前数，受控值
    checked: boolean;
    //这个方法来改变checked的值，在标题栏时星星是undefinad，所以可选
    onCheckedChange?: (checked: boolean) => void;
}
export const Pin = (props: PinProps) => {
    //从props中解构自定的扩展属性
    const { checked, onCheckedChange, ...restProps } = props;
    return (
        <Rate
            //count代表星星数量
            count={1}
            //value是星星是不是点亮
            value={checked ? 1 : 0}
            //这里的number代表回调函数来决定几颗星是点亮的，
            //当onCheckedChange是undefinad时候，？.代表啥也不干
            //!!num相当于Boolean(num)，如果num是0代表false，如果是非0代表true
            onChange={num => onCheckedChange?.(!!num)}
            {...restProps} //其它属性
        />
    );
};
