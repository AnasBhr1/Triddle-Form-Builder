import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/outline';

interface Field {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  options?: string[];
}

interface FormData {
  title: string;
  description: string;
  fields: Field[];
}

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  fieldCount: number;
  imageUrl: string;
}

// Define form field templates for each template type
const templateFormData: Record<string, FormData> = {
  '1': { // Customer Feedback
    title: 'Customer Feedback Form',
    description: 'We value your feedback! Please let us know about your experience with our products or services.',
    fields: [
      { id: '1', type: 'text', label: 'Full Name', placeholder: 'John Doe', required: true, helpText: 'Please enter your full name' },
      { id: '2', type: 'email', label: 'Email Address', placeholder: 'john@example.com', required: true, helpText: "We'll use this to contact you" },
      { id: '3', type: 'select', label: 'How would you rate your experience?', options: ['Excellent', 'Good', 'Average', 'Poor', 'Very Poor'], required: true },
      { id: '4', type: 'textarea', label: 'What did you like about our product/service?', required: false },
      { id: '5', type: 'textarea', label: 'What could we improve?', required: false },
      { id: '6', type: 'radio', label: 'Would you recommend us to others?', options: ['Definitely', 'Maybe', 'No'], required: true }
    ]
  },
  '2': { // Event Registration
    title: 'Event Registration Form',
    description: 'Register for our upcoming event.',
    fields: [
      { id: '1', type: 'text', label: 'Full Name', placeholder: 'John Doe', required: true },
      { id: '2', type: 'email', label: 'Email Address', placeholder: 'john@example.com', required: true },
      { id: '3', type: 'tel', label: 'Phone Number', placeholder: '+1 (555) 123-4567', required: true },
      { id: '4', type: 'select', label: 'Event', options: ['Annual Conference', 'Workshop', 'Webinar', 'Networking Event'], required: true },
      { id: '5', type: 'select', label: 'Number of Attendees', options: ['1', '2', '3', '4', '5+'], required: true },
      { id: '6', type: 'radio', label: 'Dietary Preferences', options: ['None', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Other'], required: false },
      { id: '7', type: 'textarea', label: 'Special Requests', required: false },
      { id: '8', type: 'checkbox', label: 'I agree to the terms and conditions', options: ['Yes'], required: true }
    ]
  },
  '3': { // Contact Form
    title: 'Contact Form',
    description: 'Get in touch with us. We\'d love to hear from you!',
    fields: [
      { id: '1', type: 'text', label: 'Full Name', placeholder: 'John Doe', required: true },
      { id: '2', type: 'email', label: 'Email Address', placeholder: 'john@example.com', required: true },
      { id: '3', type: 'tel', label: 'Phone Number', placeholder: '+1 (555) 123-4567', required: false },
      { id: '4', type: 'select', label: 'Subject', options: ['General Inquiry', 'Support', 'Feedback', 'Partnership', 'Other'], required: true },
      { id: '5', type: 'textarea', label: 'Message', placeholder: 'Your message here...', required: true }
    ]
  },
  '4': { // Job Application
    title: 'Job Application Form',
    description: 'Apply for open positions at our company.',
    fields: [
      { id: '1', type: 'text', label: 'Full Name', placeholder: 'John Doe', required: true },
      { id: '2', type: 'email', label: 'Email Address', placeholder: 'john@example.com', required: true },
      { id: '3', type: 'tel', label: 'Phone Number', placeholder: '+1 (555) 123-4567', required: true },
      { id: '4', type: 'select', label: 'Position Applied For', options: ['Software Developer', 'Designer', 'Marketing Specialist', 'Project Manager', 'Other'], required: true },
      { id: '5', type: 'textarea', label: 'Work Experience', required: true },
      { id: '6', type: 'textarea', label: 'Education', required: true },
      { id: '7', type: 'textarea', label: 'Skills', required: true },
      { id: '8', type: 'file', label: 'Resume/CV', required: true, helpText: 'Upload your resume (PDF, DOC, DOCX)' },
      { id: '9', type: 'file', label: 'Cover Letter', required: false },
      { id: '10', type: 'select', label: 'How did you hear about us?', options: ['Job Board', 'Company Website', 'Referral', 'Social Media', 'Other'], required: false },
      { id: '11', type: 'checkbox', label: 'I certify that all information provided is accurate', options: ['Yes'], required: true }
    ]
  },
  '5': { // Product Survey
    title: 'Product Survey Form',
    description: 'Help us improve our products by providing your feedback.',
    fields: [
      { id: '1', type: 'text', label: 'Full Name', placeholder: 'John Doe', required: true },
      { id: '2', type: 'email', label: 'Email Address', placeholder: 'john@example.com', required: true },
      { id: '3', type: 'select', label: 'Which product did you purchase?', options: ['Product A', 'Product B', 'Product C', 'Product D'], required: true },
      { id: '4', type: 'radio', label: 'How would you rate the product quality?', options: ['Excellent', 'Good', 'Average', 'Poor', 'Very Poor'], required: true },
      { id: '5', type: 'radio', label: 'How easy was the product to use?', options: ['Very Easy', 'Easy', 'Neutral', 'Difficult', 'Very Difficult'], required: true },
      { id: '6', type: 'checkbox', label: 'Which features do you use regularly?', options: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'], required: false },
      { id: '7', type: 'textarea', label: 'What features would you like to see added?', required: false },
      { id: '8', type: 'radio', label: 'Would you recommend this product to others?', options: ['Definitely', 'Probably', 'Not Sure', 'Probably Not', 'Definitely Not'], required: true }
    ]
  },
  '6': { // Newsletter Signup
    title: 'Newsletter Signup Form',
    description: 'Subscribe to our newsletter to stay updated with the latest news and offers.',
    fields: [
      { id: '1', type: 'text', label: 'Name', placeholder: 'John Doe', required: true },
      { id: '2', type: 'email', label: 'Email Address', placeholder: 'john@example.com', required: true },
      { id: '3', type: 'checkbox', label: 'Interests', options: ['Technology', 'Business', 'Design', 'Marketing', 'Other'], required: false }
    ]
  }
};

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
  const navigate = useNavigate();

  const categories = Array.from(new Set(TEMPLATES.map((template) => template.category)));

  const filteredTemplates = TEMPLATES.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? template.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleSelectTemplate = (templateId: string) => {
    // Get the form data for the selected template
    const formData = templateFormData[templateId];
    
    if (formData) {
      // Navigate to form builder with the template data
      navigate('/form-builder', { 
        state: { 
          isNewForm: true,
          template: templateId,
          formData: formData
        } 
      });
    }
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