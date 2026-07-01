import type { Metadata } from "next";
import "./globals.css";
import { clinic } from "@/lib/data";

const SITE_URL = "https://vimalaidental.clinicos.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${clinic.name} | Best Orthodontist in Pimple Saudagar, Pune`,
    template: `%s | ${clinic.shortName}`
  },
  description:
    "Vimalai Orthodontic & Multispeciality Dental Clinic, led by Dr. Gananjay Patil (BDS, MDS Orthodontics) with 16+ years experience. Braces, invisible aligners, implants, root canal & smile design in Pimple Saudagar, Pune.",
  keywords: [
    "dentist Pimple Saudagar",
    "orthodontist Pune",
    "braces Pimple Saudagar",
    "dental implants Pune",
    "Dr Gananjay Patil",
    "invisible aligners Pune",
    "best dental clinic Pune",
    "smile designing Pune",
    "root canal treatment Pimple Saudagar"
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${clinic.name} | Premium Dental Care in Pune`,
    description:
      "Advanced, painless dental care with Dr. Gananjay Patil — 16+ years experience in braces, implants, smile design and more.",
    siteName: clinic.shortName,
    locale: "en_IN",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: clinic.name }]
  },
  twitter: {
    card: "summary_large_image",
    title: `${clinic.name} | Premium Dental Care in Pune`,
    description:
      "Advanced, painless dental care with Dr. Gananjay Patil — 16+ years experience in braces, implants, smile design and more.",
    images: ["/og-image.jpg"]
  },
  robots: { index: true, follow: true }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: clinic.name,
  image: `${SITE_URL}/og-image.jpg`,
  "@id": SITE_URL,
  url: SITE_URL,
  telephone: `+91${clinic.phone}`,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: clinic.location.area,
    addressLocality: clinic.location.city,
    addressRegion: clinic.location.state,
    addressCountry: "IN"
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:30",
      closes: "13:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "17:30",
      closes: "22:00"
    }
  ],
  medicalSpecialty: "Orthodontics",
  founder: {
    "@type": "Person",
    name: clinic.doctor.name,
    jobTitle: "Orthodontist",
    description: clinic.doctor.bio
  }
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-canvas text-ink antialiased selection:bg-accent/20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
        {children}
      </body>
    </html>
  );
}
