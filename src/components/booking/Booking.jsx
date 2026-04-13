import { singleService } from "@/actions/server/services";
import BookingModal from "../button/BookingModal";

const Booking = async ({ params }) => {
  const { id } = await params;
  const servicesData = await singleService(id);

  if (!servicesData) {
    return (
      <div className="p-4 text-center text-gray-500">Service not found.</div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">{servicesData?.name}</h1>

      <p className="text-gray-600 mb-4">{servicesData?.description}</p>

      <BookingModal service={servicesData} />
    </div>
  );
};

export default Booking;
