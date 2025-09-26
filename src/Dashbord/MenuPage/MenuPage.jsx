import React, { useState } from "react";
import "./MenuPage.css";
import { IoIosClose } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { NavLink } from "react-router";
import { useContext } from "react";
import { AppContext } from "../../Context/Context";
import { Loading } from "../../Component/Laoding/Laoding";
import { Search } from "../../Component/Searsh/Search";
import { Alert } from "../../Component/Alert/Alert";
import { Filter } from "../../Component/Filter/Filter";
export const MenuPage = () => {
const [searsh , setSearsh] = useState("")
const [filteredItem , setFilteredItem] = useState([])
const {getData , laoding , deleteItem} = useContext(AppContext)

const filterItemDiscount = () => {
  return getData.filter((item) => item.discount === 0 )
}

  return (
    <div className="menu_page h-full">
      <div className="menu_content md:p-10 ">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold pb-3 ">Menu</h1>
          <div className="flex items-center gap-4 pb-3">
       <Search searsh={searsh} setSearsh={setSearsh} setFilteredItem={setFilteredItem} />
            <NavLink to={"/dashbord/addItem"} className="bg-yellow-500 p-2 rounded-lg font-bold cursor-pointer hover:bg-yellow-600">
              Add Item
            </NavLink>
          </div>
        </div>
         <div className="menu_items grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  gap-4 ">


   { laoding ? (
            
             <div className="relative">
               <Loading />
             </div>
            
          ) :
          filteredItem.length > 0 ? (
            
              filteredItem.map((item , idx) => (
                   <div
                key={idx}
                className="menu_item bg-red-900 flex gap-4 p-2 rounded-xl w-full"
              >
                <img
                  className="w-25 h-auto object-contain rounded-2xl"
                  src={item.image}
                  alt="img item"
                />

                <div className="item_info flex flex-col gap-2 mt-3 w-full">
                  <div className="name_delete flex items-center justify-between">
                    <h3>{item.name}</h3>
                    <span className="cursor-pointer text-2xl" onClick={() => deleteItem(item.id)}>
                      <IoIosClose />
                    </span>
                  </div>

                  <p>{item.category}</p>

                  <div className="price_edit flex items-center justify-between">
                    <p>{item.price} $</p>
                    <NavLink to={`/dashbord/EditItem/${item.id}`}>
                         <span className="cursor-pointer">
                      <BiEdit />
                    </span>
                    </NavLink>
                  </div>
                </div>
              </div>
              ))
            
          ) :
           filterItemDiscount().length > 0 ? (
            filterItemDiscount().map((item, idx) => (
             
              <div
                key={idx}
                className="menu_item bg-red-900 flex gap-4 p-2 rounded-xl w-full"
              >
                <img
                  className="w-25 h-auto object-contain rounded-2xl"
                  src={item.image}
                  alt="img item"
                />

                <div className="item_info flex flex-col gap-2 mt-3 w-full">
                  <div className="name_delete flex items-center justify-between">
                    <h3>{item.name}</h3>
                    <span>
                      <IoIosClose />
                    </span>
                  </div>

                  <p>{item.category}</p>

                  <div className="price_edit flex items-center justify-between">
                    <p>{item.price} $</p>
                    <span>
                      <BiEdit />
                    </span>
                  </div>
                </div>
              </div>
              
            ))
          ) : (
            <h1 className="text-2xl font-bold text-center col-span-full">
              No Items Yet
            </h1>
          )}
    

        </div>
        </div>
        <Filter data={getData} setFiltered={setFilteredItem} />
      </div>
    
  );
};
