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
  const adClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-8858320671117320';
  const adUnitId = '3814777375'; // Native Advanced ad unit ID

  useEffect(() => {
    if (!adClientId || !adUnitId || typeof window === 'undefined') return;

    // Initialize adsbygoogle if not already initialized
    if (!window.adsbygoogle) {
      window.adsbygoogle = window.adsbygoogle || [];
    }

    // Wait for AdSense script to load and DOM element to be ready
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max wait
    
    const checkAdSense = setInterval(() => {
      attempts++;
      
      if (window.adsbygoogle && adRef.current && !pushedRef.current) {
        try {
          // Push the native ad configuration
          window.adsbygoogle.push({});
          pushedRef.current = true;
          clearInterval(checkAdSense);
          console.log('NativeAd: Ad pushed successfully', { adUnitId });
        } catch (error) {
          console.error('NativeAd push error:', error);
          clearInterval(checkAdSense);
        }
      } else if (attempts >= maxAttempts) {
        console.warn('NativeAd: Timeout waiting for AdSense', { 
          hasScript: !!window.adsbygoogle, 
          hasElement: !!adRef.current,
          adUnitId 
        });
        clearInterval(checkAdSense);
      }
    }, 100);

    // Cleanup
    return () => {
      clearInterval(checkAdSense);
    };
  }, [adClientId, adUnitId]);

  if (!adClientId || !adUnitId) {
    return (
      <div className={className} style={style}>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-center" style={{ minHeight: '100px' }}>
          <p className="text-slate-400 text-sm">📢 Native Advertisement</p>
          <p className="text-slate-500 text-xs mt-1">Native ad unit not configured</p>
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
        data-ad-client={adClientId}
        data-ad-slot={adUnitId}
        data-ad-format="native"
        data-full-width-responsive="true"
      />
    </div>
  );
}

