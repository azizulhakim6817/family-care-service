"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { verifyPayment } from "@/actions/server/bookings";
import Link from "next/link";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState("loading");

  // ✅ prevent multiple calls
  const hasFetched = useRef(false);

  useEffect(() => {
    const run = async () => {
      if (!sessionId || hasFetched.current) return;

      hasFetched.current = true;

      try {
        const res = await verifyPayment(sessionId);

        if (res?.payment_status === "paid") {
          setStatus("success");

          //! auto redirect after 3s
          setTimeout(() => {
            window.location.href = "/my-booking";
          }, 3000);
        } else if (res?.payment_status === "already_paid") {
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch (error) {
        setStatus("failed");
      }
    };

    run();
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="text-center p-8 rounded-2xl shadow-2xl bg-white/5 backdrop-blur-md border border-white/10 w-[90%] max-w-md">
        {/* LOADING */}
        {status === "loading" && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 border-4 border-white/20 border-t-green-400 rounded-full animate-spin"></div>
            <h2 className="text-lg font-semibold">Verifying Payment...</h2>
            <p className="text-sm text-gray-300">
              Please wait while we confirm your transaction
            </p>
          </div>
        )}

        {/* SUCCESS */}
        {status === "success" && (
          <div className="flex flex-col items-center gap-4 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
              <span className="text-4xl">✅</span>
            </div>

            <h1 className="text-2xl font-bold text-green-400">
              Payment Successful
            </h1>

            <p className="text-sm text-gray-300">
              Your booking has been confirmed successfully.
            </p>

            <p className="text-xs text-gray-400">
              Redirecting to My Booking...
            </p>

            <Link
              href="/my-booking"
              className="mt-4 px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition"
            >
              Go Now
            </Link>
          </div>
        )}

        {/* FAILED */}
        {status === "failed" && (
          <div className="flex flex-col items-center gap-4 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
              <span className="text-4xl">❌</span>
            </div>

            <h1 className="text-2xl font-bold text-red-400">Payment Failed</h1>

            <p className="text-sm text-gray-300">
              Something went wrong. Please try again.
            </p>

            <Link
              href="/my-booking"
              className="mt-4 px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
            >
              Back to My Booking
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
