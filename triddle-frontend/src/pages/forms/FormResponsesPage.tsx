import React, { useState, useEffect } from 'react';
import { 
  EyeIcon, 
  TrashIcon, 
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon
} from '@heroicons/react/outline';

// Mock data for responses with more detailed information
const mockFormResponses = [
  {
    id: '1',
    formId: '101',
    formName: 'Customer Feedback Form',
    respondent: 'john.doe@example.com',
    submittedAt: '2025-05-15T15:30:00Z',
    fields: [
      { id: 'f1', label: 'Name', value: 'John Doe' },
      { id: 'f2', label: 'Rating', value: '4/5' },
      { id: 'f3', label: 'Comments', value: 'Great service, would recommend!' },
      { id: 'f4', label: 'Would purchase again?', value: 'Yes' }
    ]
  },
  {
    id: '2',
    formId: '101',
    formName: 'Customer Feedback Form',
    respondent: 'jane.smith@example.com',
    submittedAt: '2025-05-14T07:45:00Z',
    fields: [
      { id: 'f1', label: 'Name', value: 'Jane Smith' },
      { id: 'f2', label: 'Rating', value: '5/5' },
      { id: 'f3', label: 'Comments', value: 'Excellent product and customer support!' },
      { id: 'f4', label: 'Would purchase again?', value: 'Yes' }
    ]
  },
  {
    id: '3',
    formId: '102',
    formName: 'Event Registration',
    respondent: 'alex.wright@example.com',
    submittedAt: '2025-05-13T14:15:00Z',
    fields: [
      { id: 'f1', label: 'Name', value: 'Alex Wright' },
      { id: 'f2', label: 'Event Date', value: '2025-06-20' },
      { id: 'f3', label: 'Number of Attendees', value: '2' },
      { id: 'f4', label: 'Special Requirements', value: 'Vegetarian meals' }
    ]
  },
  {
    id: '4',
    formId: '103',
    formName: 'Product Survey',
    respondent: 'sarah.jones@example.com',
    submittedAt: '2025-05-12T09:20:00Z',
    fields: [
      { id: 'f1', label: 'Name', value: 'Sarah Jones' },
      { id: 'f2', label: 'Product Used', value: 'Premium Plan' },
      { id: 'f3', label: 'Satisfaction Level', value: 'Very Satisfied' },
      { id: 'f4', label: 'Feature Requests', value: 'Better mobile integration' }
    ]
  },
  {
    id: '5',
    formId: '102',
    formName: 'Event Registration',
    respondent: 'mike.brown@example.com',
    submittedAt: '2025-05-11T16:10:00Z',
    fields: [
      { id: 'f1', label: 'Name', value: 'Mike Brown' },
      { id: 'f2', label: 'Event Date', value: '2025-06-20' },
      { id: 'f3', label: 'Number of Attendees', value: '4' },
      { id: 'f4', label: 'Special Requirements', value: 'None' }
    ]
  },
];

const FormResponsesPage: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [responses, setResponses] = useState(mockFormResponses);
  const [sortDirection, setSortDirection] = useState('desc');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // New state for the response viewer modal
  const [viewingResponse, setViewingResponse] = useState<typeof mockFormResponses[0] | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Simulated data loading logic
  useEffect(() => {
    // Sort responses by date
    const sortedResponses = [...mockFormResponses].sort((a, b) => {
      return sortDirection === 'asc' 
        ? new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
        : new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
    });
    
    setResponses(sortedResponses);
  }, [sortDirection]);

  const handleExportCSV = () => {
    console.log('Exporting responses to CSV...');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const handleApplyFilters = () => {
    console.log('Applying filters');
  };

  // Handler for the eye icon click
  const handleViewResponse = (responseId: string) => {
    const response = responses.find(r => r.id === responseId);
    if (response) {
      setViewingResponse(response);
      setIsViewModalOpen(true);
    }
  };

  // Handler for deleting a response
  const handleDeleteResponse = (responseId: string) => {
    if (window.confirm('Are you sure you want to delete this response?')) {
      setResponses(responses.filter(r => r.id !== responseId));
    }
  };

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Responses</h1>
        
        <button
          onClick={handleExportCSV}
          className="flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            ></path>
          </svg>
          Export CSV
        </button>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="flex space-x-6">
            {/* Filters Panel */}
            <div className="w-64 rounded-lg bg-white dark:bg-gray-800 shadow p-4">
              <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Filters</h2>
              
              {/* Form selector */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Form</label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-left text-sm text-gray-700 dark:text-white focus:outline-none"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className="block truncate">
                      All Forms
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1 shadow-lg">
                      <button
                        className="relative w-full cursor-default select-none py-2 px-4 text-left text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => {
                          setSelectedForm(null);
                          setIsDropdownOpen(false);
                        }}
                      >
                        All Forms
                      </button>
                      {responses
                        .map(r => ({ id: r.formId, name: r.formName }))
                        .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i) // Unique forms
                        .map(form => (
                          <button
                            key={form.id}
                            className="relative w-full cursor-default select-none py-2 px-4 text-left text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                            onClick={() => {
                              setSelectedForm(form.id);
                              setIsDropdownOpen(false);
                            }}
                          >
                            {form.name}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Date range */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Range</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="mm/dd/yyyy"
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-700 dark:text-white focus:outline-none"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="mm/dd/yyyy"
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-700 dark:text-white focus:outline-none"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Apply button */}
              <button
                onClick={handleApplyFilters}
                className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Apply Filters
              </button>
            </div>
            
            {/* Responses Table */}
            <div className="flex-1">
              <div className="rounded-lg bg-white dark:bg-gray-800 overflow-hidden shadow">
                {/* Search input */}
                <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                  <input
                    type="text"
                    placeholder="Search responses..."
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-700 dark:text-white focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {/* Table headers */}
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-12 gap-4 px-6 py-3">
                    <div className="col-span-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Form</div>
                    <div className="col-span-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Respondent</div>
                    <div className="col-span-4 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                      <button 
                        className="flex items-center focus:outline-none"
                        onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                      >
                        Submitted
                        <ChevronDownIcon className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                    <div className="col-span-2 text-xs font-medium uppercase text-gray-500 dark:text-gray-400 text-center">Actions</div>
                  </div>
                </div>
                
                {/* Table rows */}
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {responses
                    .filter(response => !selectedForm || response.formId === selectedForm)
                    .filter(response => 
                      !searchQuery || 
                      response.formName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      response.respondent.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((response) => (
                    <div 
                      key={response.id} 
                      className="grid grid-cols-12 gap-4 px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <div className="col-span-3 text-sm font-medium text-gray-900 dark:text-white truncate">{response.formName}</div>
                      <div className="col-span-3 text-sm text-gray-500 dark:text-gray-300 truncate">{response.respondent}</div>
                      <div className="col-span-4 text-sm text-gray-500 dark:text-gray-300">{formatDate(response.submittedAt)}</div>
                      <div className="col-span-2 flex justify-center space-x-3">
                        <button 
                          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                          onClick={() => handleViewResponse(response.id)}
                          title="View response"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button 
                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                          onClick={() => handleDeleteResponse(response.id)}
                          title="Delete response"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination */}
                <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between">
                  <div className="text-sm text-gray-700 dark:text-gray-400">
                    Showing 1 to {responses.length} of {responses.length} results
                  </div>
                  <div className="flex space-x-1">
                    <button className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                      <ChevronLeftIcon className="h-5 w-5" />
                    </button>
                    <button className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 dark:border-gray-600 bg-indigo-600 text-white">
                      1
                    </button>
                    <button className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                      <ChevronRightIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Response Viewer Modal */}
      {isViewModalOpen && viewingResponse && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Response Details
                      </h3>
                      <button
                        onClick={() => setIsViewModalOpen(false)}
                        className="rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-white focus:outline-none"
                      >
                        <XIcon className="h-6 w-6" />
                      </button>
                    </div>
                    
                    <div className="mt-4">
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Form</p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">{viewingResponse.formName}</p>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Respondent</p>
                        <p className="text-base text-gray-900 dark:text-white">{viewingResponse.respondent}</p>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Submitted</p>
                        <p className="text-base text-gray-900 dark:text-white">{formatDate(viewingResponse.submittedAt)}</p>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="text-sm font-medium uppercase text-gray-500 dark:text-gray-400 mb-3">Responses</h4>
                        <div className="space-y-4">
                          {viewingResponse.fields.map((field) => (
                            <div key={field.id}>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{field.label}</p>
                              <p className="text-base text-gray-900 dark:text-white">{field.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsViewModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormResponsesPage;