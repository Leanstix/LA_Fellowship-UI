# Light Army Fellowship UI

The official landing page for Light Army Fellowship at the University of Ibadan, a campus expression of the Light Nation family.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Services hold every Sunday at 10:00 am WAT at BNI Building, opposite Queen Idia Hall, University of Ibadan, Nigeria. The connection section and footer link directly to the fellowship's Google Maps pin. Service details and the global pastor's name are maintained in `src/data/fellowship.ts`.

The sermon-library button remains intentionally inactive until the fellowship's Google Drive archive is ready.

## Temporary photography

The first version intentionally loads temporary worship photography from Unsplash at runtime. The images are credited to Edward Cisneros, John Price, NATHAN MULLET, and Matt Botsford. Replace these URLs in `src/data/content.ts` with original Light Army Fellowship service photographs when they are available.
