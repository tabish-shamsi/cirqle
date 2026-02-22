"use client"

export default function error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[oklch(0.6879_0.2075_39.7472)] text-white px-6">
      <div className="text-6xl mb-6 animate-pulse">⚠️</div>
      <h1 className="text-4xl font-bold mb-4 text-center">
        Something went wrong
      </h1>
      <p className="text-lg text-center opacity-80 mb-6">
        Oops! An unexpected error occurred. Try refreshing the page or go back
        to the homepage.
      </p>

      <div className="flex space-x-4">
        <button
          onClick={() => location.reload()}
          className="px-6 py-3 bg-white text-[oklch(0.6879_0.2075_39.7472)] font-semibold rounded-lg hover:bg-gray-200 transition"
        >
          Retry
        </button>
        <a
          href="/"
          className="px-6 py-3 border border-white rounded-lg font-semibold hover:bg-white hover:text-[oklch(0.6879_0.2075_39.7472)] transition"
        >
          Home
        </a>
      </div>
    </div>
  );
}
