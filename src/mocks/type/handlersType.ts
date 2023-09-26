export interface ResponseError extends Error {
  status?: number;
  message: string;
}
//Request body type.
export interface RequestBody {
  id?: string,
  username: string;
  password: string;
}
export interface User {
  id: string,
  username: string,
  passwordHash: string,
  token?: string | ''
}
export interface Project {
  created: number,
  id: number,
  name: string,
  organization: string,
  personId: number,
  pin: boolean


}
export interface UserData {

  id: number | string,
  name: string,

}
export interface DisplayBoard {
  id: number;
  name: string;
  ownerId: number;

  projectId: number;
}
export interface Task {
  id: number;
  epicId: number;
  name: string;
  //经办人
  processorId: number;
  //任务组
  projectId: number;
  displayBoardId: number;
  //bug or task
  typeId: number;
  note: string;
  favorite: true;
  ownerId: number;
  reporterId: number;
  tags: number;

}
export interface TaskType {
  id: number;
  name: string;
  ownerId: number;
}
export interface SortProps {
  // 要重新排序的 item
  fromId: number;
  // 目标 item
  referenceId: number;
  // 放在目标item的前还是后
  type: string
  fromKanbanId?: number;
  toKanbanId?: number;
}
export interface Epic {
  id: number;
  name: string;
  //属于那个工程
  projectId: number;
  // 开始时间
  start: number;
  // 结束时间
  end: number;
}
