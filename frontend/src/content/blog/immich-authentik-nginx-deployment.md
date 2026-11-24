---
title: "Deploying Immich with Authentik OIDC and Nginx Proxy Manager"
date: 2026-11-23
tags: [DevOps, Docker, Immich, Authentik, Nginx, Homelab, OIDC, TLS]
excerpt: "How I built a self-hosted photo platform with enterprise-grade authentication using Docker Compose, Authentik SSO, and Nginx Proxy Manager — including TLS termination, network isolation, and OIDC integration."
relatedProject: "immich"
---

## Overview

This guide documents the deployment of a production-grade self-hosted photo management platform combining three Docker services:

- **Immich** — Fast, full-featured photo and video management
- **Authentik** — Open-source identity provider with OIDC/OAuth2 support
- **Nginx Proxy Manager** — Reverse proxy with automatic TLS via Let's Encrypt

The result is a fully containerized, authenticated photo platform accessible at `photos.daxtech3d.com` with zero-trust networking and automated certificate management.

## Architecture

```
User → HTTPS (:443) → Nginx Proxy Manager → Authentik (OIDC) → Immich
                                                              ├── PostgreSQL (DB)
                                                              ├── Redis (Cache/Queue)
                                                              └── MinIO (Photo Storage)
```

Each service runs in its own Docker container on an isolated Docker network. Nginx Proxy Manager handles all external TLS termination, Authentik provides centralized authentication, and Immich focuses on photo management.

## Prerequisites

- A VPS or home server running Docker and Docker Compose
- A domain name (`photos.daxtech3d.com`) with DNS pointing to your server
- Open ports 80 and 443

## Step 1: Docker Network Setup

Create an isolated bridge network for all services:

```bash
docker network create immich-net
```

This ensures containers can only communicate through the network, not the host.

## Step 2: Nginx Proxy Manager

```yaml
# nginx-proxy-manager/docker-compose.yml
version: "3.8"
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    container_name: nginx-proxy-manager
    restart: unless-stopped
    ports:
      - '80:80'
      - '443:443'
      - '81:81'  # Admin panel
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
    networks:
      - immich-net

networks:
  immich-net:
    external: true
```

Configure the proxy in the admin panel (port 81):
- Create a Host entry for `photos.daxtech3d.com`
- Forward to Authentik container on its internal port
- Enable "Block Common Exploits" and "Force SSL"
- Request a Let's Encrypt certificate

## Step 3: Authentik Setup

```yaml
# authentik/docker-compose.yml
version: "3.8"
services:
  authentik-postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: authentik
      POSTGRES_USER: authentik
      POSTGRES_PASSWORD: ${AUTHENTIK_DB_PASSWORD}
    volumes:
      - authentik-db:/var/lib/postgresql/data
    networks:
      - immich-net

  authentik-redis:
    image: redis:7-alpine
    networks:
      - immich-net

  authentik:
    image: ghcr.io/goauthentik/server:2024.10
    container_name: authentik
    restart: unless-stopped
    command: server
    environment:
      AUTHENTIK_SECRET_KEY: ${AUTHENTIK_SECRET_KEY}
      AUTHENTIK_DATABASE_URL: postgres://authentik:${AUTHENTIK_DB_PASSWORD}@authentik-postgres:5432/authentik
      AUTHENTIK_REDIS_URL: redis://authentik-redis:6379
      AUTHENTIK_HOST: https://auth.daxtech3d.com
    ports:
      - "9000:9000"
    volumes:
      - ./media:/media
      - ./exports:/exports
    networks:
      - immich-net

volumes:
  authentik-db:

networks:
  immich-net:
    external: true
```

### Configure OIDC Application in Authentik

1. Log into Authentik admin (`/if/admin`)
2. Go to **Applications → Applications → Create**
3. Set Provider to **authentik-provider-oauth2**
4. Configure:
   - **Client ID**: auto-generated
   - **Client Secret**: auto-generated
   - **Authorization key**: your chosen key slug
   - **Redirect URIs**: `https://photos.daxtech3d.com/o/authentik/callback`
   - **OpenID Connect Root**: `https://photos.daxtech3d.com/if/.well-known/openid-configuration`

## Step 4: Immich Configuration

```yaml
# immich/docker-compose.yml
version: "3.8"
services:
  immich-server:
    image: ghcr.io/immich-app/immich-server:v1.120.0
    container_name: immich-server
    restart: unless-stopped
    volumes:
      - upload-library:/usr/src/app/upload
    environment:
      DB_HOSTNAME: immich-postgres
      DB_DATABASE_NAME: immich
      DB_USERNAME: immich
      DB_PASSWORD: ${IMMICH_DB_PASSWORD}
      DB_DATABASE_URL: postgresql://immich:${IMMICH_DB_PASSWORD}@immich-postgres:5432/immich
      REDIS_HOSTNAME: immich-redis
      IMMICH_MACHINE_LEARNING_URL: http://immich-machine-learning:3003
      IMMICH_TRUST_PROXY: "true"
    depends_on:
      - immich-postgres
      - immich-redis
      - immich-machine-learning
    networks:
      - immich-net

  immich-machine-learning:
    image: ghcr.io/immich-app/immich-machine-learning:v1.120.0
    restart: unless-stopped
    volumes:
      - model-cache:/cache
    environment:
      DB_HOSTNAME: immich-postgres
      DB_DATABASE_NAME: immich
      DB_USERNAME: immich
      DB_PASSWORD: ${IMMICH_DB_PASSWORD}
    networks:
      - immich-net

  immich-postgres:
    image: postgres:16-alpine
    container_name: immich-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: immich
      POSTGRES_USER: immich
      POSTGRES_PASSWORD: ${IMMICH_DB_PASSWORD}
    volumes:
      - immich-db:/var/lib/postgresql/data
    networks:
      - immich-net

  immich-redis:
    image: redis:7-alpine
    container_name: immich-redis
    restart: unless-stopped
    networks:
      - immich-net

volumes:
  upload-library:
  model-cache:
  immich-db:

networks:
  immich-net:
    external: true
```

### Configure OIDC in Immich Admin

1. Log into Immich admin panel
2. Go to **Settings → OAuth / OIDC**
3. Enter:
   - **Issuer URL**: `https://auth.daxtech3d.com/application/o/immich/`
   - **Client ID**: from Authentik
   - **Client Secret**: from Authentik
   - **Enable**: check to force OIDC login

## Step 5: Nginx Proxy Manager Routes

In NPM admin panel (port 81), create two host entries:

| Domain | Forward Host | TLS |
|--------|-------------|-----|
| `photos.daxtech3d.com` | immich-server:3001 | ✅ Let's Encrypt |
| `auth.daxtech3d.com` | authentik:9000 | ✅ Let's Encrypt |

Set **Force SSL** and **HTTP/2** enabled for both.

## Key Takeaways

### TLS Termination
Nginx Proxy Manager handles all SSL certificates via Let's Encrypt. Internal traffic between containers is unencrypted (same Docker network), reducing overhead. The `IMMICH_TRUST_PROXY: "true"` environment variable tells Immich to trust the X-Forwarded-Proto header from NPM.

### OIDC Authentication Flow
1. User visits `photos.daxtech3d.com`
2. Immich redirects to Authentik OIDC endpoint
3. User authenticates via Authentik (password + optional 2FA)
4. Authentik returns an ID token + access token to Immich
5. Immich validates the token and grants access

The OpenID discovery endpoint is available at:
`https://photos.daxtech3d.com/if/.well-known/openid-configuration`

### Network Isolation
All containers share the `immich-net` Docker network but are not exposed to the host. Only Nginx Proxy Manager publishes ports (80, 443). This follows the principle of least privilege — each service can only communicate with the specific services it needs.

### Lessons Learned
- Authentik's OIDC setup requires careful attention to redirect URIs
- `IMMICH_TRUST_PROXY: "true"` is essential when behind a reverse proxy
- Docker volumes should be explicitly named for data durability
- Let's Encrypt rate limits mean testing with the staging environment first

## Related Resources

- [Immich Documentation](https://docs.immich.app/)
- [Authentik Documentation](https://goauthentik.io/)
- [Nginx Proxy Manager](https://nginxproxymanager.com/)
- [Live Auth Endpoint](https://photos.daxtech3d.com/if/.well-known/openid-configuration)
