import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function renderReact(){
    return (

        <App></App>
    );
}

ReactDOM.render(renderReact(), document.getElementById("root"));
