"use client";
import { useRouter } from "next/navigation";
import "./globals.css"; // Create this file for custom animations

const Page = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center ">
      <div className="text-center">
        {/* Animated 404 Text */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-800 mb-4">
            <span className="number-float">4</span>
            <span className="number-float delay-1">0</span>
            <span className="number-float delay-2">4</span>
          </h1>
        </div>

        {/* Message with fade-in animation */}
        <div className="mb-8 fade-in-up">
          <h2 className="text-3xl font-semibold text-gray-700 mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Oops! The page you're looking for seems to have wandered off into
            the digital void.
          </p>
        </div>

        {/* Back Button with hover effects */}
        <button onClick={handleGoBack} className="back-button">
          <svg
            className="button-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Page;
