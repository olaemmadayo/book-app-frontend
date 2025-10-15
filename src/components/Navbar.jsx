import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineUser } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa6";
import { HiOutlineShoppingCart } from "react-icons/hi";
import avatarImg from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Dashbord", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Checkout", href: "/checkout" },
];

const Navbar = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  //console.log(cartItems);

  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  //const currentUser = false;
  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6 font-primary">
      <nav className="flex justify-between items-center">
        {/* left side */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <FaBars className="w-6 h-6" />
          </Link>

          {/* search input */}
          <div className="relative sm:w-72 w-40 space-x-2">
            <IoIosSearch className="absolute inline-block left-2 inset-y-2" />
            <input
              type="text"
              placeholder="search here"
              className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* right side  */}
        <div className="relative flex items-center md:space-x-3 space-x-2 ">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
                  <img
                    src={avatarImg}
                    alt=""
                    className={`size-7 rounded-full 
                        ${currentUser ? "ring-2 ring-blue-500" : ""} `}
                  />
                </button>
                {/* show Drop down */}
                {isDropDownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropDownOpen(false)}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                        onClick={handleLogout} 
                        className="block px-4 w-full py-2 text-sm hover:bg-gray-100 text-left">Logout</button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <HiOutlineUser className="size-6" />
              </Link>
            )}
          </div>

          <button className="hidden sm:block">
            <FaRegHeart className="size-6" />
          </button>
          <Link
            to="/cart"
            className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm"
          >
            <HiOutlineShoppingCart className="size-6" />
            {cartItems.lenght > 0 ? (
              <span className="text-sm font-semibold sm:ml-1">
                {cartItems.length}
              </span>
            ) : (
              <span className="text-sm font-semibold sm:ml-1">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
