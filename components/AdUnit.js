import { useEffect, useRef } from 'react';

export default function AdUnit({ 
  adSlot, 
  adFormat = 'auto',
  className = '',
  style = {}
}) {
  // Use environment variable or fallback to hardcoded client ID (already in _document.js)
  const adClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-8858320671117320';
  const adRef = useRef(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!adClientId || !adSlot || typeof window === 'undefined') return;

    // Wait for AdSense script to load
    const checkAdSense = setInterval(() => {
      if (window.adsbygoogle && adRef.current && !pushedRef.current) {
        try {
          window.adsbygoogle.push({});
          pushedRef.current = true;
          clearInterval(checkAdSense);
        } catch (error) {
          console.error('AdSense push error:', error);
        }
      }
    }, 100);

    // Cleanup
    return () => {
      clearInterval(checkAdSense);
    };
  }, [adClientId, adSlot]);

  if (!adClientId || !adSlot) {
    // Show placeholder if ads not configured
    return (
      <div className={className} style={style}>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-center" style={{ minHeight: '100px' }}>
          <p className="text-slate-400 text-sm">📢 Advertisement</p>
          <p className="text-slate-500 text-xs mt-1">Configure AdSense in environment variables</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`my-4 ${className}`} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center', minHeight: '100px' }}
        data-ad-client={adClientId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}

