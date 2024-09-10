/** @format */

import React, { useEffect, useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import content1 from "../assets/content1.png";
import content2 from "../assets/content2.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import CartPopover from "./user/Cart.js";
import CloseIcon from "@mui/icons-material/Close";
import {
 TextField,
 Typography,
 IconButton,
 MenuItem,
 Popover,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const countryCode = [
 { code: "+880", label: "Bangladesh" },
 { code: "+91", label: "India" },
 { code: "+1", label: "USA" },
];
const Home = () => {
 const [showModal, setShowModal] = useState(false);
 const [displayedText, setDisplayedText] = useState(
  "Search medicine(e.g.,Napa)",
 );

 const [isAnimating, setIsAnimating] = useState(true);
 const [searchText, setSearchText] = useState("");
 const [suggestions, setSuggestions] = useState([]);
 const [isFocused, setIsFocused] = useState(false);
 const medicine = ["Napa", "Paracetamol", "Aspirin", "Ibuprofen", "Cetirizine"];
 const [showPopover, setShowPopover] = useState(false);
 const [anchorEl, setAnchorEl] = useState(null);

 const [showCartPopover, setShowCartPopover] = useState(false);
 const [phoneNumber, setPhoneNumber] = useState("");
 const [selectedCode, setSelectedCode] = useState("+880");
 const [otp, setOtp] = useState(false);
 const [otpSent, setOtpSent] = useState(false);
 const [otpVerified, setOtpVerified] = useState(false);
 const [timer, setTimer] = useState(60);
 const [resendDisabled, setResendDisabled] = useState(false);
 const [attempts, setAttempts] = useState(0);

 const handleCartClick = () => {
  setShowCartPopover(!showCartPopover);
 };
 const handleShowPopover = (event) => {
  setAnchorEl(event.currentTarget);
  setShowPopover(true);
 };

 // Close modal
 const handleClosePopover = () => {
  setAnchorEl(null);
  setShowPopover(false);
 };
 const open = Boolean(anchorEl);
 const id = open ? "Cart-popover" : undefined;

 const navigate = useNavigate();
 const handleSendOTP = () => {
  if (!phoneNumber) {
   alert("Please enter a valid phone number.");
   return;
  }
  const data = {
   phone: "${selectedCode}${phoneNumber}",
   message: "Your OTP code is :12345",
  };
  fetch("baseUrl/send-otp", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify(data),
  })
   .then((response) => {
    if (response.ok) {
     alert("OTP sent to ${selectedCode}${phoneNumber}");
    } else {
     throw new Error("Failed to send OTP");
    }
   })
   .catch((error) => {
    console.error("Error:", error);
    alert("failed to send OTP. Please try again later.");
   });
 };

 // Text animation effect
 useEffect(() => {
  if (isAnimating) {
   const fullText = "Search medicine (e.g., Napa)";
   let index = 0;
   const intervalId = setInterval(() => {
    setDisplayedText(fullText.substring(0, index + 1));
    index++;
    if (index === fullText.length) index = 0;
   }, 200);
   return () => clearInterval(intervalId);
  }
 }, [isAnimating]);

 useEffect(() => {
  if (otpSent && timer > 0) {
   const interval = setInterval(() => {
    setTimer((prevTimer) => prevTimer - 1);
   }, 100);
   return () => clearInterval(interval);
  }
 }, [otpSent, timer]);

 const handleSentOTP = () => {
  if (phoneNumber.trim() === "") {
   alert("please enter a valid phone number.");
   return;
  }
  if (attempts >= 3) {
   alert("you've exceeded the maximum attempts. please try again later.");
   return;
  }
  setOtpSent(true);
  setResendDisabled(true);
  setTimer(60);
  setAttempts((prev) => prev + 1);
  fetch("/api/OTP/send", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({ phoneNumber: `${selectedCode}${phoneNumber}` }),
  })
   .then((response) => response.json())
   .then((data) => {
    console.log(data);
    alert(data.message);
   })
   .catch((error) => console.error("Error:", error));
 };

 const handleVerifyOTP = () => {
  fetch("/api/OTP/verify", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({ phoneNumber: `${selectedCode}${phoneNumber}`, otp }),
  })
   .then((response) => response.json())
   .then((data) => {
    if (data.message === "OTP verified successfully.") {
     setOtpVerified(true);
    } else {
     alert(data.message);
    }
   })
   .catch((error) => console.error("Error:", error));
 };
 const handleResendOTP = () => {
  if (resendDisabled) return;
  handleResendOTP();
 };

 // Stop animation and allow typing when user interacts with the search box
 const handleFocus = () => {
  setIsAnimating(false);
  setIsFocused(true);
 };

 // Update search text and show suggestions
 const handleSearchChange = (e) => {
  if (e.target.value !== "") {
   setSearchText(e.target.value);
   const filteredSuggestions = medicine.filter((med) =>
    med.toLowerCase().startsWith(e.target.value.toLowerCase()),
   );
   setSuggestions(filteredSuggestions);
  } else {
   setSuggestions([]);
  }
 };

 // Handle selecting a suggestion
 const handleSelectSuggestion = (medicine) => {
  setSearchText(medicine);
  setSuggestions([]); // Hide suggestions after selection
 };

 const handleShowModal = () => setShowModal(true);
 const handleCloseModal = () => setShowModal(false);

 return (
  <div>
   <div style={topPanelStyle}>
    <div style={searchContainerStyle}>
     <FaSearch size={10} style={{ marginRight: "8px", cursor: "pointer" }} />
     <TextField
      value={isFocused ? searchText : displayedText} // Use the displayedText until focused
      onFocus={handleFocus}
      onChange={handleSearchChange}
      placeholder={isFocused ? "Search for medicine..." : displayedText}
      fullWidth
     />
     {suggestions.length > 0 && (
      <div style={suggestionBoxStyle}>
       {suggestions.map((medicine, index) => (
        <MenuItem
         key={index}
         onClick={() => handleSelectSuggestion(medicine)}
         style={{ cursor: "pointer" }}
        >
         {medicine}
        </MenuItem>
       ))}
      </div>
     )}
    </div>
    {/*<div style={cartIconStyle} onClick={handleShowPopover}>*/}
    <div style={cartIconStyle}>
     <img
      src="/cart-icon.png"
      alt="Cart"
      onClick={handleShowPopover} // Trigger showing/hiding the cart popover
      style={{ cursor: "pointer" }}
     />

     <FaShoppingCart size={30} />
    </div>

    <Popover
     id={id}
     open={showPopover}
     anchorEl={anchorEl}
     onClose={handleClosePopover}
     anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
     }}
     transformOrigin={{
      vertical: "top",
      horizontal: "center",
     }}
    >
     <div style={{ padding: "1rem", width: "300px" }}>
      <IconButton
       Style={{ position: "absolute", top: 10, right: 10 }}
       onClick={handleClosePopover}
      >
       <CloseIcon />
      </IconButton>
      <Typography
       variant="h6"
       style={{ marginBottom: "1rem", textAlign: "center" }}
      >
       Your Cart
      </Typography>
      {/* you can add your cart items here */}
      <div
       style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
      >
       <TextField
        select
        label="Country Code"
        value={selectedCode}
        onChange={(e) => setSelectedCode(e.target.value)}
        variant="outlined"
        style={{ marginRight: "1rem", width: "30%" }}
       >
        {countryCode.map((option) => (
         <MenuItem key={option.code} value={option.code}>
          {option.label}({option.code})
         </MenuItem>
        ))}
       </TextField>
       <TextField
        label="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        variant="outlined"
        fullWidth
        placeholder="Enter phone number"
       ></TextField>
      </div>
      {otpSent && (
       <>
        <TextField
         label="Enter OTP"
         value={otp}
         onChange={(e) => setOtp(e.target.value)}
         variant="outlined"
         fullWidth
         style={{ marginBottom: "1rem" }}
        />
        <Typography
         variant="body2"
         style={{ marginBottom: "1rem", textAlign: "center" }}
        >
         {`Time remaining: ${timer} seconds`}
        </Typography>
       </>
      )}

      {otpSent ? (
       <>
        <Button
         variant="contained"
         color="primary"
         onClick={handleVerifyOTP}
         fullWidth
         style={{ backgroundColor: "green", marginBottom: "1rem" }}
        >
         Verify OTP
        </Button>
        {timer === 0 && (
         <Button
          variant="outlined"
          color="secondary"
          onClick={handleResendOTP}
          disabled={resendDisabled}
          fullWidth
         >
          Resend OTP
         </Button>
        )}
       </>
      ) : (
       <Button
        variant="contained"
        color="primary"
        onClick={handleSendOTP}
        fullWidth
        style={{ backgroundColor: "green", marginBottom: "1rem" }}
       >
        Send OTP
       </Button>
      )}

      {otpVerified && (
       <Typography variant="body1" color="green">
        OTP Verified!
       </Typography>
      )}

      {showPopover && <CartPopover />}
     </div>
    </Popover>
    <div style={loginContainerStyle}>
     <Typography
      variant="body1"
      component="span"
      style={{ marginRight: "10px", cursor: "pointer" }}
      onClick={() => navigate("/registration")}
     >
      Don’t have an account? Register
     </Typography>
     <IconButton color="inherit" onClick={() => navigate("/login")}>
      <AccountCircleIcon />
     </IconButton>
    </div>
   </div>

   {/* Sign-in Modal */}
   <Modal show={showModal} onHide={handleCloseModal}>
    <Modal.Header closeButton>
     <Modal.Title>Sign In</Modal.Title>
    </Modal.Header>
    <Modal.Body>
     <TextField
      variant="outlined"
      fullWidth
      placeholder="Mobile Number"
      sx={{ mb: 2 }}
     />
     <Button variant="contained" color="primary" fullWidth>
      Send OTP
     </Button>
    </Modal.Body>
    <Modal.Footer>
     <Button variant="secondary" onClick={handleCloseModal}>
      Close
     </Button>
    </Modal.Footer>
   </Modal>

   <div style={containerStyle}>
    {/* Left Side Panel */}
    <div style={leftPanelStyle}>
     <h3 style={headerStyle}>Categories</h3>
     <div style={buttonContainerStyle}>
      <button
       style={{ ...categoryButtonStyle, backgroundColor: "#FFA07A" }}
       onClick={() => navigate("/medicinegrid")}
      >
       OTC Medicine
      </button>
      <button
       style={{ ...categoryButtonStyle, backgroundColor: "#FFD700" }}
       onClick={() => navigate("/womens-choice")}
      >
       Women’s Choice
      </button>
      <button
       style={{ ...categoryButtonStyle, backgroundColor: "#90EE90" }}
       onClick={() => navigate("/diabetic-care")}
      >
       Diabetic Care
      </button>
      <button
       style={{ ...categoryButtonStyle, backgroundColor: "#87CEFA" }}
       onClick={() => navigate("/baby-care")}
      >
       Baby Care
      </button>
      <button
       style={{ ...categoryButtonStyle, backgroundColor: "#FFB6C1" }}
       onClick={() => navigate("/dental-care")}
      >
       Dental Care
      </button>
      <button
       style={{ ...categoryButtonStyle, backgroundColor: "#DDA0DD" }}
       onClick={() => navigate("/supplements")}
      >
       Supplements
      </button>
      <button
       style={{ ...categoryButtonStyle, backgroundColor: "#FF6347" }}
       onClick={() => navigate("/diapers")}
      >
       Diapers
      </button>
     </div>
    </div>

    {/* Center Content */}
    <div style={centerContentStyle}>
     {/* Automatic Swipe Slider */}
     <Carousel autoPlay infiniteLoop showThumbs={false} showArrows={true}>
      <div>
       <img src={content1} alt="Slide 1" style={carouselImageStyle} />
      </div>
      <div>
       <img src={content2} alt="Slide 2" style={carouselImageStyle} />
      </div>
     </Carousel>

     {/* Action Buttons */}
     <div style={actionButtonContainerStyle}>
      <button
       style={videoConsultationButtonStyle}
       onClick={() => navigate("/videoconference")}
      >
       Video Consultation
      </button>
      <button style={bookAppointmentButtonStyle}>Book Appointment</button>
      <button style={uploadPrescriptionButtonStyle}>
       Upload Prescriptions
      </button>
      <button style={callToOrderButtonStyle}>Call to Order</button>
     </div>
    </div>

    {/* Right Side Panel (Video for Advertising / Branding) */}
    <div style={rightPanelStyle}>
     <video width="100%" controls>
      <source src="your-video-url.mp4" type="video/mp4" />
      Your browser does not support the video tag.
     </video>
     <div style={brandingTextStyle}>
      <p>Emed - Your Health, Our Priority</p>
      <p>Fast Delivery, Trusted Service</p>
      <p>24/7 Support for All Your Needs</p>
     </div>
    </div>
   </div>
  </div>
 );
};

// Styles
const containerStyle = {
 display: "flex",
 width: "100%",
 height: "auto",
 padding: "20px",
 boxSizing: "border-box",
 position: "relative",
 alignItems: "center",
};

const suggestionBoxStyle = {
 position: "absolute",
 top: "40px",
 width: "100%",
 backgroundColor: "#fff",
 border: "1px solid #ddd",
 zIndex: 1000,
};

const leftPanelStyle = {
 width: "20%",
 padding: "10px",
 backgroundColor: "#f4f4f4",
 borderRadius: "8px",
 marginRight: "20px",
};

const headerStyle = {
 marginBottom: "20px",
 fontSize: "1.5em",
 textAlign: "center",
};

const buttonContainerStyle = {
 display: "flex",
 flexDirection: "column",
 gap: "10px",
};

const topPanelStyle = {
 backgroundColor: "skyblue",
 padding: "10px",
 display: "flex",
 alignItems: "center",
 justifyContent: "space-between",
 color: "yellow",
 width: "100%",
};

const searchContainerStyle = {
 display: "flex",
 alignItems: "center",
 color: "black",
 flexGrow: 0.5,
 width: "200px",
 padding: "5px",
 fontsize: "14px",
 margin: "0 40 px",
 border: "1px solid #ccc",
};

const cartIconStyle = {
 cursor: "pointer",
 color: "green",
 marginRight: "20px",
};

const loginContainerStyle = {
 display: "flex",
 alignItems: "center",
 color: "yellow",
};

const centerContentStyle = {
 width: "60%",
 display: "flex",
 flexDirection: "column",
 alignItems: "center",
 marginBottom: "20px",
};

const actionButtonContainerStyle = {
 display: "flex",
 justifyContent: "space-between",
 width: "100%",
 marginTop: "20px",
};

const videoConsultationButtonStyle = {
 backgroundColor: "lightblue",
 color: "white",
 border: "none",
 borderRadius: "5px",
 padding: "10px",
 cursor: "pointer",
 width: "20%",
};
const popoverContentStyle = {
 padding: "20px",
 width: "250px",
 textAlign: "center",
};

const bookAppointmentButtonStyle = {
 ...videoConsultationButtonStyle,
 backgroundColor: "#ffa500",
};

const uploadPrescriptionButtonStyle = {
 ...videoConsultationButtonStyle,
 backgroundColor: "#32cd32",
};

const callToOrderButtonStyle = {
 ...videoConsultationButtonStyle,
 backgroundColor: "#ff6347",
};

const categoryButtonStyle = {
 padding: "10px",
 borderRadius: "8px",
 border: "none",
 color: "white",
 cursor: "pointer",
 textAlign: "center",
};

const carouselImageStyle = {
 height: "auto",
 maxHeight: "500px",
};

const rightPanelStyle = {
 width: "20%",
 padding: "10px",
 backgroundColor: "#f4f4f4",
 borderRadius: "8px",
 textAlign: "center",
};

const brandingTextStyle = {
 marginTop: "10px",
};

export default Home;
