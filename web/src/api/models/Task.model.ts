export interface Task {
  id: string;
  text: string;
  completed: boolean;
  parentTaskId?: string;
  parentTask?: Task;
}
