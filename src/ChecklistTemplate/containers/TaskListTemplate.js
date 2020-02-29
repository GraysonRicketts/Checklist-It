import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskVisibilityToggle from './TaskVisibilityToggle';
import AddTask from './AddTask';
import { useSelector, useDispatch } from "react-redux";
import { saveTemplate } from '../template.actions';

function TaskListTemplate() {
    const [checkListName, setChecklistName] = useState('')
    const tasks = useSelector(state => state.tasks.filter(t => !t.parentTask));
    const hideCompleted = useSelector(state => state.visiblity);
    const dispatch = useDispatch();

    const handleSaveTemplate = (e) => {
        dispatch(saveTemplate(tasks, checkListName))
    }

    const handleCheckListNameChange = (e) => {
        e.preventDefault();
        setChecklistName(e.target.value);
    }

    return (
        <div className="visible-tasks-div">
            <label htmlFor="template-name">Checklist name</label>
            <input type="text" id="template-name" value={checkListName} onChange={handleCheckListNameChange} />

            <AddTask />

            {tasks.length > 0 ? <TaskList tasks={tasks} hideCompleted={hideCompleted} /> :
                null
            }

            <button onClick={handleSaveTemplate}>Save Template</button>

            <TaskVisibilityToggle />
        </div>
    );
}

export default TaskListTemplate