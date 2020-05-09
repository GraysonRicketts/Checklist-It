import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Loader } from "./components/Loader";

const pages: [string, React.FC][] = [
  ["/checklist/:checklistId", lazy(() => import("./pages/Checklist"))],
  ["/", lazy(() => import("./pages/Home/"))],
];

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        {pages.map(([path, Page]) => (
          <Route key={path} path={path}>
            <Suspense fallback={<Loader />}>
              <Page />
            </Suspense>
          </Route>
        ))}
      </Switch>
    </Router>
  );
}

export default App;
