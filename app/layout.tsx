import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  icons: { icon: "/favicon.webp" },
  title: "SPAL — Your AI Business Companion",
  description:
    "SPAL helps small business owners in Africa track spending, spot profits, and grow with confidence. Join the waitlist.",
  openGraph: {
    title: "SPAL — Your AI Business Companion",
    description:
      "Track spending, spot profits, and grow your business with confidence.",
    url: "https://spal.ng",
    siteName: "SPAL",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SPAL — Your AI Business Companion",
    description: "Track spending, spot profits, and grow with confidence.",
  },
  metadataBase: new URL("https://spal.ng"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* DNS prefetch for external CDNs */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Fonts */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        {/*
          ── Preloader CSS + body-lock ────────────────────────────────────────
          Plain <style> — parsed on first byte, before any JS or CDN.
          html.spal-loading hides all body content except the preloader so
          nothing distorted is ever visible. JS in <head> removes the class
          once window "load" fires (all resources ready).
        */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Hide everything except preloader until fully loaded */
          html.spal-loading body > *:not(#spal-preloader) {
            visibility: hidden;
          }

          @keyframes spal-breathe {
            0%, 100% { transform: scale(1);    opacity: 1; }
            50%       { transform: scale(1.08); opacity: 0.7; }
          }

          #spal-preloader {
            position: fixed;
            inset: 0;
            z-index: 99999;
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          #spal-preloader img {
            height: 44px;
            width: auto;
            max-width: 55vw;
            display: block;
            animation: spal-breathe 1.3s ease-in-out infinite;
          }
          #spal-preloader.spal-exit {
            transition: opacity 0.55s cubic-bezier(0.4,0,0.2,1);
            opacity: 0;
            pointer-events: none;
          }

          @keyframes rocket-liftoff {
            0%, 50%, 100% { transform: translateY(0px) rotate(0deg); }
            60%            { transform: translateY(-7px) rotate(-20deg); }
            75%            { transform: translateY(-4px) rotate(-10deg); }
            88%            { transform: translateY(1px) rotate(3deg); }
            95%            { transform: translateY(0px) rotate(0deg); }
          }
          .rocket-anim {
            display: inline-block;
            animation: rocket-liftoff 3.2s ease-in-out infinite;
          }
        `}} />

        {/*
          ── Preloader controller ─────────────────────────────────────────────
          Runs synchronously in <head> — sets spal-loading class immediately,
          then removes preloader only after window "load" (all images + JS done).
        */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            document.documentElement.classList.add('spal-loading');

            // Probe element: Tailwind will set display:none when it processes 'hidden'
            var probe = document.createElement('div');
            probe.className = 'hidden';
            probe.setAttribute('aria-hidden', 'true');
            probe.style.cssText = 'position:absolute;width:1px;height:1px;pointer-events:none;';
            document.documentElement.appendChild(probe);

            var dismissed = false;
            function dismiss() {
              if (dismissed) return;
              dismissed = true;
              var el = document.getElementById('spal-preloader');
              if (probe.parentNode) probe.parentNode.removeChild(probe);
              document.documentElement.classList.remove('spal-loading');
              if (!el) return;
              el.classList.add('spal-exit');
              setTimeout(function() { if (el && el.parentNode) el.parentNode.removeChild(el); }, 650);
            }

            // Poll until Tailwind has applied styles (probe becomes display:none)
            function waitForTailwind() {
              if (window.getComputedStyle(probe).display === 'none') {
                dismiss();
              } else {
                setTimeout(waitForTailwind, 40);
              }
            }

            // Start polling after page load
            function onLoad() {
              waitForTailwind();
            }

            if (document.readyState === 'complete') {
              onLoad();
            } else {
              window.addEventListener('load', onLoad, { once: true });
            }

            // Hard cap — never block more than 8s
            setTimeout(dismiss, 8000);
          })();
        `}} />

        {/* Tailwind v4 CDN */}
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4" async />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <style
          type="text/tailwindcss"
          dangerouslySetInnerHTML={{
            __html: `
              @theme {
                --color-navy: #0F172A;
                --color-cream: #F8F7F4;
                --color-green: #22C55E;
                --color-blue: #2F63F5;
                --color-orange: #F35902;
                --color-purple: #8B5CF6;
                --color-teal: #123332;
                --color-disabled: #E4E4E7;
                --color-muted: #67738F;
                --font-sans: "Satoshi", "Inter Tight", system-ui, sans-serif;
                --font-body: "Inter Tight", system-ui, sans-serif;
              }
            `,
          }}
        />

        {/* Preload critical above-fold images */}
        <link rel="preload" href="/spal-wordmark.webp" as="image" />
        <link rel="preload" href="/phonemockupanddata.webp" as="image" />
      </head>
      <body suppressHydrationWarning>
        <div id="spal-preloader">
          <img src="/spal-wordmark.webp" alt="SPAL" />
        </div>
        {children}
      </body>
    </html>
  );
}
