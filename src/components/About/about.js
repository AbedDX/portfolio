import React from "react";
import "./about.css";
import SkillCards from "./skillcards";

const About = () => {
  return (
    <section id="about">
      <div className="about-container">
        {/* About Me Card */}
        <div className="about-card">
          <div className="about-image">
          <a href="https://emoji.gg/emoji/10169-welcome">
          <img src="https://cdn3.emoji.gg/emojis/10169-welcome.png" width="120px" height="120px" alt="Welcome"/>
          </a>
          </div>
          <div className="about-content">
            <h2>About Me</h2>
            <p>
              Hi, I'm <strong>Abdalle Wais</strong>, a passionate <strong>Full-Stack Developer</strong> and <strong>DevOps Engineer</strong> with experience in cloud computing, automation, and modern web technologies.
            </p>
            <p>
              I enjoy working on **homelabs, networking, and 3D printing projects**. Currently, I'm diving into advanced Kubernetes, CI/CD pipelines, and system architecture.
            </p>
            <p>
              When I'm not coding, you'll find me experimenting with <strong>3D printers</strong>, upgrading my <strong>home network</strong>, or exploring new DevOps tools.
            </p>
          </div>
          <div className="skills-section">
          <h2 className="skills-title">My Skills</h2>
          <SkillCards />
        </div>
        </div>

        
        
      </div>
    </section>
  );
};

export default About;
