# Deploying DelQuro Labs to a private server (optionally via Coolify)

This guide moves the site off GitHub Pages onto hardware you control.

**What ships:** a single nginx container serving the pre-built static bundle.
No Node runtime in production, no database, no persistent volumes, nothing to
back up — every deploy is a replaceable container.

```
        Internet / LAN / Tailscale
                  │
        ┌─────────▼──────────┐
        │  Reverse proxy     │  TLS termination, HTTP→HTTPS
        │  Traefik (Coolify) │  (or Caddy / Cloudflare Tunnel)
        │  or Caddy / nginx  │
        └─────────┬──────────┘
                  │  :8080
        ┌─────────▼──────────┐
        │  delqurolabs       │  nginx:stable-alpine, read-only rootfs
        │  (static bundle)   │  /healthz for health checks
        └────────────────────┘
```

Two ways to run it — pick one:

| | Path A — Docker Compose | Path B — Coolify |
| --- | --- | --- |
| Best for | A server you manage by hand | Push-to-deploy, UI, certs, logs |
| Guide | [§2](#2-path-a--docker-compose-on-the-private-server) | [§3](#3-path-b--coolify-recommended) |
| Deploy trigger | `git pull && docker compose up -d --build` | `git push` (webhook) |

---

## 1. Prerequisites

On the private server:

- Docker Engine 24+ with the Compose plugin (`docker compose version`)
- Git
- Ports `80` and `443` reachable from the internet **if** you want public TLS
  (otherwise see the Tailscale/LAN option in §2.2)
- ~1 GB free disk; the image is ~60 MB

On your workstation: Docker (optional, for local testing) and access to the
server over SSH.

```bash
# On the server
sudo apt-get update && sudo apt-get install -y docker.io docker-compose-plugin git
sudo usermod -aG docker "$USER"   # log out/in afterwards
```

---

## 2. Path A — Docker Compose on the private server

### 2.1 First deploy

```bash
sudo mkdir -p /srv/delqurolabs && sudo chown "$USER" /srv/delqurolabs
git clone https://github.com/PlanExServices/DelQuroLabs.git /srv/delqurolabs
cd /srv/delqurolabs

cp .env.example .env
$EDITOR .env        # set HOST_BIND / HOST_PORT / VITE_SITE_URL

docker compose up -d --build
docker compose ps                  # health: starting -> healthy
curl -fsS http://127.0.0.1:8080/healthz   # ok
```

By default the container binds `127.0.0.1:8080` — reachable only from the
server itself, which is the right setting when a reverse proxy fronts it.

To reach it directly on the LAN or over Tailscale, set
`HOST_BIND=0.0.0.0` (or the specific interface IP) in `.env` and re-run
`docker compose up -d`.

### 2.2 TLS in front of it

Pick whichever matches your infrastructure:

**Caddy (simplest — automatic Let's Encrypt):**

```caddyfile
# /etc/caddy/Caddyfile
delqurolabs.example.com {
    encode zstd gzip
    reverse_proxy 127.0.0.1:8080
}
```

**nginx (host-level):**

```nginx
server {
    listen 443 ssl http2;
    server_name delqurolabs.example.com;
    ssl_certificate     /etc/letsencrypt/live/delqurolabs.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/delqurolabs.example.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Cloudflare Tunnel (no open inbound ports at all):**

```bash
cloudflared tunnel create delqurolabs
cloudflared tunnel route dns delqurolabs delqurolabs.example.com
# config.yml:  ingress: [{hostname: delqurolabs.example.com, service: http://127.0.0.1:8080}]
sudo systemctl enable --now cloudflared
```

**Private-only (Tailscale / WireGuard / LAN):** skip TLS entirely — set
`HOST_BIND` to the VPN interface address and browse to
`http://<vpn-host>:8080`. Ideal for a staging box that the public never sees.

### 2.3 Updating

```bash
cd /srv/delqurolabs
git pull
docker compose up -d --build      # rebuilds, then swaps the container
docker image prune -f             # optional: drop the old layers
```

Downtime is sub-second (container swap). To roll back, `git checkout <sha>` and
re-run the same command.

---

## 3. Path B — Coolify (recommended)

Coolify gives you the same container, plus push-to-deploy, automatic
certificates, logs and rollbacks from a UI.

### 3.1 Install Coolify (once, on the private server)

```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash
```

Then open `http://<server-ip>:8000`, create the admin account, and complete the
onboarding. In Coolify:

1. **Servers → localhost → Validate** (Coolify runs on this server itself).
2. Confirm the proxy is up: **Servers → Proxy → Traefik → Restart** if the
   dashboard shows it as stopped.

### 3.2 Connect the repository

The repository is **public**, so no credentials are needed: choose
**+ New Resource → Public Repository** and paste
`https://github.com/PlanExServices/DelQuroLabs`.

(If you later make it private, add a **GitHub App** under
**Keys & Tokens** first, then use *Private Repository (with GitHub App)*.)

### 3.3 Create the resource

1. **+ New Resource → Public Repository** → paste the repository URL.
2. **Branch:** `main`. **Build Pack:** `Docker Compose`.
3. Set:
   - **Docker Compose Location:** `/docker-compose.coolify.yml`
   - **Base Directory:** `/`
4. **Environment Variables** — add these (values are yours):

   | Key | Example | Notes |
   | --- | --- | --- |
   | `VITE_BASE` | `/` | Sub-path, if any |
   | `VITE_SITE_URL` | `https://labs.example.com/` | Used by the portfolio section |
   | `APP_PORT` | `8080` | Must match the container's listen port |
   | `TZ` | `America/New_York` | Log timestamps |

   > `VITE_*` values are **build** arguments, so changing one requires a
   > rebuild — press **Redeploy** after editing.

5. **Add the domain.** For a Compose resource Coolify lists a separate
   **Domains for `<service>`** field per non-database service. Put your full URL
   (`https://labs.example.com`) in the row for the **`web`** service and
   **Save**. Coolify writes the Traefik routing and the Let's Encrypt
   certificate from that one field.
6. **Redeploy** the resource so the proxy picks up the new configuration.
7. **Health check:** Coolify reads the image's `HEALTHCHECK` (`/healthz`).
   Optionally also set **Health Check Path** `/healthz` on port `8080` so
   Coolify gates the rollout on it.

**Why there are no `traefik.*` labels or a `networks:` section** in
`docker-compose.coolify.yml`: Coolify attaches its proxy to the network it
creates for the stack, and generates routing from the UI domain. Compose files
that declare their own network are documented as *intermittent — may work after
one deploy and break after the next*, and hard-coded labels/`container_name`
fight with Coolify's own naming. Keep those two omissions.

### 3.4 Automatic deploys

Coolify installs a webhook on the repository. With **Automatic Deployment**
enabled on the resource, every push to `main` triggers a rebuild and a
zero-downtime swap. Turn on **Watch Paths** (`/src/**`, `/index.html`,
`/package.json`) if you want docs-only commits to skip a deploy.

### 3.5 Deploying a prebuilt image (optional, faster)

`ci/github-workflow-publish-image.yml` builds the image in CI and pushes it to
`ghcr.io/planexservices/delqurolabs:latest` for `amd64` and `arm64`.

Enable it first: copy the file to `.github/workflows/publish-image.yml`
(GitHub web UI → **Actions → New workflow**, or `git mv` from a machine with a
token that has `workflow` scope) and commit. Without it, Coolify simply builds
the image from the Dockerfile itself — see §3.3.

To consume it in Coolify: create the resource with build pack **Docker Image**,
image `ghcr.io/planexservices/delqurolabs:latest`, port `8080`. If the package
is private, add a GHCR token under **Keys & Tokens → Docker Registry**. Deploys
then take seconds, because nothing is compiled on the server.

---

## 4. Cutover from GitHub Pages

1. **Point DNS at the server.** Apex `A` record → server IP (`A` for IPv4, keep
   `AAAA` only if you have IPv6), `CNAME www` → `delqurolabs.example.com`.
   With Cloudflare, keep the proxy on but set SSL/TLS mode to **Full (strict)**.
2. **Verify the new host** before touching the old one:

   ```bash
   curl -sI https://delqurolabs.example.com/ | head -20
   curl -s  https://delqurolabs.example.com/healthz     # ok
   ```

   Check the padlock, the screenshot images (below the hero) and the
   **Projects** section.
3. **Set `VITE_SITE_URL`** to the new domain and redeploy, so the portfolio's
   DelQuroLabs card links to the new home instead of GitHub Pages.
4. **Turn off Pages** once you're happy: repository **Settings → Pages →
   Source: None**. Note that `main` is no longer a deployable Pages root — it
   now requires a build step, so leaving Pages on would serve the old, broken
   artifact.
5. **Optional:** add the canonical URL to `index.html` now that the hostname is
   final:

   ```html
   <link rel="canonical" href="https://delqurolabs.example.com/" />
   ```

## 5. Verification checklist

```bash
# 1. Container is healthy
docker ps --filter name=delqurolabs --format '{{.Names}} {{.Status}}'

# 2. App answers, HTML is never cached
curl -sI https://delqurolabs.example.com/ \
  | grep -Ei 'HTTP/|cache-control|x-content-type|referrer-policy'

# 3. Security headers present on a hashed asset, and it is cached hard
curl -sI https://delqurolabs.example.com/assets/$(ls dist/assets | grep '\.js$') \
  | grep -i 'cache-control\|expires\|x-frame-options'

# 4. Compression is on
curl -s -H 'Accept-Encoding: gzip' -o /dev/null -w '%{size_download} bytes\n' \
  https://delqurolabs.example.com/

# 5. SPA fallback serves the shell for unknown paths (200, not 404)
curl -s -o /dev/null -w '%{http_code}\n' https://delqurolabs.example.com/anything
```

Expected: `/healthz` → `ok`; `index.html` → `Cache-Control: no-cache`;
`/assets/*` → `max-age=31536000, immutable`; `/anything` → `200`.

## 6. Operations

| Task | Command |
| --- | --- |
| Logs (Compose) | `docker compose logs -f --tail=100` |
| Logs (Coolify) | Resource → **Logs** |
| Restart | `docker compose restart` |
| Update | `git pull && docker compose up -d --build` |
| Rollback | `git checkout <previous-sha> && docker compose up -d --build`, or Coolify → **Deployments → Redeploy** on an earlier commit |
| Disk cleanup | `docker system prune -f` |
| Resource use | Idle nginx static server: ~5 MB RAM, ~0.1% CPU |

**Backups:** none needed. The container is stateless — the only durable state is
the git repository. Keep `main` in sync and you can rebuild the entire site
anywhere in under a minute.

**Hardening already in place:** read-only root filesystem, `no-new-privileges`,
all capabilities dropped except the five nginx needs, version banner hidden, no
host port published under Coolify (Traefik reaches it over the internal
network), and hidden files denied.

## 7. Troubleshooting

| Symptom | Cause / fix |
| --- | --- |
| `curl /healthz` → connection refused | Container still starting, or `HOST_BIND` doesn't cover the interface you're calling. `docker compose ps` and check the port mapping. |
| Coolify shows **Unhealthy** | The proxy can't reach `APP_PORT`. Confirm `APP_PORT=8080` and that the domain is set on the `web` service row. |
| 502 / "no available server" from Traefik | Coolify did not detect the container port. Put it in the domain itself: `https://labs.example.com:8080`, then redeploy. |
| Error about `container_name` / routes flip-flopping | Don't set `container_name:` or a custom `networks:` section in the Coolify compose file — Coolify manages both. |
| Broken CSS / no images after deploy | You published under a sub-path without `VITE_BASE=/labs/`. `VITE_*` values are baked at build time — rebuild after changing them. |
| Stale page after a deploy | Only the HTML shell is uncached by design; hard-reload (⌘⇧R). Hashed assets are immutable, which is intentional. |
| Certificate never issues | Ports 80/443 not reachable, or DNS not resolving to the server yet. `docker logs coolify-proxy` for the ACME error. |
| Old GitHub Pages site still live | DNS not propagated, or Pages still enabled in repo settings (§4.4). |
| `npm ci` fails during build | `package-lock.json` and `package.json` drifted apart. Run `npm install` locally and commit the lockfile. |
