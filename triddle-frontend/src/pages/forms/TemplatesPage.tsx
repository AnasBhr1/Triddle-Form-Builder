import React from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/outline';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  fieldCount: number;
  imageUrl: string;
}

const TEMPLATES: Template[] = [
  {
    id: '1',
    name: 'Customer Feedback',
    description: 'Collect feedback from customers about your products or services',
    category: 'Feedback',
    fieldCount: 8,
    imageUrl: 'https://via.placeholder.com/400x200/4F46E5/FFFFFF?text=Feedback',
  },
  {
    id: '2',
    name: 'Event Registration',
    description: 'Register attendees for your upcoming events',
    category: 'Events',
    fieldCount: 10,
    imageUrl: 'https://via.placeholder.com/400x200/1E40AF/FFFFFF?text=Events',
  },
  {
    id: '3',
    name: 'Contact Form',
    description: 'Simple contact form for your website visitors',
    category: 'Contact',
    fieldCount: 5,
    imageUrl: 'https://via.placeholder.com/400x200/047857/FFFFFF?text=Contact',
  },
  {
    id: '4',
    name: 'Job Application',
    description: 'Collect applications for job openings',
    category: 'HR',
    fieldCount: 12,
    imageUrl: 'https://via.placeholder.com/400x200/B91C1C/FFFFFF?text=Jobs',
  },
  {
    id: '5',
    name: 'Product Survey',
    description: 'Get feedback on specific products or features',
    category: 'Feedback',
    fieldCount: 9,
    imageUrl: 'https://via.placeholder.com/400x200/C026D3/FFFFFF?text=Survey',
  },
  {
    id: '6',
    name: 'Newsletter Signup',
    description: 'Simple form to collect email subscriptions',
    category: 'Marketing',
    fieldCount: 3,
    imageUrl: 'https://via.placeholder.com/400x200/7C3AED/FFFFFF?text=Newsletter',
  },
];

const TemplatesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const categories = Array.from(new Set(TEMPLATES.map((template) => template.category)));

  const filteredTemplates = TEMPLATES.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? template.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleSelectTemplate = (templateId: string) => {
    // In a real application, this would create a new form based on the template
    // For now, we'll just redirect to the form builder
    window.location.href = `/form/new?template=${templateId}`;
  };

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Form Templates</h1>
        
        <Link
          to="/form/new"
          className="flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <PlusIcon className="mr-2 h-5 w-5" />
          Create Blank Form
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Search templates..."
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`rounded-full px-3 py-1 text-sm ${
                  selectedCategory === null
                    ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-3 py-1 text-sm ${
                    selectedCategory === category
                      ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow transition-all hover:shadow-lg"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={template.imageUrl}
                    alt={template.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{template.name}</h3>
                    <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:text-gray-200">
                      {template.category}
                    </span>
                  </div>
                  <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{template.fieldCount} fields</span>
                    <button
                      onClick={() => handleSelectTemplate(template.id)}
                      className="rounded-md bg-indigo-50 dark:bg-indigo-900 px-3 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-800"
                    >
                      Use Template
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 mb-4">No templates found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;