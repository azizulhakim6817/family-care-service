"use client";

import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // show button only when user scrolls down
      if (window.scrollY > 200) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0, // navbar/top
      behavior: "smooth",
    });
  };

  if (!show) return null;

  return (
    <button
      onClick={handleClick}
      className="
    fixed bottom-6 right-2 z-9999
    flex items-center justify-center
    w-10 h-10
    rounded-full
    bg-linear-to-r from-blue-500 to-indigo-600
    text-white
    shadow-lg
    hover:shadow-2xl
    hover:scale-110
    active:scale-95
    transition-all duration-300 ease-in-out
    animate-pulse
  "
    >
      ↑
    </button>
  );
}
