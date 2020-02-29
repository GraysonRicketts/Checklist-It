import React from 'react';
import TaskList from '../components/TaskList';
import AddTask from './AddTask'
import { useSelector, useDispatch } from "react-redux";
import { 
    toggleTask as toggleTaskAction, 
    editTask as editTaskAction,
    deleteTask as deleteTaskAction
 } from '../tasks.actions';

function Task(props) {
    const { id } = props;
    const { text, completed } = useSelector(state => state.tasks.find(t => t.id === id));
    const subTasks = useSelector(state => state.tasks.filter(t => t.parentTask === id));
    const hideCompleted = useSelector(state => state.visiblity);
    const dispatch = useDispatch();

    const toggleTask = () => {
        dispatch(toggleTaskAction(id));
    }

    const updateTask = (event) => {
        dispatch(editTaskAction(id, event.target.value));
    }

    const deleteTask = () => {
        dispatch(deleteTaskAction(id));
    }

    return (
        <div className="task-section">
            <div className="task-text-div">
                <input type="checkbox" onChange={toggleTask} checked={completed} />
                <input type="text" value={text} onChange={updateTask} className="task-input" 
                style={{textDecoration: completed ? 'line-through' : 'none'}}/>
                <button type="button" onClick={deleteTask}>X</button>
            </div>

            {subTasks.length ?
                    <TaskList
                        tasks={subTasks}
                        hideCompleted={hideCompleted}
                    />

                : null}

            <div className="inline-add-task">
                <AddTask parentTask={id} />
            </div>
        </div>
    );
}

export default Task;