"use client";

import React, { useEffect, useState } from "react";
import {
  confirmBooking,
  completedBooking,
  getBookingAllAdmin,
  cancelBooking,
} from "@/actions/server/bookings";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import Link from "next/link";
import { IoIosRemoveCircle } from "react-icons/io";
import { VscCopilotSuccess } from "react-icons/vsc";
import { GiConfirmed } from "react-icons/gi";
import { FaEye } from "react-icons/fa";

const Page = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  //! pagination state----------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookingAllAdmin();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching payment histories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // ✅ pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  //! handleCancelBooking---------------------
  const handleCancelBooking = async (id) => {
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: "Do you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel it",
    });

    try {
      const response = await cancelBooking(id);

      if (result.isConfirmed) {
        setBookings((prev) =>
          prev.map((b) =>
            b._id === id ? { ...b, booking_status: "Cancelled" } : b,
          ),
        );

        await Swal.fire({
          title: "Cancelled!",
          text: "Booking has been cancelled successfully.",
          icon: "success",
        });
      } else {
        Swal.fire("Info", "No changes were made.", "info");
      }
    } catch (error) {
      Swal.fire("Error", error?.message || "Something went wrong!", "error");
    }
  };

  //! handleConfirmBooking---------------------
  const handleConfirmBooking = async (id) => {
    const result = await Swal.fire({
      title: "Confirm Booking?",
      text: "Do you want to confirm this booking?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      confirmButtonText: "Yes, confirm it",
    });

    if (result.isConfirmed) {
      try {
        const response = await confirmBooking(id);

        if (response?.modifiedCount > 0) {
          setBookings((prev) =>
            prev.map((b) =>
              b._id === id ? { ...b, booking_status: "Confirmed" } : b,
            ),
          );

          Swal.fire("Confirmed!", "Booking has been confirmed.", "success");
        }
      } catch (error) {
        Swal.fire("Error", error.message || "Something went wrong!", "error");
      }
    }
  };

  //! handleCompleteBooking---------------------
  const handleCompleteBooking = async (id) => {
    const result = await Swal.fire({
      title: "Complete Booking?",
      text: "Mark this booking as completed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      confirmButtonText: "Yes, complete it",
    });

    if (result.isConfirmed) {
      try {
        const response = await completedBooking(id);

        if (response?.modifiedCount > 0) {
          setBookings((prev) =>
            prev.map((b) =>
              b._id === id ? { ...b, booking_status: "Completed" } : b,
            ),
          );

          Swal.fire("Done!", "Booking completed.", "success");
        }
      } catch (error) {
        Swal.fire("Error", error.message || "Something went wrong!", "error");
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Payment Histories</h1>
        <p className="text-sm mt-1">
          All booking transactions and payment status
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <>
          <div className="shadow-xl rounded-2xl overflow-hidden">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                {/* Head */}
                <thead className="bg-gray-200 dark:bg-gray-500">
                  <tr>
                    <th className="px-6 py-4 text-left">#</th>
                    <th className="px-6 py-4 text-left">Booking ID</th>
                    <th className="px-6 py-4 text-left">Name</th>
                    <th className="px-6 py-4 text-left">Email</th>
                    <th className="px-6 py-4 text-left">Service</th>
                    <th className="px-6 py-4 text-left">Amount</th>
                    <th className="px-6 py-4 text-left">Payment</th>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-left">Actions</th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody className="divide-y">
                  {currentBookings.length > 0 ? (
                    currentBookings.map((booking, i) => (
                      <tr key={booking._id}>
                        <td className="px-2 py-4 font-mono text-xs">
                          {indexOfFirstItem + i + 1}
                        </td>

                        <td className="px-2 py-4 font-mono text-xs">
                          {booking._id.slice(-6)}
                        </td>

                        <td className="px-2 py-4 font-medium">
                          {booking.name}
                        </td>

                        <td className="px-2 py-4">{booking.email}</td>

                        <td className="px-2 py-4">{booking.serviceName}</td>

                        <td className="px-2 py-4 font-semibold">
                          ${booking.totalCost || "0.00"}
                        </td>

                        {/* payment-status */}
                        <td className="px-3 py-1">
                          {booking.status !== "Pending" ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                              <FaCheckCircle /> Paid
                            </span>
                          ) : (
                            <button
                              onClick={() => handlePayment(booking)}
                              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 hover:bg-red-200"
                            >
                              <FaTimesCircle /> Pay Now
                            </button>
                          )}
                        </td>

                        <td className="px-2 py-4">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </td>
                        {/* Status */}
                        <td>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              booking?.booking_status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : booking?.booking_status === "Confirmed"
                                  ? "bg-blue-100 text-blue-700"
                                  : booking?.booking_status === "Completed"
                                    ? "bg-green-100 text-green-700"
                                    : booking?.booking_status === "Cancelled"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {booking?.booking_status}
                          </span>
                        </td>
                        <td className="px-3 py-1">
                          {booking?.status !== "Pending" ? (
                            <div className="flex gap-2 justify-center items-center">
                              <Link
                                href={`/my-booking/${booking?._id}`}
                                className="bg-primary px-3 py-1 rounded"
                              >
                                <FaEye className="text-white" />
                              </Link>

                              {/* Confirm */}
                              {booking?.booking_status !== "Confirmed" ? (
                                <button
                                  onClick={() =>
                                    handleConfirmBooking(booking._id)
                                  }
                                  className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition flex items-center justify-center"
                                  title="Confirm booking"
                                >
                                  <GiConfirmed size={18} />
                                </button>
                              ) : (
                                <span className="px-2 py-1 rounded text-xs bg-green-200 text-gray-300">
                                  <GiConfirmed size={18} />
                                </span>
                              )}

                              {/* Complete */}
                              <button
                                onClick={() =>
                                  handleCompleteBooking(booking._id)
                                }
                                disabled={
                                  booking?.booking_status !== "Confirmed"
                                }
                                className="bg-blue-500 text-white px-3 py-1 rounded disabled:bg-gray-300"
                              >
                                <VscCopilotSuccess />
                              </button>
                              {/* Cancel */}
                              {booking?.booking_status !== "Cancelled" ? (
                                <button
                                  onClick={() =>
                                    handleCancelBooking(booking?._id)
                                  }
                                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition flex items-center justify-center"
                                  title="Cancel booking"
                                >
                                  <IoIosRemoveCircle size={18} />
                                </button>
                              ) : (
                                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                  <IoIosRemoveCircle size={18} />
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-yellow-600 font-medium">
                              Waiting for Payment ⏳
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center py-10">
                        No payment histories found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ✅ Pagination UI */}
          {bookings.length > 0 && (
            <div className="flex flex-col items-center mt-6 gap-3">
              {/* Info */}
              <p className="text-sm text-gray-500">
                Showing {indexOfFirstItem + 1} -{" "}
                {Math.min(indexOfLastItem, bookings.length)} of{" "}
                {bookings.length}
              </p>

              {/* Buttons */}
              <div className="flex gap-2">
                {/* Prev */}
                <button
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                >
                  Prev
                </button>

                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                {/* Next */}
                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
