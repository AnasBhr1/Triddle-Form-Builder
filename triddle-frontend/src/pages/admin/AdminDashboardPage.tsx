import React from 'react';

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Admin Dashboard</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="mb-6 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              Admin Controls
            </h2>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              From here you can manage users, forms, and system settings.
            </p>
          </div>

          {/* Stats */}
          <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Total Users */}
            <div className="rounded-lg bg-white p-5 shadow dark:bg-gray-800">
              <div className="flex items-center">
                <div className="flex-shrink-0 rounded-md bg-indigo-100 p-3 dark:bg-indigo-900">
                  <svg
                    className="h-6 w-6 text-indigo-600 dark:text-indigo-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                      Total Users
                    </dt>
                    <dd className="text-2xl font-medium text-gray-900 dark:text-white">128</dd>
                  </dl>
                </div>
              </div>
            </div>

            {/* Total Forms */}
            <div className="rounded-lg bg-white p-5 shadow dark:bg-gray-800">
              <div className="flex items-center">
                <div className="flex-shrink-0 rounded-md bg-green-100 p-3 dark:bg-green-900">
                  <svg
                    className="h-6 w-6 text-green-600 dark:text-green-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                      Total Forms
                    </dt>
                    <dd className="text-2xl font-medium text-gray-900 dark:text-white">256</dd>
                  </dl>
                </div>
              </div>
            </div>

            {/* Total Responses */}
            <div className="rounded-lg bg-white p-5 shadow dark:bg-gray-800">
              <div className="flex items-center">
                <div className="flex-shrink-0 rounded-md bg-blue-100 p-3 dark:bg-blue-900">
                  <svg
                    className="h-6 w-6 text-blue-600 dark:text-blue-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                      Total Responses
                    </dt>
                    <dd className="text-2xl font-medium text-gray-900 dark:text-white">1,024</dd>
                  </dl>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="rounded-lg bg-white p-5 shadow dark:bg-gray-800">
              <div className="flex items-center">
                <div className="flex-shrink-0 rounded-md bg-yellow-100 p-3 dark:bg-yellow-900">
                  <svg
                    className="h-6 w-6 text-yellow-600 dark:text-yellow-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                      System Status
                    </dt>
                    <dd className="text-lg font-medium text-green-600 dark:text-green-400">
                      All Systems Operational
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              Recent Activity
            </h3>
            <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-indigo-600 dark:text-indigo-400">
                        User Registration
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        New user registered: john.doe@example.com
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <p className="text-sm text-gray-500 dark:text-gray-400">5 minutes ago</p>
                    </div>
                  </div>
                </li>
                <li className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-indigo-600 dark:text-indigo-400">
                        Form Created
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        New form created: "Employee Survey 2025"
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                </li>
                <li className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-indigo-600 dark:text-indigo-400">
                        System Update
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        System updated to version 2.4.0
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Yesterday</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;