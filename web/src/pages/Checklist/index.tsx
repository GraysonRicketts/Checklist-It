import React from 'react';
import { useParams } from 'react-router-dom';
import data from '../../checklistData.json';
import { TaskRow } from '../../components/TaskRow';

const Checklist: React.FC = () => {
  const { checklistId } = useParams();
  const checklist = data.checklists.find((c) => c.id === checklistId);
  if (!checklist) {
    // TODO: 404
    return <p>error</p>;
  }

  const topLevelTasks = checklist.tasks.filter((task) => !task.parentTaskId);

  return (
    <div>
      <h1>{checklist.name}</h1>

      {topLevelTasks.map((task) => (
        <TaskRow key={task.id} task={task} checklistId={checklistId} />
      ))}
    </div>
  );
};

export default Checklist;
