import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '../Typography/Typography';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col md:flex-row items-center justify-between bg-light-purple p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-center">
        <Typography variant="h4" weight="strong" className="italic">
          Airmoya
        </Typography>
        <p className="mt-2 md:mt-0 md:ml-4 text-center md:text-left">
          &copy; {currentYear} Airmoya Development Task built by{' '}
          <a
            href="https://github.com/fevenseyfu"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-dark-blue"
          >
            Feven Seyfu
          </a>
        </p>
      </div>
      <nav className="mt-4 md:mt-0">
        <ul className="flex flex-row items-center gap-x-4">
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
              to="/services"
            >
              Services
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
              to="/gallery"
            >
              Gallery
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;