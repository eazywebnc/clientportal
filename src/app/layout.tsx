import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ClientPortal - Premium Client Portal Builder for Freelancers & Agencies",
  description:
    "Create branded client portals to share files, messages, and project updates. Give your clients a premium experience they will love.",
  keywords: [
    "client portal",
    "freelancer tools",
    "agency portal",
    "project management",
    "file sharing",
    "client communication",
  ],
  metadataBase: new URL("https://clientportal.eazyweb.nc"),
  openGraph: {
    title: "ClientPortal - Premium Client Portal Builder",
    description:
      "Create branded client portals to share files, messages, and project updates.",
    url: "https://clientportal.eazyweb.nc",
    siteName: "ClientPortal",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClientPortal - Premium Client Portal Builder",
    description:
      "Create branded client portals to share files, messages, and project updates.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ClientPortal",
  applicationCategory: "BusinessApplication",
  description:
    "Premium client portal builder for freelancers and agencies. Share files, messages, and project updates with your clients.",
  url: "https://clientportal.eazyweb.nc",
  offers: [
    {
      "@type": "Offer",
      name: "Starter",
      price: "19",
      priceCurrency: "USD",
      billingIncrement: "P1M",
    },
    {
      "@type": "Offer",
      name: "Pro",
      price: "49",
      priceCurrency: "USD",
      billingIncrement: "P1M",
    },
    {
      "@type": "Offer",
      name: "Agency",
      price: "99",
      priceCurrency: "USD",
      billingIncrement: "P1M",
    },
  ],
  creator: {
    "@type": "Organization",
    name: "EazyWebNC",
    url: "https://eazyweb.nc",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-[#0a0a0a] text-white`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded">Skip to content</a><div id="main-content">
        {children}
        </div>
      </body>
    </html>
  );
}
