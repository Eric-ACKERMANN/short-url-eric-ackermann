import React from "react";
import Header from "../Header";
import List from "../List";
import axios from "axios";

class Home extends React.Component {
  state = {
    inputValue: "",
    urlList: null,
    isLoading: false,
    test: [],
    double: false,
    doublePosition: null
  };

  // Function to get url List from server
  setUrlList = async toto => {
    const response = await axios.get(
      "https://reduc-url-server.herokuapp.com/url"
    );
    this.setState({ urlList: response.data });
  };

  // Function that split into array what is in the input, type : http://www.google.fr >> [http:,,[www,google,fr]], used in matchInput method
  splitInput = input => {
    if (this.state.inputValue) {
      input = input.split("/");
      if (input[2]) {
        input[2] = input[2].split(".");
      }
      return input;
    } else return false;
  };

  // Function to check in two arrays are equal, use in matchInput method
  arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  // Function to check if the URL in input is already in list below,
  // NOTE : https://www.google.fr matches with https://google.fr  and https://www.google.fr/
  // the www. and the / at end of URL is considered as not necessary to create another URL in list
  matchInput = (input, array) => {
    if (this.state.inputValue.length > 0 && this.state.urlList) {
      let array2 = [...array];
      let input2 = input;
      for (let i = 0; i < array2.length; i++) {
        array2[i] = this.splitInput(array2[i]);
      }
      input2 = this.splitInput(input2);

      // If last element is "" , means the url is https://www.google.fr/ type, we remove the / at the end
      if (input2[input2.length - 1] === "") {
        input2.pop();
      }
      for (let i = 0; i < array2.length; i++) {
        // We check input if we have www.leboncoin.fr/ to turn it into www.leboncoin.fr for all URL in list
        if (array2[i][array2[i].length - 1] === "") {
          array2[i].pop();
        }

        if (
          array2[i].length === input2.length &&
          (this.arraysEqual(
            array2[i][array2[i].length - 1],
            input2[input2.length - 1]
          ) ||
            input2.length === 3)
        ) {
          // array2[i] is [https:,,[www,google,fr],annonces,etc]
          // array2[i][2] is [www,google,fr]

          // array2[i] is [https:,,[google,fr],annonces,etc]
          // array2[i][2] is [google,fr]

          // array2[i] is [https:,,[projects,invisionsapp,com],annonces,etc]
          // array2[i][2] is [projects,invisionapp,com]

          // array2[i] is [https:,,[google,fr],annonces,etc]
          // array2[i][2] is [google,fr]
          let bool = Array(array2[i][2].length).fill(false);
          let bool2 = true;

          for (let j = 0; j < array2[i][2].length; j++) {
            if (
              array2[i][2][array2[i][2].length - 1 - j] ===
              input2[2][input2[2].length - 1 - j]
            ) {
              bool[j] = true;
            }
            if (
              array2[i][2][0] === "www" &&
              array2[i][2].length === input2[2].length + 1
            ) {
              bool[array2[i][2].length - 1] = true;
            }
            if (
              input2[2][0] === "www" &&
              array2[i][2].length === input2[2].length - 1
            ) {
              bool[array2[i][2].length - 1] = true;
            }
          }
          for (let i = 0; i < bool.length; i++) {
            if (bool[i] === false) {
              bool2 = false;
            }
          }
          // If input and Array[i] match, the e return true and the position of the URL in list
          if (bool2) {
            return [true, i];
          }
        }
      }
    }
    return false;
  };

  // Function to handle the input in header
  handleChange = async event => {
    await this.setState({ inputValue: event.target.value });

    let initialUrlList = [];
    if (this.state.urlList) {
      initialUrlList = this.state.urlList.map(element => {
        return element.initialURL;
      });
    }
    // Check if inputValue and an URL in list match
    if (this.matchInput(this.state.inputValue, initialUrlList)[0]) {
      this.setState({ double: true });
      this.setState({
        doublePosition: this.matchInput(
          this.state.inputValue,
          initialUrlList
        )[1]
      });
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

  //Function to create a string of 5 random characters
  randomChar = () => {
    let str = "";
    for (let i = 0; i < 5; i++) {
      let randomNumber = this.randomNumber();
      str = str + String.fromCharCode(randomNumber);
    }
    return str;
  };

  // Function to handle the click on button "SHORTEN URL"
  handleClick = async toto => {
    let random = this.randomChar();
    let shortURL = `https://short-url-eric-ackermann.herokuapp.com/${random}`;
    await axios.post("https://reduc-url-server.herokuapp.com/url/create", {
      initialURL: this.state.inputValue,
      shortURL: shortURL,
      extension: random
    });

    const response = await axios.get(
      "https://reduc-url-server.herokuapp.com/url"
    );
    this.setState({ urlList: response.data, inputValue: "" });
  };

  // Function only used in prod
  // deleteClick = async toto => {
  //   await axios.post("https://reduc-url-server.herokuapp.com/url/delete", {
  //     id: toto
  //   });
  //   await this.setUrlList();
  // };

  render() {
    if (this.state.isLoading) {
      return <div>En cours de chargement...</div>;
    }

    return (
      <div>
        <Header
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          double={this.state.double}
          inputValue={this.state.inputValue}
        />
        <List
          urlList={this.state.urlList}
          // deleteClick={this.deleteClick}
          doublePosition={this.state.doublePosition}
          double={this.state.double}
        />
      </div>
    );
  }

  async componentDidMount() {
    await this.setUrlList();
    this.setState({ isLoading: false });
  }
}

export default Home;
