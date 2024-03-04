import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="fixed top-4 right-4 z-50">
        <button onClick={toggleMenu} className="text-3xl text-black">
          <FontAwesomeIcon icon={faBars} />
        </button>
        {isOpen && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-white z-40">
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 text-4xl text-black"
            >
              &times;
            </button>
            <ul className="text-black text-4xl mt-20 text-center">
              <li className="mb-12 cursor-pointer">
                <Link to="/">Home</Link>
              </li>
              <li className="mb-12 cursor-pointer">
                <Link to="/search">Search</Link>
              </li>
              <li className="mb-12 cursor-pointer">
                <Link to="/calender">My Schedule</Link>
              </li>
              <li className="mb-12 cursor-pointer">
                <Link to="/login">Log In</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BurgerMenu;
