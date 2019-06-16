import React from "react";
import { Redirect } from "react-router-dom";
import "./index.css";
import axios from "axios";

class BlankPage extends React.Component {
  state = {
    urlList: null,
    urlCalled: true
  };

  // Function to get le urlList
  setUrlList = async toto => {
    const response = await axios.get(
      "https://reduc-url-server.herokuapp.com/url"
    );
    this.setState({ urlList: response.data });
  };

  // Function to add a view when url is called in browser
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
    if (this.state.urlList) {
      let extensionList = this.state.urlList.map(element => {
        return element.extension;
      });
      // Position of the called URL in the UrlList array
      let position = extensionList.indexOf(this.props.match.params.char);

      // If URL in the list, redirect to the initialURL link
      if (position !== -1) {
        let redirectLink = this.state.urlList[position].initialURL;
        this.onUrlCall(this.state.urlList[position], false);
        return (
          <div className="blankPage-block">
            <div>{(window.location = redirectLink)}</div>
          </div>
        );
      } else {
        // If URL not in the list, redirect to Home
        return (
          <div>
            <div>Redirecting....</div>;
            <Redirect to={"/"} />
          </div>
        );
      }
    } else {
      return <div>Redirecting....</div>;
    }
  }
  async componentDidMount() {
    await this.setUrlList();
  }
}

export default BlankPage;
