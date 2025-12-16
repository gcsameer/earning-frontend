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
    if (!adClientId || !adSlot || typeof window === 'undefined') {
      console.warn('AdUnit: Missing config', { 
        adClientId: !!adClientId, 
        adSlot: !!adSlot,
        hasWindow: typeof window !== 'undefined'
      });
      return;
    }

    // Initialize adsbygoogle if not already initialized
    if (!window.adsbygoogle) {
      window.adsbygoogle = window.adsbygoogle || [];
    }

    // Wait for AdSense script to load and DOM element to be ready
    let attempts = 0;
    const maxAttempts = 100; // 10 seconds max wait (increased for slower connections)
    
    const checkAdSense = setInterval(() => {
      attempts++;
      
      // Check if AdSense script is loaded
      const scriptLoaded = typeof window.adsbygoogle !== 'undefined' && 
                          window.adsbygoogle && 
                          window.adsbygoogle.loaded !== false;
      
      if (scriptLoaded && adRef.current && !pushedRef.current) {
        try {
          // Push the ad configuration
          window.adsbygoogle.push({});
          pushedRef.current = true;
          clearInterval(checkAdSense);
          console.log('✅ AdUnit: Ad pushed successfully', { 
            adSlot,
            adClientId: adClientId.substring(0, 20) + '...'
          });
        } catch (error) {
          console.error('❌ AdSense push error:', error);
          clearInterval(checkAdSense);
        }
      } else if (attempts >= maxAttempts) {
        console.warn('⚠️ AdUnit: Timeout waiting for AdSense', {
          attempts,
          scriptLoaded,
          hasElement: !!adRef.current,
          adSlot,
          adsbygoogleExists: typeof window.adsbygoogle !== 'undefined'
        });
        clearInterval(checkAdSense);
      }
    }, 100);

    // Cleanup
    return () => {
      clearInterval(checkAdSense);
    };
  }, [adClientId, adSlot]);

  if (!adClientId || !adSlot) {
    // Show placeholder if ads not configured
    if (process.env.NODE_ENV === 'development') {
      console.warn('AdUnit: Missing configuration', {
        adClientId: !!adClientId, 
        adSlot: !!adSlot,
        envClientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
        envSlot: adSlot 
      });
    }
    return (
      <div className={className} style={style}>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-center" style={{ minHeight: '100px' }}>
          <p className="text-slate-400 text-sm">📢 Advertisement</p>
          <p className="text-slate-500 text-xs mt-1">
            {!adClientId ? 'Client ID missing' : !adSlot ? 'Ad slot missing' : 'Configure AdSense in environment variables'}
          </p>
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

