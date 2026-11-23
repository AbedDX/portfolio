import React, { useEffect } from "react";
import KSlideshow from "../KSlidershow/KSlidershow";
import profileImage from "../../assets/Abdalle.jpg";
import "./intro.css";
import { Link } from "react-scroll";

const Intro = () => {
  useEffect(() => {
    document.addEventListener("dragstart", (e) => e.preventDefault());
    return () => {
      document.removeEventListener("dragstart", (e) => e.preventDefault());
    };
  }, []);

  return (
    <section className="intro">
      <KSlideshow />
      <div className="intro-content">
        <div className="intro-profile">
          <img src={profileImage} alt="Abdalle Wais" />
        </div>
        
        <h1>Hi, I'm Abdalle Wais</h1>
        <p>Full-Stack Developer | DevOps Enthusiast | 3D Printing Hobbyist</p>

        <Link
          to="about"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          className="intro-button"
        >
          About Me
        </Link>
      </div>
    </section>
  );
};

export default Intro;
