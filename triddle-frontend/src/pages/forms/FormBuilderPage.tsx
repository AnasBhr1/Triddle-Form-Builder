import React from 'react';

const FormBuilderPage: React.FC = () => {
  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Form Builder</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="mb-6 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              Form Details
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Form Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter form title"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter form description"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="mb-6 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Form Fields</h2>
              <div className="flex space-x-2">
                <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Add Field
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Example Field 1 */}
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white">Text Field</h3>
                  <div className="flex space-x-2">
                    <button className="rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                      Edit
                    </button>
                    <button className="rounded-md bg-red-100 px-2 py-1 text-xs text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800">
                      Delete
                    </button>
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Please enter your full name
                  </p>
                </div>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="John Doe"
                  disabled
                />
                <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <span className="mr-2 rounded-full bg-green-100 px-2 py-0.5 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Required
                  </span>
                </div>
              </div>

              {/* Example Field 2 */}
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white">Email Field</h3>
                  <div className="flex space-x-2">
                    <button className="rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                      Edit
                    </button>
                    <button className="rounded-md bg-red-100 px-2 py-1 text-xs text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800">
                      Delete
                    </button>
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    We'll use this to contact you
                  </p>
                </div>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="john@example.com"
                  disabled
                />
                <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <span className="mr-2 rounded-full bg-green-100 px-2 py-0.5 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Required
                  </span>
                </div>
              </div>

              {/* Example Field 3 */}
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white">
                    Select Field
                  </h3>
                  <div className="flex space-x-2">
                    <button className="rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                      Edit
                    </button>
                    <button className="rounded-md bg-red-100 px-2 py-1 text-xs text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800">
                      Delete
                    </button>
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    How did you hear about us?
                  </label>
                </div>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  disabled
                >
                  <option>Please select</option>
                  <option>Search Engine</option>
                  <option>Social Media</option>
                  <option>Referral</option>
                  <option>Other</option>
                </select>
                <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <span className="mr-2 rounded-full bg-gray-100 px-2 py-0.5 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    Optional
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                Save as Draft
              </button>
              <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Publish Form
              </button>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Form Settings</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center">
                  <input
                    id="showProgressBar"
                    name="showProgressBar"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <label
                    htmlFor="showProgressBar"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    Show progress bar
                  </label>
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <input
                    id="allowMultipleSubmissions"
                    name="allowMultipleSubmissions"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <label
                    htmlFor="allowMultipleSubmissions"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    Allow multiple submissions from the same device
                  </label>
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <input
                    id="autoSave"
                    name="autoSave"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <label
                    htmlFor="autoSave"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    Enable auto-save (saves every 30 seconds)
                  </label>
                </div>
              </div>
              <div>
                <label
                  htmlFor="submitButtonText"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Submit Button Text
                </label>
                <input
                  type="text"
                  id="submitButtonText"
                  name="submitButtonText"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Submit"
                />
              </div>
              <div>
                <label
                  htmlFor="successMessage"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Success Message
                </label>
                <textarea
                  id="successMessage"
                  name="successMessage"
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Thank you for your submission!"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="redirectUrl"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Redirect URL (Optional)
                </label>
                <input
                  type="text"
                  id="redirectUrl"
                  name="redirectUrl"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="https://example.com/thank-you"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Redirect users to this URL after form submission
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBuilderPage;