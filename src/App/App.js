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
import { useDispatch } from "react-redux";
import { updateTemplate } from '../ChecklistTemplate/templates.actions'
import CreateTemplate from '../ChecklistTemplate/containers/CreateTemplate';

function App() {
  // TODO: remove, only for faster testing
  const dispatch = useDispatch();
  dispatch(updateTemplate([
    {
      "id": 1,
      "text": "one"
    },
    {
      "id": 2,
      "text": "two"
    },
    {
      "id": 3,
      "text": "three"
    }
  ], 'defaultedData'));

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
            <CreateTemplate />
          </Route>
          <Route path="/template/:templateId">
            <TaskListTemplate />
          </Route>
          <Route path="/createChecklist">
            <CreateChecklist />
          </Route>
          <Route path="/checklist/:checklistId">
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
