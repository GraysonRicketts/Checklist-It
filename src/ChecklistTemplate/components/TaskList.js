import React from 'react';
import Task from '../containers/Task';

function TaskList(props) {
    const { tasks, hideCompleted } = props;
    
    return (
        <div className="task-list-div">
            {tasks
            .filter(t => hideCompleted ? !t.completed : true)
            .map(({ id }) =>
                (<Task
                    key={id}
                    id={id}
                />))}
        </div>
    );
}

export default TaskList;