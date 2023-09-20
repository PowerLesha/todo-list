import React, { useState } from "react";

function SwitchMode({ nightMode, setNightMode }) {
  const toggleNightMode = () => {
    setNightMode(!nightMode);
  };
  console.log(nightMode);
  return (
    <div
      className={nightMode ? "night-mode" : ""}
      style={{ paddingTop: "10px", paddingLeft: "50px", position: "absolute" }}
    >
      <>
        <h1>Switch to night mode</h1>
        <label className="switch">
          <input className="toggle" type="checkbox" onClick={toggleNightMode} />
          <span className="slider"></span>
          <span className="card-side"></span>
        </label>
      </>
    </div>
  );
}

export default SwitchMode;
