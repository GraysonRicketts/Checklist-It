import React, { useState } from 'react';
import Task from './Task';
import AddTask from './AddTask';
import { useSelector, useDispatch } from "react-redux";
import { saveTemplate } from '../templates.actions';

function TaskListTemplate() {
    const [checkListName, setChecklistName] = useState('')
    const tasks = useSelector(state => state.tasks.filter(t => !t.parentTask));
    const dispatch = useDispatch();

    const handleSaveTemplate = () => {
        dispatch(saveTemplate(tasks, checkListName))
    }

    const handleCheckListNameChange = (e) => {
        e.preventDefault();
        setChecklistName(e.target.value);
    }

    return (
        <div className="visible-tasks-div">
            <header>
                <h1>Checklist Template Creator</h1>
            </header>

            <label htmlFor="template-name">Checklist name</label>
            <input type="text" id="template-name" value={checkListName} onChange={handleCheckListNameChange} />

            <AddTask />

            {tasks.length > 0 ? (
                <div className="task-list-div">
                    {tasks
                        .map(({ id }) =>
                            (<Task
                                key={id}
                                id={id}
                            />
                        ))
                    }
                </div>
            ) :
                null
            }

            <button onClick={handleSaveTemplate}>Save Template</button>
        </div>
    );
}

export default TaskListTemplate