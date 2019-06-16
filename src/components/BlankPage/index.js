import React from "react";
import { Redirect } from "react-router-dom";
import "./index.css";
import axios from "axios";

class BlankPage extends React.Component {
  state = {
    urlList: null,
    urlCalled: true
  };

  setUrlList = async toto => {
    const response = await axios.get(
      "https://reduc-url-server.herokuapp.com/url"
    );
    this.setState({ urlList: response.data });
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
    if (this.state.urlList) {
      let extensionList = this.state.urlList.map(element => {
        return element.extension;
      });

      let position = extensionList.indexOf(this.props.match.params.char);

      if (position !== -1) {
        let redirectLink = this.state.urlList[position].initialURL;
        this.onUrlCall(this.state.urlList[position], false);

        return (
          <div className="blankPage-block">
            <div>{(window.location = redirectLink)}</div>
          </div>
        );
      } else {
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

// this.props.match.params.id
