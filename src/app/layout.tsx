import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BNB Verify - Secure Asset Verification",
  description: "Verify your BNB Chain assets securely and efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <head>
        {/* <Script id="disable-devtools" strategy="beforeInteractive">
          {`
            (function() {
              function disable() {
                // Disable right-click
                document.addEventListener('contextmenu', e => e.preventDefault(), true);

                // Disable keyboard shortcuts
                document.addEventListener('keydown', function(e) {
                  const keys = [
                    'F12',
                    'I', 'J', 'C', 'U', // For Ctrl/Cmd combinations
                    'S', // Save page
                    'H', // History
                    'E', // Dev tools in Firefox
                    'K', // Web console
                    'Q', // Quick source viewer
                  ];
                  
                  if (
                    e.key === 'F12' ||
                    ((e.ctrlKey || e.metaKey) && keys.includes(e.key)) ||
                    ((e.ctrlKey || e.metaKey) && e.shiftKey && keys.includes(e.key)) ||
                    ((e.metaKey || e.altKey) && keys.includes(e.key.toLowerCase()))
                  ) {
                    e.stopPropagation();
                    e.preventDefault();
                    return false;
                  }
                }, true);

                // Clear console and override methods
                function clearConsole() {
                  console.clear();
                  const noop = () => undefined;
                  ['log','debug','info','warn','error','assert','dir','dirxml',
                   'group','groupEnd','time','timeEnd','count','trace','profile',
                   'profileEnd','table','console'].forEach((method) => {
                    console[method] = noop;
                  });
                }
                clearConsole();

                // Multiple devtools detection methods
                function detectDevTools() {
                  const widthThreshold = window.outerWidth - window.innerWidth > 160;
                  const heightThreshold = window.outerHeight - window.innerHeight > 160;
                  
                  // Method 1: Size differential detection
                  if(widthThreshold || heightThreshold) {
                    document.body.innerHTML = '';
                    window.location.reload();
                  }

                  // Method 2: Dev tools object detection
                  const devtools = /./;
                  devtools.toString = function() {
                    clearConsole();
                    document.body.innerHTML = '';
                    window.location.reload();
                  }
                  console.log(devtools);

                  // Method 3: Performance timing
                  const start = performance.now();
                  debugger;
                  const end = performance.now();
                  if (end - start > 100) {
                    document.body.innerHTML = '';
                    window.location.reload();
                  }

                  // Method 4: Element.id getter hook
                  const element = document.createElement('div');
                  const elementGetter = Object.getOwnPropertyDescriptor(Element.prototype, 'id');
                  if (elementGetter && elementGetter.configurable) {
                    Object.defineProperty(element, 'id', {
                      configurable: true,
                      enumerable: true,
                      get: function() {
                        clearConsole();
                        document.body.innerHTML = '';
                        window.location.reload();
                        return '';
                      }
                    });
                  }
                }

                // Run detection continuously
                setInterval(detectDevTools, 1000);

                // Additional protection: Disable source view
                document.addEventListener('keydown', function(e) {
                  if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
                    e.preventDefault();
                    return false;
                  }
                });

                // Disable drag and select
                document.addEventListener('dragstart', function(e) { e.preventDefault(); });
                document.addEventListener('selectstart', function(e) { e.preventDefault(); });

                // Disable copy
                document.addEventListener('copy', function(e) { e.preventDefault(); });
                document.addEventListener('cut', function(e) { e.preventDefault(); });

                // Clear localStorage and sessionStorage
                try {
                  localStorage.clear();
                  sessionStorage.clear();
                } catch(e) {}
              }

              // Run on load
              if (document.readyState === "complete" || document.readyState === "interactive") {
                disable();
              } else {
                document.addEventListener("DOMContentLoaded", disable);
              }

              // Run on dynamic navigation
              if (window.next) {
                window.next.router.events.on('routeChangeComplete', disable);
              }
            })();
          `}
        </Script> */}
      </head>
      <body suppressHydrationWarning className="antialiased min-h-screen flex flex-col">
        <ClientBody>
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </ClientBody>
      </body>
    </html>
  );
}
