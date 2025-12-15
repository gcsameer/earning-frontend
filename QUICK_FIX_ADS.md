# ⚡ Quick Fix: Ads Not Showing

## Problem
Ads show placeholders because environment variables are missing on Vercel.

## ✅ Solution (5 Minutes)

### Step 1: Go to Vercel
1. Visit: https://vercel.com/dashboard
2. Click your **NepEarn** project
3. Go to **Settings** → **Environment Variables**

### Step 2: Add These 7 Variables

Click **"Add New"** for each:

| Variable Name | Value |
|--------------|-------|
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | `ca-app-pub-8858320671117320` |
| `NEXT_PUBLIC_ADSENSE_SLOT_TASKS_TOP` | `6142924791` |
| `NEXT_PUBLIC_ADSENSE_SLOT_TASKS_INLINE` | `6142924791` |
| `NEXT_PUBLIC_ADSENSE_SLOT_TASKS_BOTTOM` | `6142924791` |
| `NEXT_PUBLIC_ADSENSE_SLOT_TASK_TOP` | `6142924791` |
| `NEXT_PUBLIC_ADSENSE_SLOT_TASK_MIDDLE` | `6142924791` |
| `NEXT_PUBLIC_ADSENSE_SLOT_TASK_BOTTOM` | `6142924791` |

**Important:** Select **"All"** environments for each variable.

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait 2-5 minutes

### Step 4: Check Your Site
Visit: `https://nepearn.vercel.app/tasks`

Real ads should now show! ✅

## ⚠️ Notes
- **Redeploy is required** - variables only work after redeployment
- **Ad approval** - New AdSense accounts may take 24-48 hours
- **Ad blockers** - Disable to test ads

---

**That's it! Your ads will show after redeployment.** 🎉

