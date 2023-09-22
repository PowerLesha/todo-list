import { useEffect } from "react";
type SwitchModeProps = {
  nightMode: boolean;
  setNightMode: (nightMode: boolean) => void;
};
function SwitchMode({ nightMode, setNightMode }: SwitchModeProps) {
  useEffect(() => {
    const savedNightMode = localStorage.getItem("nightMode");
    if (savedNightMode) {
      setNightMode(savedNightMode === "true");
    }
  }, [setNightMode]);

  const toggleNightMode = () => {
    setNightMode(!nightMode);
    // Save the new night mode value to local storage
    localStorage.setItem("nightMode", (!nightMode).toString());
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
