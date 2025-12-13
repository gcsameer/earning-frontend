# Frontend Environment Variables

Copy this to `.env.local` for local development. For production, set in Vercel.

```bash
# API Configuration
# Set this to your backend URL (without /api at the end)
# Example: https://earning-backend-production.up.railway.app
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Google AdSense Configuration (Optional)
# Get these from https://www.google.com/adsense
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_SLOT_TASKS_TOP=1234567890
NEXT_PUBLIC_ADSENSE_SLOT_TASKS_INLINE=1234567891
NEXT_PUBLIC_ADSENSE_SLOT_TASKS_BOTTOM=1234567892
NEXT_PUBLIC_ADSENSE_SLOT_TASK_TOP=1234567893
NEXT_PUBLIC_ADSENSE_SLOT_TASK_MIDDLE=1234567894
NEXT_PUBLIC_ADSENSE_SLOT_TASK_BOTTOM=1234567895
```

