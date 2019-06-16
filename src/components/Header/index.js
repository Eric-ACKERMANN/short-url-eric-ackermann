import React from "react";
import "./index.css";

function Header(props) {
  const { inputValue, handleChange, handleClick, double } = props;

  let expression = /^https?:\/\/[/\S\w*/]{1,256}\.[a-z]{1,256}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)?$/gi;
  let regex = new RegExp(expression);
  let buttonDisabled = false;
  if (double || inputValue === "" || !inputValue.match(regex)) {
    buttonDisabled = true;
  } else {
    buttonDisabled = false;
  }
  return (
    <div className="header-content">
      <div className="header-container">
        <h1>Simplify your links</h1>
        <div className="header-toolsBlock">
          <div className="header-tools">
            <input
              className={double ? "header-doubleCaseInput" : undefined}
              placeholder="Your original URL here"
              value={inputValue}
              onChange={handleChange}
            />

            <button
              onClick={buttonDisabled ? false : handleClick}
              className={
                buttonDisabled
                  ? "header-button-disable"
                  : "header-button-active"
              }
            >
              SHORTEN URL
            </button>
          </div>
          {double && (
            <span className="header-doubleCase">
              <span className="header-doubleCase-title">
                This link has already been simplified, please check below!
              </span>
              <br />
              <span className="header-doubleCase-text">
                Note: https://www.lereacteur.io is considered the same as
                https://lereacteur.io, https://lereacteur.io/,
                https://www.lereacteur.io/
              </span>
            </span>
          )}
          {inputValue && !inputValue.match(regex) && (
            <span className="header-doubleCase">
              URL invalid, set a valid one, exemple :
              "https://www.lereacteur.io" or "http://lereacteur.io"
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
