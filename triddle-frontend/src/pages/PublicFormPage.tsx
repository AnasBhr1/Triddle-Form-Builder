import React from 'react';
import { Link } from 'react-router-dom';

const FormsPage: React.FC = () => {
  // Mock forms data
  const forms = [
    {
      id: '1',
      title: 'Customer Feedback Form',
      description: 'Collect feedback from customers about our services',
      status: 'published',
      responses: 124,
      createdAt: '2024-01-15T00:00:00.000Z',
      updatedAt: '2024-01-20T00:00:00.000Z',
    },
    {
      id: '2',
      title: 'Product Survey',
      description: 'Gather insights about our new product line',
      status: 'published',
      responses: 87,
      createdAt: '2024-02-05T00:00:00.000Z',
      updatedAt: '2024-02-10T00:00:00.000Z',
    },
    {
      id: '3',
      title: 'Employee Satisfaction Survey',
      description: 'Annual employee satisfaction assessment',
      status: 'draft',
      responses: 0,
      createdAt: '2024-03-15T00:00:00.000Z',
      updatedAt: '2024-03-15T00:00:00.000Z',
    },
    {
      id: '4',
      title: 'Event Registration Form',
      description: 'Registration for the annual company conference',
      status: 'published',
      responses: 56,
      createdAt: '2024-04-10T00:00:00.000Z',
      updatedAt: '2024-04-12T00:00:00.000Z',
    },
    {
      id: '5',
      title: 'Job Application Form',
      description: 'Application form for software developer position',
      status: 'archived',
      responses: 203,
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
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">My Forms</h1>
          <Link
            to="/form/new"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create New Form
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {forms.map((form) => (
              <div
                key={form.id}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {form.title}
                    </h3>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        form.status === 'published'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : form.status === 'draft'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {form.status}
                    </span>
                  </div>
                  <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                    {form.description}
                  </p>
                  <div className="flex flex-wrap justify-between text-xs text-gray-500 dark:text-gray-400">
                    <p>
                      <span className="font-medium">Created:</span> {formatDate(form.createdAt)}
                    </p>
                    <p>
                      <span className="font-medium">Updated:</span> {formatDate(form.updatedAt)}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                      {form.responses} {form.responses === 1 ? 'response' : 'responses'}
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        to={`/form/${form.id}/edit`}
                        className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/form/${form.id}/responses`}
                        className="rounded bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-800"
                      >
                        View Responses
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex border-t border-gray-200 dark:border-gray-700">
                  <Link
                    to={`/form/${form.id}/edit`}
                    className="flex flex-1 items-center justify-center border-r border-gray-200 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      ></path>
                    </svg>
                    Edit
                  </Link>
                  <Link
                    to={`/form/${form.id}/preview`}
                    className="flex flex-1 items-center justify-center border-r border-gray-200 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                    Preview
                  </Link>
                  <Link
                    to={`/form/${form.id}/responses`}
                    className="flex flex-1 items-center justify-center py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      ></path>
                    </svg>
                    Responses
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormsPage;