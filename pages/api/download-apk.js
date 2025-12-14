// API route to serve APK file
// This redirects to the APK download URL
// Set APK_DOWNLOAD_URL in Vercel environment variables

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get APK URL from environment variable or use default
  // In production, set APK_DOWNLOAD_URL in Vercel to your hosted APK
  const apkUrl = process.env.APK_DOWNLOAD_URL || 
    'https://your-cdn-url.com/nep-earn.apk' ||
    '/nep-earn.apk'; // Fallback to public folder

  // Redirect to APK URL
  return res.redirect(307, apkUrl);
}

