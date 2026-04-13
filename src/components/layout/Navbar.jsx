"use client";

import React, { useState } from "react";
import Link from "next/link";
import NavLink from "../button/NavLink";
import Navbutton from "../button/Navbutton";
import ThemeToggle from "../themeToggle/ThemeToggle";
import Logo from "../logo/Logo";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const links = (
    <>
      <li>
        <NavLink href="/">Home</NavLink>
      </li>
      <li>
        <NavLink href="/service">Services</NavLink>
      </li>

      <li>
        <NavLink href="/my-booking">My Bookings</NavLink>
      </li>
      <li>
        <NavLink href="/about">About</NavLink>
      </li>
      <li>
        <NavLink href="/contact">Contact</NavLink>
      </li>
    </>
  );

  return (
    <nav className="navbar shadow-sm px-4 md:px-12 dark:bg-black/80 w-full z-50">
      {/* Navbar Start */}
      <div className="navbar-start flex items-center">
        {/* Mobile Dropdown */}
        <div className="dropdown lg:hidden">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="btn btn-ghost"
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            className={`menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow transition-transform duration-300 ${
              dropdownOpen ? "scale-100" : "scale-0"
            } origin-top`}
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <Link href="/" className="ml-2 md:ml-0">
          <Logo />
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-2">
        <ThemeToggle />
        <Navbutton />
      </div>
    </nav>
  );
};

export default Navbar;
