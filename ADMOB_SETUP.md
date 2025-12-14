# 📱 AdMob Integration Setup Guide

## Your AdMob IDs

From your AdMob dashboard, you have:

- **App ID:** `ca-app-pub-8858320671117320~8435057976`
- **Publisher ID (Client ID):** `ca-app-pub-8858320671117320` (extracted from app ID)
- **Banner Ad Unit:** `ca-app-pub-8858320671117320/6142924791`
- **Rewarded Ad Unit:** `ca-app-pub-8858320671117320/6166975524`

---

## ✅ Setup Instructions

### Step 1: Set Environment Variables on Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

**Required Variable:**
```
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-app-pub-8858320671117320
```

**Ad Slot Variables (use banner ad unit for all):**
```
NEXT_PUBLIC_ADSENSE_SLOT_TASKS_TOP=6142924791
NEXT_PUBLIC_ADSENSE_SLOT_TASKS_INLINE=6142924791
NEXT_PUBLIC_ADSENSE_SLOT_TASKS_BOTTOM=6142924791
NEXT_PUBLIC_ADSENSE_SLOT_TASK_TOP=6142924791
NEXT_PUBLIC_ADSENSE_SLOT_TASK_MIDDLE=6142924791
NEXT_PUBLIC_ADSENSE_SLOT_TASK_BOTTOM=6142924791
```

**Note:** 
- The publisher ID is `ca-app-pub-8858320671117320` (part before `~` in app ID)
- The ad slot IDs are just the numbers after the `/` (e.g., `6142924791` from `ca-app-pub-8858320671117320/6142924791`)

### Step 2: Redeploy Frontend

After setting environment variables:

1. Go to Vercel → Your Project → **Deployments** tab
2. Click **"Redeploy"** or trigger a new deployment
3. Wait for deployment to complete

### Step 3: Verify Ads Are Showing

1. Visit your deployed site: `https://nepearn.vercel.app`
2. Go to the **Tasks** page
3. You should see ads displayed:
   - Top of tasks list
   - Inline (every 3rd task)
   - Bottom of tasks list
4. On individual task pages, ads should appear at top, middle, and bottom

---

## 📋 Environment Variables Summary

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | `ca-app-pub-8858320671117320` | Publisher ID from your AdMob app |
| `NEXT_PUBLIC_ADSENSE_SLOT_TASKS_TOP` | `6142924791` | Banner ad for tasks list (top) |
| `NEXT_PUBLIC_ADSENSE_SLOT_TASKS_INLINE` | `6142924791` | Banner ad for tasks list (inline) |
| `NEXT_PUBLIC_ADSENSE_SLOT_TASKS_BOTTOM` | `6142924791` | Banner ad for tasks list (bottom) |
| `NEXT_PUBLIC_ADSENSE_SLOT_TASK_TOP` | `6142924791` | Banner ad for task detail (top) |
| `NEXT_PUBLIC_ADSENSE_SLOT_TASK_MIDDLE` | `6142924791` | Banner ad for task detail (middle) |
| `NEXT_PUBLIC_ADSENSE_SLOT_TASK_BOTTOM` | `6142924791` | Banner ad for task detail (bottom) |

---

## 🔍 How It Works

1. **Publisher ID (Client ID):** This is loaded in `_document.js` and initializes Google AdSense/AdMob
2. **Ad Slot IDs:** These are used in the `AdUnit` components throughout the app
3. **Ad Format:** Currently set to `auto` which automatically adjusts ad size

---

## 💡 Notes

- **Banner vs Rewarded:** Currently using banner ad unit (`6142924791`) for all placements. If you want to use rewarded ads (`6166975524`) for specific placements, you can create separate ad slots.
- **Ad Approval:** It may take 24-48 hours for ads to start showing after AdMob account approval
- **Testing:** In development, you'll see placeholder ads. Real ads appear in production after approval

---

## 🚨 Troubleshooting

### Ads Not Showing?

1. **Check Environment Variables:**
   - Verify all variables are set in Vercel
   - Make sure values are correct (no extra spaces)

2. **Redeploy:**
   - Environment variables only take effect after redeployment
   - Redeploy your frontend on Vercel

3. **Check AdMob Status:**
   - Ensure your AdMob account is approved
   - Check if ad units are active

4. **Browser Console:**
   - Open DevTools (F12) → Console
   - Look for AdSense/AdMob errors

5. **Ad Blockers:**
   - Disable ad blockers to test
   - Some browsers block ads by default

---

## ✅ Quick Checklist

- [ ] Set `NEXT_PUBLIC_ADSENSE_CLIENT_ID` in Vercel
- [ ] Set all ad slot variables in Vercel
- [ ] Redeployed frontend on Vercel
- [ ] Verified ads appear on tasks page
- [ ] Verified ads appear on task detail pages
- [ ] Checked browser console for errors

---

## 📞 Need Help?

If ads still don't show:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify AdMob account is approved
4. Wait 24-48 hours for ad approval

The code is ready - just set the environment variables and redeploy!

