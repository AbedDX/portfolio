import React from "react";

const skillsData = [
  {
    category: "DevOps & Cloud",
    skills: [
      {
        name: "AWS Cloud Services (EC2, S3, Lambda, IAM)",
        image: "https://img.shields.io/badge/AWS%20Services-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white",
      },
      {
        name: "Docker & Kubernetes",
        image: "https://img.shields.io/badge/Docker-Kubernetes-blue?style=for-the-badge&logo=docker&logoColor=white",
      },
      {
        name: "Ansible",
        image: "https://img.shields.io/badge/Ansible-EE0000?style=for-the-badge&logo=ansible&logoColor=white",
      },
    ],
  },
  {
    category: "Programming & Scripting",
    skills: [
      {
        name: "React.js",
        image: "https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black",
      },
      {
        name: "JavaScript & Node.js",
        image: "https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black",
      },
      {
        name: "Python",
        image: "https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white",
      },
      {
        name: "Bash Scripting",
        image: "https://img.shields.io/badge/Bash-4EAA25?style=for-the-badge&logo=gnu-bash&logoColor=white",
      },
    ],
  },
];

const SkillCards = () => {
  return (
    <div className="skills-container">
      {skillsData.map((category, index) => (
        <div key={index} className="skills-category">
          <h2 className="category-title">{category.category}</h2>
          <div className="skills-grid">
            {category.skills.map((skill, i) => (
              <div key={i} className="skill-card">
                <img src={skill.image} alt={skill.name} className="skill-icon" />
                <span className="skill-text">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillCards;
