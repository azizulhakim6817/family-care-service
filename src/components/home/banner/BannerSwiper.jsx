"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  A11y,
  Autoplay,
  Navigation,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const BannerSwiper = ({ slides }) => {
  return (
    <div className="w-full mx-auto mb-4">
      <Swiper
        modules={[Pagination, A11y, Autoplay, Navigation, EffectFade]}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        effect="fade"
        loop
        grabCursor
        className="rounded-2xl overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-62.5 md:h-100">
              
              {/* Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center   flex items-center text-center"
                style={{ backgroundImage: `url(${slide?.image})` }}
              >
                <div className="bg-black/50 h-full w-full px-6 md:px-12 text-white flex flex-col justify-center">
                  <h2 className="text-xl md:text-4xl font-bold mb-2">
                    {slide.name}
                  </h2>

                  <p className="text-sm md:text-lg opacity-90 mb-4">
                    {slide.description}
                  </p>

              {/*     <button className=" mx-auto px-2 w-50 py-3 bg-linear-to-r from-accent to-warning text-black rounded-xl font-semibold shadow-md hover:shadow-xl transition duration-300 cursor-pointer">
                    Book Service
                  </button> */}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSwiper;
