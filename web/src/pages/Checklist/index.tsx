import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TaskRow } from '../../components/TaskRow';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { fetchTasks } from '../../store/tasks';
import { Loader } from '../../components/Loader';

const Checklist: React.FC = () => {
  const { checklistId } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTasks(checklistId));
  }, [dispatch]);

  const checklist = useSelector((state: RootState) =>
    state.checklists.currentChecklists.find((c) => c.id === checklistId),
  );
  const tasks = useSelector((state: RootState) => state.tasks.currentTasks);
  const isLoading = useSelector((state: RootState) => state.tasks.isLoading);

  const topLevelTasks = tasks.filter((task) => !task.parentTaskId);

  return (
    <div>
      <h1>{checklist?.name}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w100">
          {topLevelTasks.map((task) => (
            <TaskRow key={task.id} task={task} checklistId={checklistId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Checklist;
