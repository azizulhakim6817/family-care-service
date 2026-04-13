"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ href, children }) => {
  const path = usePathname();
  return (
    <div>
      <Link
        href={href}
        className={`font-medium transition-colors duration-200 ${path === href ? "text-primary font-semibold" : "text-gray-600 dark:text-white"} `}
      >
        {children}
      </Link>
    </div>
  );
};

export default NavLink;
