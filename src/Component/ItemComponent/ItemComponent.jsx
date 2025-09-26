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
      className="relative bg-red-900 flex flex-col gap-4 p-2 rounded-xl w-auto sm:max-w-[300px]"
    >
      <img
        className="w-full h-80 object-contain rounded-2xl"
        src={item.image}
        alt="img item"
      />

      <div className="price_edit flex items-center justify-between">
        <h3>{item.name}</h3>
         
        <NavLink  to={`/dashbord/EditItem/${item.id} `}>
          <span className="cursor-pointer">
            <BiEdit />
          </span>
        </NavLink>
      </div>

      <span onClick={() => deleteItem(item.id)} className="cursor-pointer text-2xl absolute top-5 right-5">
        <IoIosClose />
      </span>

      <p>{item.discription}</p>

      <div className="price_edit flex items-center justify-between">
        <p>price : <span className="line-through text-xl text-black/50">{item.price}</span> $</p>
        <p>
          Discount : <span className="text-xl text-black/50">{item.discount} %</span>
        </p>
      </div>

    <div className="">
      <p>new Price : <span className="text-xl text-black/50">{newPrice}</span></p>
    </div>


    </div>
  );
};
