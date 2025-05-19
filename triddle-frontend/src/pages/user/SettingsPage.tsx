import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="py-4">
          {/* Account Settings */}
          <div className="mb-6 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              Account Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  defaultValue="johndoe"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  defaultValue="john.doe@example.com"
                />
              </div>
              <div className="flex items-center">
                <input
                  id="marketingEmails"
                  name="marketingEmails"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                  defaultChecked
                />
                <label
                  htmlFor="marketingEmails"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Receive marketing emails
                </label>
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="mb-6 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              Appearance
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="theme"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Theme
                </label>
                <select
                  id="theme"
                  name="theme"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  defaultValue="system"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="fontSize"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Font Size
                </label>
                <select
                  id="fontSize"
                  name="fontSize"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  defaultValue="medium"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="mb-6 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              Notifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="emailNotifications"
                  name="emailNotifications"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                  defaultChecked
                />
                <label
                  htmlFor="emailNotifications"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Email notifications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="formSubmissionNotifications"
                  name="formSubmissionNotifications"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                  defaultChecked
                />
                <label
                  htmlFor="formSubmissionNotifications"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Form submission notifications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="accountNotifications"
                  name="accountNotifications"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                  defaultChecked
                />
                <label
                  htmlFor="accountNotifications"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Account notifications
                </label>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="mb-6 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              Privacy & Data
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="shareUsageData"
                  name="shareUsageData"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                  defaultChecked
                />
                <label
                  htmlFor="shareUsageData"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Share usage data to help improve the product
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="saveFormResponseHistory"
                  name="saveFormResponseHistory"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                  defaultChecked
                />
                <label
                  htmlFor="saveFormResponseHistory"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Save form response history
                </label>
              </div>
              <div>
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                  Download my data
                </button>
              </div>
              <div>
                <button className="text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300">
                  Delete my account
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
              Cancel
            </button>
            <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;