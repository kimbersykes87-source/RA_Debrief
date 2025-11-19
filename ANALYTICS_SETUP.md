# Analytics Setup Guide

## Cloudflare Web Analytics (Recommended - Free & Privacy-Focused)

### Step 1: Enable Cloudflare Web Analytics

1. Go to your [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Analytics & Logs** → **Web Analytics**
3. Click **Add a site**
4. Enter your domain: `ra-debrief-2025.pages.dev` (or your custom domain)
5. Cloudflare will generate a **token** for you

### Step 2: Add Token to Your Site

1. Copy the token from Cloudflare
2. Open `index.html`
3. Find this line:
   ```html
   <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "YOUR_TOKEN_HERE"}'></script>
   ```
4. Replace `YOUR_TOKEN_HERE` with your actual token
5. Commit and push the changes

### Step 3: View Analytics

- Go to **Analytics & Logs** → **Web Analytics** in Cloudflare Dashboard
- View real-time and historical data:
  - Page views
  - Unique visitors
  - Top pages
  - Referrers
  - Countries
  - Devices

---

## Alternative: Google Analytics

If you prefer Google Analytics:

1. Create a Google Analytics account at [analytics.google.com](https://analytics.google.com)
2. Create a new property and get your **Measurement ID** (format: `G-XXXXXXXXXX`)
3. Replace the Cloudflare script in `index.html` with:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## What You'll Track

- **Page views**: Total visits to your site
- **Unique visitors**: Number of distinct users
- **Traffic sources**: Where visitors come from (WhatsApp, direct, etc.)
- **Device types**: Mobile vs desktop
- **Countries**: Geographic distribution
- **Time on site**: Engagement metrics

---

## Privacy Note

Cloudflare Web Analytics is privacy-focused and:
- Doesn't use cookies
- Complies with GDPR
- Doesn't track personal information
- Provides aggregated, anonymous data only

