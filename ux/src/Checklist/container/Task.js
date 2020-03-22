import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toggleTask } from '../checklists.actions';

function Task(props) {
    const { id, checklistId } = props;
    const { text, completed } = useSelector(state => state
        .checklists.find(c => c.id.toString() === checklistId)
        .tasks.find(t => t.id === id));
    const subTasks = useSelector(state => state
        .checklists.find(c => c.id.toString() === checklistId)
        .tasks.filter(t => t.parentTask === id));
    const hideCompleted = useSelector(state => state.visiblity);
    const dispatch = useDispatch();

    const handleTaskToggle = () => {
        dispatch(toggleTask(checklistId, id));
    }

    return (
        <div className="task-section">
            <div className="task-text-div">
                <input type="checkbox" onChange={handleTaskToggle} checked={completed} />
                <p style={{textDecoration: completed ? 'line-through' : 'none'}}>{text}</p>
            </div>

            {subTasks.length ?
                    subTasks
                    .filter(t => !(t.completed && hideCompleted))
                    .map(({ id }) =>
                        (<Task
                            key={id}
                            id={id}
                            checklistId={checklistId}
                        />
                    ))
                : null}
        </div>
    );
}

export default Task;