import React from "react";
import "./index.css";

function List(props) {
  const { urlList, deleteClick, onShortUrlClick, inputValue } = props;
  return (
    <div className="list-container">
      <div className="list-block">
        <ul>
          <li>Original URL</li>
          <li>Short URL</li>
          <li>Visits</li>
          <li>Delete</li>
        </ul>

        {urlList &&
          urlList.map((element, index) => {
            return (
              <ul
                key={index}
                className={
                  element.initialURL === inputValue ? "list-double-case" : false
                }
              >
                <li>
                  <a href={element.initialURL}>{element.initialURL}</a>
                </li>
                <li>
                  <a
                    href={element.initialURL}
                    onClick={() => {
                      onShortUrlClick(element);
                    }}
                  >
                    {element.shortURL}
                  </a>
                </li>
                <li>{element.views}</li>
                <li>
                  <button onClick={() => deleteClick(element._id)}>
                    Delete
                  </button>
                </li>
              </ul>
            );
          })}
      </div>
    </div>
  );
}

export default List;
