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
