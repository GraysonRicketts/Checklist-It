import React from 'react';
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <h1>Landing page</h1>
            <Link to="/createChecklist">Create a Checklist Template</Link>
        </>
    );
}

export default Home