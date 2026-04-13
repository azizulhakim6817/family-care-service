"use client";

import React, { useEffect, useState } from "react";
import { getBooking } from "@/actions/server/bookings";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBooking(); // fetch all bookings
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {loading ? (
        <p className="text-center ">Loading payment histories...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full  shadow-lg rounded-lg overflow-hidden">
            <thead className="">
              <tr>
                <th className="px-6 py-3 text-left">Booking ID</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Service</th>
                <th className="px-6 py-3 text-left">Amount ($)</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b hover:bg-gray-50 hover:text-black"
                >
                  <td className="px-6 py-4">{booking._id}</td>
                  <td className="px-6 py-4">{booking.name}</td>
                  <td className="px-6 py-4">{booking.email}</td>
                  <td className="px-6 py-4">{booking.serviceName}</td>
                  <td className="px-6 py-4">{booking.totalCost || "0.00"}</td>
                  <td className="px-6 py-4">
                    {booking.isPaid ? (
                      <span className="flex items-center text-green-600 font-semibold">
                        <FaCheckCircle className="mr-1" /> Paid
                      </span>
                    ) : (
                      <span className="flex items-center text-red-500 font-semibold">
                        <FaTimesCircle className="mr-1" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center p-6 text-gray-500">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
