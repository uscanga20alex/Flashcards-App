import React from "react";
import { BrowserRouter as Router, Switch, Link, Route  } from "react-router-dom";
import Layout from "./Layout";
import "./App.css";
import Home from "./Componants/Home"

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
  return (
    <div className="app-routes">
      <Switch>
        <Route path="/">
          <Layout />
        </Route>
      </Switch>
    </div>
  );
}

export default App; //
