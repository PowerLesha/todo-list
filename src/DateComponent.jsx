import { useState, useEffect } from "react";

const DateComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Use useEffect to update the date every second (or as needed)
  useEffect(() => {
    setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every 1000ms (1 second)
  }, []);

  return (
    <div>
      <p>Current Date and Time: {currentDate.toLocaleString()}</p>
    </div>
  );
};

export default DateComponent;
