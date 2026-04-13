import About from "@/components/home/about/About";
import Category from "@/components/home/services/Services";
import Home from "@/components/home/home/Home";
import Testimonials from "@/components/home/testimonials/Testimonials";
import Contact from "@/components/home/contact/Contact";

// ✅ SEO Optimized Metadata
export const metadata = {
  title: "Baby Sitting & Elderly Care Service Platform",
  description:
    "Find and book trusted Family-care home services like baby care, elderly care, and cleaning. Fast, reliable, and affordable.",

  keywords: [
    "family care",
    "home service",
    "baby care",
    "elderly care",
    "cleaning service Bangladesh",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Family-care Home Service Platform",
    description:
      "Book trusted home services like baby care, elderly care, and cleaning easily.",
    url: "/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Family-care Home Service",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Family-care Home",
    description:
      "Book trusted home services easily.",
    images: ["/og-image.jpg"],
  },
};

const page = () => {
  return (
    <div>
      <Home />
      <Category />
      <About />
      <Testimonials />
      <Contact />
    </div>
  );
};

export default page;