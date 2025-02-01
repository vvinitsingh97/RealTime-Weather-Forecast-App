import React, { useState } from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <CurrentLocation />
      </div>
      <div className="footer-info">
        <a href="https://github.com/vvinitsingh97/RealTime-Weather-Forecast-App">
          Source Code
        </a>{" "}
        | Developed by{" "}
        <a target="_blank" href="#">
          Vinit Singh
        </a>
      </div>
    </React.Fragment>
  );
}

export default App;
