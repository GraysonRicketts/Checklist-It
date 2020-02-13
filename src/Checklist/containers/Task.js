import React from 'react';
import TaskList from '../components/TaskList';
import AddTask from './AddTask'
import { useSelector, useDispatch } from "react-redux";
import { toggleTask as toggleTaskAction } from '../tasks.actions';
import styled from 'styled-components';

const StyledTaskList = styled(TaskList)`
    width: calc(100% - 1em);
`;

function Task(props) {
    const { text, completed, id } = props;
    const subTasks = useSelector(state => state.tasks.filter(t => t.parentTask === id));
    const dispatch = useDispatch();

    const toggleTask = () => {
        dispatch(toggleTaskAction(id));
    }

    console.log(`completed: ${completed}`)

    return (
        <div className="task-section">
            <div className="task-text-div">
                <input type="checkbox" onChange={toggleTask} checked={completed} />
                <p style={{ textDecoration: completed ? 'line-through' : 'none' }}>{text}</p>
            </div>

            {subTasks ? <StyledTaskList
                tasks={subTasks}
                parentTask={id}
            /> : null}

            <div className="inline-add-task">
                <AddTask parentTask={id} />
            </div>
        </div>
    );
}

export default Task;