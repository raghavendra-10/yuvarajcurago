import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className="pt-20">
          {children}
        </div>
      </body>
    </html>
  );
}
