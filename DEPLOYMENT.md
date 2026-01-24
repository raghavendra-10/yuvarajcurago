# Deployment Guide - Vercel Setup

This guide covers deploying your booking system to Vercel with image upload functionality.

## Prerequisites

- Vercel account (free tier works)
- GitHub repository connected to Vercel

---

## 1️⃣ Enable Vercel Blob Storage

### Option A: Via Vercel Dashboard (Recommended)

1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Storage** tab
3. Click **Create Database** → Select **Blob**
4. Click **Create** (this will auto-generate `BLOB_READ_WRITE_TOKEN`)
5. The token is automatically added to your environment variables ✅

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Link your project
vercel link

# Enable Blob storage
vercel blob enable

# The BLOB_READ_WRITE_TOKEN will be auto-added
```

---

## 2️⃣ Set Environment Variables in Vercel

Go to **Project Settings** → **Environment Variables** and add:

### Required Variables

```bash
# MongoDB
MONGODB_URI=mongodb+srv://team_db_user:bdMtiXdSVeH8yQg1@cluster0.fym93fu.mongodb.net/yuvaraj-booking?retryWrites=true&w=majority&appName=Cluster0

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourSecurePassword123

# Session Secret
SESSION_SECRET=d64bb7f4b8c254738aeee8a8cdf81076c2869399e68bf9d8bf6eaffb0f37c15e

# Razorpay
RAZORPAY_KEY_ID=rzp_live_RuHRHJlJDXFp8x
RAZORPAY_KEY_SECRET=fpc4O1VHDj2irYRmBtNvsBJs
RAZORPAY_PAYMENT_BUTTON_ID=pl_S32iD93nAACoNH
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_RuHRHJlJDXFp8x

# Google Calendar
GOOGLE_SERVICE_ACCOUNT_EMAIL=curago-sa@teamcurago.iam.gserviceaccount.com
GOOGLE_CALENDAR_ID=team@curago.in

# Use BASE64 version for Vercel (avoids newline issues)
GOOGLE_PRIVATE_KEY_BASE64=LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2UUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktjd2dnU2pBZ0VBQW9JQkFRRGcwQVc3ak9oRTJTaWwKOFlrYzErQjMyNmg2VTd5Wk5uK3NjRStKQlR0eG1tZ250WG1oTnA4dmlxa3FlaVVPTVBUakkrQ0x4a1R6YmE1dQpjN091aTZKbnZEL1l5TU9DZ2E4UmVZRlljWEtkRFRWdlpCNUVQenlRQ1p4U0FKK0hVL2tGS1VZT2hIT2M3L3JvCkcvOEt6QTFXZnBrY1dHS3BXeTdqdXF2RExCZzN3N1J6a0RFYjZpR0hVRnpWeG5OdGhqVHlkTkRaZXpiUURaQmUKQUZWRm92UW1jNjNkNWF4L1VJWXV1VlVMQWdVdC9waEVUcHU0K210azRYYkFzeTBuaVVJTGFSWFVDelIxNXBPVgpRSzYzMHd3SWs2QzBvcVArNDVFaEREU3BWWFAzdTVjWHg1N3lNSjV4UjJMMGJpcUNjY21pemdYNlFXRFRPYkRYClEwdG93aGdCQWdNQkFBRUNnZ0VBQldnZ3N5cmM0b2NCMU1LSWhIMDcrZlg2U1NnMEVYcVU1ZE5LVTd2TFVGeWgKSTZTdGc2ODZIZDBYc01kV1FTU2VuSFhlUTg1UUZlQ3Q2M0hKNjZrOURkZE5CbmJjU04rN1BsQXQ4d1ZyZHhQUgp2MWVUazNCSDV4anNFd2JPZWcva0hjMHBKbGFRMGV0QzhyWjFxRTlScjNldnBxc0kyR295ZmFueTBUNEJhUm5oCmRndnRVY2VpSERyY0I2ZkVNbXRwOEtvaCtSYlJoMGt0K0dwTFhmRTVTTUtoU053cURMMmd3Q2RwSHZQMnRMUjEKMDhVMVFRRGNOdHpqdEdpa3VOUktWbEhIQkJMRUplZERpMVVlcjBtdVpDaW9WSnMydytTbGxiU0JONC9iRVFrdgpucjBoWUJHMnNPVm84MG5SZS9MaVY5T3E1VUZKN3k5VzREaVc0QjU0Q1FLQmdRRHlqeG5ZZTlDZDZ1cUgwdlRFCjJ5NmgzWm1WUW9wd0NIOUdnaFZkZ0M5NlJrOGc0ZjNJc1kwOFFJYU9mdHZjbGdBVCtRODJXeE1pbFRXUUNLSHcKUDhmYlh3V0U4dkFUWFdEcWpXbEdNcWRNeDVMekEwWDNqcEJwd3JSNVh1NFJ1TzFYNW55aXBnSTZFTFdPcnBRVgpMRkMrVkVqQWtOZVdIK1paRWF2L0cwZ0FCUUtCZ1FEdFJTeVRUbS8rUW9EcDlmQ1h1TFdPa3p2Z2hIeFVhMWxhCk1hSGNRY1N6LzBsK2JBbWlNNmJ5c1VxOTd5OGV0b0NITy9LS1pDTllINlZycWp0eUdpRnJBNGtPc29icHAvclQKeVJFWGFCNmR2WVFvb09Wem1nYlk2cjFkV09iSDZRKzBIcURPUHhDZ2lTaDRsUHpaMlBxeFg1S3BaTG92aWtVcwo2UTduZk5JRXpRS0JnRCtOTk5WZW8yc3N5S1FycG93SmJXOWxrejdqUDBoWlFaZWtyNXBlNHBHajZFbVNUSjhQCnZoU0NSMzhBUi9URXJHS1BSK2dTOXJHQjdKVy9YVWFJUDRIL3BIK1A4MHp2azF3QkR3c2diR3NXZ3k3K3RZOUcKSUJwRnRHbDBjT1hkMFBuTjN1dnltUFREdWY0WFNaOCtqQzFDQWduS0tXSWhHNFpNdGdiU0RBeE5Bb0dCQU5pTgo1U1JCVjlnaGpKVjg0ZTBvS1pVS2JvRDVpcHhtS2ZRM0Ruc0FEKzhVMWxncmRSTjB2ekFNZnFJaDlzaTZXMDZTCmVVaTBJc29nZ0JObkdNQ0lkdTI4R1ZDdndwRHB2dldqTXhWQTg0aVcyMU5Wbm5aSEkyN0J1TG5GRlVWcVF1bnIKZG1zbmhoNXZjTisxWTUzVSt1SCt6OVlKV0NGaHVzZEZvMVBHU2MwVkFvR0FUUnhCdXZQRFdpTWQxK01EYTNUdgo4OXRZaVI4eXcrT25WOGs5THVrVWhOaHBtMWFheVl6L3dKQitTWnk2WDFVVzUxbElNMmNteXpVeVo5TXZ2ejNOCkRocGgzeHV5SHVPZHBjY0t5b2pkL2JvaXNXeHZLcXl5ZHhFZnQ0S1hsd0t0TEFtem91SU4zTjlLaFpFS05lMEkKVXNxWklJc01rbWFuMDZ0dnZWSEVNeFE9Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K

# Doctor Info
DOCTOR_EMAIL=team@curago.in
DOCTOR_NAME=Dr. Yuvaraj T

# Vercel Blob Storage
# ⚠️ AUTO-GENERATED when you enable Blob storage in Vercel
# No need to manually set this - Vercel handles it automatically
# BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxx
```

**Note:** The `BLOB_READ_WRITE_TOKEN` is automatically created when you enable Blob storage in step 1. You don't need to manually add it.

---

## 3️⃣ Deploy

### Via GitHub (Recommended)

1. Push your code to GitHub
2. Vercel will auto-deploy on every push to `main` branch
3. Check deployment logs in Vercel Dashboard

### Via Vercel CLI

```bash
# Build and deploy
vercel --prod
```

---

## 4️⃣ Test Image Upload in Production

1. Go to your production URL: `https://your-app.vercel.app`
2. Login to admin panel: `/admin`
3. Create a new booking page
4. Upload an image in any section (Hero Carousel, Banner, etc.)
5. Images will now be stored in Vercel Blob and display correctly ✅

---

## 🔍 Troubleshooting

### Images not showing?

**Check 1:** Verify Blob storage is enabled
```bash
vercel env ls
# Should show BLOB_READ_WRITE_TOKEN
```

**Check 2:** Check deployment logs
- Go to Vercel Dashboard → Deployments → Click latest deployment → View Logs
- Look for any upload errors

**Check 3:** Test upload API directly
```bash
# Login first to get token
curl -X POST https://your-app.vercel.app/api/admin/upload-image \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@test-image.jpg" \
  -F "slug=test"
```

### Environment Variable Issues?

- Make sure all env vars from `.env.local` are added in Vercel Dashboard
- Redeploy after adding/updating env vars
- Use `GOOGLE_PRIVATE_KEY_BASE64` instead of `GOOGLE_PRIVATE_KEY` on Vercel

---

## 📦 What Changed for Image Storage?

### Before (Filesystem - ❌ Doesn't work on Vercel)
```javascript
// Saved to /public/uploads/... (lost on deployment)
await writeFile(filepath, buffer);
```

### After (Vercel Blob - ✅ Works everywhere)
```javascript
// Saved to Vercel Blob Storage (permanent CDN URLs)
const blob = await put(blobPath, file, { access: 'public' });
```

**Benefits:**
- ✅ Images persist across deployments
- ✅ Fast CDN delivery worldwide
- ✅ Automatic image optimization
- ✅ 10GB free storage on Vercel

---

## 💰 Pricing (Vercel Blob)

**Hobby (Free) Plan:**
- 10GB storage
- 100GB bandwidth/month
- More than enough for most booking sites

**Pro Plan ($20/month):**
- 100GB storage
- 1TB bandwidth/month

---

## 🚀 Quick Deploy Checklist

- [ ] Enable Vercel Blob storage
- [ ] Add all environment variables from `.env.local`
- [ ] Deploy to production
- [ ] Test image upload in admin panel
- [ ] Verify images display on public booking pages

---

## Need Help?

- [Vercel Blob Docs](https://vercel.com/docs/storage/vercel-blob)
- [Next.js Deployment Guide](https://nextjs.org/docs/app/building-your-application/deploying)
