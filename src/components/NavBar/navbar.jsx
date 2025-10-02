import React, { useState } from "react";
import "./navbar.css";
import Logo from "../../assets/logo.png";
import { Link } from "react-scroll";
import Menu from "./menu";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar">
      <div className="brand-container">
        <img src={Logo} alt="Logo" className="logo" />
        <span className="portfolio-title">Portfolio</span>
      </div>
      
      {/* Desktop Menu */}
      <div className="desktopMenu">
        <Link activeClass="active" to="intro" spy={true} smooth={true} offset={-50} duration={500} className="desktopMenuListItem">Home</Link>
        <Link activeClass="active" to="about" spy={true} smooth={true} offset={-50} duration={500} className="desktopMenuListItem">About</Link>
        <Link activeClass="active" to="works" spy={true} smooth={true} offset={-50} duration={500} className="desktopMenuListItem">Projects</Link>
        <Link activeClass="active" to="blog" spy={true} smooth={true} offset={-50} duration={500} className="desktopMenuListItem">Blog</Link>
        <Link activeClass="active" to="contact" spy={true} smooth={true} offset={-50} duration={500} className="desktopMenuListItem">Contact</Link>
      </div>


      {/* Mobile Menu */}
      <Menu showMenu={showMenu} toggleMenu={toggleMenu} />
    </nav>
  );
};

export default Navbar;