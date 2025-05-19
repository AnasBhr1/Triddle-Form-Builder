import React from 'react';

const ProfilePage: React.FC = () => {
  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Profile</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Profile Card */}
            <div className="col-span-1">
              <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <div className="flex flex-col items-center space-y-4">
                  <div className="h-24 w-24 overflow-hidden rounded-full bg-indigo-100 dark:bg-indigo-900">
                    <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-indigo-600 dark:text-indigo-300">
                      JD
                    </div>
                  </div>
                  <div className="text-center">
                    <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                      John Doe
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">john.doe@example.com</p>
                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                      Member since Jan 2024
                    </p>
                  </div>
                  <button className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                    Upload Photo
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="col-span-1 lg:col-span-2">
              <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                  Personal Information
                </h2>
                <form>
                  <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        defaultValue="John"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        defaultValue="Doe"
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
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        defaultValue="+1 555-123-4567"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        defaultValue="Example Inc."
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Role
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        defaultValue="Product Manager"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      defaultValue="Product manager with 5+ years of experience in SaaS and fintech products."
                    />
                  </div>

                  <div className="mt-6 flex justify-end space-x-4">
                    <button
                      type="button"
                      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Password Change */}
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              Change Password
            </h2>
            <form>
              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;