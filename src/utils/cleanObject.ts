/**
 * @author meng
 * @version 1.0
 * @date 2022/11/23
 * @file 删除对象中的空值的hook
 */
//首先写一个方法判断当前值为是undefined或者为null或者为空
export const isFalsy = (value: number) => value === 0 ? false : !value;


//删除对象中值为空的所有属性
export const cleanObject = (object: object) => {

  //深拷贝传入的对象，防止引用后污然原有的对象属性
  // 注意用扩展运算符对数组或者对象进行拷贝时，只能扩展和深拷贝第一层的值，对于第二层极其以后的值，扩展运算符将不能对其进行打散扩展，也不能对其进行深拷贝，
  // Object.assign({},object)相当于下面的对象拷贝，是浅拷贝
  const result = { ...object };
  /**删除空值 */

  for (const key of Object.keys(result)) {

    const value = result[key];

    if (isFalsy(value)) {
      delete result[key];
    }

  }
  return result;
};
//************************************************************************* */
//export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

//export const isVoid = (value: unknown) =>
//  value === null || value === undefined || value === "";

//export const cleanObject = (object: { [key: string]: unknown }) => {
//  const result = { ...object };
//  Object.keys(result).forEach((key) => {
//    const value = result[key];
//    if (isVoid(value)) {
//      delete result[key];
//    }
//  });
//  return result;
//};

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */

export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};
