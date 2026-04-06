import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "ClientPortal \u2014 Client Portal for Freelancers & Agencies",
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
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  alternates: {
    canonical: 'https://clientportal.eazyweb.nc',
  },
  metadataBase: new URL("https://clientportal.eazyweb.nc"),
  openGraph: {
    title: "ClientPortal - Premium Client Portal Builder",
    description:
      "Create branded client portals to share files, messages, and project updates.",
    url: "https://clientportal.eazyweb.nc",
    siteName: "ClientPortal",
    locale: "en_US",
    type: "website",
    images: [{ url: '/images/og-image.webp', width: 1200, height: 630, type: 'image/webp', alt: 'ClientPortal — Premium Client Portal Builder' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClientPortal - Premium Client Portal Builder",
    description:
      "Create branded client portals to share files, messages, and project updates.",
    images: ['/images/og-image.webp'],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "ClientPortal",
      url: "https://clientportal.eazyweb.nc",
      publisher: {
        "@type": "Organization",
        name: "EazyWebNC",
        url: "https://eazyweb.nc",
        logo: { "@type": "ImageObject", url: "https://eazyweb.nc/logo.png" },
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "ClientPortal",
      applicationCategory: "BusinessApplication",
      description:
        "Premium client portal builder for freelancers and agencies. Share files, messages, and project updates with your clients.",
      url: "https://clientportal.eazyweb.nc",
      offers: [
        { "@type": "Offer", name: "Starter", price: "19", priceCurrency: "USD", billingIncrement: "P1M" },
        { "@type": "Offer", name: "Pro", price: "49", priceCurrency: "USD", billingIncrement: "P1M" },
        { "@type": "Offer", name: "Agency", price: "99", priceCurrency: "USD", billingIncrement: "P1M" },
      ],
      creator: { "@type": "Organization", name: "EazyWebNC", url: "https://eazyweb.nc" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is ClientPortal?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ClientPortal is a branded client portal builder for freelancers and agencies. Share files, messages, and project updates with your clients in a premium, white-labeled experience.",
          },
        },
        {
          "@type": "Question",
          name: "Can I customize the portal with my brand?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! ClientPortal lets you add your logo, brand colors, and custom domain so your clients see a fully branded experience that matches your business.",
          },
        },
        {
          "@type": "Question",
          name: "What can I share through the client portal?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can share files, project updates, messages, invoices, and deliverables. Everything your client needs is organized in one secure, professional space.",
          },
        },
      ],
    },
  ],
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
        className={`${plusJakarta.variable} font-sans antialiased bg-[#0a0a0a] text-white`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded">Skip to content</a><div id="main-content">
        {children}
        </div>
      </body>
    </html>
  );
}
