import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const adClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#10b981" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="NepEarn" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        
        {/* Google AdMob SDK Script - For Web */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-app-pub-8858320671117320"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (window.adsbygoogle = window.adsbygoogle || []).push({});
            `
          }}
        />
        
        {/* Block any third-party ad scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Block third-party ad scripts
                const blockedDomains = [
                  'popunder', 'popads', 'propellerads', 'adsterra', 'adskeeper',
                  'socialbar', 'smartlink', 'guide', 'clickadu', 'adcash',
                  'exoclick', 'trafficjunky', 'juicyads', 'buysellads'
                ];
                
                // Override document.createElement to block ad scripts
                const originalCreateElement = document.createElement;
                document.createElement = function(tagName, options) {
                  const element = originalCreateElement.call(this, tagName, options);
                  
                  if (tagName.toLowerCase() === 'script' && element.src) {
                    const src = element.src.toLowerCase();
                    const isBlocked = blockedDomains.some(domain => src.includes(domain));
                    const isAdSense = src.includes('googlesyndication.com') || src.includes('adsbygoogle');
                    
                    if (isBlocked && !isAdSense) {
                      console.warn('Blocked third-party ad script:', src);
                      return null;
                    }
                  }
                  
                  return element;
                };
                
                // Block window.open for popunder ads
                const originalOpen = window.open;
                window.open = function(url, target, features) {
                  if (url && blockedDomains.some(domain => url.toLowerCase().includes(domain))) {
                    console.warn('Blocked popunder ad:', url);
                    return null;
                  }
                  return originalOpen.call(this, url, target, features);
                };
              })();
            `
          }}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
