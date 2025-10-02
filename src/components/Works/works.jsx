import React from "react";
import "./works.css";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const Works = () => {
    const projects = [
        {
            id: 1,
            title: "Hotel Management Dashboard",
            subtitle: "Fullstack + DevOps Showcase",
            problem: "Hotels needed a comprehensive system to manage rooms, reservations, guest profiles, and revenue tracking with automated deployment capabilities.",
            solution: "Built a complete hotel management system with modern fullstack architecture, containerized deployment, and CI/CD automation that streamlines hotel operations and provides real-time insights.",
            techStack: "Node.js (Fastify) backend with PostgreSQL database, React frontend with responsive design, Docker containerization, and Kubernetes deployment with GitHub Actions CI/CD pipeline.",
            image: "https://via.placeholder.com/400x250?text=Hotel+Management+System&bg=2563eb&color=ffffff",
            features: [
                "Room management & availability tracking",
                "Guest profiles & reservation system", 
                "Revenue analytics & reporting dashboard",
                "Dockerized backend & frontend",
                "Kubernetes deployment automation",
                "CI/CD with GitHub Actions"
            ],
            skills: ["Node.js", "Fastify", "React", "PostgreSQL", "Docker", "Kubernetes", "GitHub Actions", "DevOps"],
            github: "https://github.com/AbedDX/hotel-management-system",
            demo: "https://hotel-dashboard-demo.vercel.app",
            category: "fullstack"
        },
        {
            id: 2,
            title: "CI/CD Pipeline Automation",
            subtitle: "DevOps Automation Focus",
            problem: "Development teams faced slow, error-prone manual deployments with inconsistent environments and lack of automated testing.",
            solution: "Designed and implemented a comprehensive CI/CD pipeline that automates build, test, and deployment processes with Docker containerization and Kubernetes orchestration.",
            techStack: "GitHub Actions for workflow automation, Docker for containerization, Kubernetes (kind/k3s) for orchestration, and automated deployment to cloud infrastructure.",
            image: "https://via.placeholder.com/400x250?text=CI%2FCD+Pipeline&bg=059669&color=ffffff",
            features: [
                "Automated build, test, and lint workflows",
                "Docker image build & push to registry",
                "Kubernetes auto-deployment",
                "Status badges & pipeline monitoring",
                "Multi-environment deployment",
                "Rollback capabilities"
            ],
            skills: ["GitHub Actions", "Docker", "Kubernetes", "CI/CD", "DevOps", "YAML", "Shell Scripting"],
            github: "https://github.com/AbedDX/cicd-pipeline-demo",
            demo: "https://pipeline-status-dashboard.netlify.app",
            category: "devops"
        },
        {
            id: 3,
            title: "Monitoring & Observability Stack",
            subtitle: "Infrastructure & Reliability",
            problem: "Lack of visibility into application performance, infrastructure health, and system metrics across distributed microservices architecture.",
            solution: "Implemented a comprehensive monitoring solution with Prometheus metrics collection, Grafana dashboards, and Loki logging to provide full observability and alerting capabilities.",
            techStack: "Prometheus for metrics collection, Grafana for visualization and dashboards, Loki for log aggregation, Docker Compose for easy deployment, and AlertManager for notifications.",
            image: "https://via.placeholder.com/400x250?text=Monitoring+Stack&bg=dc2626&color=ffffff",
            features: [
                "Real-time metrics with Prometheus",
                "Custom Grafana dashboards",
                "Centralized logging with Loki",
                "Application performance monitoring",
                "Infrastructure health tracking",
                "Automated alerting system"
            ],
            skills: ["Prometheus", "Grafana", "Loki", "Docker Compose", "Monitoring", "Observability", "AlertManager"],
            github: "https://github.com/AbedDX/monitoring-observability-stack",
            demo: "https://grafana-demo-dashboard.herokuapp.com",
            category: "infrastructure"
        }
    ];

    return (
        <section id="works">
            <div className="works-container">
                <h2 className="section-title">Featured Projects</h2>
                <div className="projects-grid">
                    {projects.map(project => (
                        <div className={`project-card ${project.category}`} key={project.id}>
                            <div className="project-image">
                                <img src={project.image} alt={project.title} />
                                <div className="project-category">
                                    <span className={`category-badge ${project.category}`}>
                                        {project.category === 'fullstack' ? '🚀 Fullstack' : 
                                         project.category === 'devops' ? '⚙️ DevOps' : 
                                         '📊 Infrastructure'}
                                    </span>
                                </div>
                            </div>
                            <div className="project-content">
                                <div className="project-header">
                                    <h3>{project.title}</h3>
                                    <p className="project-subtitle">{project.subtitle}</p>
                                </div>
                                
                                <div className="project-details">
                                    <div className="detail-section">
                                        <h4>🎯 Challenge:</h4>
                                        <p>{project.problem}</p>
                                    </div>
                                    
                                    <div className="detail-section">
                                        <h4>💡 Solution:</h4>
                                        <p>{project.solution}</p>
                                    </div>
                                    
                                    <div className="detail-section">
                                        <h4>🛠️ Tech Stack:</h4>
                                        <p>{project.techStack}</p>
                                    </div>

                                    {project.features && (
                                        <div className="detail-section">
                                            <h4>✨ Key Features:</h4>
                                            <ul className="features-list">
                                                {project.features.map((feature, index) => (
                                                    <li key={index}>{feature}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="project-skills">
                                    {project.skills.map((skill, index) => (
                                        <span className="skill-tag" key={index}>{skill}</span>
                                    ))}
                                </div>
                                
                                <div className="project-links">
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link github">
                                        <FaGithub /> View Code
                                    </a>
                                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link demo">
                                        <FaExternalLinkAlt /> Live Demo
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="github-link">
                    <p>
                        Check out my <a href="https://github.com/AbedDX" target="_blank" rel="noopener noreferrer">
                        GitHub repository</a> to see more of my projects.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Works;

