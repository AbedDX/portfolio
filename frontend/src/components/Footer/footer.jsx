import React from "react";
import "../../App.css";
import "./footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-text">
          &copy; {currentYear} Abdalle Wais. All rights reserved.
        </p>
        <p className="footer-credits">
          Built with React + Vite
        </p>
      </div>
    </footer>
  );
};

export default Footer;
