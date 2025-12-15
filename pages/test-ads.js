import { useEffect, useState } from 'react';
import AdUnit from '../components/AdUnit';

export default function TestAds() {
  const [envVars, setEnvVars] = useState({});

  useEffect(() => {
    // Check environment variables
    setEnvVars({
      clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'NOT SET',
      slotTasksTop: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TASKS_TOP || 'NOT SET',
      slotTasksInline: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TASKS_INLINE || 'NOT SET',
      slotTasksBottom: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TASKS_BOTTOM || 'NOT SET',
      slotTaskTop: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TASK_TOP || 'NOT SET',
      slotTaskMiddle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TASK_MIDDLE || 'NOT SET',
      slotTaskBottom: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TASK_BOTTOM || 'NOT SET',
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">AdSense Configuration Test</h1>
      
      <div className="card mb-6">
        <h2 className="text-lg font-semibold mb-4">Environment Variables Status</h2>
        <div className="space-y-2">
          {Object.entries(envVars).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center p-2 bg-slate-800/50 rounded">
              <span className="text-sm font-mono">{key}:</span>
              <span className={`text-sm ${value === 'NOT SET' ? 'text-red-400' : 'text-green-400'}`}>
                {value === 'NOT SET' ? '❌ NOT SET' : `✅ ${value}`}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="card mb-6">
        <h2 className="text-lg font-semibold mb-4">AdSense Script Status</h2>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 bg-slate-800/50 rounded">
            <span className="text-sm">AdSense Script Loaded:</span>
            <span className="text-sm" id="script-status">
              {typeof window !== 'undefined' && window.adsbygoogle ? '✅ Yes' : '❌ No'}
            </span>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Test Ad Display</h2>
        <p className="text-sm text-slate-400 mb-4">
          If environment variables are set, you should see an ad below. If not, you'll see a placeholder.
        </p>
        <AdUnit 
          adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TASKS_TOP}
          className="mb-4"
        />
      </div>

      <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <h3 className="font-semibold mb-2">⚠️ Troubleshooting</h3>
        <ul className="text-sm space-y-1 text-slate-300">
          <li>• If variables show "NOT SET", add them in Vercel → Settings → Environment Variables</li>
          <li>• After adding variables, redeploy your site</li>
          <li>• Open browser console (F12) to see detailed ad loading messages</li>
          <li>• Disable ad blockers to test</li>
          <li>• New AdSense accounts may take 24-48 hours for ads to show</li>
        </ul>
      </div>
    </div>
  );
}

