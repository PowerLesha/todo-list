import React, { useState, useEffect } from "react";

const DateComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Use useEffect to update the date every second (or as needed)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every 1000ms (1 second)

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>Current Date and Time: {currentDate.toLocaleString()}</p>
    </div>
  );
};

export default DateComponent;
