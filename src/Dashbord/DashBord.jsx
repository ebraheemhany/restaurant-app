import { Outlet } from "react-router-dom"
import { HeaderDashbord } from "./HeaderDashbord/HeaderDashbord"
import {SideBarDashbord} from "./SideBarDashbord/SideBarDashbord"
import { useContext } from "react"
import { AppContext } from "../Context/Context"
export const DashBord = () => {

const {windowSize ,sideBarOpen} = useContext(AppContext)


  return (
    <>
    <HeaderDashbord />

    
    <div className="dash_content flex  ">
      <SideBarDashbord />
{/* ///////////////////////// */}
      <div style={{width : sideBarOpen ? "calc(100% - 240px" : "calc(100% - 60px)"}}>
        <Outlet />
      </div>


    </div>
    </>
  )
}
