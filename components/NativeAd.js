import { useEffect, useRef } from 'react';

/**
 * Native Advanced Ad Component
 * Ad Unit ID: ca-app-pub-8858320671117320/3814777375
 */
export default function NativeAd({ 
  className = '', 
  style = {} 
}) {
  const adRef = useRef(null);
  const pushedRef = useRef(false);
  const adMobAppId = process.env.NEXT_PUBLIC_ADMOB_APP_ID || 'ca-app-pub-8858320671117320';
  const adUnitId = process.env.NEXT_PUBLIC_ADMOB_NATIVE_AD_UNIT || '3814777375'; // Native Advanced ad unit ID
  const fullAdUnitId = `${adMobAppId}/${adUnitId}`;

  useEffect(() => {
    if (!adMobAppId || !adUnitId || typeof window === 'undefined') {
      console.warn('NativeAd: Missing config', { 
        adMobAppId: !!adMobAppId, 
        adUnitId: !!adUnitId,
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
          // Push the AdMob native ad configuration
          window.adsbygoogle.push({});
          pushedRef.current = true;
          clearInterval(checkAdMob);
          console.log('✅ NativeAd: AdMob native ad pushed successfully', { 
            adUnitId,
            fullId: fullAdUnitId.substring(0, 30) + '...'
          });
        } catch (error) {
          console.error('❌ NativeAd AdMob push error:', error);
          clearInterval(checkAdMob);
        }
      } else if (attempts >= maxAttempts) {
        console.warn('⚠️ NativeAd: Timeout waiting for AdMob SDK', {
          attempts,
          scriptLoaded,
          hasElement: !!adRef.current,
          adUnitId,
          adsbygoogleExists: typeof window.adsbygoogle !== 'undefined'
        });
        clearInterval(checkAdMob);
      }
    }, 100);

    // Cleanup
    return () => {
      clearInterval(checkAdMob);
    };
  }, [adMobAppId, adUnitId, fullAdUnitId]);

  if (!adMobAppId || !adUnitId) {
    return (
      <div className={className} style={style}>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-center" style={{ minHeight: '100px' }}>
          <p className="text-slate-400 text-sm">📢 Native Advertisement</p>
          <p className="text-slate-500 text-xs mt-1">AdMob native ad unit not configured</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`my-4 ${className}`} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ 
          display: 'block', 
          textAlign: 'center', 
          minHeight: '100px' 
        }}
        data-ad-client={adMobAppId}
        data-ad-slot={adUnitId}
        data-ad-format="native"
        data-full-width-responsive="true"
      />
    </div>
  );
}

