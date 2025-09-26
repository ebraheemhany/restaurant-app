import React, { useState } from "react";
import { Heder } from "../../Component/Heder/Heder";
import { useContext } from "react";
import { AppContext } from "../../Context/Context";
import { Link } from "react-router";
import { Filter } from "../../Component/Filter/Filter";

export const PageMenu = () => {
  const { getData } = useContext(AppContext);
  const [filtered , setFiltered] = useState(getData)
  return (
    <>
      <Heder />
      <div className="menu container mx-auto my-40">
        <div className="menu_item">
          <h1 className="text-2xl md:text-4xl font-bold text-center text-amber-500 ml-6 mb-6">
            Menu
          </h1>

          <div className=" grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  gap-4">
            {filtered.length &&
              filtered.map((item, idx) => {
                return (
                <Link to={`/itemDetails/${item.id}`}>
                    <div
                    key={idx}
                    className="menu_item bg-red-900 block mx-auto w-4/5 sm:flex gap-4 p-2 rounded-xl sm:mx-0 sm:w-full  "
                  >
                    <img
                      className=" w-25 mx-auto h-auto object-contain rounded-2xl"
                      src={item.image}
                      alt="img item"
                    />

                    <div className="item_info flex flex-col gap-2 mt-3 w-full text-center">
                      
                        <h3 className="text-center">{item.name}</h3>
               

                      <p>{item.category}</p>

                    
                        <p>{item.price} $</p>
          
            
                    </div>
                  </div>
                </Link>
                );
              })}
          </div>
        </div>
      </div>

      <>
      <Filter data={getData} setFiltered={setFiltered} />
      </>
    </>
  );
};
