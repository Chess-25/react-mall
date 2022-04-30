import React from "react";
import ReactDOM from "react-dom/client"; // 修改后的引入路径
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// 修改后的ReactDom方法
ReactDOM.createRoot(document.getElementById("root")).render(<App />);

reportWebVitals();
