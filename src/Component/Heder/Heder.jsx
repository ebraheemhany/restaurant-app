import logo_2 from "../../img/logo_2.png";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { CiUser, CiSearch } from "react-icons/ci";
import "./Heder.css";
import { useState } from "react";
import { FcMenu } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
export const Heder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const handelClose = () => setIsOpen(false);
  const handelOpen = () => setIsOpen(true);
  const [search, setSearch] = useState("");
  const navegate = useNavigate();
  const getCartItems = JSON.parse(
    window.localStorage.getItem("cartItems") || "[]"
  );

  const handelSubmit = (e) => {
    e.preventDefault();
    navegate(`/search?q=${search}`);
    handelClose();
  };

  // get user From localStroge
  const user = JSON.parse(window.localStorage.getItem("user_Info") || "null");

  // function to remove user from localStroge
  const removeUserFromLocalS = () => {
    window.localStorage.removeItem("user_Info");

    window.location.reload();
  };
  return (
    <div className="header w-full sm:ml-5 z-80 fixed top-0 lef-0">
      <div className="header_content container mx-auto  flex items-center justify-between">
        {/* logo */}
        <div className="logo">
          <Link to={"/"}>
            <img className="w-25" src={logo_2} alt="logo" />
          </Link>
        </div>

        {/* nav links */}
        <div className="content">
          <ul className="hidden md:flex items-center justify-between gap-6 text-xl">
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <Link to={"/menuPage"}>
              <li>Menu</li>
            </Link>

            <Link to={"/contact"}>
              <li>Contact</li>
            </Link>
          </ul>
        </div>

        {/* icons */}
        <div className="cart_user flex items-center justify-between gap-3 md:gap-8 ">
          <div className="relative">
            {/* start icon search */}
            <div
              className="search p-2.5 sm:flex items-center gap-2  border rounded-4xl cursor-pointer "
              onClick={handelOpen}
            >
              <span className="text-sm text-gray-500 hidden sm:block">
                Search...
              </span>
              <CiSearch className="text-lg sm:text-sm" />
            </div>
            {/* end icon search */}
          </div>
          <Link to={"/cartPage"}>
            <div className="relative cart text-2xl cursor-pointer">
              <PiShoppingCartSimpleThin />
              <span className="absolute top-0 right-1 text-sm">
                {getCartItems.length > 0 ? getCartItems.length : 0}
              </span>
            </div>
          </Link>

      <div className="hidden md:flex">
            {user ? (
            <div
              onClick={removeUserFromLocalS}
              className="user text-2xl cursor-pointer"
            >
              <CiLogin />
            </div>
          ) : (
            <Link to={"/sign"}>
              <div className="user   text-2xl cursor-pointer">
                <CiUser />
              </div>
            </Link>
          )}
      </div>
<div className="hidden md:flex">
  
          {user && user.user.email == "admin1@gmail.com" && (
            <Link to={"/dashbord"}>
              <div className="user text-2xl cursor-pointer">
                <BsFillMenuButtonWideFill />
              </div>
            </Link>
          )}
</div>

          <div
            className="menu md:hidden flex items-center justify-center "
            onClick={() => setShowMenu(!showMenu)}
          >
            <span>
              <FcMenu />
            </span>
          </div>
        </div>
      </div>

      {/* overlay + popup */}
      {isOpen && (
        <div className="fixed inset-0 bg_search  flex items-center justify-center z-50">
          <div className="bg_greay w-96 sm:w-120 rounded-xl shadow-lg p-6 relative">
            <button
              onClick={handelClose}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-2xl"
            >
              ×
            </button>
            <h2 className="text-lg font-semibold mb-4">Search</h2>
            <form onSubmit={handelSubmit} className="flex items-center gap-3 ">
              <input
                type="text"
                placeholder="Search here..."
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="submit"
                className="bg-amber-500 p-2 rounded-xl cursor-pointer "
              >
                search
              </button>
            </form>
          </div>
        </div>
      )}

      {showMenu && (
        <div
          className="fixed inset-0 bg-black/85  flex justify-center  z-50"
          onClick={() => setShowMenu(false)}
        >


         <div className="mt-[200px] mx-auto flex flex-col  ">
           <ul className="flex flex-col justify-center ">
            <Link to="/" onClick={() => setShowMenu(false)}> 
              <span className="w-full flex justify-center mt-3 text-2xl">Home</span>
            </Link>
            <Link to="/menuPage" onClick={() => setShowMenu(false)}>
               <span className="w-full flex justify-center mt-3 text-2xl">Menu</span>
            </Link>
            <Link to="/contact" onClick={() => setShowMenu(false)}>
               <span className="w-full flex justify-center mt-3 text-2xl">Contact</span>
            </Link>
           </ul>


         <div className="x_button flex justify-center w-80 border-1 border-amber-600  text-white p-2 rounded-sm mt-6 duration-500 ">
            {user ? (
       <button onClick={removeUserFromLocalS} className=" text-2xl cursor-pointer flex items-center gap-2 justify-center">
         Log Out <span className="mt-2"><CiLogin /></span>
       </button>
          ) : (
            <Link to={"/sign"}>
              <button className=" text-2xl cursor-pointer flex items-center gap-2 justify-center w-full">
               SignUp <span className="mt-2"><CiUser /></span>
              </button>
            </Link>
          )}
         </div>

<div className="x_button flex justify-center w-80 border-1 border-amber-600  text-white p-2 rounded-sm mt-6 duration-500">
  
          {user && user.user.email == "admin1@gmail.com" && (
            <Link to={"/dashbord"}>
              <button className="text-2xl cursor-pointer flex items-center gap-2 justify-center w-full">
              DashBord
              </button>
            </Link>
          )}
</div>

         </div>
          
        </div>
      )}
    </div>
  );
};
