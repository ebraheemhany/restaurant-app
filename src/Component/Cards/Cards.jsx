import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Cards.css";
import { CiShoppingCart, CiHeart } from "react-icons/ci";
import { BigCard } from "../BigCard/BigCard";
import { Link } from "react-router";

export const Cards = ({ title, data , more }) => {
var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4, // خليه 4 بدل 5 كبداية أساسية
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 1420,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};


  return (
    <div className="cards  ">
      <div className="cards_content w-full ">
        <div className="flex items-center justify-between">
          <h4 className="text-lg md:text-xl">{title}</h4>
      <Link to={more}>
          <p className="border py-2 px-3 rounded-2xl text-xl cursor-pointer hover:bg-amber-600 ">
            more..
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
