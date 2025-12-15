# 🔍 Check Why Ads Aren't Showing

## Step 1: Test Page

I've created a test page to check your configuration:

**Visit:** `https://nepearn.vercel.app/test-ads`

This page will show:
- ✅ Which environment variables are set
- ✅ If AdSense script is loaded
- ✅ Test ad display

## Step 2: Check Browser Console

1. Open your site: `https://nepearn.vercel.app/tasks`
2. Press **F12** to open DevTools
3. Go to **Console** tab
4. Look for messages like:
   - `AdUnit: Missing config` - Variables not set
   - `AdUnit: Ad pushed successfully` - Ad is loading
   - `AdSense push error` - There's an error

## Step 3: Verify Variables in Vercel

1. Go to: https://vercel.com/dashboard
2. Your Project → **Settings** → **Environment Variables**
3. Check that all 7 variables are there:
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
   - `NEXT_PUBLIC_ADSENSE_SLOT_TASKS_TOP`
   - `NEXT_PUBLIC_ADSENSE_SLOT_TASKS_INLINE`
   - `NEXT_PUBLIC_ADSENSE_SLOT_TASKS_BOTTOM`
   - `NEXT_PUBLIC_ADSENSE_SLOT_TASK_TOP`
   - `NEXT_PUBLIC_ADSENSE_SLOT_TASK_MIDDLE`
   - `NEXT_PUBLIC_ADSENSE_SLOT_TASK_BOTTOM`

4. Make sure they're enabled for **Production** environment

## Step 4: Redeploy (IMPORTANT!)

After adding/changing variables:
1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete

**Variables only work after redeployment!**

## Step 5: Common Issues

### Issue 1: Variables Show "NOT SET"
- **Fix:** Add variables in Vercel and redeploy

### Issue 2: AdSense Script Not Loaded
- **Fix:** Check if AdSense account is approved
- **Fix:** Check browser console for script loading errors

### Issue 3: Ads Still Not Showing
- **Fix:** Wait 24-48 hours if AdSense account is new
- **Fix:** Disable ad blockers
- **Fix:** Check AdSense dashboard for account status

## ✅ Quick Checklist

- [ ] All 7 variables added in Vercel
- [ ] Variables enabled for Production
- [ ] Site redeployed after adding variables
- [ ] Test page shows variables are set
- [ ] Browser console shows no errors
- [ ] Ad blockers disabled
- [ ] AdSense account approved (check dashboard)

---

**Use the test page to see exactly what's wrong!** 🎯

