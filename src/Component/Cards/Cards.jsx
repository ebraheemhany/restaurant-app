import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Cards.css";
import { CiShoppingCart, CiHeart } from "react-icons/ci";
import { BigCard } from "../BigCard/BigCard";
import { Link } from "react-router";

export const Cards = ({ title, data , more }) => {
    const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth < 450) setSlidesToShow(1);
      else if (window.innerWidth < 768) setSlidesToShow(2);
      else if (window.innerWidth < 1024) setSlidesToShow(3);
      else if (window.innerWidth < 1420) setSlidesToShow(4);
      else setSlidesToShow(5);
    };

    updateSlides(); // استدعاء مرة أولى عند تحميل الصفحة
    window.addEventListener("resize", updateSlides);

    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
  };




  return (
    <div className="cards  ">
      <div className="cards_content w-full ">
        <div className="flex items-center justify-between">
          <h4 className="text-xl md:text-2xl font-bold text-amber-600">{title}</h4>
      <Link to={more}>
          <p className="border py-2 px-3 rounded-2xl text-xl cursor-pointer hover:bg-amber-600 ">
            More
          </p>
      </Link>
        </div>

        <div className=" my-10">
          <Slider {...settings}>
            {data && data.length > 0 ? (
              data.map((item, idx) => {
        

                return (
                 <BigCard item={item} key={idx} />
                );
              })
            ) : (
              <p className="text-center">No products available</p>
            )}
          </Slider>
        </div>
      </div>
    </div>
  );
};
