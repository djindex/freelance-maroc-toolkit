import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { LayoutShell } from "@/components/LayoutShell";

export const metadata: Metadata = {
  title: "FreelanceMaroc Toolkit 🇲🇦 | محراب الفريلانسر والمقاول الذاتي فالمغرب",
  description: "المنصة الشاملة والمجانية للمستقلين والمقاولين الذاتيين في المغرب: حاسبة TJM وسعر الساعة، مولّد الفواتير الرسمية المعفية من الضريبة (Art. 89 CGI)، مقارنة التحويلات البنكية الدولية، مؤشر الزبون المقلق، ودليل الأسعار 2025.",
  keywords: [
    "Freelance Maroc",
    "Auto-entrepreneur Maroc",
    "المقاول الذاتي",
    "الفريلانس في المغرب",
    "Calculateur TJM Maroc",
    "Facture Auto Entrepreneur Maroc",
    "Exonéré TVA article 89 CGI",
    "ICE Maroc",
    "Taux horaire freelance Maroc",
    "Wise Maroc",
    "Attijariwafa Bank",
    "CIH Bank freelance",
    "Virement SWIFT Maroc"
  ],
  authors: [{ name: "FreelanceMaroc Community" }],
  openGraph: {
    title: "FreelanceMaroc Toolkit 🇲🇦 | محراب الفريلانسر والمقاول الذاتي",
    description: "الأدوات رقم 1 للفريلانسر والمقاول الذاتي فالمغرب: حاسبة TJM، مولّد الفواتير الرسمي، مقارن التحويلات، وكويز الزبون المقلق.",
    type: "website",
    locale: "ar_MA",
    alternateLocale: "fr_MA"
  }
};

export const viewport: Viewport = {
  themeColor: "#10B981",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased selection:bg-emerald-500 selection:text-white">
        <AppProvider>
          <LayoutShell>
            {children}
          </LayoutShell>
        </AppProvider>
      </body>
    </html>
  );
}
