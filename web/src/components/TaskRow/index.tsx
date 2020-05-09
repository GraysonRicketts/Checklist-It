import React, { useState } from 'react';
import data from '../../checklistData.json';
import { Task } from '../../api/models/Task.model';
import styles from './index.module.scss';
import { TextInput } from '../TextInput';

interface TaskRowProp {
  task: Task;
  checklistId: string;
}

export const TaskRow: React.FC<TaskRowProp> = ({ task, checklistId }) => {
  const checklist = data.checklists.find((c) => c.id === checklistId);
  const [text, setText] = useState(task.text);
  if (!checklist) {
    return <></>;
  }
  const subTasks = checklist.tasks.filter((t) => t.parentTaskId === task.id);

  return (
    <div>
      <TextInput hideLabel label="task input" value={text} onChange={setText} />

      <div className={styles.subTasks}>
        {subTasks.map((t) => (
          <TaskRow key={t.id} task={t} checklistId={checklistId} />
        ))}
      </div>
    </div>
  );
};
