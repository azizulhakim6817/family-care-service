"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  const user = session?.user;

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Not logged in
      </div>
    );
  }

  return (
    <div className="min-h-screen  flex items-center justify-center  md:p-4">
      <div className=" shadow-xl rounded-2xl w-full max-w-md p-6">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <Image
            src={user.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="avatar"
            width={300}
            height={300}
            className="w-24 h-24 rounded-full border-4 border-blue-500"
          />

          <h1 className="text-xl font-bold mt-4">{user.name || "No Name"}</h1>

          <p className="">{user.email}</p>
        </div>

        {/* Info Box */}
        <div className="mt-6 space-y-3">
          <div className="flex justify-between bg-gray-50 dark:bg-black p-3 rounded-lg">
            <span className="text-gray-600 dark:text-white">Role</span>
            <span className="font-medium">User</span>
          </div>

          <div className="flex justify-between bg-gray-50 dark:bg-black p-3 rounded-lg">
            <span className="text-gray-600 dark:text-white">Status</span>
            <span className="text-green-600 font-medium">Active</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          {/*   <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Edit Profile
          </button> */}

          <button
            onClick={() => signOut()}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
