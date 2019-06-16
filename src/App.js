import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import BlankPage from "./components/BlankPage";
import axios from "axios";

class App extends React.Component {
  state = {
    initialUrl: null,
    urlList: null,
    urlCalled: true
  };

  setUrlList = async toto => {
    const response = await axios.get(
      "https://reduc-url-server.herokuapp.com/url"
    );
    this.setState({ urlList: response.data });
  };

  getAppList = toto => {
    this.setState({ urlList: toto });
  };

  onUrlCall = async (element, bool) => {
    if (this.state.urlCalled === true) {
      await axios.post("https://reduc-url-server.herokuapp.com/url/update", {
        id: element._id,
        url: {
          views: element.views + 1
        }
      });
    }
    this.setState({ urlCalled: bool });
    await this.setUrlList();
  };

  render() {
    return (
      <Router>
        <Route
          exact={true}
          path="/"
          render={props => {
            return <Home getAppList={this.getAppList} />;
          }}
        />
        <Route
          path="/:char"
          render={props => {
            return (
              <BlankPage
                match={props.match}
                urlList={this.state.urlList}
                onUrlCall={this.onUrlCall}
              />
            );
          }}
        />
      </Router>
    );
  }
  async componentDidMount() {
    await this.setUrlList();
  }
}

export default App;
