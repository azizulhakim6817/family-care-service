"use client";
import Link from "next/link";

const Error = ({ error, reset }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-accent px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
      <p className="mb-6">
        {error?.message || "An unexpected error occurred."}
      </p>

      {/* Retry button */}
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Try Again
      </button>

      {/* Optional home link */}
      <Link href="/" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Go Back Home
      </Link>
    </div>
  );
};

export default Error;
