import React from 'react';
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <header>Landing page</header>
            <Link to="/createChecklist">Create a Checklist Template</Link>
        </>
    );
}

export default Home