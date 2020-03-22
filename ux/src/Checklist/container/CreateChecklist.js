import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { createChecklist } from '../checklists.actions';
import { useHistory } from "react-router-dom";

function CreateChecklist() {
    const templates = useSelector(state => state.templates);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleCreateChecklistClicked = (templateId) => {
        const template = templates.find(t => t.id === templateId);
        const createAction = dispatch(createChecklist(template.name, [...template.tasks]));

        history.push(`/checklist/${createAction.id}`);
    }

    return (
        <div>
            <h1>Start a new checklist</h1>

            {templates.length ? (
                <ul className="create-checklist-ul">
                    {templates.map(t => (
                        <li key={t.id}>
                            <button onClick={() => {handleCreateChecklistClicked(t.id)}}>Create</button>
                            <p>{t.name}</p>
                        </li>
                    ))}
                </ul>
                ) : (
                    <p>Create a template first</p>
                )
            }            
        </div>
    );
}

export default CreateChecklist 