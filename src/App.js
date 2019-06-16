import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import BlankPage from "./components/BlankPage";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route
          exact={true}
          path="/"
          render={props => {
            return <Home />;
          }}
        />
        <Route
          path="/:char"
          render={props => {
            return <BlankPage match={props.match} />;
          }}
        />
      </Router>
    );
  }
}

export default App;
