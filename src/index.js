// import React, {Component} from "react";
// import ReactDOM from "react-dom";
// import ReactDOM from "./kreact/react-dom";
// import Component from "./kreact/Component";
import {useReducer} from './creact/react'
import ReactDOM from "./creact/react-dom";
import "./index.css";

function FunctionComponent({name}) {
    const [count2, setCount2] = useReducer(x => x + 1, 1)
    return (
      <div className="border">
        <p>{name}</p>
        <button onClick={() => setCount2()}>{count2}</button>
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
    <FC />
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));

// console.log("React", React.version); //sy-log
