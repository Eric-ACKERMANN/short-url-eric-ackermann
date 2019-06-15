import React from "react";
import Header from "../Header";
import List from "../List";
import axios from "axios";

class Home extends React.Component {
  state = {
    inputValue: null,
    urlList: null,
    isLoading: false,
    test: [],
    double: false
  };

  // Function to get url List form server
  setUrlList = async toto => {
    const response = await axios.get(
      "https://reduc-url-server.herokuapp.com/url"
    );
    this.setState({ urlList: response.data });
  };

  // Function to handle the input in header
  handleChange = async event => {
    await this.setState({ inputValue: event.target.value });

    // Doublon case
    let initialUrlArray = this.state.urlList.map(e => {
      return e.initialURL;
    });
    let position = initialUrlArray.indexOf(this.state.inputValue);
    console.log(position);
    if (position !== -1) {
      this.setState({ double: true });
    } else {
      if (this.state.double) {
        this.setState({ double: false });
      }
    }
  };

  // Function to get a random Number for unicode char a-z or A-Z or 1-9
  randomNumber = () => {
    let random = Math.floor(48 + Math.random() * (123 - 48));
    while ((57 < random && random < 65) || (90 < random && random < 97)) {
      random = this.randomNumber();
    }
    return random;
  };

  //Function t create a string of 5 random characters
  randomChar = () => {
    let str = "";
    for (let i = 0; i < 5; i++) {
      let randomNumber = this.randomNumber();
      str = str + String.fromCharCode(randomNumber);
    }
    return str;
  };

  // Function to handle the click on "SHORTEN URL"
  handleClick = async toto => {
    let random = this.randomChar();
    let shortURL = `localhost:3000/${random}`;
    // https://short-url-eric-ackermann.herokuapp.com
    await axios.post("https://reduc-url-server.herokuapp.com/url/create", {
      initialURL: this.state.inputValue,
      shortURL: shortURL,
      extension: random
    });

    await this.setUrlList();
    this.props.getAppList(this.state.urlList);
  };

  onShortUrlClick = async element => {
    await axios.post("https://reduc-url-server.herokuapp.com/url/update", {
      id: element._id,
      url: {
        views: element.views + 1
      }
    });
    await this.setUrlList();
    this.props.getAppList(this.state.urlList);
  };
  // Function only used in prod
  deleteClick = async toto => {
    await axios.post("https://reduc-url-server.herokuapp.com/url/delete", {
      id: toto
    });
    await this.setUrlList();
    this.props.getAppList();
  };

  // Double URL case

  render() {
    if (this.state.isLoading) {
      return <div>En cours de chargement...</div>;
    }

    // Double URL case

    return (
      <div>
        <Header
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          double={this.state.double}
        />
        <List
          urlList={this.state.urlList}
          deleteClick={this.deleteClick}
          onShortUrlClick={this.onShortUrlClick}
          inputValue={this.state.inputValue}
        />
      </div>
    );
  }

  async componentDidMount() {
    await this.setUrlList();
    this.props.getAppList(this.state.urlList);
    this.setState({ isLoading: false });
  }
}

export default Home;
