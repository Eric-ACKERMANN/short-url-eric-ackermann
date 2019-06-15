import React from "react";
import { Redirect } from "react-router-dom";

function BlankPage(props) {
  const { onUrlCall } = props;

  if (props.urlList) {
    let extensionList = props.urlList.map(element => {
      return element.extension;
    });
    let position = extensionList.indexOf(props.match.params.char);
    if (position !== -1) {
      let redirectLink = props.urlList[position].initialURL;
      onUrlCall(props.urlList[position], false);
      return (window.location = redirectLink);
    } else {
      return <Redirect to={"/"} />;
    }
  } else {
    return <div>Redirecting....</div>;
  }
}

export default BlankPage;

// this.props.match.params.id
