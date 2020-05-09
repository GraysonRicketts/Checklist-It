import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
    const checklistsInProgress = useSelector(state => state.checklists);
    return (
        <>
            <h1>Landing page</h1>
            <Link to="/createChecklist">Create a Checklist</Link>

            <h2>Checklists in progress</h2>
            <ul>
                {checklistsInProgress.length > 0 ?
                    checklistsInProgress.map(c =>
                        (<li>
                            <Link to={`/checklist/${c.id}`}>{c.name}</Link>
                        </li>)
                ) : <p>No checklists</p>}
            </ul>
        </>
    );
}

export default Home