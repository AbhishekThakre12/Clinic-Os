# ClinicOS — Vimalai Orthodontic & Multispeciality Dental Clinic

A premium, production-ready dental clinic website built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and Framer Motion. This is the first clinic instance on the ClinicOS platform — content lives in `lib/data.ts` so additional clinics can be added as new tenant configs later.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build for production

```bash
npm run build
npm start
```

## Project structure

```
app/                 Next.js App Router pages, layout, global styles, SEO metadata
components/sections/ Page sections (Hero, Treatments, FAQ, Appointment, etc.)
components/ui/       Reusable primitives (Button, SectionTitle, PlaceholderImage, slider)
lib/data.ts          All clinic content — doctor info, treatments, FAQs, testimonials
lib/utils.ts         Tailwind class-merge helper
```

## Deploying to Vercel with Neon Postgres

The appointment backend uses `@neondatabase/serverless` — the recommended Postgres driver for Vercel's serverless runtime. Appointments are stored in a hosted Neon Postgres database (free tier is more than enough for a dental clinic).

```
lib/db.ts                          Neon Postgres connection + query helpers
app/api/appointments/route.ts      POST (public) / GET (admin-only)
app/api/appointments/[id]/route.ts PATCH status / DELETE (admin-only)
app/admin/appointments/page.tsx    Admin dashboard
```

### Step-by-step deployment

**1. Push to GitHub**
Create a new GitHub repository and push this project to it:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

**2. Import to Vercel**
Go to [vercel.com/new](https://vercel.com/new), click **Import** next to your repo, and click **Deploy**. It'll fail on first deploy because the database isn't set up yet — that's fine.

**3. Add Neon Postgres**
In your Vercel project dashboard:
- Go to the **Storage** tab
- Click **Add Database** → select **Neon** (from the Marketplace)
- Follow the prompts — Vercel creates a Neon account for you if needed
- Once created, click **Connect Project** → select your project → click **Connect**

Vercel automatically injects `POSTGRES_URL` (and related vars) into your project. No manual copy-pasting of connection strings needed.

**4. Set your admin key**
In your Vercel project → **Settings → Environment Variables**, add:
```
Name:  ADMIN_API_KEY
Value: (a long random secret — run: openssl rand -hex 32)
Environment: Production, Preview, Development (tick all three)
```
Click **Save**.

**5. Redeploy**
Go to the **Deployments** tab → click the three-dot menu on your latest deployment → **Redeploy**. This picks up the new env vars. The `appointments` table is created automatically the first time someone hits the API — no migration command needed.

**6. Visit your admin dashboard**
Go to `https://your-project.vercel.app/admin/appointments`, enter your `ADMIN_API_KEY`, and you'll see all bookings with confirm/cancel/delete actions.

---

### Local development against the same database

```bash
npm i -g vercel          # install Vercel CLI (skip if already installed)
vercel login
vercel link              # connects this folder to your Vercel project
vercel env pull .env.local  # pulls POSTGRES_URL + ADMIN_API_KEY locally
npm install
npm run dev
```

This points your local dev server at the same live database. If you'd prefer a separate local database so test bookings don't appear in the real admin, create a free Neon project at [neon.tech](https://neon.tech), copy its connection string, and paste it as `POSTGRES_URL` in `.env.local`.

---

### API reference

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/appointments` | Public | Create a booking (rate-limited: 5/IP/10 min) |
| `GET`  | `/api/appointments` | Bearer token | List all bookings |
| `PATCH`| `/api/appointments/:id` | Bearer token | Update status: `pending` / `confirmed` / `cancelled` |
| `DELETE`| `/api/appointments/:id` | Bearer token | Permanently delete |

Pass `Authorization: Bearer <ADMIN_API_KEY>` on protected routes.

## Replacing placeholder images

All photography is currently a styled placeholder (`components/ui/PlaceholderImage.tsx`) so the layout works without real assets. To go live:

1. Drop real photos into `/public/images/`.
2. Replace `<PlaceholderImage label="..." />` usages with `next/image` pointing at the real file.
3. Update `og-image.jpg` in `/public` for social sharing previews.

## Notes

- The appointment form is frontend-only (no backend) — wire it to your booking API or email service when ready.
- The Google Map embed uses a public, keyless `maps.google.com` query embed driven by the clinic address in `lib/data.ts`.
- Update `SITE_URL` in `app/layout.tsx` once a production domain is assigned.
