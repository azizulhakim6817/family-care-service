"use client";

import React, { useEffect, useState } from "react";
import { getBooking } from "@/actions/server/bookings";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Page = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBooking();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching payment histories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen  p-6 md:p-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold ">Payment Histories</h1>
        <p className=" text-sm mt-1">
          All booking transactions and payment status
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className=" shadow-xl rounded-2xl overflow-hidden">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              {/* Head */}
              <thead className="bg-gray-200 dark:bg-gray-500 ">
                <tr>
                  <th className="px-6 py-4 text-left">Booking ID</th>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Service</th>
                  <th className="px-6 py-4 text-left">Amount</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Date</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="divide-y ">
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr
                      key={booking._id}
                      
                    >
                      <td className="px-6 py-4  font-mono text-xs">
                        {booking._id.slice(-6)}
                      </td>

                      <td className="px-6 py-4 font-medium ">
                        {booking.name}
                      </td>

                      <td className="px-6 py-4 ">
                        {booking.email}
                      </td>

                      <td className="px-6 py-4 ">
                        {booking.serviceName}
                      </td>

                      <td className="px-6 py-4 font-semibold ">
                        ${booking.totalCost || "0.00"}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {booking.isPaid ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                            <FaCheckCircle /> Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                            <FaTimesCircle /> Pending
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 ">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-10">
                      No payment histories found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
