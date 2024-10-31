import React from "react";
import { Link } from "react-router-dom";
import Typography from "../Typography/Typography";

const Header = () => {
  return (
    <header className="w-full flex flex-row items-center justify-between bg-light-purple p-4 md:p-6">
      <div className="flex-1">
        <Link to="/">
          <Typography variant="h4" weight="strong" className="italic">
            Airmoya
          </Typography>
        </Link>
      </div>
      <nav className="flex-1 text-right">
        <ul className="flex flex-row items-center justify-end gap-x-4">
          <li>
            <Link
              className="hover:text-dark-blue underline-offset-4 hover:underline transition-colors duration-300"
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-dark-blue underline-offset-4 hover:underline transition-colors duration-300"
              to="/chats"
            >
              Chats
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-dark-blue underline-offset-4 hover:underline transition-colors duration-300"
              to="/services"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-dark-blue underline-offset-4 hover:underline transition-colors duration-300"
              to="/gallery"
            >
              Gallery
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;