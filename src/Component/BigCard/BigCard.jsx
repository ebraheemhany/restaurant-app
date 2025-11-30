import React, { useContext } from "react";
import { CiHeart, CiShoppingCart } from "react-icons/ci";

import { AppContext } from "../../Context/Context";
import { Link } from "react-router";
export const BigCard = ({ item, idx }) => {
  const { AddToCart } = useContext(AppContext);

  const newPrice = item.price - (item.price * item.discount) / 100;

  return (
    <div key={idx} className="card relative mx-10 max-h-200">
      <Link to={`/itemDetails/${item.id}`}>
        <img src={item.image} alt={item.name} />
        {item.discount > 0 ? (
          <div className="pro_dis">
            <span>{item.discount} %</span>
          </div>
        ) : (
          ""
        )}
      </Link>
      <h3>{item.name}</h3>
      <p>{item.category}</p>

      <div className="flex items-center justify-between">
        <p>
          Price:
          <span className=" text-neutral-600">{item.price}$</span>
        </p>
      </div>

      <div className="icon flex gap-3">
        <span onClick={() => AddToCart(item)}>
          <CiShoppingCart />
        </span>
        <span>
          <CiHeart />
        </span>
      </div>
    </div>
  );
};
