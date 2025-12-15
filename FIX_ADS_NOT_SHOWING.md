# 🔧 Fix: AdSense/AdMob Ads Not Showing

## Problem
Ads are showing placeholders instead of real ads because environment variables are not set on Vercel.

## ✅ Solution: Set Environment Variables on Vercel

### Step 1: Go to Vercel Dashboard

1. Visit: https://vercel.com/dashboard
2. Find and click on your **NepEarn** project
3. Go to **Settings** → **Environment Variables**

### Step 2: Add These 7 Environment Variables

Click **"Add New"** and add each variable:

#### Variable 1: Client ID (Required)
- **Name:** `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
- **Value:** `ca-app-pub-8858320671117320`
- **Environment:** Select **All** (Production, Preview, Development)

#### Variable 2: Tasks Top Ad
- **Name:** `NEXT_PUBLIC_ADSENSE_SLOT_TASKS_TOP`
- **Value:** `6142924791`
- **Environment:** Select **All**

#### Variable 3: Tasks Inline Ad
- **Name:** `NEXT_PUBLIC_ADSENSE_SLOT_TASKS_INLINE`
- **Value:** `6142924791`
- **Environment:** Select **All**

#### Variable 4: Tasks Bottom Ad
- **Name:** `NEXT_PUBLIC_ADSENSE_SLOT_TASKS_BOTTOM`
- **Value:** `6142924791`
- **Environment:** Select **All**

#### Variable 5: Task Detail Top Ad
- **Name:** `NEXT_PUBLIC_ADSENSE_SLOT_TASK_TOP`
- **Value:** `6142924791`
- **Environment:** Select **All**

#### Variable 6: Task Detail Middle Ad
- **Name:** `NEXT_PUBLIC_ADSENSE_SLOT_TASK_MIDDLE`
- **Value:** `6142924791`
- **Environment:** Select **All**

#### Variable 7: Task Detail Bottom Ad
- **Name:** `NEXT_PUBLIC_ADSENSE_SLOT_TASK_BOTTOM`
- **Value:** `6142924791`
- **Environment:** Select **All**

### Step 3: Save and Redeploy

1. After adding all 7 variables, click **"Save"**
2. Go to **Deployments** tab
3. Click the **"..."** menu on the latest deployment
4. Click **"Redeploy"**
5. Wait for deployment to complete (2-5 minutes)

### Step 4: Verify Ads Are Showing

1. Visit: `https://nepearn.vercel.app/tasks`
2. You should see real ads instead of placeholders!

## 📋 Quick Copy-Paste List

Here are all variables in one place for easy copy:

```
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-app-pub-8858320671117320
NEXT_PUBLIC_ADSENSE_SLOT_TASKS_TOP=6142924791
NEXT_PUBLIC_ADSENSE_SLOT_TASKS_INLINE=6142924791
NEXT_PUBLIC_ADSENSE_SLOT_TASKS_BOTTOM=6142924791
NEXT_PUBLIC_ADSENSE_SLOT_TASK_TOP=6142924791
NEXT_PUBLIC_ADSENSE_SLOT_TASK_MIDDLE=6142924791
NEXT_PUBLIC_ADSENSE_SLOT_TASK_BOTTOM=6142924791
```

## ⚠️ Important Notes

1. **Redeploy Required:** Environment variables only take effect after redeployment
2. **Ad Approval:** If your AdSense account is new, it may take 24-48 hours for ads to show
3. **Ad Blockers:** Disable ad blockers to test ads
4. **Case Sensitive:** Variable names are case-sensitive - copy exactly as shown

## 🔍 Troubleshooting

### Still Seeing Placeholders?

1. **Check Variables:** Verify all 7 variables are set in Vercel
2. **Redeploy:** Make sure you redeployed after adding variables
3. **Wait:** New AdSense accounts may take 24-48 hours for ads to show
4. **Browser Console:** Open DevTools (F12) → Console, look for AdSense errors
5. **Check AdSense Dashboard:** Ensure your site is verified and approved

### Check if Variables Are Set

1. Go to Vercel → Your Project → Settings → Environment Variables
2. You should see all 7 variables listed
3. Make sure they're enabled for **Production** environment

## ✅ After Setup

Once variables are set and site is redeployed:
- ✅ Real ads will show on Tasks page (top, inline, bottom)
- ✅ Real ads will show on individual task pages (top, middle, bottom)
- ✅ Ads will be responsive and mobile-friendly
- ✅ Ads will work on both web (AdSense) and mobile (AdMob)

---

**Follow these steps and your ads will show!** 🎉

