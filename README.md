# Claim Ready &mdash; Warranty Claim Checklist

> **A free checklist for anyone about to file a warranty claim.**  
> *A warranty claim is decided on records. Keep yours, and ask for theirs in writing.*

Claim Ready is a calm, factual consumer tool designed using the **Sorry Bravia: Emerald Editorial** design system. It helps anyone whose phone, TV, laptop, or appliance stopped working while under warranty to track, document, and present a claim based on facts and written evidence.

---

## ✦ Design System: Emerald Editorial

Designed to adhere to every token and rule of `sorry-bravia-emerald-editorial-DESIGN.md`:

- **Colors:**
  - **Primary Emerald (`#087A58`):** Buttons, links, active rings, key hot stats.
  - **Mint Wash (`#EEFAF5`) & Deep Emerald (`#065F43`):** Eyebrow pills, callout cards, ticker strip, borders (`#B9E6D6`).
  - **Bright Emerald (`#34D399`):** Accents on dark ink sections.
  - **Secondary Ink (`#0D1117`):** Headlines, hero headline card, dark CTA section, dark pill buttons.
  - **Surfaces:** Pure White (`#FFFFFF`), Mist (`#F7F8FA`), Sunken (`#F2F4F7`), Hairline borders (`#E7EAEF`).
- **Typography:**
  - **Plus Jakarta Sans (800, 600, 500, 400):** Display titles, section headlines, lead copy, numbers with tabular figures (`tnum`).
  - **JetBrains Mono (600, 500, 400):** Eyebrow pill labels, dates, codes, ticker labels, audit tags.
- **Rhythm & Structure:**
  - Fixed-max shell (`1180px`), narrow shell (`880px`), vertical section rhythm (`84px` to `148px`).
  - Strict section header stack: Mono pill label &rarr; 16px gap &rarr; Heavy headline &rarr; 20px gap &rarr; Lead paragraph (~62ch) &rarr; Content.
  - Infinite right-to-left ticker strip (46s loop).
  - Stat grid joined with 1px hairline dividers and hot cell accent.
  - Dark section (`#0D1117`) highlighting Rule #1 with 70–80% white opacity.
  - Soft ink-tinted shadows and rounded radii (`12px`, `18px`, `26px`, `9999px`).

---

## ✦ Key Features

1. **Complete 15-Step Checklist:**
   - **Phase 01: Before Anything Goes Wrong** (Steps 1–4: invoices, product registration, warranty review, baseline condition photos).
   - **Phase 02: When The Fault Appears** (Steps 5–7: video/photo evidence with timestamps, written complaint, reference numbers).
   - **Phase 03: When A Technician Visits** (Steps 8–10: job sheet duplicate, diagnostic test instruments, on-site photography).
   - **Phase 04: If The Claim Is Refused** (Steps 11–15: written clause demand, technical report, internal escalation, factual chronologies, consumer helpline portals).
2. **Interactive State & Device Persistence:**
   - Check off items as you gather records.
   - Progress bar and completion metrics saved locally via `localStorage`.
   - Filter by phase or view all 15 steps.
3. **Factual Evidence & Letter Templates:**
   - 1-click copyable correspondence templates for written complaints, diagnostic proof demands, rejection appeals, and executive escalations.
4. **Statutory Consumer Helplines Directory:**
   - Direct links and contacts for Malaysia (KPDN / TTPM), US (FTC), UK (Citizens Advice), India (NCH 1915 / e-Daakhil), Australia (ACCC), and international bodies.
5. **Print & PDF Mode:**
   - Dedicated `@media print` layout that strips navigation and generates a clean, dense physical checklist with checkboxes and signature blocks.
6. **Zero Dependencies & Fast:**
   - Pure HTML5, modern CSS3, and vanilla JavaScript. Instant loading, 100/100 Lighthouse performance.

---

## ✦ Local Development

Run with Node.js built-in HTTP server:

```bash
# Start local dev server
npm start
# or: node serve.js
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✦ Deploying to Vercel

### Method 1: Instant Deployment with Vercel CLI
```bash
# Install or invoke Vercel CLI
npx vercel

# For production deployment
npx vercel --prod
```

### Method 2: Push to GitHub & Connect to Vercel
1. Initialize a git repository and commit the project:
   ```bash
   git init
   git add .
   git commit -m "feat: claim-ready editorial website"
   ```
2. Push to your GitHub / GitLab / Bitbucket repository.
3. Log in to [vercel.com](https://vercel.com) and click **"Add New Project"**.
4. Import your repository. Vercel automatically detects the static project and `vercel.json` configuration.
5. Click **Deploy**. Your site will be live on global edge CDN with instant SSL within seconds.

---

## ✦ File Structure

```
claim-ready/
├── index.html        # Semantic HTML5 structure & content
├── styles.css        # Emerald Editorial design tokens & responsive styles
├── app.js            # Interactive checklist, filters, copy & print actions
├── favicon.svg       # SVG document seal favicon
├── serve.js          # Zero-dependency local Node server
├── vercel.json       # Vercel deployment headers & configuration
├── package.json      # NPM scripts and project metadata
└── README.md         # Documentation and deployment instructions
```

---

## ✦ Disclaimer

*Claim Ready is a free, general guide. It is not legal advice. For your own case, check the warranty terms for your product and your country's consumer rules.*
