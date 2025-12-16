import { useEffect, useRef } from 'react';

export default function AdUnit({ 
  adUnitId, // AdMob ad unit ID (full ID like ca-app-pub-XXX/YYY or just YYY)
  adSlot, // Legacy support for AdSense slot format
  adFormat = 'auto',
  className = '',
  style = {}
}) {
  // AdMob App ID (Publisher ID)
  const adMobAppId = process.env.NEXT_PUBLIC_ADMOB_APP_ID || 'ca-app-pub-8858320671117320';
  
  // Determine ad unit ID - prefer adUnitId, fallback to adSlot, or use default
  let finalAdUnitId = adUnitId || adSlot;
  
  // If it's a full AdMob ID (contains /), use it directly
  // If it's just a number, construct the full ID
  if (finalAdUnitId && !finalAdUnitId.includes('/') && !finalAdUnitId.includes('ca-app-pub')) {
    // It's just the ad unit number, construct full ID
    finalAdUnitId = `${adMobAppId}/${finalAdUnitId}`;
  } else if (!finalAdUnitId) {
    // Default fallback
    finalAdUnitId = `${adMobAppId}/6142924791`;
  }
  
  const adRef = useRef(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!finalAdUnitId || typeof window === 'undefined') {
      console.warn('AdUnit: Missing config', { 
        finalAdUnitId: !!finalAdUnitId,
        hasWindow: typeof window !== 'undefined'
      });
      return;
    }

    // Initialize AdMob SDK if not already initialized
    if (!window.adsbygoogle) {
      window.adsbygoogle = window.adsbygoogle || [];
    }

    // Wait for AdMob script to load and DOM element to be ready
    let attempts = 0;
    const maxAttempts = 100; // 10 seconds max wait
    
    const checkAdMob = setInterval(() => {
      attempts++;
      
      // Check if AdMob script is loaded
      const scriptLoaded = typeof window.adsbygoogle !== 'undefined' && 
                          window.adsbygoogle && 
                          window.adsbygoogle.loaded !== false;
      
      if (scriptLoaded && adRef.current && !pushedRef.current) {
        try {
          // Push the AdMob ad configuration
          window.adsbygoogle.push({});
          pushedRef.current = true;
          clearInterval(checkAdMob);
          console.log('✅ AdUnit: AdMob ad pushed successfully', { 
            adUnitId: finalAdUnitId.substring(finalAdUnitId.lastIndexOf('/') + 1),
            fullId: finalAdUnitId.substring(0, 30) + '...'
          });
        } catch (error) {
          console.error('❌ AdMob push error:', error);
          clearInterval(checkAdMob);
        }
      } else if (attempts >= maxAttempts) {
        console.warn('⚠️ AdUnit: Timeout waiting for AdMob SDK', {
          attempts,
          scriptLoaded,
          hasElement: !!adRef.current,
          adUnitId: finalAdUnitId,
          adsbygoogleExists: typeof window.adsbygoogle !== 'undefined'
        });
        clearInterval(checkAdMob);
      }
    }, 100);

    // Cleanup
    return () => {
      clearInterval(checkAdMob);
    };
  }, [finalAdUnitId]);

  if (!finalAdUnitId) {
    // Show placeholder if ads not configured
    return (
      <div className={className} style={style}>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-center" style={{ minHeight: '100px' }}>
          <p className="text-slate-400 text-sm">📢 Advertisement</p>
          <p className="text-slate-500 text-xs mt-1">
            AdMob ad unit ID missing. Configure NEXT_PUBLIC_ADMOB_APP_ID or pass adUnitId prop.
          </p>
        </div>
      </div>
    );
  }

  // Extract ad unit number from full ID for data-ad-slot
  const adUnitNumber = finalAdUnitId.includes('/') 
    ? finalAdUnitId.split('/')[1] 
    : finalAdUnitId;

  return (
    <div className={`my-4 ${className}`} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center', minHeight: '100px' }}
        data-ad-client={adMobAppId}
        data-ad-slot={adUnitNumber}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}

