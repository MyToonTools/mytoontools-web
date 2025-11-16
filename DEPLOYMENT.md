# Deployment & SEO Configuration Guide

## Pre-Deployment Checklist

### 1. Update Configuration Files

Before deploying, update the following URLs in your files:

**index.html** - Update these URLs:
```html
<link rel="canonical" href="https://your-actual-domain.com" />
<meta property="og:url" content="https://your-actual-domain.com/" />
<meta property="twitter:url" content="https://your-actual-domain.com/" />
<meta property="og:image" content="https://your-actual-domain.com/og-image.png" />
<meta property="twitter:image" content="https://your-actual-domain.com/og-image.png" />
```

**public/sitemap.xml** - Update:
```xml
<loc>https://your-actual-domain.com/</loc>
```

**public/robots.txt** - Update:
```
Sitemap: https://your-actual-domain.com/sitemap.xml
```

**README.md** - Update all jtoon.app references to your actual domain

### 2. Create Open Graph Image

Create an image at `public/og-image.png` with:
- Size: 1200x630px
- Format: PNG or JPG
- Content: App screenshot or branded image
- Text: "JSON to TOON Converter - Reduce LLM Tokens by 40%"

### 3. Update Favicon

Replace `public/vite.svg` with your own favicon or create proper favicon set:
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
npm run build
vercel --prod
```

3. Configure custom domain in Vercel dashboard

4. Vercel automatically provides:
   - HTTPS
   - CDN
   - Automatic deployments
   - Environment variables

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

3. Configure custom domain in Netlify dashboard

### Option 3: GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Update `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/jtoon",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.ts`:
```ts
export default defineConfig({
  plugins: [react()],
  base: '/jtoon/'
})
```

4. Deploy:
```bash
npm run deploy
```

### Option 4: Custom Server (VPS)

1. Build the app:
```bash
npm run build
```

2. Copy `dist` folder to your server

3. Configure nginx:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/jtoon/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Enable gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

4. Set up SSL with Let's Encrypt:
```bash
sudo certbot --nginx -d your-domain.com
```

## Post-Deployment SEO Tasks

### 1. Google Search Console Setup

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Add your property (domain or URL prefix)
3. Verify ownership (multiple methods available)
4. Submit sitemap: `https://your-domain.com/sitemap.xml`
5. Request indexing for main page

### 2. Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site
3. Verify ownership
4. Submit sitemap
5. Import settings from Google Search Console (optional)

### 3. Google Analytics 4

1. Create GA4 property
2. Get measurement ID
3. Add to your app (create `src/lib/analytics.ts`):

```typescript
// src/lib/analytics.ts
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'

export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}
```

4. Add to `index.html`:
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

### 4. Social Media Optimization

Test your Open Graph tags:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### 5. Performance Optimization

Test and optimize:
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

Target scores:
- Lighthouse Performance: 90+
- First Contentful Paint: < 1.8s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

### 6. Schema Markup Validation

Test structured data:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

## Monitoring & Maintenance

### Weekly Tasks:
- [ ] Check Google Search Console for errors
- [ ] Monitor organic traffic in Analytics
- [ ] Review keyword rankings
- [ ] Check for broken links

### Monthly Tasks:
- [ ] Analyze user behavior in Analytics
- [ ] Review and update meta descriptions if needed
- [ ] Check backlink profile
- [ ] Update sitemap if content changed
- [ ] Review Core Web Vitals

### Quarterly Tasks:
- [ ] Content audit and updates
- [ ] Competitor analysis
- [ ] SEO strategy review
- [ ] Performance optimization review
- [ ] Update dependencies and security patches

## Environment Variables (Optional)

Create `.env` file for production:
```bash
VITE_APP_URL=https://your-domain.com
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_API_URL=https://api.your-domain.com
```

## Security Headers

Add these headers via your hosting provider or server config:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline';
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## Additional Resources

- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Moz Beginner's Guide to SEO](https://moz.com/beginners-guide-to-seo)
- [Ahrefs SEO Guide](https://ahrefs.com/seo)
- [Web.dev Performance](https://web.dev/performance/)

---

Good luck with your deployment! 🚀
