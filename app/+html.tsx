import { ScrollViewStyleReset } from "expo-router/html";
import React from "react";

const preloaderStyles = `
  #wortadler-preloader {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(160deg, #1E40AF 0%, #2563EB 50%, #3B82F6 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9998;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  }
  #wortadler-preloader-eagle {
    font-size: 72px;
    line-height: 1;
    margin-bottom: 16px;
  }
  #wortadler-preloader-title {
    color: rgba(255, 255, 255, 0.95);
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 6px;
  }
  #wortadler-preloader-tagline {
    color: rgba(255, 255, 255, 0.65);
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.3px;
  }
`;

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: preloaderStyles }} />
      </head>
      <body>
        {children}
        <div id="wortadler-preloader">
          <div id="wortadler-preloader-eagle">🦅</div>
          <div id="wortadler-preloader-title">WortAdler</div>
          <div id="wortadler-preloader-tagline">Jeden Tag 10 neue Wörter</div>
        </div>
      </body>
    </html>
  );
}
