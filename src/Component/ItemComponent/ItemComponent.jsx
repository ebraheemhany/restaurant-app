import React from "react";
import { BiEdit } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import { NavLink } from "react-router";
import { useContext } from "react";
import { AppContext } from "../../Context/Context";

export const ItemComponent = ({ item, key }) => {
  const {deleteItem} = useContext(AppContext)
  // clculate the new price
   const newPrice = item.price - (item.price * item.discount) / 100;

  return (
    <div
      key={key}
      className="relative bg-red-900 flex flex-col  rounded-xl w-auto overflow-hidden"
    >
      <img
        className="w-full object-contain "
        src={item.image}
        alt="img item"
      />
         <div className="pro_dis w-[100px] h-[20px] bg-amber-500 absolute top-0 left-[-25px] rotate-[-30deg]">
            <span className="flex items-center justify-center">{item.discount} %</span>
          </div>

      <div className="price_edit flex items-center justify-between m-2">
        <h3>{item.name}</h3>
        <NavLink  to={`/dashbord/EditItem/${item.id} `}>
          <span className="cursor-pointer">
            <BiEdit className="text-lg" />
          </span>
        </NavLink>
      </div>

      <span onClick={() => deleteItem(item.id)} className="cursor-pointer absolute text-2xl top-2 text-black text-2xl  right-2">
        <IoIosClose />
      </span>

      <p className="text-sm mx-1">{item.discription}</p>

     

    <div className="ml-2 mb-2">
      <p>Price : <span className="text-xl text-black/50">{newPrice}$</span></p>
    </div>


    </div>
  );
};
