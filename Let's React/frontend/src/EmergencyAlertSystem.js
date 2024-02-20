import React, { useState } from 'react';
import './emer.css'; // Import CSS file

const EmergencyAlertSystem = () => {
  const [alertSent, setAlertSent] = useState(false);

  const handleEmergencyButtonClick = () => {
    const emergencyData = {
      location: "Current Location",
      message: "Emergency situation, immediate assistance required!",
    };

    fetch("/emergency", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emergencyData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Emergency alert sent:", data.message);
        setAlertSent(true);
      })
      .catch((error) => {
        console.error("Error sending emergency alert:", error);
        alert("Error sending emergency alert. Please try again later.");
      });
  };

  return (
    <div>
      <h1 className="title">Emergency Alert System</h1>
      <p className="description">
        Welcome to the Emergency Alert System. Please click the button below
        to send an emergency alert.
      </p>

      <div className="but">
        <button className="emergency" onClick={handleEmergencyButtonClick}>
          EMERGENCY
        </button>
      </div>
      {alertSent && <p>Emergency alert sent successfully!</p>}
    </div>
  );
};

export default EmergencyAlertSystem;