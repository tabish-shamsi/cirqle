export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[color:var(--primary)] text-white">
      {/* Logo or App Name */}
      <h1 className="text-4xl font-bold mb-8 animate-pulse">Cirqle</h1>

      {/* Bouncing Dots Loader */}
      <div className="flex space-x-2">
        <span className="w-4 h-4 bg-white rounded-full animate-bounce delay-0"></span>
        <span className="w-4 h-4 bg-white rounded-full animate-bounce delay-150"></span>
        <span className="w-4 h-4 bg-white rounded-full animate-bounce delay-300"></span>
      </div>

      {/* Optional: Loading text */}
      <p className="mt-6 text-lg opacity-80 animate-pulse">Loading...</p>
    </div>
  );
}
