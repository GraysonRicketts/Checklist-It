import React from 'react';
import Task from '../containers/Task';

function TaskList(props) {
    const { tasks } = props;
    
    return (
        <div className="task-list-div">
            {tasks.map(({ id, text, subTasks, completed }) =>
                (<Task
                    key={id}
                    text={text}
                    subTasks={subTasks}
                    completed={completed}
                    id={id}
                />))}
        </div>
    );
}

export default TaskList;