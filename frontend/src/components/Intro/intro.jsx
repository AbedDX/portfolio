import React, { useEffect, useRef, useState } from "react";
import "./intro.css";
import AsciiBackground from "./AsciiBackground";
import placeholderAvatar from "../../assets/placeholder-avatar.png";

const Intro = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section intro" id="intro" ref={ref}>
      <AsciiBackground />
      <div className="section-wrapper">
        <div className={`intro-content ${visible ? "visible" : ""}`}>
          <div className="intro-hero">
            <p className="section-eyebrow animate-in">00 Home</p>
            <div className="intro-avatar-wrapper animate-in">
              <img src={placeholderAvatar} alt="Abdalle Wais" className="intro-avatar" />
            </div>
            <h1 className="intro-name animate-in">
              Abdalle Wais
            </h1>
            <p className="intro-tagline animate-in">
              Full-Stack Developer / DevOps Engineer / 3D Printing Hobbyist
            </p>
          </div>

          <div className="intro-stats animate-in">
            <div className="stat">
              <span className="stat-value">5+</span>
              <span className="stat-label">Years Exp</span>
            </div>
            <span className="stat-divider">/</span>
            <div className="stat">
              <span className="stat-value">30+</span>
              <span className="stat-label">Projects</span>
            </div>
            <span className="stat-divider">/</span>
            <div className="stat">
              <span className="stat-value">∞</span>
              <span className="stat-label">Curiosity</span>
            </div>
          </div>

          <a href="#about" className="btn btn-accent animate-in" style={{ animationDelay: "0.4s" }}>
            About Me →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Intro;
