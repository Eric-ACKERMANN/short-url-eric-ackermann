import React from "react";
import { Redirect } from "react-router-dom";
import "./index.css";

function BlankPage(props) {
  const { onUrlCall, urlList } = props;

  if (urlList) {
    let extensionList = urlList.map(element => {
      return element.extension;
    });

    let position = extensionList.indexOf(props.match.params.char);

    if (position !== -1) {
      let redirectLink = urlList[position].initialURL;
      onUrlCall(urlList[position], false);

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

export default BlankPage;

// this.props.match.params.id
