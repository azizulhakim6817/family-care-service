import { singleBooking } from "@/actions/server/bookings";
import BookingModal from "./../../../components/button/BookingModal";
import {
  FaUser,
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
  FaCheckCircle,
} from "react-icons/fa";

const SingleBookingPage = async ({ params }) => {
  const { id } = await params;
  const booking = await singleBooking(id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex justify-center">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {booking.serviceName}
          </h1>
          <span
            className={`px-3 py-1 rounded-full font-semibold text-sm 
            ${booking?.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {booking?.status}
          </span>
        </div>

        {/* Booking Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* User Info */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <FaUser className="text-gray-500 dark:text-gray-300 mr-3 text-2xl" />
            <div>
              <h2 className="text-gray-600 dark:text-gray-300 font-medium">
                User
              </h2>
              <p className="text-lg font-semibold">{booking.name}</p>
              <p className="text-gray-500 dark:text-gray-400">
                {booking.email}
              </p>
            </div>
          </div>

          {/* Total Cost */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <FaMoneyBillWave className="text-gray-500 dark:text-gray-300 mr-3 text-2xl" />
            <div>
              <h2 className="text-gray-600 dark:text-gray-300 font-medium">
                Total Cost
              </h2>
              <p className="text-lg font-semibold">${booking.totalCost}</p>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <FaClock className="text-gray-500 dark:text-gray-300 mr-3 text-2xl" />
            <div>
              <h2 className="text-gray-600 dark:text-gray-300 font-medium">
                Duration
              </h2>
              <p className="text-lg font-semibold">
                {booking.duration} {booking.type}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <FaMapMarkerAlt className="text-gray-500 dark:text-gray-300 mr-3 text-2xl" />
            <div>
              <h2 className="text-gray-600 dark:text-gray-300 font-medium">
                Location
              </h2>
              <p className="text-lg font-semibold">
                {booking.district}, {booking.division}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                {booking.address}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Booking Timeline
          </h2>
          <div className="relative border-l-2 border-gray-300 dark:border-gray-600 ml-4">
            <div className="absolute -left-3 top-0 bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center text-white">
              <FaCheckCircle />
            </div>
            <p className="text-gray-600 dark:text-gray-300 ml-6">
              Booking created on: {new Date(booking.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        {booking?.status !== "Paid" && <BookingModal />}
      </div>
    </div>
  );
};

export default SingleBookingPage;
