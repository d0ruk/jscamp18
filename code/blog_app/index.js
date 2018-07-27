const React = require("react");
const ReactDOM = require("react-dom");

const BlogApp = require("./BlogApp.jsx");

ReactDOM.hydrate(<BlogApp />, document.getElementById("app"));
