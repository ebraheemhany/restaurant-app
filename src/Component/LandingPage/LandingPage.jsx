import React, { useEffect, useState } from "react";
import v_1 from "../../img/v_1.mp4";
import v_2 from "../../img/v_2.mp4";
import v_3 from "../../img/v_3.mp4";
import { Link } from "react-router";

export const LandingPage = () => {
  const videos = [v_1, v_2, v_3];
  const [curentVideo, setCurentVideo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurentVideo((prev) => (prev + 1) % videos.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [videos.length]);

  return (
    <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-screen overflow-hidden">
      {/* الخلفية فيديو */}
      <video
        key={curentVideo}
        src={videos[curentVideo]}
        autoPlay
        loop={false}
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/70" />

      {/* المحتوى */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4 leading-relaxed max-w-2xl">
          Welcome to our restaurant, where authentic flavors meet unforgettable
          moments.
        </h1>
        <h3 className="text-base sm:text-lg md:text-2xl mb-6">
          Every meal... a moment of happiness
        </h3>
        <Link to={"/menuPage"}>
          <button className="px-6 py-3 bg-amber-500 rounded-xl text-base sm:text-lg font-semibold hover:bg-amber-700 cursor-pointer">
            Order Now
          </button>
        </Link>
      </div>
    </div>
  );
};
