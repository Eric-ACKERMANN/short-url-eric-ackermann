import React from "react";
import "./index.css";

function Header(props) {
  const { inputValue, handleChange, handleClick, double } = props;
  return (
    <div className="header-content">
      <div className="header-container">
        <h1>Simplify your links</h1>
        <div className="header-toolsBlock">
          <div className="header-tools">
            <input
              className={double ? "header-double-case" : false}
              placeholder="Your original URL here"
              value={inputValue}
              onChange={handleChange}
            />

            <button onClick={double ? false : handleClick}>SHORTEN URL</button>
          </div>
          {double && (
            <span className="header-doubleCase">
              This link has already been simplified, please check below !
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
