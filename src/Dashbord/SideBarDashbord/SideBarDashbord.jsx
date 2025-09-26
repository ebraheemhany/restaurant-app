
import { BsMenuButtonWideFill } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import "./SideBarDashbord.css"
import {  NavLink } from "react-router";
import { useContext } from "react";
import { AppContext } from "../../Context/Context";

export const SideBarDashbord = () => {
  
const {windowSize , sideBarOpen , setSideBarOpen} = useContext(AppContext);
// console.log(windowSize)





  return (
    <div className="side_bar relative">

      <div className={`side_content flex flex-col justify-between gap-5 bg-black  ${sideBarOpen ? "w-60" : "w-16"}  transition-all duration-500 `} >

    

    <div className="flex flex-col relative" >
  <div className="slde_icons absolute -top-12 right-2">
        <span className="text-3xl hover:text-amber-300 cursor-pointer duration-1000" onClick={() => setSideBarOpen(!sideBarOpen)}>
          <TbLogout2 />
        </span>
      </div>

      <NavLink to={"/dashbord/dash"} className="side_item flex items-center gap-3">
          <span>
            <BsMenuButtonWideFill />
          </span>
          <span style={{display : sideBarOpen ? "block" : "none"}}>DashBord</span>
        </NavLink>

        <NavLink to={"/dashbord/menu"} className="side_item flex items-center gap-3">
          <span>
            <BsMenuButtonWideFill />
          </span>
          <span style={{display : sideBarOpen ? "block" : "none"}}>Menu</span>
        </NavLink>

      
        <NavLink to={"/dashbord/itemOffers"} className="side_item flex items-center gap-3">
          <span>
            <BsMenuButtonWideFill />
          </span>
          <span style={{display : sideBarOpen ? "block" : "none"}}>Item Offers</span>
        </NavLink>


        <NavLink to={"/dashbord/Orders"} className="side_item flex items-center gap-3">
          <span>
            <BsMenuButtonWideFill />
          </span>
          <span style={{display : sideBarOpen ? "block" : "none"}}>Orders</span>
        </NavLink>



        </div>
  <div className="mb-30   ">
<div className="side_item flex items-center gap-3" >
  <p  style={{display : sideBarOpen ? "block" : "none"}}>LogOut</p>
<span><IoIosLogOut className="text-2xl" /></span>
</div>
  </div>

      </div>
    </div>
  );
};
