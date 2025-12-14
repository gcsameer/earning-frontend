# Frontend Environment Variables

Copy this to `.env.local` for local development. For production, set in Vercel.

```bash
# API Configuration
# Set this to your backend URL (without /api at the end)
# Example: https://earning-backend-production.up.railway.app
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Google AdSense/AdMob Configuration
# App ID: ca-app-pub-8858320671117320~8435057976
# Publisher ID (extracted from app ID): ca-app-pub-8858320671117320
# Banner Ad Unit: ca-app-pub-8858320671117320/6142924791
# Rewarded Ad Unit: ca-app-pub-8858320671117320/6166975524

# Publisher ID (Client ID) - Extract from your AdMob app ID (part before ~)
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-app-pub-8858320671117320

# Ad Slot IDs - Use your AdMob ad unit IDs
# Banner ad for tasks list page (top)
NEXT_PUBLIC_ADSENSE_SLOT_TASKS_TOP=6142924791
# Banner ad for tasks list page (inline - every 3rd task)
NEXT_PUBLIC_ADSENSE_SLOT_TASKS_INLINE=6142924791
# Banner ad for tasks list page (bottom)
NEXT_PUBLIC_ADSENSE_SLOT_TASKS_BOTTOM=6142924791
# Banner ad for individual task page (top)
NEXT_PUBLIC_ADSENSE_SLOT_TASK_TOP=6142924791
# Banner ad for individual task page (middle)
NEXT_PUBLIC_ADSENSE_SLOT_TASK_MIDDLE=6142924791
# Banner ad for individual task page (bottom)
NEXT_PUBLIC_ADSENSE_SLOT_TASK_BOTTOM=6142924791
```

