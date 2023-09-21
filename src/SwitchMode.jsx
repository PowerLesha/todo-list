function SwitchMode({ nightMode, setNightMode }) {
  const toggleNightMode = () => {
    setNightMode(!nightMode);
  };

  return (
    <div
      className={nightMode ? "night-mode" : ""}
      style={{ paddingTop: "10px", paddingLeft: "50px", position: "absolute" }}
    >
      <>
        {!nightMode ? (
          <h1>Switch to night mode</h1>
        ) : (
          <h1>Switch to light mode</h1>
        )}
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
