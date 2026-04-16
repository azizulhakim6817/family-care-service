"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaTimesCircle } from "react-icons/fa";

const PaymentCancelPage = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId"); // optional

  return (
    <div className="flex justify-center items-center min-h-screen  px-4">
      <div className=" shadow-xl rounded-2xl p-10 max-w-md text-center">
        {/* Icon */}
        <FaTimesCircle className="text-red-500 text-6xl mb-6 animate-pulse" />

        {/* Title */}
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Payment Cancelled ❌
        </h1>

        {/* Description */}
        <p className=" mb-6">
          Your payment was not completed. No charges were made. You can retry
          the payment anytime.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          {/* Back */}
          <Link
            href="/my-booking"
            className=" px-6 py-3 rounded-lg font-semibold transition"
          >
            Back to My Booking
          </Link>

          {/* Retry */}
          <Link
            href={bookingId ? `/my-booking/${bookingId}` : "/my-booking"}
            className="bg-red-500 hover:bg-red-600  px-6 py-3 rounded-lg font-semibold transition"
          >
            Retry Payment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;
