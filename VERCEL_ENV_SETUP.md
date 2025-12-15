# ⚡ Quick Setup: Add AdSense Variables to Vercel

## 🎯 Goal
Make real ads show instead of placeholders.

## 📝 Steps

### 1. Open Vercel Dashboard
- Go to: https://vercel.com/dashboard
- Click your **NepEarn** project

### 2. Add Environment Variables
- Click **Settings** → **Environment Variables**
- Click **"Add New"** button
- Add these **7 variables**:

| Variable Name | Value | Environment |
|-------------|-------|-------------|
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | `ca-app-pub-8858320671117320` | All |
| `NEXT_PUBLIC_ADSENSE_SLOT_TASKS_TOP` | `6142924791` | All |
| `NEXT_PUBLIC_ADSENSE_SLOT_TASKS_INLINE` | `6142924791` | All |
| `NEXT_PUBLIC_ADSENSE_SLOT_TASKS_BOTTOM` | `6142924791` | All |
| `NEXT_PUBLIC_ADSENSE_SLOT_TASK_TOP` | `6142924791` | All |
| `NEXT_PUBLIC_ADSENSE_SLOT_TASK_MIDDLE` | `6142924791` | All |
| `NEXT_PUBLIC_ADSENSE_SLOT_TASK_BOTTOM` | `6142924791` | All |

### 3. Redeploy
- Go to **Deployments** tab
- Click **"..."** on latest deployment
- Click **"Redeploy"**
- Wait 2-5 minutes

### 4. Check Your Site
- Visit: `https://nepearn.vercel.app/tasks`
- Real ads should now show! ✅

## ⚠️ Remember
- **Redeploy is required** - variables only work after redeployment
- **Ad approval** - New AdSense accounts may take 24-48 hours
- **Ad blockers** - Disable to test ads

---

**That's it! Your ads will show after redeployment.** 🚀

