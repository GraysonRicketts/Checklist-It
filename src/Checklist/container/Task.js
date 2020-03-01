import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { 
    toggleTask as toggleTaskAction
 } from '../../common/tasks.actions';

function Task(props) {
    const { id } = props;
    const { text, completed } = useSelector(state => state.tasks.find(t => t.id === id));
    const subTasks = useSelector(state => state.tasks.filter(t => t.parentTask === id));
    const hideCompleted = useSelector(state => state.visiblity);
    const dispatch = useDispatch();

    const toggleTask = () => {
        dispatch(toggleTaskAction(id));
    }

    return (
        <div className="task-section">
            <div className="task-text-div">
                <input type="checkbox" onChange={toggleTask} checked={completed} />
                <p style={{textDecoration: completed ? 'line-through' : 'none'}}>{text}</p>/>
            </div>

            {subTasks.length ?
                    subTasks
                    .filter(t => !(t.completed && hideCompleted))
                    .map(({ id }) =>
                        (<Task
                            key={id}
                            id={id}
                        />
                    ))
                : null}
        </div>
    );
}

export default Task;