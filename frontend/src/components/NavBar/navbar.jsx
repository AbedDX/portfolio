import React, { useState, useEffect } from "react";
import "./navbar.css";
import Logo from "../../assets/logo.png";
import { Link } from "react-scroll";

const NAVBAR_HEIGHT = 64;

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Custom smooth scroll that accounts for fixed navbar
  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    setShowMenu(false);
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const navItems = [
    { to: "intro", label: "00 Home" },
    { to: "about", label: "01 About" },
    { to: "projects", label: "02 Projects" },
    { to: "blog", label: "03 Learning Log" },
    { to: "contact", label: "04 Contact" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar-inner">
        <a
          href="#intro"
          className="brand"
          onClick={(e) => handleSmoothScroll(e, "intro")}
        >
          <img src={Logo} alt="Logo" className="logo" />
          <span className="brand-name">Portfolio</span>
        </a>

        {/* Desktop Menu */}
        <div className="desktopMenu">
          {navItems.map((item) => (
            <a
              key={item.to}
              href={`#${item.to}`}
              className={`navItem ${scrolled ? "" : ""}`}
              onClick={(e) => handleSmoothScroll(e, item.to)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="mobileMenu">
        <button className="hamburger" onClick={() => setShowMenu(!showMenu)}>
          <span className={`line line-top ${showMenu ? "active" : ""}`} />
          <span className={`line line-mid ${showMenu ? "active" : ""}`} />
          <span className={`line line-bot ${showMenu ? "active" : ""}`} />
        </button>
        <div className={`navDrawer ${showMenu ? "open" : ""}`}>
          {navItems.map((item) => (
            <a
              key={item.to}
              href={`#${item.to}`}
              className={`drawerItem`}
              onClick={(e) => handleSmoothScroll(e, item.to)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
