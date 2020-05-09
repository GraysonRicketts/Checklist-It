import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Checklist from "./pages/checklist/Checklist";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/checklist/:checklistId">
          <Checklist />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
