import React from "react";
import "../styles/loader.css";

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    </div>
  );
};

export { Loader };
