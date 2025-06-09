import React from "react";
import Wave from "react-wavify";
import "./footer.css";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
  
    <footer className="footer">
        <Wave className="wave"
      fill="#000000"
      paused={false}
      options={{
        height: 20,
        amplitude: 40,
        speed: 0.15,
        points: 3,
      }}  
    ></Wave>
      <p>&copy; {currentYear} AbedDX.</p>
    </footer>
  );
};

export default Footer;
