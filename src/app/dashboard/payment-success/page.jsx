"use client";

import { verifyPayment } from "@/actions/server/bookings";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [status, setStatus] = useState("Verifying...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setStatus("No session ID ❌");
      return;
    }

    const verify = async () => {
      try {
        await new Promise((res) => setTimeout(res, 3000)); // wait for Stripe update
        const result = await verifyPayment(sessionId);

        if (result.payment_status === "paid") {
          setSuccess(true); // for styling
          setStatus("Payment Successful! ✅");
        } else if (result.payment_status === "already_paid") {
          setSuccess(true);
          setStatus("Already Paid ✅");
        } else {
          setSuccess(false);
          setStatus("Payment Failed ❌");
        }
      } catch (error) {
        console.error(error);
        setSuccess(false);
        setStatus("Error ❌");
      }
    };

    verify();
  }, [sessionId]);

  return (
    <div className="flex justify-center items-center h-screen ">
      <div
        className={`p-10 rounded-2xl shadow-xl text-center transition-all duration-700 transform ${
          success
            ? "bg-green-50 scale-100 opacity-100"
            : "bg-gray-50 scale-95 opacity-90"
        }`}
      >
        {success && (
          <FaCheckCircle className="text-green-500 text-6xl mb-4 animate-bounce" />
        )}
        <h1
          className={`text-3xl font-bold mb-2 ${success ? "text-green-700" : "text-red-500"}`}
        >
          {status}
        </h1>
        {success && (
          <p className="text-gray-600">
            Your payment has been successfully processed. Thank you for your
            booking!
          </p>
        )}
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
