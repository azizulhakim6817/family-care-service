import { singleService } from "@/actions/server/services";
import Image from "next/image";
import BookingModal from "../../../components/button/BookingModal";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const service = await singleService(id);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "This service does not exist.",
    };
  }

  return {
    title: service.name,
    description: service.description,
    keywords: [
      service.name,
      "Family-care Service",
      "booking",
      service.category || "",
    ],

    alternates: {
      canonical: `/service/${params.id}`,
    },

    openGraph: {
      title: service.name,
      description: service.description,
      url: `/service/${params.id}`,
      images: [
        {
          url:
            service.image || "https://family-care-service-platform.vercel.app",
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: service.name,
      description: service.description,
      images: [service.image],
    },
  };
}

const ServiceDetails = async ({ params }) => {
  const { id } = await params;
  const servicesData = await singleService(id);

  if (!servicesData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">Service not found</p>
      </div>
    );
  }

  const { name, image, description, pricing, createdAt } = servicesData;

  return (
    <div className=" min-h-screen py-10  md:px-10">
      {/* HERO */}
      <div className="relative w-full h-55 sm:h-75 md:h-125 rounded-3xl overflow-hidden shadow-xl group">
        {/* Image */}
        <Image
          src={image}
          alt={name}
          fill
          unoptimized
          className="object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Overlay */}
        <div className="absolute inset-0 " />

        {/* Title */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-4">
          <h1 className=" text-xl sm:text-3xl md:text-5xl font-bold  drop-shadow-lg leading-tight">
            {name}
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="md:col-span-2 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-gray-100 ">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            Service Description
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg dark:text-gray-200">
            {description}
          </p>
          <p>
            <span className="font-medium text-sm">Hourly Price :</span> $
            {pricing.hourly}
          </p>
          <p>
            <span className="font-medium text-sm">Daily Price : :</span> $
            {pricing.daily}
          </p>

          {/* Combined Care Info */}
          <div className=" rounded-2xl ">
            <p className=" text-sm leading-relaxed">
              This service is specially designed to provide compassionate and
              professional care for
              <span className="font-semibold text-blue-600"> babies</span>,
              <span className="font-semibold text-green-600">
                {" "}
                elderly individuals
              </span>
              , and
              <span className="font-semibold text-red-500"> sick patients</span>
              . Our trained caregivers ensure safety, hygiene, and emotional
              support at every step. From gentle baby handling and feeding
              assistance to elderly companionship and mobility support, as well
              as dedicated patient care including health monitoring and recovery
              assistance — we are committed to delivering reliable and
              high-quality service tailored to every need.
            </p>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className=" backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-gray-100 h-fit sticky top-10">
          <h3 className="text-xl font-semibold mb-4">Service Info</h3>

          <div className="space-y-3 ">
            <p>
              📅{" "}
              <span className="font-medium ">
                {new Date(createdAt).toLocaleDateString()}
              </span>
            </p>

            <p>⚡ Fast & Reliable Service</p>

            <p>✅ Verified Provider</p>
          </div>

          {/* booking service button------------- */}
          <div>
            <BookingModal service={servicesData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
