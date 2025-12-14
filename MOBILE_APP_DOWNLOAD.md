# 📱 Mobile App Download Setup

## ✅ What's Been Done

1. ✅ **Download Section Added** - Dashboard now has "Download Mobile App" card
2. ✅ **APK Download Route** - `/api/download-apk` route created
3. ✅ **Mobile App with Ads** - AdMob integrated in React Native app

---

## 🚀 Setup Instructions

### Step 1: Build the APK

Follow the guide in `mobile/BUILD_APK_GUIDE.md` to build the APK.

Quick commands:
```bash
cd mobile
npm install
eas login
eas build --platform android --profile preview
```

### Step 2: Host the APK

**Option A: Upload to CDN (Recommended)**

1. Upload APK to:
   - Firebase Hosting
   - AWS S3
   - Google Drive (public link)
   - GitHub Releases
   - Any file hosting service

2. Get the direct download URL

3. Set in Vercel environment variable:
   ```
   APK_DOWNLOAD_URL=https://your-cdn-url.com/nep-earn.apk
   ```

**Option B: Use Public Folder**

1. Place APK in `frontend/public/nep-earn.apk`
2. Download will work automatically (no environment variable needed)

### Step 3: Redeploy Frontend

After setting `APK_DOWNLOAD_URL` (if using CDN):
1. Go to Vercel → Your Project
2. Redeploy to apply environment variable changes

---

## 📱 How It Works

1. User clicks "Download APK" button on dashboard
2. Browser requests `/api/download-apk`
3. API route redirects to:
   - `APK_DOWNLOAD_URL` (if set in Vercel)
   - `/nep-earn.apk` (from public folder)
4. APK downloads automatically

---

## ✅ AdMob Integration in Mobile App

The mobile app includes:

- **Banner Ads:**
  - Dashboard screen (bottom)
  - Tasks screen (top, every 3rd task, bottom)
  
- **Rewarded Ads:**
  - Component ready for future use
  - Can be added to any screen

**Ad Unit IDs:**
- Banner: `ca-app-pub-8858320671117320/6142924791`
- Rewarded: `ca-app-pub-8858320671117320/6166975524`

---

## 📋 Checklist

- [ ] Built APK using EAS
- [ ] Downloaded APK from Expo
- [ ] Hosted APK (CDN or public folder)
- [ ] Set `APK_DOWNLOAD_URL` in Vercel (if using CDN)
- [ ] Redeployed frontend
- [ ] Tested download from dashboard
- [ ] Verified APK installs correctly
- [ ] Verified ads show in mobile app

---

## 💡 Notes

1. **APK Size:** ~25-30 MB
2. **File Hosting:** Vercel public folder has 100MB limit (free tier)
3. **CDN Recommended:** For larger files or better performance
4. **Ad Approval:** Ads may take 24-48 hours to show after AdMob approval

---

## 🎉 Success!

Once setup is complete:
- Users can download APK from dashboard
- Mobile app includes all features
- Ads display in the app
- Full earning functionality on mobile

The mobile app is ready for distribution!

