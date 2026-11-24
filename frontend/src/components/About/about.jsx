import React from "react";
import placeholderImage from "../../assets/placeholder-grid.png";

const About = () => {
  return (
    <section className="section about" id="about">
      <div className="section-wrapper">
        {/* Section Header — 01 */}
        <div className="section-header animate-in">
          <span className="section-number">01</span>
          <span className="section-divider">//</span>
          <h2 className="section-title">About</h2>
        </div>

        <p className="section-subtitle">
          Full-stack developer and DevOps engineer building production systems that work at scale.
        </p>

        {/* About: text left, image right — professional split */}
        <div className="about-split">
          <div className="about-text">
            <p>
              I'm <strong>Abdalle Wais</strong>. I build, deploy, and maintain production systems
              — from containerized microservices to full-stack web applications.
            </p>
            <p>
              My background is in chemical and materials engineering. The shift to software wasn't
              a career change — it was the same problem solved differently: making complex systems
              reliable, repeatable, and scalable.
            </p>
            <p>
              I build full-stack applications and infrastructure automation concurrently.
              The best engineers ship on both sides of the stack.
            </p>
          </div>

          <div className="about-image">
            <img src={placeholderImage} alt="About" className="about-image-inner" loading="lazy" />
          </div>
        </div>

        {/* Capabilities — ryoku feature grid */}
        <div className="section-header animate-in" style={{ marginTop: "3rem" }}>
          <span className="section-number"></span>
          <span className="section-divider">//</span>
          <h2 className="section-title" style={{ fontSize: "1rem" }}>
            Capabilities
          </h2>
        </div>

        <div className="feature-grid">
          {[
            { title: "Docker & Kubernetes", desc: "Container orchestration, multi-stage builds, Helm charts, K8s deployments" },
            { title: "Cloud Infrastructure", desc: "AWS (EC2, S3, Lambda, IAM), Cloudflare, Terraform" },
            { title: "CI/CD Pipelines", desc: "GitHub Actions, automated testing, zero-downtime deployments" },
            { title: "Python & Bash", desc: "Automation scripts, infrastructure tooling, data processing" },
            { title: "React & Node.js", desc: "Full-stack apps, API design, state management, SSR" },
            { title: "Security & Auth", desc: "Authentik OIDC, Fail2ban, TLS, least-privilege access" },
            { title: "Monitoring", desc: "Prometheus, Grafana, Loki, custom alerting dashboards" },
            { title: "Databases", desc: "PostgreSQL, Redis, MinIO, backup strategies, migrations" },
            { title: "Linux & Systems", desc: "NixOS, Debian, OpenMediaVault, systemd, network config" },
            { title: "Ansible & IaC", desc: "Configuration management, idempotent playbooks, provisioning" },
            { title: "Nginx & Proxy", desc: "Reverse proxy, SSL termination, rate limiting, caching" },
            { title: "Docker Compose", desc: "Service orchestration, networking, volume management, health checks" },
          ].map((item, idx) => (
            <div className={`feature-item animate-in`} key={idx} style={{ animationDelay: `${idx * 0.05}s` }}>
              <span className="feature-title">{item.title}</span>
              <span className="feature-desc">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
