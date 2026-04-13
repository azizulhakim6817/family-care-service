import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NextAuthProvider from "@/provider/NextAuthProvider";
import NextTopLoader from "nextjs-toploader";
import ScrollToBottom from "@/components/button/ScrollToBottom";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://yourdomain.com"),

  title: {
    default: "Baby Sitting & Elderly Care Service Platform",
    template: "%s | Family-care",
  },

  description:
    "Book trusted home services like baby care, elderly care, cleaning, and maintenance easily.",

  keywords: [
    "home service",
    "baby care",
    "elderly care",
    "cleaning service Bangladesh",
    "Family-care",
  ],

  authors: [{ name: "Family-care" }],
  creator: "family-care-service-platform",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "family-care-service-platform",
    description:
      "Book trusted home services like baby care and elderly care easily.",
    url: "https://yourdomain.com",
    siteName: "family-care-service-platform",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Baby Sitting & Elderly Care Service Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Baby Sitting & Elderly Care Service Platform",
    description: "Book trusted home services easily.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader color="#29D" height={3} showSpinner={false} />

        <NextAuthProvider>
          <Navbar />
          <div className="px-4 md:px-12 mx-auto">
            <main className="min-h-[calc(100vh-302px)]">{children}</main>
          </div>
          <Footer />
          <ScrollToBottom />
        </NextAuthProvider>
      </body>
    </html>
  );
}
