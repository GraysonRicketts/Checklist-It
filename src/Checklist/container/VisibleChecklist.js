import React from 'react';
import TaskVisibilityToggle from './TaskVisibilityToggle';
import Task from './Task';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function VisibleChecklist() {
    let { checklistId } = useParams();
    const checklist = useSelector(state => state.checklists.find(c => c.id.toString() === checklistId));
    const hideCompleted = useSelector(state => state.visiblity);
    
    return (
        <div className="visible-tasks-div">
            {checklist ? 
                <>
                    <h1>{checklist.name}</h1>

                    {checklist.tasks.length ? (
                        checklist.tasks
                            .filter(t => !(t.completed && hideCompleted))
                            .map(({ id }) =>
                                (<Task
                                    key={id}
                                    id={id}
                                />
                            ))
                    ) : null}
        
                    <TaskVisibilityToggle />
                </>
            : 
            <p>loading...</p>}
            
        </div>
    );
}

export default VisibleChecklist