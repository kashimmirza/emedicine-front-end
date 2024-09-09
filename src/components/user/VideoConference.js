/** @format */

import React from "react";

const VideoConference = () => {
 // Define the style for the video consultation button
 const videoConsultationButtonStyle = {
  backgroundColor: "#4CAF50", // Green background
  color: "white", // White text
  padding: "15px 32px", // Padding
  textAlign: "center", // Center the text
  textDecoration: "none", // Remove underline
  display: "inline-block", // Inline-block for proper button display
  fontSize: "16px", // Font size
  margin: "4px 2px", // Margin
  cursor: "pointer", // Pointer cursor on hover
  borderRadius: "8px", // Rounded corners
  border: "none", // No border
 };

 const handleVideoConsultation = (platform) => {
  let url = "";
  switch (platform) {
   case "WhatsApp":
    url = "https://api.whatsapp.com/send?phone=YOUR_DOCTOR_PHONE_NUMBER";
    break;
   case "Zoom":
    url = "https://zoom.us/j/YOUR_ZOOM_MEETING_ID";
    break;
   case "IMO":
    url = "imop://your_doctor_profile";
    break;
   default:
    alert("Please select a valid platform!");
    return;
  }
  window.open(url, "_blank");
 };

 return (
  <div style={{ textAlign: "center", marginTop: "50px" }}>
   <button
    style={videoConsultationButtonStyle}
    onClick={() => handleVideoConsultation("WhatsApp")} // Replace with your preferred platform
   >
    Doctor Video Consultation{" "}
   </button>{" "}
   <div style={{ marginTop: "20px" }}>
    <h4> Select Platform: </h4>{" "}
    <button onClick={() => handleVideoConsultation("WhatsApp")}>
     WhatsApp{" "}
    </button>{" "}
    <button onClick={() => handleVideoConsultation("Zoom")}> Zoom </button>{" "}
    <button onClick={() => handleVideoConsultation("IMO")}> IMO </button>{" "}
   </div>{" "}
  </div>
 );
};

export default VideoConference;
