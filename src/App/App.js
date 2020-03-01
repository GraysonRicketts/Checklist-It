import React from 'react';
import TaskListTemplate from '../ChecklistTemplate/containers/TaskListTemplate';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Home';
import CreateChecklist from '../Checklist/container/CreateChecklist';
import VisibleChecklist from '../Checklist/container/VisibleChecklist';

function App() {

  return (
    <Router>
      <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/createChecklistTemplate">Create a Checklist Template</Link>
          </li>
          <li>
            <Link to="/createChecklist">Create a Checklist</Link>
          </li>
        </ul>
      </nav>

      <section className="main-section">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/createChecklistTemplate">
            <TaskListTemplate />
          </Route>
          <Route path="/createChecklist">
            <CreateChecklist />
          </Route>
          <Route path="/checklist:id">
            <VisibleChecklist />
          </Route>
        </Switch>
      </section>

      <footer>
        {/* TODO: Add footer */}
      </footer>
      </>
    </Router>
  );
}

export default App;
