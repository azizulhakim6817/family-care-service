"use client";

import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }

    try {
      setLoading(true);

      Swal.fire("Success", "Message sent successfully!", "success");
      form.reset();
    } catch (err) {
      Swal.fire("Error", "Failed to send message", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-16 px-6 rounded-xl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Contact Us
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-3">
            Have questions or need help? Reach out to us anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
              <FaPhoneAlt className="text-yellow-500 text-xl" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-gray-500">+880 1743-086886</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
              <FaEnvelope className="text-yellow-500 text-xl" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-500">support@example.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
              <FaMapMarkerAlt className="text-yellow-500 text-xl" />
              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-gray-500">Sylhet, Bangladesh</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold hover:bg-yellow-600 transition ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
