// import React, {Component} from "react";
// import ReactDOM from "react-dom";
// import ReactDOM from "./kreact/react-dom";
// import Component from "./kreact/Component";
import { useReducer, useEffect, useLayoutEffect } from "./creact-5-18-mini-hooks-effect/react";
import ReactDOM from "./creact-5-18-mini-hooks-effect/react-dom";
import "./index.css";

function FunctionComponent({name}) {
    const [count1, setCount1] = useReducer(x => x + 1, 0)
    const [count2, setCount2] = useReducer(x => x + 1, 1)

    useEffect(() => {
        console.log('useEffect', count2)
    }, [count2])

    useLayoutEffect(() => {
        console.log('useEffect', count2)
    }, [count2])


    return (
      <div className="border">
        <p>{name}</p>
        <button onClick={() => setCount1()}>{count1}</button>
        <button onClick={() => setCount2()}>{count2}</button>
      </div>
    );
}

function FC() {
    const [count, setCount] = useReducer(x => x + 1, 1)
    return(
        <>
            <h1>coboy</h1>
            <h2>cobyte</h2>
            <button onClick={() => setCount()}>{count}</button>
        </>
    )
}

const jsx = (
  <div className="border">
    <h1>coboy</h1>
    <a href="https://www.amebyte.com/">amebyte</a>
    <FunctionComponent name="coboy" />
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));

// console.log("React", React.version); //sy-log
