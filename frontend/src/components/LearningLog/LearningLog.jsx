import React, { useState, useCallback } from "react";
import "./LearningLog.css";

// --- Markdown → HTML ---
function mdToHtml(md) {
  if (!md) return "";
  let html = md;
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_m, lang, code) => {
    return `<pre class="code-block"><code class="lang-${lang}">${code.trim()}</code></pre>`;
  });
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  html = html.replace(/\|(.+)\|\n\|[-\s|:]+\|\n((?:\|.+\|\n?)+)/g, (_m, header, body) => {
    const ths = header.split("|").filter(Boolean).map((h) => `<th>${h.trim()}</th>`).join("");
    const rows = body.trim().split("\n").filter((r) => r.trim()).map((row) => {
      const tds = row.split("|").filter(Boolean).map((td) => `<td>${td.trim()}</td>`).join("");
      return `<tr>${tds}</tr>`;
    }).join("");
    return `<table class="md-table"><thead><tr>${ths}</tr></thead><tbody>${rows}</tbody></table>`;
  });
  html = html.replace(/^[•-] (.+)$/gm, "<li>$1</li>");
  html = html.replace(/((?:<li>.*<\/li>\s*\n?)+)/g, "<ul>$1</ul>");
  html = html.split(/\n{2,}/).map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return "";
    if (/^<(h[1-6]|ul|ol|li|pre|table|div|a\b)/.test(trimmed)) return trimmed;
    return `<p>${trimmed.replace(/\n/g, "<br>")}</p>`;
  }).join("\n");
  return html;
}

const blogPosts = [
  {
    id: 1,
    title: "Deploying Immich with Authentik OIDC and Nginx Proxy Manager",
    date: "2026-11-23",
    excerpt: "Self-hosted photo platform with enterprise-grade authentication using Docker, Authentik SSO, and Nginx Proxy Manager.",
    slug: "immich-authentik-nginx-deployment",
    content: `# Deploying Immich with Authentik OIDC and Nginx Proxy Manager

A production-grade, self-hosted photo platform running on Raspberry Pi with zero-recurring-cost. Replacing $15–40/mo cloud subscriptions with containerized services, zero-trust OIDC authentication, and end-to-end TLS.

## Hardware & Infrastructure

- **Host:** Raspberry Pi 4 (4GB) running OpenMediaVault (Debian-based)
- **Runtime:** Docker + Podman (rootless for unprivileged workflows)
- **Network:** Ubiquiti UniFi Router + Switch, split-horizon DNS, NAT reflection
- **Edge:** Cloudflare DNS + Proxy (HTTPS :443, DDoS protection, CDN caching)

## Architecture

\`\`\`
User → HTTPS (:443) → Cloudflare Proxy → UniFi Firewall
                                       → Nginx Proxy Manager
                                         ├── Authentik (OIDC) → Immich
                                                        ├── PostgreSQL (DB)
                                                        ├── Redis (Cache/Queue)
                                                        └── MinIO (Photo Storage)
\`\`\`

## Service Breakdown

### Nginx Proxy Manager
- TLS termination with automated Let's Encrypt certificates
- Reverse proxy routing (path-based and subdomain-based)
- Access controls and rate limiting

### Authentik OIDC
- User management and centralized SSO authentication
- OpenID Connect / OAuth2 provider
- Integration with Immich for user provisioning

### Immich
- Fast, full-featured photo and video management
- Mobile app, web UI, and API
- Automatic backups and library management

## Security Hardening

### Fail2ban Custom Jails
- nginx-404 — Block scanners probing for known admin paths
- omv-webgui — Lock brute-force login attempts
- ssh — Enforce key-only auth + ban password attempts
- recidive — Permanent ban for repeat offenders

### Architectural Trade-offs

| Approach | Pros | Cons | Status |
|---|---|---|---|
| Cloudflare Proxy + WAN Whitelist | Zero extra cost, CDN caching, DDoS protection | Exposed WAN ports | ✅ Deployed |
| WireGuard Outbound Tunnel via VPS | Zero exposed WAN ports | $5–10/mo VPS | ⏳ Phase 2 |

---

> A homelab isn't a hobby. It's your lab, your sandbox, your proof that you can build systems that work.`,
    tags: ["DevOps", "Docker", "Immich", "Authentik", "Nginx"],
  },
  {
    id: 4,
    title: "Homelab Production & Declarative Linux",
    date: "2025-01-10",
    excerpt: "Self-hosted production services with Docker Compose, TLS via Nginx Proxy Manager, OIDC with Authentik. Daily driver NixOS.",
    slug: "homelab-production-nixos",
    content: `# Homelab Production & Declarative Linux

**2025 – Present** — I run a self-hosted homelab with production-grade services. Not a dev environment. Not a tutorial setup.

## What's Running

### Photo Platform
- **Immich** — Fast, full-featured photo and video management
- **Authentik (OIDC)** — Centralized single sign-on
- **Nginx Proxy Manager** — TLS reverse proxy with automatic Let's Encrypt

### The Stack
- Docker Compose orchestration (all services)
- TLS terminated at the proxy
- OIDC authentication for all services

## NixOS — Declarative Linux

I use **NixOS** as my daily driver and lab operating system. Why? Because everything is version-controlled and reproducible.

### What This Means
- Every package, configuration file, and service defined in \`configuration.nix\`
- System state is auditable — git log shows every change
- Recreate the entire system from scratch in minutes, not days

---

> A homelab isn't a hobby. It's your lab, your sandbox, your proof that you can build systems that work.`,
    tags: ["NixOS", "Docker Compose", "Authentik", "Nginx", "Immich"],
  },
  {
    id: 3,
    title: "DevOps, Containers, Cloud",
    date: "2023-09-20",
    excerpt: "Dived deep into Docker, Kubernetes, and AWS. Built end-to-end CI/CD pipelines, studied Terraform and Ansible.",
    slug: "devops-containers-cloud",
    content: `# DevOps, Containers, Cloud

2023–2024 was the year I went deep on infrastructure.

## What I Built

### CI/CD Pipelines — End to End
Built automated pipelines with GitHub Actions that handle the full lifecycle.

### Terraform — Infrastructure as Code
Provisioned cloud resources declaratively. Every server, VPC, and security group defined in code.

### Ansible — Configuration Management
Automated server setup, software installation, and service configuration. Idempotent playbooks.

## Education — Parallel to Practice

While running a production homelab, I completed the **Metropolia ICT degree** (73 ECTS). Practical courses covered Python, Java, networking, databases, and cloud computing.

---

> Infrastructure should be boring. If your systems work predictably, everyone sleeps better.`,
    tags: ["Docker", "Kubernetes", "AWS", "Terraform", "Ansible"],
  },
  {
    id: 2,
    title: "First Lines of Code → First Production Systems",
    date: "2022-03-15",
    excerpt: "Started building in 2022. HTML, CSS, vanilla JS, then React and Node.js. No tutorial hell — just shipped real projects.",
    slug: "first-lines-code",
    content: `# First Lines of Code → First Production Systems

Started building in 2022 — HTML, CSS, vanilla JavaScript, then React and Node.js. I skipped the tutorial hell and shipped real projects that had to work.

## What I Built

### Hotel Management Dashboard
A full-stack hotel management system with room availability tracking, guest profiles, reservation management, and revenue analytics.

### CI/CD Pipeline Automation
Designed end-to-end automated build, test, and deploy workflows using GitHub Actions, Docker, and Kubernetes.

### Monitoring & Observability Stack
Implemented real-time metrics with Prometheus, custom Grafana dashboards, Loki centralized logging, and AlertManager.

## What Each Project Taught Me

Each project forced me to learn things that tutorials never cover:
- Docker networking and container orchestration
- DNS resolution and TLS termination
- Database migrations and backup strategies
- Production-grade deployment with rollback capabilities

---

> The best way to learn is to build something that breaks, fix it, and deploy it.`,
    tags: ["React", "Node.js", "Docker", "Kubernetes", "CI/CD"],
  },
];

const FALLBACK_CONTENT = `## Deploying Immich with Authentik OIDC and Nginx Proxy Manager

## Overview

This guide documents the deployment of a production-grade self-hosted photo management platform combining three Docker services:

- **Immich** — Fast, full-featured photo and video management
- **Authentik** — Open-source identity provider with OIDC/OAuth2 support
- **Nginx Proxy Manager** — Reverse proxy with automatic TLS via Let's Encrypt

## Architecture

\`\`\`
User → HTTPS (:443) → Nginx Proxy Manager → Authentik (OIDC) → Immich
                                                      ├── PostgreSQL (DB)
                                                      ├── Redis (Cache/Queue)
                                                      └── MinIO (Photo Storage)
\`\`\`

## Key Takeaways

### TLS Termination

Nginx Proxy Manager handles all SSL certificates via Let's Encrypt. Internal traffic between containers is unencrypted (same Docker network), reducing overhead.

### OIDC Authentication Flow

1. User visits \`photos.daxtech3d.com\`
2. Immich redirects to Authentik OIDC endpoint
3. User authenticates via Authentik (password + optional 2FA)
4. Authentik returns ID token + access token
5. Immich validates the token and grants access

### Network Isolation

All containers share the \`immich-net\` Docker network but are not exposed to the host. Only Nginx Proxy Manager publishes ports (80, 443).`;

const LearningLog = () => {
  const [activePost, setActivePost] = useState(null);
  const [articleHtml, setArticleHtml] = useState("");

  const loadPost = useCallback(async (slug) => {
    setActivePost(slug);
    const post = blogPosts.find((p) => p.slug === slug);
    if (post && post.content) {
      setArticleHtml(mdToHtml(post.content));
    } else {
      setArticleHtml(mdToHtml(FALLBACK_CONTENT));
    }
  }, []);

  const closePost = () => {
    setActivePost(null);
    setArticleHtml("");
  };

  return (
    <section className="section learning-log" id="blog">
      <div className="section-wrapper">
        <div className="section-header animate-in">
          <span className="section-number">03</span>
          <span className="section-divider">//</span>
          <h2 className="section-title">Learning Logs</h2>
        </div>

        <p className="section-subtitle">
          Technical notes, deployment guides, things I've figured out along the way.
        </p>

        <div className="blog-grid">
          {blogPosts.map((post, idx) => (
            <div
              className={`blog-card animate-in`}
              key={post.id}
              onClick={() => loadPost(post.slug)}
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <div className="blog-card-content">
                <span className="blog-date">{post.date}</span>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-tags">
                  {post.tags.map((tag, i) => (
                    <span className="tag" key={i}>{tag}</span>
                  ))}
                </div>
                <span className="blog-read-more">Read More →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Modal */}
      {activePost && (
        <div className="ll-modal-overlay" onClick={closePost}>
          <div
            className="ll-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ll-modal-header">
              <h2>{blogPosts.find((p) => p.slug === activePost)?.title || "Article"}</h2>
              <button className="ll-close-btn" onClick={closePost}>✕</button>
            </div>
            <div className="ll-modal-body">
              <div className="ll-article-content" dangerouslySetInnerHTML={{ __html: articleHtml }} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LearningLog;
