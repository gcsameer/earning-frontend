import { useEffect } from 'react';

export default function BannerAd() {
  useEffect(() => {
    // Initialize banner ad - IFRAME SYNC format
    if (typeof window !== 'undefined') {
      // Set ad options
      window.atOptions = {
        'key': 'f95e90ae2ce3155b8c8580bc90c4238f',
        'format': 'iframe',
        'height': 60,
        'width': 468,
        'params': {}
      };

      // Load the ad script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.profitablecreativeformat.com/f95e90ae2ce3155b8c8580bc90c4238f/invoke.js`;
      script.async = true;
      script.charset = 'utf-8';
      
      // Append script to body
      document.body.appendChild(script);

      // Cleanup
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, []);

  // Return a container div for the ad
  return (
    <div 
      className="flex justify-center my-4"
      style={{
        width: '100%',
        maxWidth: '468px',
        height: '60px',
        margin: '0 auto'
      }}
    />
  );
}

