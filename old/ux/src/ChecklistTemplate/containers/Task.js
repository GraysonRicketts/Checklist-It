import React from 'react';
import AddTask from './AddTask'
import { useSelector, useDispatch } from "react-redux";
import { updateTask, deleteTask } from '../templates.actions';
 
function Task(props) {
    const { id, templateId } = props;
    const { text } = useSelector(state => state
        .templates.find(t => t.id === templateId)
        .tasks.find(t => t.id === id));
    const subTasks = useSelector(state => state
        .templates.find(t => t.id === templateId)
        .tasks.filter(t => t.parentTask === id));
    const dispatch = useDispatch();

    const handleAddTask = (event) => {
        const newTaskText = event.target.value.trim();
        dispatch(updateTask(templateId, id, newTaskText));
    }

    const handleDeleteTask = () => {
        dispatch(deleteTask(templateId, id));
    }

    return (
        <div className="task-section">
            <div className="task-text-div">
                <input type="text" value={text} onChange={handleAddTask} className="task-input"/>
                <button type="button" onClick={handleDeleteTask}>X</button>
            </div>

            {subTasks.length ?
                    <div className="task-list-div">
                    {subTasks
                        .map(({ id }) =>
                            (<Task
                                key={id}
                                id={id}
                                templateId={templateId}
                            />
                        ))
                    }
                </div>

                : null}

            <div className="inline-add-task">
                <AddTask parentTask={id} templateId={templateId} />
            </div>
        </div>
    );
}

export default Task;