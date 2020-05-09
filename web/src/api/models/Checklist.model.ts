import { Task } from "./Task.model";

export interface Checklist {
  id: string;
  name: string;
  tasks: Task[];
}
