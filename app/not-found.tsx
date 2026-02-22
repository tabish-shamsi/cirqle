"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[oklch(0.6879_0.2075_39.7472)] text-white px-6 text-center">
      
      {/* Big 404 */}
      <h1 className="text-9xl font-extrabold mb-4 animate-pulse">404</h1>

      {/* Heading */}
      <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>

      {/* Description */}
      <p className="text-lg opacity-80 mb-8 max-w-md">
        Oops! The page you are looking for does not exist or has been moved. 
        Maybe go back home or check the link again.
      </p>

      {/* Buttons */}
      <div className="flex space-x-4">
        <Link
          href="/"
          className="px-6 py-3 bg-white text-[oklch(0.6879_0.2075_39.7472)] font-semibold rounded-lg hover:bg-gray-200 transition"
        >
          Go Home
        </Link>
        <button
          onClick={() => location.reload()}
          className="px-6 py-3 border border-white rounded-lg font-semibold hover:bg-white hover:text-[oklch(0.6879_0.2075_39.7472)] transition"
        >
          Refresh
        </button>
      </div>

      {/* Optional footer */}
      <p className="mt-10 opacity-50 text-sm">
        If this keeps happening, contact support.
      </p>
    </div>
  );
}