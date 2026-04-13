"use client";

import { cancelBooking } from "@/actions/server/bookings";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

const GetBooking = ({ bookings: initialBookings }) => {
  const [bookings, setBookings] = useState(initialBookings);

  const handleCancelBooking = async (id) => {
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, cancel it",
    });

    if (result.isConfirmed) {
      try {
        const response = await cancelBooking(id);

        if (response.deletedCount > 0) {
          Swal.fire("Cancelled!", "Booking has been canceled.", "success");

          setBookings((prev) =>
            prev.map((b) => (b._id === id ? { ...b, status: "Cancelled" } : b)),
          );
        }
      } catch (error) {
        Swal.fire("Error", error.message || "Something went wrong!", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <p className="text-base-content/70 text-sm">
          Track and manage your service bookings
        </p>
      </div>

      {/* Empty State */}
      {bookings?.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold">No Bookings Found</h2>
          <p className="text-gray-500 mt-2">
            You haven’t booked any services yet.
          </p>
        </div>
      ) : (
        <div className="bg-base-100 shadow-xl rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table table-zebra text-sm">
              {/* Head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Service</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Location</th>
                  <th>Cost</th>
                  <th>Status</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={booking?._id} className="hover">
                    <td>{index + 1}</td>

                    <td className="font-semibold">{booking?.serviceName}</td>

                    <td>{booking?.type}</td>

                    <td>{booking?.duration} hr</td>

                    <td className="text-sm">
                      {booking?.district}, {booking?.division}
                    </td>

                    <td className="font-semibold">${booking?.totalCost}</td>

                    {/* Status */}
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          statusStyles[booking?.status] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {booking?.status}
                      </span>
                    </td>

                    {/* User */}
                    <td>
                      <div>
                        <p className="font-medium">{booking?.name}</p>
                        <p className="text-xs opacity-70">{booking?.email}</p>
                      </div>
                    </td>

                    <td>{new Date(booking?.createdAt).toLocaleDateString()}</td>

                    {/* Actions */}
                    <td className="flex gap-2">
                      <Link
                        href={`/my-booking/${booking?._id}`}
                        className="btn btn-xs btn-primary"
                      >
                        View
                      </Link>

                      <button
                        disabled={booking?.status === "Cancelled"}
                        onClick={() => handleCancelBooking(booking?._id)}
                        className="btn btn-xs btn-error disabled:opacity-50"
                      >
                        Cancel
                      </button>
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
