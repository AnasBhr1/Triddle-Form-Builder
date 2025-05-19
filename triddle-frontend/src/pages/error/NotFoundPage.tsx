import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center dark:bg-gray-900">
      <h1 className="mb-4 text-6xl font-bold text-gray-900 dark:text-white">404</h1>
      <h2 className="mb-8 text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Page Not Found
      </h2>
      <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default NotFoundPage;