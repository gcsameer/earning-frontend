import { useEffect, useRef } from 'react';

export default function AdBanner({ 
  adSlot, 
  adFormat = 'auto',
  style = {},
  className = '',
  fullWidthResponsive = true 
}) {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adSlot || typeof window === 'undefined') return;

    try {
      // Initialize Google AdSense
      if (!window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }

      // Push ad configuration
      if (adRef.current && !adRef.current.hasAttribute('data-adsbygoogle-status')) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, [adSlot]);

  // If no ad slot provided, show placeholder
  if (!adSlot) {
    return (
      <div 
        className={`bg-slate-800 border border-slate-700 rounded-lg p-4 text-center ${className}`}
        style={{ minHeight: '100px', ...style }}
      >
        <p className="text-slate-400 text-sm">Ad Space</p>
        <p className="text-slate-500 text-xs mt-1">Configure ad slot in environment variables</p>
      </div>
    );
  }

  return (
    <div className={`ad-container ${className}`} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          ...(fullWidthResponsive ? {} : { width: '100%', height: '100px' })
        }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  );
}

