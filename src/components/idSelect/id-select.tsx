/**
 * @author meng
 * @version 1.0
 * @date 2022/12/29
 * @file 实现id类型
 */
import { Select } from 'antd';
import { nanoid } from 'nanoid';
import { ComponentProps } from 'react';

import { Raw } from '@/types/index';

//定义一个类型，通过ComponentProps来，获得antd组件Select中的所有属性的类型
type SelectProps = ComponentProps<typeof Select>;

//定义透传过来的Props的类型，通过继承SelectProps中的属性，并通过Omit来过滤掉下面三个属性
interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
    value?: Raw | null | undefined; //接受的value的值的范围，传入这四种类型都可以
    onChange?: (value?: number) => void; //所有传入的值，返回时都转换成number往外传
    defaultOptionName?: string; //做为默认值，空值存在，例如没有选择时就默认这个值
    options?: { name: string; id: number }[]; //select组件中的options属性，传入的是一个数组，来决定options的数量
}
//定义转换传入value值的函数，当value为其它值时返回0，否则转换成数字并返回
const toNumber = (value: unknown) => (Number.isNaN(Number(value)) ? 0 : Number(value));
/**
 * value 可以传入多种类型的值
 * onChange只会回调number|undefined类型
 * 当isNaN(Number(value))为true时，代表选择默认类型
 * 当选择默认类型的时候，onChange会回调undefined
 * @param props
 */
export const IdSelect = (props: IdSelectProps) => {
    //从传入的props中解构相关属性
    const { value, onChange, defaultOptionName, options, ...restProps } = props;

    return (
        <Select
            //当数据没有返回时，这里需要判断，否则会显示ID的数字
            //当数据加载时就显示相应的值，否则就为0显示负责人
            //value={options?.length ? toNumber(value) : 0}
            value={toNumber(value)}
            // eslint-disable-next-line @typescript-eslint/no-shadow
            onChange={value => onChange?.(toNumber(value) || undefined)}
            {...restProps}
        >
            {defaultOptionName ? (
                <Select.Option value={0}>{defaultOptionName}</Select.Option>
            ) : null}
            {options?.map(option => (
                <Select.Option
                    key={nanoid()}
                    value={option.id}
                >
                    {option.name}
                </Select.Option>
            ))}
        </Select>
    );
};
