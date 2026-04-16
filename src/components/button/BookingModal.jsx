"use client";
import React, { useRef, useState, useMemo, useEffect } from "react";
import Swal from "sweetalert2";
import {
  createBooking,
  createCheckoutSession,
} from "@/actions/server/bookings";

const BookingModal = ({ service }) => {
  const bookRef = useRef(null);

  const [type, setType] = useState("");
  const [duration, setDuration] = useState(0);

  //! Location state--------------
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("");

  // Open / Close Modal
  const handleBook = () => bookRef.current?.showModal();
  const handleClose = () => bookRef.current?.close();

  // Rates
  const rates = {
    hourly: 20,
    daily: 100,
  };

  //! Total Cost---------------------
  const totalCost = useMemo(() => {
    if (!type || !duration) return 0;
    return duration * rates[type];
  }, [type, duration]);

  //! Fetch Divisions-----------------
  useEffect(() => {
    const getDivisions = async () => {
      const res = await fetch("/divisions.json");
      const data = await res.json();

      const actualData = data.find((d) => d.type === "table")?.data || [];

      setDivisions(actualData);
    };

    getDivisions();
  }, []);

  //! Fetch Districts---------------------
  useEffect(() => {
    const getDistricts = async () => {
      const res = await fetch("/districts.json");
      const data = await res.json();

      const actualData = data.find((d) => d.type === "table")?.data || [];

      setDistricts(actualData);
    };

    getDistricts();
  }, []);

  //! Filter Districts by Division--------
  const filteredDistricts = districts.filter(
    (d) => d.division_id === selectedDivision,
  );

  //! Submit Booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const division = selectedDivision;
    const district = form.district.value;
    const address = form.address.value;

    if (!type || !duration || !division || !district || !address) {
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }

    const selectedDivObj = divisions.find((d) => d.id === selectedDivision);

    const bookingData = {
      serviceId: service?._id,
      serviceName: service?.name,
      type,
      duration,
      divisionName: selectedDivObj?.name,
      district,
      address,
      totalCost,
    };

    try {
      const res = await createBooking(bookingData);

      if (!res?.success && !res?.insertedId) {
        Swal.fire("Error", "Booking failed!", "error");
        return;
      }

      const checkoutUrl = await createCheckoutSession({
        ...bookingData,
        cost: totalCost,
        serviceName: type,
        bookingId: res.bookingId,
      });

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div>
      {/* Open Modal Button */}
      <button
        onClick={handleBook}
        className="mt-6 w-full text-black bg-linear-to-r from-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-400 py-3 rounded-xl font-semibold shadow-md"
      >
        Book Service
      </button>

      {/* Modal */}
      <dialog
        ref={bookRef}
        className="mx-auto mt-20 rounded-xl p-0 dark:bg-black dark:text-white"
      >
        <div className="p-6 rounded-xl md:w-96">
          <h3 className="text-center text-[14px] md:text-xl font-medium mb-4">
            Select duration and confirm booking
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Duration Type */}
            <label className="text-sm font-medium">Duration Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="select w-full dark:bg-black dark:text-white"
              required
            >
              <option value="">Select Hour / Day</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
            </select>

            {/* Duration */}
            {type && (
              <>
                <label className="text-sm font-medium">
                  {type === "hourly" ? "Hours" : "Days"}
                </label>
                <input
                  type="number"
                  min={1}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  placeholder={type === "hourly" ? "Enter hours" : "Enter days"}
                  className="input input-bordered w-full dark:bg-black dark:text-white"
                  required
                />
              </>
            )}

            {/* Division */}
            <label className="text-sm font-medium">Division</label>
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="select w-full dark:bg-black dark:text-white"
              required
            >
              <option value="">Select Division</option>

              {divisions.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            {/* District */}
            <label className="text-sm font-medium">District</label>
            <select name="district" className="select w-full dark:bg-black dark:text-white" required>
              <option value="">Select District</option>

              {filteredDistricts.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>

            {/* Address */}
            <label className="text-sm font-medium">Address</label>
            <textarea
              name="address"
              placeholder="Enter full address"
              className="textarea textarea-bordered w-full dark:bg-black dark:text-white"
              required
            />

            {/* Total */}
            <div className="text-lg font-semibold text-green-600">
              Total: ${totalCost}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={handleClose}
                className="btn w-1/2 bg-gray-300 text-black dark:bg-black dark:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn w-1/2 bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default BookingModal;
