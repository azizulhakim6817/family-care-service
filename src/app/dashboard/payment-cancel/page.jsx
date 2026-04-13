"use client";

import React from "react";
import { FaTimesCircle } from "react-icons/fa";

const PaymentCancelPage = () => {
  return (
    <div className="flex justify-center items-center h-screen  px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md text-center">
        <FaTimesCircle className="text-red-500 text-6xl mb-6 animate-shake" />
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Payment Canceled ❌
        </h1>
        <p className="text-gray-600 mb-6">
          Your payment was not completed. No charges have been made. You can try
          again or contact support if needed.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => (window.location.href = "/dashboard/dashboardHome")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => (window.location.href = "/service")}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Retry Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;
