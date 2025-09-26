import logo_2 from "../../img/logo_2.png";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { CiUser, CiSearch } from "react-icons/ci";
import "./Heder.css";
import { useState } from "react";
import { FcMenu } from "react-icons/fc";
import { Link, useNavigate } from "react-router";

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

  return (
    <div className="header container sm:ml-5 z-80 fixed top-0 lef-0">
      <div className="header_content flex items-center justify-between">
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
              className="p-1.5 sm:flex items-center gap-2  border rounded-4xl cursor-pointer hover:bg-gray-100 hover:text-black"
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

          <Link to={"/sign"}>
            <div className="user text-2xl cursor-pointer">
              <CiUser />
            </div>
          </Link>

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
          className="fixed inset-0 bg_search  flex justify-center  z-50"
          onClick={() => setShowMenu(false)}
        >
          <ul className="flex flex-col gap-6 text-xl mt-50">
            <li onClick={() => setShowMenu(false)}>Home</li>
            <li onClick={() => setShowMenu(false)}>Menu</li>
            <li onClick={() => setShowMenu(false)}>About</li>
            <li onClick={() => setShowMenu(false)}>Contact</li>
          </ul>
        </div>
      )}
    </div>
  );
};
