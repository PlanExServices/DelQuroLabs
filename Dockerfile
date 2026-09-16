# syntax=docker/dockerfile:1.7
#
# DelQuro Labs — production image.
# Stage 1 builds the static site with Vite; stage 2 serves the immutable
# output from nginx. The final image contains no Node.js runtime and no
# source code, only the compiled bundle.

# ---------------------------------------------------------------------------
# Stage 1 — build
# ---------------------------------------------------------------------------
FROM node:22-alpine AS build

WORKDIR /app

# Copy manifests first: dependency installation stays cached across
# content-only changes (which is most commits).
COPY package.json package-lock.json ./
# `npm ci` is reproducible and fails if the lockfile and manifest disagree.
# Retry logic absorbs flaky registries when building on your own hardware.
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund \
 || npm ci --no-audit --no-fund --fetch-retries=5 --fetch-retry-maxtimeout=120000

# Copy the rest of the source.
COPY . .

# Build-time knobs (see .env.example). VITE_BASE lets you publish the site
# under a sub-path such as /labs/ instead of the domain root; VITE_SITE_URL
# is the public URL used by the portfolio section. Both are inlined into the
# bundle, so they only take effect on a rebuild.
ARG VITE_BASE=/
ARG VITE_SITE_URL=
ARG NODE_ENV=production
ENV VITE_BASE=${VITE_BASE} \
    VITE_SITE_URL=${VITE_SITE_URL} \
    NODE_ENV=${NODE_ENV}

RUN npm run build

# ---------------------------------------------------------------------------
# Stage 2 — serve
# ---------------------------------------------------------------------------
FROM nginx:stable-alpine AS runtime

# Replace the stock server block with ours (the upstream nginx.conf is kept,
# it already enables gzip-friendly defaults and sane worker settings).
RUN rm -f /etc/nginx/conf.d/default.conf
COPY docker/default.conf /etc/nginx/conf.d/default.conf

# Static bundle only — no sources, no node_modules.
COPY --from=build --chown=nginx:nginx /app/dist/ /usr/share/nginx/html/

# Container listens on 8080 (unprivileged-friendly). Reverse proxies such as
# Traefik/Caddy/Cloudflare Tunnel on the private server publish it as 80/443.
EXPOSE 8080

# Coolify, Docker Compose and Kubernetes all understand this health check.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:8080/healthz || exit 1

STOPSIGNAL SIGQUIT
CMD ["nginx", "-g", "daemon off;"]
