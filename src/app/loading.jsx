import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className=" animate-pulse">{/*  <Logo /> */}</div>

      <span
        className="
    loading 
    loading-infinity 
    text-blue-500
    w-8 h-8
    sm:w-12 sm:h-12
    md:w-16 md:h-16
    lg:w-20 lg:h-20
  "
      ></span>
    </div>
  );
};

export default Loading;
