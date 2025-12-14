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
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        
        {/* Google AdSense Verification Code */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8858320671117320"
          crossOrigin="anonymous"
        />
        
        {/* Popunder Ad Script */}
        <script
          type="text/javascript"
          src="https://pl28256955.effectivegatecpm.com/b6/c0/98/b6c09889dcd3808e4126d8d064809950.js"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
        
        {/* Social Bar Ad Script - Inserted right above closing </body> tag */}
        <script
          type="text/javascript"
          src="https://pl28257064.effectivegatecpm.com/15/a5/91/15a591978053246df851ce2d41581e3d.js"
        />
        
        {/* Guide Ad Script */}
        <script
          async="async"
          data-cfasync="false"
          src="https://pl28257067.effectivegatecpm.com/83a22a512cd440cc0f5cb139c22e9880/invoke.js"
        />
        <div id="container-83a22a512cd440cc0f5cb139c22e9880"></div>
      </body>
    </Html>
  );
}
