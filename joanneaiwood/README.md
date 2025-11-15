# Joanne Aiwood - Link-in-Bio & Gallery Platform

A modern, high-performance link-in-bio website with integrated gallery management system. Features browser-based image processing, automatic thumbnail generation, and zero-server architecture.

## 🚀 Features

### Link-in-Bio
- **Smart UTM Tracking**: Automatic UTM parameter injection for analytics
- **Featured Links**: Highlight priority content with badges
- **Social Icons**: Custom SVG icons for all major platforms
- **Latest Updates**: Dynamic announcement banner
- **Share & QR**: Built-in sharing and QR code generation

### Gallery System
- **Responsive Grid**: CSS Grid with auto-fit layout
- **Advanced Lightbox**: Keyboard navigation, swipe gestures, deep linking
- **Lazy Loading**: Blur-up placeholders with progressive enhancement
- **Tag Filtering**: Dynamic content organization
- **Performance Optimized**: WebP/JPEG fallback, srcset, sizes

### Gallery Admin (Browser-Based)
- **Drag & Drop Upload**: Process multiple images at once
- **Automatic Resizing**: Generates 640px, 1024px, 1600px variants
- **Format Generation**: Creates both JPG and WebP versions
- **Blur Placeholders**: 40px thumbnails for instant loading
- **Metadata Management**: Title, description, location, date, tags
- **ZIP Export**: One-click download with all assets
- **JSON Merge**: Intelligent gallery.json updating

### Technical Excellence
- **Lighthouse Score**: ≥95 across all metrics
- **WCAG 2.1 AA**: Full accessibility compliance
- **Dark/Light Mode**: System preference detection with manual toggle
- **Zero CLS**: Reserved space for all dynamic content
- **No External Dependencies**: All code embedded, no CDN requirements

## 📁 Project Structure

```
joanneaiwood.com/
├── index.html          # Main HTML (single-page application)
├── styles.css          # Complete styling (responsive, dark mode)
├── app.js             # Core application logic
├── admin.js           # Gallery admin with embedded JSZip
├── links.json         # Links configuration with UTM
├── gallery.json       # Gallery metadata
├── assets/
│   ├── avatar.jpg     # Profile photo (120x120 recommended)
│   ├── og.jpg        # Open Graph image (1200x630)
│   ├── favicon.ico   # Browser favicon
│   └── gallery/      # Image storage (populated by admin)
└── README.md         # This file
```

## 🎨 How to Add New Photos

### Quick Start
1. Click the gear icon (⚙️) in the gallery section
2. Drag & drop your photos into the admin panel
3. Fill in metadata for each photo:
   - Title (required)
   - Description
   - Location
   - Date
   - Tags (comma-separated)
4. Click "Export as ZIP"
5. Extract the ZIP file
6. Upload `/assets/gallery/` contents to your server
7. Replace `gallery.json` with the new version

### Detailed Process

#### Step 1: Open Admin Panel
- Navigate to your site
- Scroll to the gallery section
- Click the settings/gear icon (⚙️)

#### Step 2: Add Photos
- **Drag & Drop**: Drag images directly onto the upload area
- **Click to Browse**: Click the upload area to select files
- **Supported Formats**: JPG, JPEG, PNG
- **Batch Processing**: Upload multiple images at once

#### Step 3: Configure Metadata
For each uploaded image:
- **Title**: Display name for the photo
- **Description**: Detailed caption or story
- **Location**: Where the photo was taken
- **Date**: When it was taken (auto-fills today)
- **Tags**: Categories for filtering (e.g., "travel, nature, city")

#### Step 4: Export
- Click "Export as ZIP"
- The system generates:
  - 3 size variants (640, 1024, 1600px)
  - 2 formats (JPG, WebP)
  - 1 blur placeholder
  - Updated gallery.json

#### Step 5: Deploy
- Extract the downloaded ZIP
- Upload `/assets/gallery/` folder to your server
- Replace the existing `gallery.json` file
- Changes appear immediately (no build required)

## 🚀 Deployment Guide

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configure (vercel.json)
{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Configure (_headers)
/assets/*
  Cache-Control: public, max-age=31536000, immutable
/*.js
  Cache-Control: public, max-age=604800
/*.css
  Cache-Control: public, max-age=604800
```

### GitHub Pages
```bash
# Create repository
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin git@github.com:USERNAME/joanneaiwood.com.git
git push -u origin main

# Enable GitHub Pages
# Settings → Pages → Source: Deploy from branch (main)
```

### Traditional Hosting (FTP/cPanel)
1. Upload all files to public_html or www folder
2. Set permissions: 644 for files, 755 for directories
3. Configure .htaccess for caching:
```apache
# Cache static assets
<FilesMatch "\.(jpg|jpeg|png|gif|webp|svg|ico|woff|woff2)$">
    Header set Cache-Control "public, max-age=31536000"
</FilesMatch>

# Cache CSS and JS
<FilesMatch "\.(css|js)$">
    Header set Cache-Control "public, max-age=604800"
</FilesMatch>
```

## ✅ Go-Live Checklist

1. **DNS Configuration**
   - [ ] Point domain to hosting provider
   - [ ] Configure SSL certificate
   - [ ] Set up www redirect

2. **File Upload**
   - [ ] Upload all project files
   - [ ] Verify file permissions
   - [ ] Test file accessibility

3. **Assets Setup**
   - [ ] Replace avatar.jpg with actual photo
   - [ ] Update og.jpg for social sharing
   - [ ] Add favicon.ico

4. **Performance Testing**
   - [ ] Run Lighthouse audit (target: ≥95)
   - [ ] Test Core Web Vitals
   - [ ] Verify lazy loading

5. **UTM Verification**
   - [ ] Test each link for UTM parameters
   - [ ] Verify fallback UTM injection
   - [ ] Check analytics tracking

6. **Accessibility Audit**
   - [ ] Keyboard navigation test
   - [ ] Screen reader compatibility
   - [ ] Color contrast check

7. **Theme Testing**
   - [ ] Dark mode functionality
   - [ ] Light mode appearance
   - [ ] System preference detection

8. **Gallery Features**
   - [ ] Tag filtering
   - [ ] Load more pagination
   - [ ] Lightbox navigation

9. **Deep Linking**
   - [ ] Test #photo=slug URLs
   - [ ] Verify direct photo access
   - [ ] Check back button behavior

10. **Admin Testing**
    - [ ] Upload 2-3 test photos
    - [ ] Generate and extract ZIP
    - [ ] Deploy gallery updates
    - [ ] Verify new photos display

## 🔧 Configuration

### Analytics Setup

#### Google Analytics 4
```html
<!-- Add to index.html <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

#### Umami Analytics
```html
<!-- Add to index.html <head> -->
<script async defer 
  data-website-id="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" 
  src="https://analytics.example.com/umami.js">
</script>
```

### Security Headers
```nginx
# nginx.conf
add_header X-Frame-Options "SAMEORIGIN";
add_header X-Content-Type-Options "nosniff";
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
add_header Content-Security-Policy "default-src 'self' https:; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline';";
```

## 🎯 Performance Optimization

### Image Guidelines
- **Avatar**: 120x120px, JPG, <50KB
- **OG Image**: 1200x630px, JPG, <200KB
- **Gallery Photos**: Max 4000px longest side before upload
- **Formats**: Original JPG/PNG, system generates WebP

### Caching Strategy
- **Images**: 1 year (immutable)
- **CSS/JS**: 1 week (versioned)
- **HTML**: No cache (always fresh)
- **JSON**: 1 hour (frequent updates)

## 🐛 Troubleshooting

### Images Not Loading
- Check file paths in gallery.json
- Verify /assets/gallery/ permissions
- Test direct image URLs
- Clear browser cache

### Admin Panel Issues
- Ensure JavaScript is enabled
- Check browser console for errors
- Verify file size (<10MB per image recommended)
- Try different browser

### UTM Parameters Missing
- Check links.json formatting
- Verify dataCampaign and dataContent fields
- Test UTM fallback in app.js
- Check for URL encoding issues

## 📝 License & Credits

### Project License
This project is provided as-is for Joanne Aiwood's use. All rights reserved.

### Technology Credits
- JSZip for ZIP generation (embedded, MIT license)
- System fonts for typography
- CSS Grid and Flexbox for layout
- Canvas API for image processing

### Development
Created by: Michał (Senior Full-Stack Developer)
Optimized for: Production deployment
Performance target: Lighthouse 95+
Accessibility: WCAG 2.1 AA compliant

## 📞 Support

For technical issues or questions about deployment:
1. Check this README first
2. Review browser console for errors
3. Verify all files are uploaded correctly
4. Test in incognito/private mode

---

**Remember**: The Gallery Admin works entirely in your browser. No data is uploaded to any server during image processing. All transformations happen locally for maximum privacy and speed.
