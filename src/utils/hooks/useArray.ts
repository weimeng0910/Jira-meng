/**
 * @author meng
 * @version 1.0
 * @date 2022/11/23
 * @file 数组的自定义hook
 */
import { useState } from 'react';

export const useArray = <T>(curentObj: T[]) => {

  const [value, setValue] = useState(curentObj);

  const add = (addObj: T) => {

    setValue([...value, addObj]);

  };

  const clear = () => {

    setValue([]);

  };

  const removeIndex = (index: number) => {
    const copy = [...value];
    copy.splice(index, 1);
    setValue(copy);

  };

  return {
    value,
    setValue,
    add,
    clear,
    removeIndex
  };
};
