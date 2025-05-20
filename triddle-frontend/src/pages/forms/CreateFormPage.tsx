import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, DocumentTextIcon, ClockIcon, EyeIcon, TrashIcon, PencilIcon } from '@heroicons/react/outline';

// Mock data for forms
const mockForms = [
  {
    id: '1',
    name: 'Customer Feedback Form',
    description: 'Collect feedback from customers about our products and services',
    createdAt: '2025-05-01T10:30:00Z',
    responseCount: 42,
    status: 'active',
  },
  {
    id: '2',
    name: 'Event Registration',
    description: 'Registration form for company events',
    createdAt: '2025-04-15T14:20:00Z',
    responseCount: 156,
    status: 'active',
  },
  {
    id: '3',
    name: 'Product Survey',
    description: 'Survey to collect feedback on new product features',
    createdAt: '2025-05-10T09:45:00Z',
    responseCount: 78,
    status: 'active',
  },
  {
    id: '4',
    name: 'Job Application',
    description: 'Application form for job candidates',
    createdAt: '2025-03-20T11:15:00Z',
    responseCount: 25,
    status: 'active',
  },
  {
    id: '5',
    name: 'Contact Request',
    description: 'Form for website visitors to request contact',
    createdAt: '2025-05-12T16:30:00Z',
    responseCount: 13,
    status: 'draft',
  },
];

const FormsPage: React.FC = () => {
  const [forms, setForms] = useState(mockForms);
  const [searchQuery, setSearchQuery] = useState('');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const handleDeleteForm = (formId: string) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      setForms(forms.filter(form => form.id !== formId));
    }
  };

  const filteredForms = forms.filter(form => 
    form.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    form.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Forms</h1>
        
        <Link
          to="/form/new"
          className="flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <PlusIcon className="mr-2 h-5 w-5" />
          Create Form
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {forms.length === 0 ? (
          <div className="text-center py-16">
            <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No forms yet</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Create your first form to get started.</p>
            <div className="mt-6">
              <Link
                to="/form/new"
                className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <PlusIcon className="mr-2 h-5 w-5" />
                Create Form
              </Link>
            </div>
          </div>
        ) : (
          <div className="py-4">
            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search forms..."
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-12 gap-4 px-6 py-3">
                  <div className="col-span-4 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Form Name</div>
                  <div className="col-span-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Created</div>
                  <div className="col-span-2 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Responses</div>
                  <div className="col-span-1 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Status</div>
                  <div className="col-span-2 text-xs font-medium uppercase text-gray-500 dark:text-gray-400 text-center">Actions</div>
                </div>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredForms.map((form) => (
                  <div
                    key={form.id}
                    className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div className="col-span-4">
                      <div className="font-medium text-indigo-600 dark:text-indigo-400">{form.name}</div>
                      <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 truncate">{form.description}</div>
                    </div>
                    <div className="col-span-3 flex items-center">
                      <ClockIcon className="mr-1.5 h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(form.createdAt)}</span>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <Link
                        to={`/form/${form.id}/responses`}
                        className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                      >
                        {form.responseCount} responses
                      </Link>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          form.status === 'active'
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300'
                            : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300'
                        }`}
                      >
                        {form.status === 'active' ? 'Active' : 'Draft'}
                      </span>
                    </div>
                    <div className="col-span-2 flex justify-center space-x-2">
                      <Link
                        to={`/form/${form.id}/edit`}
                        className="rounded-md p-1 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                        title="Edit form"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </Link>
                      <Link
                        to={`/form/${form.id}/responses`}
                        className="rounded-md p-1 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                        title="View responses"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDeleteForm(form.id)}
                        className="rounded-md p-1 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-600 dark:hover:text-red-400"
                        title="Delete form"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormsPage;