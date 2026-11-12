# Maunginap

Situs booking kost, kontrakan, ruko, dan pesan air galon. React 16 + Material-UI v4 + Firebase.

## Pengembangan

```bash
npm install --legacy-peer-deps
npm start
```

Script `start` dan `build` sudah menyertakan `--openssl-legacy-provider` (diperlukan react-scripts 3.4.3 di Node 17+).

## Struktur

- `src/config/theme.js` – design tokens & override komponen MUI (warna, radius, bayangan, tipografi)
- `src/components/Property/` – kartu & daftar penginapan bersama (Kost, Kontrakan, Ruko)
- `src/pages/public` – halaman pengguna · `src/pages/private` – panel admin
- `src/pages/user`, `login`, `registrasi` – autentikasi

## Deploy

Vercel: impor repo, konfigurasi dibaca dari `vercel.json` (SPA rewrite + build command). Alternatif: `npm run deploy` (Firebase Hosting).
