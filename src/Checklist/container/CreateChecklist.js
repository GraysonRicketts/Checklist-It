import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { createChecklist } from '../checklists.actions';

function CreateChecklist() {
    const templates = useSelector(state => state.templates);
    const dispatch = useDispatch()

    const handleCreateChecklistClicked = (templateId) => {
        const tasks = [...(templates.find(t => t.id === templateId)).tasks];
        console.log(`Creating checklist: ${tasks.toString()}`)
        dispatch(createChecklist(tasks));
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