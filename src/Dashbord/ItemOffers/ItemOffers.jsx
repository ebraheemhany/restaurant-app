import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import { NavLink } from "react-router";
import { Loading } from "../../Component/Laoding/Laoding";
import { Search } from "../../Component/Searsh/Search";
import { ItemComponent } from "../../Component/ItemComponent/ItemComponent";
import { useContext } from "react";
import { AppContext } from "../../Context/Context";
import { Filter } from "../../Component/Filter/Filter";
export const ItemOffers = () => {
  const { getData, laoding  } = useContext(AppContext);
  const [serach, setSearch] = useState("");
  const [filteredItem, setFilteredItem] = useState([]);

  const filterData = () => {
    return getData.filter((item) => item.discount && item.discount > 0);
  };
    
  const filterSesrchDiscount = () => {
    return filteredItem.filter((item) => item.discount && item.discount > 0);
  };

  return (
    <div className="menu_page h-full">
      <div className="menu_content p-10 ">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold pb-3 ">Items Offers</h1>

          <div className="flex items-center gap-4 pb-3">
            <Search
              searsh={serach}
              setSearsh={setSearch}
              setFilteredItem={setFilteredItem}
            />
            <NavLink
              to={"/dashbord/AddItemOffers"}
              className="bg-yellow-500 p-2 rounded-lg font-bold cursor-pointer hover:bg-yellow-600"
            >
              Add Item
            </NavLink>
          </div>
        </div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2  sm:gap-4 w-full"> 
          {laoding ? (
            <div className="relative">
              <Loading />
            </div>
          ) : filterSesrchDiscount().length > 0 ? (
            filterSesrchDiscount().map((item, idx) => {
              return <ItemComponent item={item} key={idx} />;
            })
          ) : filterData().length > 0 ? (
            filterData().map((item, idx) => {
              return <ItemComponent item={item} key={idx} />;
            })
          ) : (
            <h1 className="text-2xl font-bold text-center col-span-full">
              No Items Yet
            </h1>
          )}
        </div>
      </div>
     
    </div>
  );
};
