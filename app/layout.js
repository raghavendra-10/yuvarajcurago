import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import { ModalProvider } from "@/contexts/ModalContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Priority Circle 365 - Your Gut-Brain Health Partner | Dr. Yuvaraj T",
  description: "Expert Surgical Gastroenterologist offering 365-day partnership for gut health. Stop settling for 'normal' reports. Understand your Gut-Brain Sensitivity Index with Dr. Yuvaraj T in Mumbai.",
  keywords: [
    "gut health",
    "gastroenterologist Mumbai",
    "gut-brain axis",
    "IBS treatment",
    "digestive health",
    "visceral hypersensitivity",
    "surgical gastroenterology",
    "Dr Yuvaraj T",
    "gut-brain sensitivity",
    "Priority Circle 365",
    "functional gut disorders",
    "GI specialist Mumbai"
  ],
  authors: [{ name: "Dr. Yuvaraj T" }],
  creator: "Dr. Yuvaraj T",
  publisher: "Priority Circle 365",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
    ],
  },
  openGraph: {
    title: "Priority Circle 365 - Your Gut-Brain Health Partner",
    description: "Beyond the antacids and 'normal' scans. 365-day expert guidance for your gut health from Surgical Gastroenterologist Dr. Yuvaraj T.",
    url: "https://yuvarajcurago.com",
    siteName: "Priority Circle 365",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Priority Circle 365 - Your Gut-Brain Health Partner",
    description: "Expert gut health guidance from Surgical Gastroenterologist Dr. Yuvaraj T. 365-day partnership for your digestive wellness.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager - Deferred for better performance */}
        <Script id="gtm-init" strategy="lazyOnload">
          {`
            (function() {
              var serverHost = window.location.hostname.includes('.co.in')
                ? 'gtm.curago.co.in'
                : 'gtm.curago.in';
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js',
                server: 'https://' + serverHost
              });

              var gtmScript = document.createElement('script');
              gtmScript.async = true;
              gtmScript.src = 'https://gtm.curago.in/gtm.js?id=GTM-PL6KV3ND';
              document.head.appendChild(gtmScript);
            })();
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://gtm.curago.in/ns.html?id=GTM-PL6KV3ND"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        <ModalProvider>
          <Navbar />
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}
