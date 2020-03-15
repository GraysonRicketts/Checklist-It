import React from 'react';
import Task from './Task';
import AddTask from './AddTask';
import { useSelector, useDispatch } from "react-redux";
import { updateTemplate } from '../templates.actions';
import { useHistory, useParams } from "react-router-dom";

function TaskListTemplate() {
    const { templateId } = useParams();
    const template = useSelector(state => state.templates.find(t => t.id === templateId));
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSaveTemplate = () => {
        dispatch(updateTemplate(template.tasks, template.name))
        history.push('/');
    }

    const handleCheckListNameChange = (e) => {
        e.preventDefault();
        const newTemplateName = e.target.value.trim();
        dispatch(updateTemplate(templateId, null, newTemplateName));
    }

    return (
        <div className="visible-tasks-div">
            <header>
                <h1>Checklist Template Creator</h1>
            </header>

            <label htmlFor="template-name">Checklist name</label>
            <input type="text" id="template-name" value={template.name} onChange={handleCheckListNameChange} />

            <AddTask templateId={templateId} />

            {template.tasks.filter(t => !t.parentTask).length > 0 ? (
                <div className="task-list-div">
                    {template.tasks
                        .filter(t => !t.parentTask)
                        .map(({ id }) =>
                            (<Task
                                key={id}
                                id={id}
                                templateId={templateId}
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