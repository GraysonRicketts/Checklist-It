import React from "react";
import data from "../../checklistData.json";
import { Task } from "../../api/models/Task.model";

interface TaskRowProp {
  task: Task;
  checklistId: string;
}

export const TaskRow: React.FC<TaskRowProp> = ({ task, checklistId }) => {
  const checklist = data.checklists.find((c) => c.id === checklistId);
  if (!checklist) {
    return <></>;
  }

  const subTasks = checklist.tasks.filter((t) => t.parentTaskId === task.id);

  return (
    <div>
      <p>{task.text}</p>

      {subTasks.map((t) => (
        <TaskRow key={t.id} task={t} checklistId={checklistId} />
      ))}
    </div>
  );
};
