"use client";

import {
  deleteBooking,
  createCheckoutSession,
} from "@/actions/server/bookings";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";

const GetBooking = ({ bookings: initialBookings }) => {
  const [bookings, setBookings] = useState(initialBookings);

  //! delete booking------------------
  const handleDeleteBooking = async (id) => {
    const result = await Swal.fire({
      title: "Delete Booking?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await deleteBooking(id);

      if (res?.deletedCount > 0) {
        Swal.fire("Deleted!", "Booking deleted successfully.", "success");
        setBookings((prev) => prev.filter((b) => b._id !== id));
      }
    } catch (error) {
      Swal.fire("Error", error.message || "Something went wrong!", "error");
    }
  };

  //! payment to redirect to pay--------------
  const handlePayment = async (booking) => {
    try {
      const checkoutUrl = await createCheckoutSession({
        bookingId: booking._id,
        email: booking.email,
        totalCost: booking.totalCost,
        serviceName: booking.serviceName,
      });

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      Swal.fire("Error", "Payment failed!", "error");
    }
  };

  return (
    <div className="min-h-screen ">
      {/* HEADER */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <p className="text-sm">Track and manage your service bookings</p>
      </div>

      {/* EMPTY STATE */}
      {bookings?.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold">No Bookings Found</h2>
        </div>
      ) : (
        <div className="shadow-xl rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table text-sm w-full">
              <thead className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                <tr>
                  <th>#</th>
                  <th>Service</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Location</th>
                  <th>Cost</th>
                  <th>Payment</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {bookings?.map((booking, index) => (
                  <tr
                    key={booking?._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                  >
                    {/* INDEX */}
                    <td>{index + 1}</td>

                    {/* SERVICE */}
                    <td className="font-semibold">
                      {booking?.serviceName || "N/A"}
                    </td>

                    {/* TYPE */}
                    <td>{booking?.type || "-"}</td>

                    {/* DURATION */}
                    <td>{booking?.duration || "-"}</td>

                    {/* LOCATION */}
                    <td>
                      {booking?.divisionName || "-"}, {booking?.district || "-"}
                    </td>

                    {/* COST */}
                    <td className="font-semibold">
                      ${Number(booking?.totalCost || 0).toFixed(2)}
                    </td>

                    {/* PAYMENT */}
                    <td>
                      {booking?.isPaid ? (
                        <span className="px-3 py-1 rounded text-xs bg-green-100 text-green-700">
                          Paid
                        </span>
                      ) : (
                        <button
                          onClick={() => handlePayment(booking)}
                          className=" cursor-pointer px-3 py-1 rounded text-xs bg-amber-400 text-black hover:bg-amber-500 transition"
                        >
                          Pay Now
                        </button>
                      )}
                    </td>

                    {/* USER */}
                    <td className="font-medium">
                      {booking?.name || "Unknown"}
                    </td>

                    {/* DATE */}
                    <td>
                      {booking?.createdAt
                        ? new Date(booking.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>

                    {/* STATUS */}
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          {
                            Pending: "bg-yellow-100 text-yellow-700",
                            Confirmed: "bg-blue-100 text-blue-700",
                            Completed: "bg-green-100 text-green-700",
                            Cancelled: "bg-red-100 text-red-700",
                          }[booking?.booking_status] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {booking?.booking_status || "Unknown"}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td>
                      <div className="flex gap-2 items-center">
                        <Link
                          href={`/my-booking/${booking?._id}`}
                          className="btn btn-primary btn-sm"
                        >
                          <FaEye className="text-white" size={14} />
                        </Link>

                        <button
                          onClick={() => handleDeleteBooking(booking?._id)}
                          className="btn btn-error btn-sm"
                        >
                          <MdDeleteForever className="text-white" size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetBooking;
