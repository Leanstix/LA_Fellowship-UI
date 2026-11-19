# Light Army Fellowship UI

The official landing page for Light Army Fellowship at the University of Ibadan, a campus expression of the Light Nation family.

## Local development

Use Node.js 22.12 or newer.

```bash
npm ci
npm run dev
```

The standalone site uses the service details in `src/data/fellowship.ts` and photos in `src/data/content.ts`. The sermon section shows “coming soon” until an archive URL is configured.

To use live content and the officer dashboard, start the Django backend on port 8000 with `LA_DEBUG=true` for local HTTP, then start Vite with API access enabled.

```bash
VITE_ENABLE_FELLOWSHIP_API=true npm run dev
```

Vite proxies `/api/*`, `/office/*`, and `/static/*` to `http://127.0.0.1:8000`. Set `LA_BACKEND_URL` before launching Vite if the backend runs at another address. Open `http://localhost:5173/#/admin` and sign in with an officer account provisioned on the backend. Use **Open operations** to continue to the Django office with the same session. The office exposes the sections assigned to your role. The current president can open **Executive access** from the dashboard.

Officers with content permissions can edit the public service details, sermon archive, or gallery. The service and sermon editor publishes changes on save. Leave the sermon archive URL blank to show “coming soon.” Gallery photos use public HTTPS image links. Drafts stay in the dashboard. The first published photo also appears in the public site's hero.

## Production deployment

Run `npm run build` for a standalone site. To enable the dashboard and live public content in production, build with the API flag.

```bash
VITE_ENABLE_FELLOWSHIP_API=true npm run build
```

Serve `dist/` and the Django backend on the same HTTPS origin so both dashboards share a secure session. The example below uses Caddy, a frontend build copied to `/srv/light-army-fellowship`, Django listening on port 8000, and Django's collected static files copied to `/srv/light-army-fellowship-office-static`.

```caddyfile
fellowship.example.org {
    @backend path /api/* /office/*
    handle @backend {
        reverse_proxy 127.0.0.1:8000
    }

    handle_path /static/* {
        root * /srv/light-army-fellowship-office-static
        file_server
    }

    handle {
        root * /srv/light-army-fellowship
        file_server
    }
}
```

Replace `fellowship.example.org` with the site hostname. Leave the `/api/` and `/office/` prefixes on requests passed to Django. Configure Django's `LA_ALLOWED_HOSTS` and enable `LA_TRUST_PROXY_SSL_HEADER=true` when Caddy sets the forwarded protocol. Open `/#/admin` on the deployed site to sign in.

## Temporary photography

The static fallback includes temporary Unsplash photos credited to Edward Cisneros, John Price, NATHAN MULLET, and Matt Botsford. Replace their URLs in `src/data/content.ts` for standalone deployments or manage the published photos in the dashboard for API-enabled deployments.
