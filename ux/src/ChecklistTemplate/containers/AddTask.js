import React, { useState } from 'react';
import { createTask } from '../templates.actions';
import { useDispatch } from "react-redux";


function AddTask(props) {
    const { templateId, parentTask } = props;
    const [taskInput, setTaskInput] = useState('');
    const dispatch = useDispatch();

    const handleAddTask = () => {
        if (!taskInput.trim()) {
            return
        }
        dispatch(createTask(templateId, taskInput.trim(), parentTask))
        setTaskInput('');
    }

    const handleTaskInputChange = (e) => {
        e.preventDefault();
        setTaskInput(e.target.value);
    }

    return (
        <div className="add-task-form">
            <button onClick={handleAddTask}>Add</button>
            <input type="text" className="task-input" value={taskInput} onChange={handleTaskInputChange} />
        </div>
    );
}

export default AddTask;