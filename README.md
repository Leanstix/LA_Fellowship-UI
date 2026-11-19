# Light Army Fellowship UI

The official landing page for Light Army Fellowship at the University of Ibadan, a campus expression of the Light Nation family.

## Local development

Use Node.js 22.12 or newer.

```bash
npm ci
npm run dev
```

The standalone site uses the service details in `src/data/fellowship.ts` and photos in `src/data/content.ts`. The sermon section shows “coming soon” until an archive URL is configured.

To use live content and open the admin dashboard, run the fellowship API locally on port 8000 with `LA_SESSION_COOKIE_SECURE=false` for HTTP development, then start Vite with API access enabled.

```bash
VITE_ENABLE_FELLOWSHIP_API=true npm run dev
```

Vite proxies `/api/*` to `http://127.0.0.1:8000`. Set `LA_BACKEND_URL` before launching Vite if the API runs at another address. Open `http://localhost:5173/#/admin` and sign in with an account provisioned on the backend using `python -m laf_backend.manage set-admin <username>`.

The service and sermon editor publishes changes when an administrator saves. Leave the sermon archive URL blank to show “coming soon.” Gallery photos use public HTTPS image links. Photos saved as drafts stay visible in the dashboard. The first published photo also appears in the public site's hero.

## Production deployment

Run `npm run build` for a standalone site. To enable the dashboard and live public content in production, build with the API flag.

```bash
VITE_ENABLE_FELLOWSHIP_API=true npm run build
```

Serve the output in `dist/` and route `/api/*` to the fellowship API on the same HTTPS origin. The API uses secure session cookies in production. For example, a Caddy deployment with the build copied to `/srv/light-army-fellowship` and the API listening locally on port 8000 can use the following configuration.

```caddyfile
fellowship.example.org {
    handle /api/* {
        reverse_proxy 127.0.0.1:8000
    }

    handle {
        root * /srv/light-army-fellowship
        file_server
    }
}
```

Replace `fellowship.example.org` with the site hostname. The API route keeps the `/api` prefix. Open `/#/admin` on the deployed site to sign in. If the static host cannot proxy `/api/*`, use a reverse proxy in front of both the static site and the API.

## Temporary photography

The static fallback includes temporary Unsplash photos credited to Edward Cisneros, John Price, NATHAN MULLET, and Matt Botsford. Replace their URLs in `src/data/content.ts` for standalone deployments or manage the published photos in the dashboard for API-enabled deployments.
