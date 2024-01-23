export interface ITask {
  id: number;
  text: string;
  done: boolean;
}
export interface ITasksList {
  tasks: ITask[];
  onChangeTask: (task: ITask) => void;
  onDeleteTask: (taskId: number) => void;
}

export interface ITasks {
  task: ITask;
  onChangeTask: (task: ITask) => void;
  onDeleteTask: (taskId: number) => void;
}
