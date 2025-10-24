import Link from 'next/link';
import { useRouter } from 'next/router';

const Custom404 = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full text-center">
        {/* Animated 404 Number */}
        <div className="mb-8">
          <div className="relative">
            <span className="text-9xl font-bold text-gray-800 opacity-10 absolute -top-4 left-1/2 transform -translate-x-1/2">
              404
            </span>
            <div className="relative">
              <span className="text-8xl font-bold text-gray-800">4</span>
              <span className="text-8xl font-bold text-blue-600 mx-2">0</span>
              <span className="text-8xl font-bold text-gray-800">4</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-[1.02] transition-transform duration-300">
          {/* Icon */}
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg 
              className="w-12 h-12 text-red-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Page Not Found
          </h1>

          {/* Description */}
          <p className="text-gray-600 mb-2">
            Oops! It seems like the page you're looking for has wandered off into the digital void.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            The page you requested might have been moved, deleted, or never existed.
          </p>

          {/* Suggested Actions */}
          <div className="space-y-4 mb-8">
            <div className="text-left bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Here are some helpful links:
              </h3>
              <ul className="text-blue-700 text-sm space-y-1 ml-7">
                <li>• Check the URL for typos</li>
                <li>• Visit our homepage for latest news</li>
                <li>• Browse our popular categories</li>
                <li>• Use the search function</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.back()}
              className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </button>

            <Link href="/" className="flex-1">
              <div className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Homepage
              </div>
            </Link>
          </div>

          {/* Search Suggestion */}
          <div className="mt-8">
            <p className="text-gray-500 text-sm mb-3">Can't find what you're looking for?</p>
            <div className="flex">
              <input
                type="text"
                placeholder="Search Hmarduniya.in..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 transition-colors duration-300">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Latest News', href: '/latest' },
            { name: 'Politics', href: '/category/politics' },
            { name: 'Sports', href: '/category/sports' },
            { name: 'Entertainment', href: '/category/entertainment' },
          ].map((link) => (
            <Link key={link.name} href={link.href}>
              <div className="bg-white bg-opacity-50 backdrop-blur-sm rounded-lg p-3 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md transition-all duration-300">
                {link.name}
              </div>
            </Link>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Still need help?{' '}
            <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-semibold">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Custom404;