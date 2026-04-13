import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-gray-800">
      <h1 className="text-9xl font-bold mb-4">404</h1>
      <h2 className="text-3xl mb-2">Page Not Found</h2>
      <p className="mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-accent text-white rounded hover:bg-secondary transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
