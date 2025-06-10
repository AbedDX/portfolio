import React from "react";
import { Link } from "react-scroll";
import "./navbar.css";


const Menu = ({ showMenu, toggleMenu }) => {
  return (
    <>
    <label className="hamburger mobileMenu">
        <input type="checkbox" checked={showMenu} onChange={toggleMenu} />
        <svg viewBox="0 0 32 32">
          <path
            className="line line-top-bottom"
            d="M27 10 L13 10 C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6 L17 26 C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22 L7 22"
          />
          <path className="line" d="M7 16 L27 16" />
        </svg>
      </label>
      <div
        className="navMenu"
        style={{  display: showMenu ? "flex" : "none" }}
      >
        <Link activeClass="active" to="intro" spy={true} smooth={true} offset={-100} duration={500} className="listItem" onClick={toggleMenu}>Home</Link>
        <Link activeClass="active" to="about" spy={true} smooth={true} offset={-50} duration={500} className="listItem" onClick={toggleMenu}>About</Link>
        <Link activeClass="active" to="works" spy={true} smooth={true} offset={-50} duration={500} className="listItem" onClick={toggleMenu}>Portfolio</Link>
        <Link activeClass="active" to="contact" spy={true} smooth={true} offset={10} duration={500} className="listItem" onClick={toggleMenu}>Contact</Link>
      </div>
    </>
  );
};

export default Menu;
