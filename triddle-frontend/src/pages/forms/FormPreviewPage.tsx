import React from 'react';
import { useParams } from 'react-router-dom';

const FormPreviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Form Preview</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Preview of: Customer Feedback Form
        </p>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex gap-2">
              <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                Desktop View
              </button>
              <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                Mobile View
              </button>
            </div>
            <div className="flex gap-2">
              <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                Copy Link
              </button>
              <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Open in New Tab
              </button>
            </div>
          </div>

          {/* Form Preview Container */}
          <div className="mx-auto max-w-2xl overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
            {/* Form Header */}
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Customer Feedback Form
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                We value your feedback! Please take a moment to let us know how we're doing.
              </p>
            </div>

            {/* Form Body */}
            <div className="px-6 py-4">
              <div className="mb-6 flex items-center justify-between">
                <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-2 rounded-full bg-indigo-600 dark:bg-indigo-500"
                    style={{ width: '20%' }}
                  ></div>
                </div>
                <span className="ml-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                  Step 1 of 5
                </span>
              </div>

              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Please enter your full name
                  </p>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    We'll use this to contact you if needed
                  </p>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Select Field */}
                <div>
                  <label
                    htmlFor="hearAbout"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    How did you hear about us?
                  </label>
                  <select
                    id="hearAbout"
                    name="hearAbout"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Please select</option>
                    <option value="searchEngine">Search Engine</option>
                    <option value="socialMedia">Social Media</option>
                    <option value="referral">Referral</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Rating Field */}
                <div>
                  <label
                    htmlFor="rating"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    How would you rate our product? <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2 flex items-center space-x-4">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <div key={rating} className="flex items-center">
                        <input
                          id={`rating-${rating}`}
                          name="rating"
                          type="radio"
                          value={rating}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600"
                        />
                        <label
                          htmlFor={`rating-${rating}`}
                          className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                        >
                          {rating}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Textarea Field */}
                <div>
                  <label
                    htmlFor="feedback"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Your Feedback <span className="text-red-500">*</span>
                  </label>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Please provide any additional feedback you'd like to share
                  </p>
                  <textarea
                    id="feedback"
                    name="feedback"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Share your thoughts here..."
                  />
                </div>

                {/* Submit Button */}
                <div className="mt-6 flex justify-between">
                  <button
                    type="button"
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
              Back to Editor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPreviewPage;