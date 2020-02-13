import React from 'react';
import TaskList from '../components/TaskList';
import AddTask from './AddTask';
import { useSelector } from "react-redux";

function VisibleTaskList() {
    const tasks = useSelector(state => state.tasks.filter(t => !t.parentTask));

    return (
        <>
            <AddTask />

            {tasks.length > 0 ? <TaskList tasks={tasks} /> :
                null
            }
        </>
    );
}

export default VisibleTaskList