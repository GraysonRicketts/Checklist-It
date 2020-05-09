import React, { useState } from 'react';
import cn from 'classnames';
import data from '../../checklistData.json';
import { Task } from '../../api/models/Task.model';
import styles from './index.module.scss';
import { TextInput } from '../TextInput';
import { Checkbox } from '../Checkbox';

interface TaskRowProp {
  task: Task;
  checklistId: string;
}

export const TaskRow: React.FC<TaskRowProp> = ({ task, checklistId }) => {
  const checklist = data.checklists.find((c) => c.id === checklistId);
  const [text, setText] = useState(task.text); // TODO: emit store action
  const [isChecked, setIsChecked] = useState(task.completed);

  if (!checklist) {
    return <></>;
  }
  const subTasks = checklist.tasks.filter((t) => t.parentTaskId === task.id);

  return (
    <div className={cn('flex', 'flexColumn')}>
      <div className={cn('flex', 'aiCenter')}>
        <Checkbox
          hideLabel
          label="is task completed"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <TextInput
          hideLabel
          label="task input"
          value={text}
          onChange={setText}
        />
      </div>

      <div className={cn(styles.subTasks)}>
        {subTasks.map((t) => (
          <TaskRow key={t.id} task={t} checklistId={checklistId} />
        ))}
      </div>
    </div>
  );
};
