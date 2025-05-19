import React from 'react';

const AdminFormsPage: React.FC = () => {
  // Mock forms data
  const forms = [
    {
      id: '1',
      title: 'Customer Feedback Form',
      status: 'published',
      responses: 124,
      createdBy: 'John Doe',
      createdAt: '2024-01-15T00:00:00.000Z',
      updatedAt: '2024-01-20T00:00:00.000Z',
    },
    {
      id: '2',
      title: 'Product Survey',
      status: 'published',
      responses: 87,
      createdBy: 'Jane Smith',
      createdAt: '2024-02-05T00:00:00.000Z',
      updatedAt: '2024-02-10T00:00:00.000Z',
    },
    {
      id: '3',
      title: 'Employee Satisfaction Survey',
      status: 'draft',
      responses: 0,
      createdBy: 'Bob Johnson',
      createdAt: '2024-03-15T00:00:00.000Z',
      updatedAt: '2024-03-15T00:00:00.000Z',
    },
    {
      id: '4',
      title: 'Event Registration Form',
      status: 'published',
      responses: 56,
      createdBy: 'Alice Williams',
      createdAt: '2024-04-10T00:00:00.000Z',
      updatedAt: '2024-04-12T00:00:00.000Z',
    },
    {
      id: '5',
      title: 'Job Application Form',
      status: 'archived',
      responses: 203,
      createdBy: 'Charlie Brown',
      createdAt: '2024-04-25T00:00:00.000Z',
      updatedAt: '2024-05-01T00:00:00.000Z',
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Forms Management</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="mb-6 flex justify-between">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search forms..."
                className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-500"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="h-5 w-5 text-gray-400 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>
            <div>
              <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Create New Form
              </button>
            </div>
          </div>

          {/* Forms table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Form Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Responses
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Created By
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Last Updated
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                {forms.map((form) => (
                  <tr key={form.id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {form.title}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          form.status === 'published'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : form.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {form.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {form.responses}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {form.createdBy}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(form.updatedAt)}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <button className="mr-2 text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                        View
                      </button>
                      <button className="mr-2 text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing <span className="font-medium">1</span> to{' '}
              <span className="font-medium">5</span> of <span className="font-medium">15</span>{' '}
              results
            </div>
            <div className="flex space-x-2">
              <button className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                Previous
              </button>
              <button className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFormsPage;