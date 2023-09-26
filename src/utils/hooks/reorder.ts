
/**
 * 在list中，把from放在to的前边
 * @param list
 * @param from
 * @param to
 */
const insertBefore = (list: unknown[], from: number, to: number) => {


  const toItem = list[to];
  const removedItem = list.splice(from, 1)[0];
  const toIndex = list.indexOf(toItem);
  list.splice(toIndex, 0, removedItem);

  return list;
};

/**
 * 在list中，把from放在to的后面
 * @param list
 * @param from
 * @param to
 */
const insertAfter = (list: unknown[], from: number, to: number) => {

  //数组的最后一个Item
  const toItem = list[to];
  //arr.splice 方法可以说是处理数组的瑞士军刀。它可以做所有事情：添加，删除和插入元素。
  //从from 开始修改 arr：删除 1 个元素,最后返回被删除的元素所组成的数组的第一个元素。
  const removedItem = list.splice(from, 1)[0];
  //arr.indexOf这里是对数组元素进行操作：这里是返回数组中toItem这个元素在数组中的索引
  const toIndex = list.indexOf(toItem);
  //从得到的这个索引开始，插入移动的元素
  list.splice(toIndex + 1, 0, removedItem);

  return list;
};

/**
 * 在本地对排序进行乐观更新
 * @param fromId 要排序的项目的id
 * @param type 'before' | 'after'
 * @param referenceId 参照id
 * @param list 要排序的列表, 比如tasks, kanbans
 */
export const reorder = ({
  fromId,
  type,
  referenceId,
  list,
}: {
  list: { id: number, name: string }[];
  fromId: number;
  type: 'after' | 'before';
  referenceId: number;
}) => {
  const copiedList = [...list];


  // 找到fromId对应项目的下标
  const movingItemIndex = copiedList.findIndex((item) => item.id === fromId);
  if (!referenceId) {
    return insertAfter([...copiedList], movingItemIndex, copiedList.length - 1);
  }
  const targetIndex = copiedList.findIndex((item) => item.id === referenceId);
  const insert = type === 'after' ? insertAfter : insertBefore;
  return insert([...copiedList], movingItemIndex, targetIndex);
};

