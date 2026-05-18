# MovaWardrobe

Headless Shopify storefront built with Next.js 14 App Router, deployed on Vercel.

## Stack
- **Frontend**: Next.js 14 (App Router, TypeScript)
- **Commerce**: Shopify Storefront API
- **Styling**: Custom CSS (no framework)
- **Deployment**: Vercel (free tier)

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

The `.env.local` file is pre-configured with your credentials. For Vercel deployment, add these as environment variables in the Vercel dashboard:

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=movawardrobe-2.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=39c2fae03a0b8d70f86c17ed2d9c2deb
```

## Deploy to Vercel

### Option 1 — Vercel CLI (fastest)
```bash
npm i -g vercel
vercel
```
Follow the prompts. Add your env vars when asked.

### Option 2 — GitHub + Vercel Dashboard
1. Push this repo to GitHub
2. Go to vercel.com → New Project → Import your repo
3. Add environment variables in the Vercel dashboard
4. Deploy

### Connect your domain
1. In Vercel dashboard → your project → Settings → Domains
2. Add your domain (e.g. movawardrobe.com)
3. Update your domain's DNS to point to Vercel (they'll show you the records)

## Pages
- `/` — Home with hero, featured products
- `/shop` — Full product collection
- `/product/[handle]` — Product detail with variant selection
- `/cart` — Cart with quantity controls and Shopify checkout
- `/about` — Brand story
- `/contact` — Contact form

## Customisation
- **Fonts**: Edit `globals.css` — currently using DM Sans + DM Serif Display
- **Colors**: Edit CSS variables at top of `globals.css`
- **Contact form**: Wire up `/app/contact/page.tsx` to Formspree or Resend for real email delivery
- **Hero**: Edit `/app/page.tsx` hero section text and add a background image
