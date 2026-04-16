"use client";

import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import Image from "next/image";

const testimonials = [
  {
    name: "Ayesha Rahman",
    role: "Mother",
    text: "FamilyCare made it so easy to find a trustworthy babysitter. I feel completely safe leaving my child in their care.",
    image: "https://i.ibb.co.com/vxXVrCyj/azizul-hakim.png",
  },
  {
    name: "Mahmud Hasan",
    role: "Son",
    text: "The elderly care service was excellent. The caretaker was professional, kind, and very supportive.",
    image: "https://i.ibb.co.com/23z1QQzp/345006055-805347164294639-5578688789779528251-n-removebg-preview-6.png",
  },
  {
    name: "Nusrat Jahan",
    role: "Working Professional",
    text: "Booking a caregiver was fast and simple. Highly recommended for busy families.Highly recommended for",
    image: "https://i.ibb.co.com/tPmV0nsf/94e093a8-428f-4603-a8de-2916efe1dd6d.jpg",
  },
];

const stats = [
  { number: "500+", label: "Trusted Caregivers" },
  { number: "1,200+", label: "Successful Bookings" },
  { number: "98%", label: "Customer Satisfaction" },
  { number: "24/7", label: "Support Available" },
];

const Testimonials = () => {
  return (
    <section className=" py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            What People Say About{" "}
            <span className="text-primary">FamilyCare</span>
          </h2>
          <p className="text-gray-500 mt-3">
            Trusted by families for safe, reliable, and professional care
            services.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl text-center shadow-sm "
            >
              <h3 className="text-2xl font-bold text-primary">{item.number}</h3>
              <p className="text-sm text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
            >
              {/* Quote Icon */}
              <FaQuoteLeft className="text-yellow-500 text-2xl mb-3" />

              {/* Text */}
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                “{t.text}”
              </p>

              {/* Rating */}
              <div className="flex mb-4 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="mr-1" />
                ))}
              </div>

              {/* User Info */}
              <div className="flex items-center gap-4">
                {/* Image */}
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <Image
                    src={t?.image}
                    alt={t?.name}
                    width={60}
                    height={60}
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Name + Role */}
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">
                    {t.name}
                  </h4>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
