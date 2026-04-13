"use client";

import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-primary">FamilyCare</span>
          </h2>

          <p className=" mb-4">
            <strong>FamilyCare</strong> is a trusted caregiving platform
            designed to support families by connecting them with reliable
            caretakers for children, elderly members, and individuals who
            require special care. We understand how important it is to ensure
            safety, comfort, and trust when it comes to your loved ones.
          </p>

          <p className=" mb-6">
            Our platform allows users to easily find and book care services
            based on their preferred time, location, and specific needs—whether
            it’s babysitting, elderly care, or home assistance. We aim to
            simplify the caregiving process through a seamless and user-friendly
            experience.
          </p>

          <div className="p-4 rounded-xl  ">
            <p className=" text-sm">
              <strong>FamilyCare</strong> is a modern web application that helps
              users book reliable and trusted care services for children,
              elderly, and sick individuals. Users can easily choose services
              based on their preferred time and location. Our mission is to make
              caregiving simple, secure, and accessible for everyone.
            </p>
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="grid gap-4"
        >
          <div className="p-5 rounded-xl shadow-md  hover:shadow-lg transition">
            <h4 className="font-semibold mb-1">👶 Babysitting</h4>
            <p className="text-sm text-gray-500">
              Safe and trusted babysitters to take care of your children with
              love and responsibility.
            </p>
          </div>

          <div className="p-5 rounded-xl shadow-md  hover:shadow-lg transition">
            <h4 className="font-semibold mb-1">👴 Elderly Care</h4>
            <p className="text-sm text-gray-500">
              Compassionate and professional care services for elderly family
              members at home.
            </p>
          </div>

          <div className="p-5 rounded-xl shadow-md  hover:shadow-lg transition">
            <h4 className="font-semibold mb-1">🏥 Special Care</h4>
            <p className="text-sm text-gray-500">
              Personalized support for patients and individuals with special
              care needs.
            </p>
          </div>

          <div className="p-5 rounded-xl shadow-md  hover:shadow-lg transition">
            <h4 className="font-semibold mb-1">📍 Flexible Booking</h4>
            <p className="text-sm text-gray-500">
              Book services anytime based on your preferred schedule and
              location.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
