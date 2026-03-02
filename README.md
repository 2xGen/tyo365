# Tyo365 Website

Professional landing page for **Tyo365** – Everything Tokyo. 365 Days a Year.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**

## Brand Colors

- Orange: `#ff8c00` (CTAs, accents)
- Cyan: `#00ced1` (secondary accent, borders, links)

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Viator affiliate

Tour booking links go to Viator Tokyo. Configure affiliate settings in `.env.local` as needed.

### Viator API (tour cards, prices, images)

Tour cards use the Viator Partner API when `VIATOR_API_KEY` is set (e.g. in Vercel env vars).

- **Production (live data):** default. No extra env needed if your key is a production key.
- **Sandbox (test key):** set the base URL so the app calls the sandbox API:
  ```bash
  VIATOR_API_BASE_URL=https://api.sandbox.viator.com/partner
  ```

If the key is missing or the API returns no usable data, the site shows hardcoded placeholder tour cards.

## Build

```bash
npm run build
npm start
```

## Deploy

Deploy to [Vercel](https://vercel.com) or your preferred host. Add `VIATOR_API_KEY` to environment variables for live tour data.

## Repository

- **GitHub:** [2xGen/tyo365](https://github.com/2xGen/tyo365)
- **Clone:** `git clone git@github.com:2xGen/tyo365.git`
