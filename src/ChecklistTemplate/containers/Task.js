import React from 'react';
import AddTask from './AddTask'
import { useSelector, useDispatch } from "react-redux";
import {
    editTask as editTaskAction,
    deleteTask as deleteTaskAction
 } from '../../common/tasks.actions';

function Task(props) {
    const { id } = props;
    const { text, completed } = useSelector(state => state.tasks.find(t => t.id === id));
    const subTasks = useSelector(state => state.tasks.filter(t => t.parentTask === id));
    const dispatch = useDispatch();

    const updateTask = (event) => {
        dispatch(editTaskAction(id, event.target.value));
    }

    const deleteTask = () => {
        dispatch(deleteTaskAction(id));
    }

    return (
        <div className="task-section">
            <div className="task-text-div">
                <input type="text" value={text} onChange={updateTask} className="task-input" 
                style={{textDecoration: completed ? 'line-through' : 'none'}}/>
                <button type="button" onClick={deleteTask}>X</button>
            </div>

            {subTasks.length ?
                    <div className="task-list-div">
                    {subTasks
                        .map(({ id }) =>
                            (<Task
                                key={id}
                                id={id}
                            />
                        ))
                    }
                </div>

                : null}

            <div className="inline-add-task">
                <AddTask parentTask={id} />
            </div>
        </div>
    );
}

export default Task;