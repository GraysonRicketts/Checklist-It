import React, { useEffect } from 'react';
import TaskVisibilityToggle from './TaskVisibilityToggle';
import Task from './Task';
import AddTask from '../../ChecklistTemplate/containers/AddTask';
import { setTasks } from '../../common/tasks.actions';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function VisibleChecklist() {
    let { checklistId } = useParams();
    const tasks = useSelector(state => state.tasks.filter(t => !t.parentTask));
    const checklist = useSelector(state => state.checklists.find(c => c.id === checklistId));
    const hideCompleted = useSelector(state => state.visiblity);
    const dispatch = useDispatch()

    useEffect(() => {
        if (!tasks || tasks.length < 0) {
            dispatch(setTasks(checklist.tasks));
        }
    })

    return (
        <div className="visible-tasks-div">
            <AddTask />

            {tasks.length > 0 ? (
                tasks
                    .filter(t => !(t.completed && hideCompleted))
                    .map(({ id }) =>
                        (<Task
                            key={id}
                            id={id}
                        />
                    ))
            ) :
                null
            }

            <TaskVisibilityToggle />
        </div>
    );
}

export default VisibleChecklist