


import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import banner_1 from "../../img/banner_1.jpg";
import banner_2 from "../../img/banner_2.jpg";

export const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: false,
    adaptiveHeight: true,
    appendDots: dots => (
      <div  style={{ bottom: "20px", padding: "10px" }}>
        <ul className="flex justify-center items-center gap-2 md:gap-3"> {dots} </ul>
      </div>
    )
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 md:px-6 my-12">
      <Slider {...settings}>
        <div>
          <img
            src={banner_1}
            alt="banner 1"
             className="w-full h-auto md:h-[250px] lg:h-[300px] object-cover rounded-2xl"
          />
        </div>
        <div>
          <img
            src={banner_2}
            alt="banner 2"
            className="w-full h-auto md:h-[250px] lg:h-[300px] object-cover rounded-2xl"
          />
        </div>
      </Slider>
    </div>
  );
};
