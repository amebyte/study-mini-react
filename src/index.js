// import React, {Component} from "react";
// import ReactDOM from "react-dom";
// import ReactDOM from "./kreact/react-dom";
// import Component from "./kreact/Component";
import ReactDOM from "./creact/react-dom";
import "./index.css";

function FunctionComponent({name}) {
    return (
      <div className="border">
        <p>{name}</p>
      </div>
    );
}

function FC() {
    return(
        <>
            <h1>coboy</h1>
            <h2>cobyte</h2>
        </>
    )
}

const jsx = (
  <div className="border">
    <h1>coboy</h1>
    <a href="https://www.amebyte.com.com/">amebyte</a>
    <FunctionComponent name="Function" />
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));

// console.log("React", React.version); //sy-log
