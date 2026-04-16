"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";

const Navbotton = () => {
  const { data: session, status } = useSession();

  const isAdmin = session?.user?.role === "admin";

  if (status === "loading") {
    return <span className="loading loading-spinner loading-sm"></span>;
  }

  const user = session?.user;

  return (
    <div>
      {/* NOT AUTH */}
      {status !== "authenticated" ? (
        <div className="flex gap-2">
          <Link href="/login" className="btn bg-blue-600 btn-sm text-white">
            Login
          </Link>

          <Link href="/register" className="btn bg-blue-600 btn-sm text-white">
            Register
          </Link>
        </div>
      ) : (
        /* AUTH USER */
        <div className="dropdown dropdown-end">
          {/* Avatar */}
          <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100">
              <Image
                src={user?.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="user"
                width={40}
                height={40}
              />
            </div>
          </div>

          {/* Dropdown */}
          <ul
            tabIndex={0}
            className="bg-white dark:bg-black mt-3 z-50 p-2 shadow-lg menu menu-sm dropdown-content rounded-box w-56"
          >
            {/* admin */}
            {isAdmin && (
              <li>
                <Link
                  href="/dashboard/paymentHistory"
                  className="flex items-center gap-2 text-[16px] dark:hover:bg-white hover:text-black"
                >
                  <MdOutlineDashboardCustomize size={18} />
                  Dashboard
                </Link>
              </li>
            )}

            {/* PROFILE */}
            <li>
              <Link
                href="/profile"
                className="flex items-center gap-2 text-[16px] dark:hover:bg-white hover:text-black"
              >
                <FaUserPlus size={18} />
                Profile
              </Link>
            </li>

            <div className="divider my-1"></div>

            {/* LOGOUT */}
            <li>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 text-[16px] ml-2 text-red-500 hover:bg-red-50"
              >
                <FiLogOut size={18} />
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbotton;
