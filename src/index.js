import React from "react";
import ReactDOM from "react-dom";
import Router from "Router";
import "public/css/app.scss";
import "public/css/style.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "commons/auth";

ReactDOM.render(
  <div>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisionChange
      draggable
      pauseOnHover
    />
    <Router />
  </div>,
  document.getElementById("root")
);
