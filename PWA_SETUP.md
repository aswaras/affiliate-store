# PWA Setup Instructions

Untuk menyelesaikan setup PWA, Anda perlu menambahkan icon files di folder `public/`.

## Icon yang Dibutuhkan:

1. **icon-192.png** - 192x192 px
2. **icon-512.png** - 512x512 px  
3. **icon-maskable-192.png** - 192x192 px (for adaptive icons)
4. **icon-maskable-512.png** - 512x512 px (for adaptive icons)
5. **apple-icon.png** - 180x180 px (untuk iOS)
6. **icon.png** - 32x32 px (favicon)

## Cara Membuat Icons:

### Option 1: Menggunakan Figma atau Canva
- Buat design logo "TokoAfiliasi"
- Export dengan ukuran yang dibutuhkan
- Upload ke `public/` folder

### Option 2: Menggunakan Online Generator
1. Buka https://www.favicon-generator.org/ atau https://pwa-asset-generator.netlify.app/
2. Upload logo Anda
3. Download semua icon yang dihasilkan
4. Copy ke folder `public/`

### Option 3: Menggunakan PWA Asset Generator (Command Line)
```bash
npx pwa-asset-generator logo.png ./public
```

## Screenshot yang Dibutuhkan (Opsional):

Untuk pengalaman install yang lebih baik, tambahkan:
- **screenshot-540.png** - 540x720 px (mobile)
- **screenshot-1280.png** - 1280x720 px (desktop)

## Testing PWA:

1. Run development server:
```bash
npm run dev
```

2. Buka di Chrome DevTools:
   - F12 > Application > Manifest
   - Verify manifest.json ter-load dengan benar
   
3. Cek Service Worker:
   - F12 > Application > Service Workers
   - Harus menampukkan "sw.js" dengan status "activated"

4. Test Install:
   - Chrome akan menampilkan "install app" di address bar
   - Klik untuk install ke desktop/home screen

## Features yang Sudah Aktif:

✅ Responsive Design (Mobile-Friendly)
✅ Service Worker (Offline Support)
✅ Web App Manifest
✅ Installation Support
✅ Theme Color
✅ PWA Meta Tags

## Untuk Production (Vercel):

1. Upload/commit semua icon files ke repository
2. Push ke GitHub
3. Vercel akan otomatis deploy dengan PWA support

Setelah deploy:
- Buka app di mobile Chrome/Safari
- PWA dapat diinstall langsung dari browser
