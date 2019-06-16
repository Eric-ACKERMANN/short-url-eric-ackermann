import React from "react";
import "./index.css";

function List(props) {
  const {
    urlList,
    // deleteClick,
    double,
    doublePosition
  } = props;
  return (
    <div className="list-container">
      <div className="list-block">
        <ul>
          <li>Original URL</li>
          <li>Short URL</li>
          <li>Visits</li>
          {/* <li>Delete</li> */}
        </ul>

        {urlList &&
          urlList.map((element, index) => {
            return (
              <ul
                key={index}
                className={
                  double && index === doublePosition
                    ? "list-double-case"
                    : undefined
                }
              >
                <li>
                  <a href={element.initialURL}>{element.initialURL}</a>
                </li>
                <li>
                  <a href={element.shortURL}>{element.shortURL}</a>
                </li>
                <li>{element.views}</li>
                {/* <li>
                  <button onClick={() => deleteClick(element._id)}>
                    Delete
                  </button>
                </li> */}
              </ul>
            );
          })}
      </div>
    </div>
  );
}

export default List;
