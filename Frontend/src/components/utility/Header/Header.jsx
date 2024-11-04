import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import Typography from "../Typography/Typography";
import { IoMdMenu, IoMdClose, IoMdHome, IoMdChatbubbles } from "react-icons/io";
import { MdBrowseGallery, MdWork } from "react-icons/md";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full h-20 lg:h-24 flex flex-row items-center justify-between bg-light-purple px-4 md:px-6 relative">
      <Link to="/">
        <Typography variant="h2" weight="strong" className="italic">
          Airmoya
        </Typography>
      </Link>
      <nav className="hidden md:flex text-right">
        <ul className="flex flex-row items-center justify-end gap-x-4">
          {user ? (
            <>
              <li>
                <Link className="md:text-xl lg:text-2xl hover:text-dark-blue underline-offset-4 hover:underline transition-colors duration-300" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="md:text-xl lg:text-2xl hover:text-dark-blue underline-offset-4 hover:underline transition-colors duration-300" to="/chats">
                  Chats
                </Link>
              </li>
              <li>
                <Link className="md:text-xl lg:text-2xl hover:text-dark-blue underline-offset-4 hover:underline transition-colors duration-300" to="/services">
                  Services
                </Link>
              </li>
              <li>
                <Link className="md:text-xl lg:text-2xl hover:text-dark-blue underline-offset-4 hover:underline transition-colors duration-300" to="/gallery">
                  Gallery
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="md:text-xl lg:text-2xl hover:text-dark-blue underline-offset-4 hover:underline transition-colors duration-300" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="md:text-xl lg:text-2xl hover:text-dark-blue underline-offset-4 hover:underline transition-colors duration-300" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <button className="md:hidden z-20 mr-4" onClick={toggleMenu} aria-label="Toggle menu">
        {isMenuOpen ? (
          <IoMdClose size={30} className="text-dark-blue hover:text-white hover:bg-dark-blue rounded-md" />
        ) : (
          <IoMdMenu size={30} className="text-dark-blue hover:text-white hover:bg-dark-blue rounded-md" />
        )}
      </button>
      {isMenuOpen && (
        <div className="fixed top-20 right-0 h-screen w-1/2 bg-white shadow-lg shadow-light-purple py-6 z-10">
          <ul className="flex flex-col items-start">
            {user ? (
              <>
                <li className="group w-full">
                  <Link className="w-full text-2xl group-hover:bg-veryLight-purple group-hover:text-purple border-l-8 border-white hover:border-purple px-5 py-4 transition-colors duration-300 flex items-center gap-2" to="/" onClick={toggleMenu}>
                    <IoMdHome size={24} />
                    Home
                  </Link>
                </li>
                <li className="group w-full">
                  <Link className="w-full text-2xl group-hover:bg-veryLight-purple group-hover:text-purple border-l-8 border-white hover:border-purple px-5 py-4 transition-colors duration-300 flex items-center gap-2" to="/chats" onClick={toggleMenu}>
                    <IoMdChatbubbles />
                    Chats
                  </Link>
                </li>
                <li className="group w-full">
                  <Link className="w-full text-2xl group-hover:bg-veryLight-purple group-hover:text-purple border-l-8 border-white hover:border-purple px-5 py-4 transition-colors duration-300 flex items-center gap-2" to="/services" onClick={toggleMenu}>
                    <MdWork />
                    Services
                  </Link>
                </li>
                <li className="group w-full">
                  <Link className="w-full text-2xl group-hover:bg-veryLight-purple group-hover:text-purple border-l-8 border-white hover:border-purple px-5 py-4 transition-colors duration-300 flex items-center gap-2" to="/gallery" onClick={toggleMenu}>
                    <MdBrowseGallery />
                    Gallery
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="group w-full">
                  <Link className="w-full text-2xl group-hover:bg-veryLight-purple group-hover:text-purple border-l-8 border-white hover:border-purple px-5 py-4 transition-colors duration-300 flex items-center gap-2" to="/login" onClick={toggleMenu}>
                    Login
                  </Link>
                </li>
                <li className="group w-full">
                  <Link className="w-full text-2xl group-hover:bg-veryLight-purple group-hover:text-purple border-l-8 border-white hover:border-purple px-5 py-4 transition-colors duration-300 flex items-center gap-2" to="/register" onClick={toggleMenu}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;