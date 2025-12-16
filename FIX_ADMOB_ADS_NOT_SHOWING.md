# 🔧 Fix: AdMob/AdSense Ads Not Showing

## 🚨 Common Issues & Solutions

### Issue 1: Environment Variables Not Set

**Symptom:** Placeholders showing instead of ads

**Solution:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add these variables:
   ```
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-8858320671117320
   NEXT_PUBLIC_ADSENSE_SLOT_TASKS_TOP=6142924791
   NEXT_PUBLIC_ADSENSE_SLOT_TASKS_INLINE=6142924791
   NEXT_PUBLIC_ADSENSE_SLOT_TASKS_BOTTOM=6142924791
   NEXT_PUBLIC_ADSENSE_SLOT_TASK_TOP=6142924791
   NEXT_PUBLIC_ADSENSE_SLOT_TASK_MIDDLE=6142924791
   NEXT_PUBLIC_ADSENSE_SLOT_TASK_BOTTOM=6142924791
   ```
3. Redeploy your site

---

### Issue 2: AdSense Account Not Approved

**Symptom:** Script loads but no ads appear

**Solution:**
- New AdSense accounts take 24-48 hours to get approved
- Check your AdSense dashboard for approval status
- Make sure your site is verified in AdSense

---

### Issue 3: Ad Blockers

**Symptom:** Ads don't show even when everything is configured

**Solution:**
- Disable ad blockers (uBlock Origin, AdBlock Plus, etc.)
- Test in incognito mode
- Check browser extensions

---

### Issue 4: AdSense Script Not Loading

**Symptom:** Console shows "adsbygoogle is not defined"

**Solution:**
- Check if script is in `_document.js` (it is ✅)
- Check browser console for script loading errors
- Verify script URL is correct

---

### Issue 5: Wrong Ad Slot Format

**Symptom:** Ads show but are empty

**Solution:**
- Ad slots should be just the number (e.g., `6142924791`)
- NOT the full ID (e.g., NOT `ca-app-pub-8858320671117320/6142924791`)

---

## 🔍 Debugging Steps

### Step 1: Check Environment Variables

Visit: `https://your-site.vercel.app/test-ads`

This page shows:
- ✅ Which env vars are set
- ✅ AdSense script status
- ✅ Test ad display

### Step 2: Check Browser Console

1. Open DevTools (F12)
2. Go to Console tab
3. Look for:
   - `AdUnit: Ad pushed successfully` ✅ Good
   - `AdUnit: Missing config` ❌ Env vars missing
   - `AdSense push error` ❌ Script issue
   - `Timeout waiting for AdSense` ❌ Script not loaded

### Step 3: Check Network Tab

1. Open DevTools → Network tab
2. Filter by "adsbygoogle"
3. Check if script loads (status 200 ✅)

### Step 4: Check AdSense Dashboard

1. Go to https://www.google.com/adsense
2. Check account status
3. Check if ads are enabled
4. Check for any warnings/errors

---

## ✅ Quick Fix Checklist

- [ ] Environment variables set in Vercel
- [ ] Site redeployed after setting env vars
- [ ] AdSense account approved
- [ ] Ad blockers disabled
- [ ] Browser console checked (no errors)
- [ ] Test page visited (`/test-ads`)
- [ ] Hard refresh (Ctrl+Shift+R)

---

## 🚀 Immediate Actions

1. **Set Environment Variables** (if not done)
2. **Redeploy** your site
3. **Wait 24-48 hours** if AdSense account is new
4. **Test** on `/test-ads` page
5. **Check** browser console for errors

---

## 📞 Still Not Working?

If ads still don't show after all steps:

1. **Check AdSense Dashboard:**
   - Account status
   - Site verification
   - Ad unit status

2. **Check Vercel Logs:**
   - Deployment logs
   - Runtime logs

3. **Test Different Browsers:**
   - Chrome
   - Firefox
   - Edge

4. **Check Mobile:**
   - Test on actual mobile device
   - Not just browser dev tools

---

**Most common issue: Environment variables not set or AdSense account pending approval!**

