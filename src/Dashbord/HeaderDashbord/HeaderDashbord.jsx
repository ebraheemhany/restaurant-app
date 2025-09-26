import React from 'react'
import "./HeaderDashbord.css"
import logo_2 from "../../img/logo_2.png";
import { VscBell } from "react-icons/vsc";
import { Link } from 'react-router';
export const HeaderDashbord = () => {
  return (
    <div className='hedar_dash container mx-auto'>
      <div className='heder_content flex items-center justify-between'>

        <div className='header_left flex items-center justify-between gap-5'>
         <Link to={"/"}>
           <img src={logo_2} alt='logo' className='w-25' />
         </Link>

   
        </div>

    <div className='header_right flex items-center justify-between gap-10' >

   <div className='headr_search'>
       <input type='text' placeholder='search here...' />
   </div>





        </div>

      </div>

    </div>
  )
}
