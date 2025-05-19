import React from 'react';
import { Link, useParams } from 'react-router-dom';

const SubmitSuccessPage: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="px-6 py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <svg
                className="h-8 w-8 text-green-600 dark:text-green-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              Thank You!
            </h2>
            <p className="mb-8 text-gray-600 dark:text-gray-400">
              Your feedback has been successfully submitted. We appreciate your input and will use
              it to improve our services.
            </p>
            <div className="space-y-4">
              <Link
                to={`/f/${formId}`}
                className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                Submit Another Response
              </Link>
              <a
                href="https://example.com"
                className="block w-full rounded-md bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Visit Our Website
              </a>
            </div>
          </div>
        </div>

        {/* Powered By Notice */}
        <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
          Powered by <span className="font-medium">Triddle Forms</span>
        </div>
      </div>
    </div>
  );
};

export default SubmitSuccessPage;