# 📱 Set APK Download URL

## 🎯 Quick Setup

### Option 1: Set Environment Variable in Vercel (Recommended)

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Find your **NepEarn** project
   - Go to **Settings** → **Environment Variables**

2. **Add Environment Variable:**
   - **Name:** `NEXT_PUBLIC_APK_DOWNLOAD_URL`
   - **Value:** Your APK download URL (from Expo build or CDN)
   - **Example:** `https://expo.dev/artifacts/eas/abc123.../build.apk`
   - **Environment:** Select **All** (Production, Preview, Development)

3. **Redeploy:**
   - Go to **Deployments** tab
   - Click **"Redeploy"** on latest deployment
   - Wait for deployment to complete

### Option 2: Place APK in Public Folder

1. **Download APK** from Expo build
2. **Rename** to `nep-earn.apk`
3. **Place** in `frontend/public/nep-earn.apk`
4. **Commit and push:**
   ```bash
   cd frontend
   git add public/nep-earn.apk
   git commit -m "Add APK file"
   git push origin main
   ```

---

## 🔗 Where to Get APK URL

### From Expo Build

After building with EAS:
1. Copy the download URL from terminal
2. Example: `https://expo.dev/artifacts/eas/abc123.../build.apk`
3. Use this URL in `NEXT_PUBLIC_APK_DOWNLOAD_URL`

### From CDN/File Hosting

If you uploaded to:
- **Firebase Hosting:** Get the public URL
- **AWS S3:** Get the public URL
- **Google Drive:** Get the direct download link
- **GitHub Releases:** Get the release asset URL

---

## ✅ How It Works

1. User clicks "Download APK" button on dashboard
2. Browser requests `/api/download-apk`
3. API route checks for:
   - `NEXT_PUBLIC_APK_DOWNLOAD_URL` (first priority)
   - `APK_DOWNLOAD_URL` (second priority)
   - `/nep-earn.apk` (fallback to public folder)
4. Redirects to the APK URL
5. APK downloads automatically

---

## 📋 Environment Variables

### For Vercel:

```bash
NEXT_PUBLIC_APK_DOWNLOAD_URL=https://expo.dev/artifacts/eas/.../build.apk
```

**Note:** Use `NEXT_PUBLIC_` prefix so it's available in the browser.

---

## 🚀 After Setting URL

1. ✅ Set environment variable in Vercel
2. ✅ Redeploy frontend
3. ✅ Test download button on dashboard
4. ✅ Verify APK downloads correctly

---

## 🎯 Current Status

- ✅ Download button on dashboard
- ✅ API route configured
- ✅ Supports environment variable
- ✅ Supports public folder fallback
- ⏳ **Waiting for APK URL to be set**

---

**Once you set the APK URL, the download button will work!** 🚀

