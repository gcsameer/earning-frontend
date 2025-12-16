// API route to serve APK file
// This redirects to the APK download URL
// Set APK_DOWNLOAD_URL in Vercel environment variables

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get APK URL from environment variable
  // Priority: NEXT_PUBLIC_APK_DOWNLOAD_URL > APK_DOWNLOAD_URL > public folder
  const apkUrl = 
    process.env.NEXT_PUBLIC_APK_DOWNLOAD_URL || 
    process.env.APK_DOWNLOAD_URL || 
    '/nep-earn.apk'; // Fallback to public folder

  // If it's a relative path (starts with /), it's from public folder
  // Otherwise, it's an external URL - redirect to it
  if (apkUrl.startsWith('/')) {
    // Serve from public folder
    return res.redirect(307, apkUrl);
  } else {
    // Redirect to external URL
    return res.redirect(307, apkUrl);
  }
}

