import React from 'react';
import Task from '../containers/Task';

function TaskList(props) {
    const { tasks } = props;
    
    return (
        <div className="task-list-div">
            {tasks.map(({ id }) =>
                (<Task
                    key={id}
                    id={id}
                />))}
        </div>
    );
}

export default TaskList;