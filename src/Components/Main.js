import React from "react";
import { Route, Switch } from "react-router-dom";
import GlobalData from "./GlobalData/GlobalData";
import About from "./About/About";

export default function Main(props) {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={GlobalData} />
        <Route path="/about" component={About} />
      </Switch>
    </main>
  );
}
