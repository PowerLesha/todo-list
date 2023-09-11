import { useEffect, useState } from "react";
import "react-clock/dist/Clock.css";
import Clock from "react-clock";

function ClockComponent() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="date-component">
      <Clock value={value} size={100} locale="bg" />
    </div>
  );
}

export default ClockComponent;
