import React from 'react';
import TaskList from '../components/TaskList';
import TaskVisibilityToggle from './TaskVisibilityToggle';
import AddTask from './AddTask';
import { useSelector } from "react-redux";

function VisibleTaskList() {
    const tasks = useSelector(state => state.tasks.filter(t => !t.parentTask));
    const hideCompleted = useSelector(state => state.visiblity);

    return (
        <div className="visible-tasks-div">
            <AddTask />

            {tasks.length > 0 ? <TaskList tasks={tasks} hideCompleted={hideCompleted} /> :
                null
            }

            <TaskVisibilityToggle />
        </div>
    );
}

export default VisibleTaskList