import React from "react";
import "./footer.css";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {currentYear} AbedDX.</p>
    </footer>
  );
};

export default Footer;
