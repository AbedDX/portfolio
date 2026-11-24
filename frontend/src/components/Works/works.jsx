import React from "react";
import "./works.css";
import placeholder1 from "../../assets/placeholder-grid.png";
import placeholder2 from "../../assets/placeholder-grid.png";
import placeholder3 from "../../assets/placeholder-grid.png";
import placeholder4 from "../../assets/placeholder-grid.png";

const Works = () => {
  const projects = [
    {
      id: 0,
      title: "Cloud-Native Photo Platform",
      subtitle: "Immich + Authentik OIDC + Nginx Proxy Manager",
      description: "Self-hosted photo management with enterprise-grade authentication. TLS terminated, SSO-enforced, fully containerized.",
      techStack: ["Docker", "Immich", "Authentik", "Nginx", "PostgreSQL", "Redis"],
      github: "https://github.com/AbedDX/hotel-management-system",
      demo: "https://hotel-dashboard-demo.vercel.app",
      image: placeholder1,
    },
    {
      id: 1,
      title: "Hotel Management Dashboard",
      subtitle: "Fullstack + DevOps Showcase",
      description: "Comprehensive system for rooms, reservations, guest profiles, and revenue tracking with automated deployment.",
      techStack: ["Node.js", "React", "PostgreSQL", "Docker", "Kubernetes"],
      github: "https://github.com/AbedDX/hotel-management-system",
      demo: "https://hotel-dashboard-demo.vercel.app",
      image: placeholder2,
    },
    {
      id: 2,
      title: "CI/CD Pipeline Automation",
      subtitle: "DevOps Automation Focus",
      description: "Automated build, test, and deployment pipelines with Docker containerization and Kubernetes orchestration.",
      techStack: ["GitHub Actions", "Docker", "Kubernetes", "CI/CD"],
      github: "https://github.com/AbedDX/cicd-pipeline-demo",
      demo: "https://pipeline-status-dashboard.netlify.app",
      image: placeholder3,
    },
    {
      id: 3,
      title: "Monitoring & Observability",
      subtitle: "Infrastructure & Reliability",
      description: "Prometheus metrics, Grafana dashboards, Loki logging — full observability and alerting capabilities.",
      techStack: ["Prometheus", "Grafana", "Loki", "Docker Compose"],
      github: "https://github.com/AbedDX/monitoring-observability-stack",
      demo: "https://grafana-demo-dashboard.herokuapp.com",
      image: placeholder4,
    },
  ];

  return (
    <section className="section works" id="projects">
      <div className="section-wrapper">
        <div className="section-header animate-in">
          <span className="section-number">02</span>
          <span className="section-divider">//</span>
          <h2 className="section-title">Projects</h2>
        </div>

        <p className="section-subtitle">
          Production systems — containerized services, fullstack apps, and infrastructure.
        </p>

        {/* Main project list with large screenshots */}
        <div className="project-list">
          {projects.map((project, idx) => (
            <div className={`project-row animate-in`} key={project.id} style={{ animationDelay: `${idx * 0.08}s` }}>
              {/* Left: Image */}
              <div className="project-row-visual">
                <img src={project.image} alt={project.title} className="project-row-image" loading="lazy" />
              </div>

              {/* Right: Info */}
              <div className="project-row-content">
                <span className="project-category">{project.subtitle}</span>
                <h3 className="project-row-title">{project.title}</h3>
                <p className="project-row-desc">{project.description}</p>
                <div className="project-row-stack">
                  {project.techStack.map((tech, i) => (
                    <span className="tag" key={i}>{tech}</span>
                  ))}
                </div>
                <div className="project-row-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      GitHub →
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link project-link--accent">
                      Live demo →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compact grid footer */}
        <div className="mini-grid animate-in" style={{ marginTop: "3rem" }}>
          {[
            { name: "Photo Platform", tag: "Homelab" },
            { name: "Hotel Dashboard", tag: "Fullstack" },
            { name: "CI/CD Pipeline", tag: "DevOps" },
            { name: "Monitoring Stack", tag: "Infra" },
          ].map((item, i) => (
            <div className="mini-item animate-in" key={i} style={{ animationDelay: `${i * 0.05}s` }}>
              <span className="mini-name">{item.name}</span>
              <span className="mini-tag">{item.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
