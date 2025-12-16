# 📱 AdMob SDK Setup for Web

## ✅ What Changed

Your web app now uses **AdMob SDK** instead of AdSense. This provides:
- ✅ Better ad performance
- ✅ Unified ad management (same as mobile)
- ✅ AdMob ad unit IDs support
- ✅ Better revenue optimization

---

## 🔧 Environment Variables

### Required Variables (Vercel)

```bash
# AdMob App ID (Publisher ID)
NEXT_PUBLIC_ADMOB_APP_ID=ca-app-pub-8858320671117320

# AdMob Banner Ad Unit ID (just the number, not full ID)
NEXT_PUBLIC_ADMOB_BANNER_UNIT=6142924791

# AdMob Native Ad Unit ID (just the number)
NEXT_PUBLIC_ADMOB_NATIVE_AD_UNIT=3814777375
```

### Legacy Support (Still Works)

For backward compatibility, these still work:
```bash
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-app-pub-8858320671117320
NEXT_PUBLIC_ADSENSE_SLOT_TASKS_TOP=6142924791
```

---

## 📋 Your AdMob Ad Units

- **App ID:** `ca-app-pub-8858320671117320~8435057976`
- **Publisher ID:** `ca-app-pub-8858320671117320`
- **Banner Ad Unit:** `ca-app-pub-8858320671117320/6142924791`
- **Native Ad Unit:** `ca-app-pub-8858320671117320/3814777375`
- **Rewarded Ad Unit:** `ca-app-pub-8858320671117320/6166975524` (mobile only)
- **Interstitial Ad Unit:** `ca-app-pub-8858320671117320/4972958131` (mobile only)

---

## 🚀 Setup Steps

### Step 1: Set Environment Variables in Vercel

1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add these variables:

```
NEXT_PUBLIC_ADMOB_APP_ID=ca-app-pub-8858320671117320
NEXT_PUBLIC_ADMOB_BANNER_UNIT=6142924791
NEXT_PUBLIC_ADMOB_NATIVE_AD_UNIT=3814777375
```

### Step 2: Redeploy

After setting environment variables:
1. Go to Deployments tab
2. Click "Redeploy" on latest deployment
3. Wait for deployment to complete

### Step 3: Verify

1. Visit your site
2. Open browser console (F12)
3. Look for: `✅ AdUnit: AdMob ad pushed successfully`
4. Ads should appear on pages

---

## 📝 Component Usage

### AdUnit Component

```jsx
// Using AdMob ad unit ID (recommended)
<AdUnit 
  adUnitId="6142924791"  // Just the number
  className="my-4"
/>

// Or full AdMob ID
<AdUnit 
  adUnitId="ca-app-pub-8858320671117320/6142924791"
  className="my-4"
/>

// Legacy AdSense format (still works)
<AdUnit 
  adSlot="6142924791"
  className="my-4"
/>
```

### NativeAd Component

```jsx
<NativeAd className="my-4" />
```

Uses `NEXT_PUBLIC_ADMOB_NATIVE_AD_UNIT` or defaults to `3814777375`

---

## 🔍 How It Works

1. **AdMob SDK Script** loads in `_document.js`
2. **AdUnit Component** uses AdMob ad unit IDs
3. **Automatic ID Construction** - if you pass just a number, it constructs the full ID
4. **Backward Compatible** - old AdSense format still works

---

## ✅ Benefits of AdMob SDK

1. **Unified Management** - Same ad units for web and mobile
2. **Better Performance** - Optimized ad delivery
3. **More Ad Formats** - Access to all AdMob formats
4. **Better Analytics** - Unified reporting
5. **Higher Revenue** - Better ad optimization

---

## 🐛 Troubleshooting

### Ads Not Showing?

1. **Check Environment Variables:**
   - Visit `/test-ads` page
   - Verify all variables are set

2. **Check Browser Console:**
   - Look for AdMob initialization messages
   - Check for errors

3. **Verify AdMob Account:**
   - Account approved?
   - Ad units active?
   - Check AdMob dashboard

4. **Disable Ad Blockers:**
   - Test in incognito mode
   - Disable browser extensions

---

## 📊 Migration from AdSense

If you were using AdSense before:

✅ **No changes needed** - code is backward compatible
✅ **Old env vars still work** - `NEXT_PUBLIC_ADSENSE_*`
✅ **Gradual migration** - switch to AdMob vars when ready

---

## 🎯 Next Steps

1. ✅ Set environment variables in Vercel
2. ✅ Redeploy your site
3. ✅ Test ads on `/test-ads` page
4. ✅ Verify ads appear on pages
5. ✅ Check AdMob dashboard for impressions

---

**Your app now uses AdMob SDK for better ad performance!** 🚀

