import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, DocumentTextIcon, PresentationChartBarIcon, UserGroupIcon, ClipboardCheckIcon, MailIcon } from '@heroicons/react/outline';

// Define the Field interface
interface Field {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  options?: string[];
}

// Define the FormData interface
interface FormData {
  title: string;
  description: string;
  fields: Field[];
}

interface TemplateType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

const CreateFormPage: React.FC = () => {
  const navigate = useNavigate();
  console.log('CreateFormPage rendered'); // Debugging log

  // Templates data
  const templates: TemplateType[] = [
    {
      id: 'feedback',
      name: 'Customer Feedback',
      description: 'Collect feedback from customers about your products or services',
      icon: <UserGroupIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      category: 'feedback'
    },
    {
      id: 'survey',
      name: 'Market Research Survey',
      description: 'Gather insights about market trends and consumer preferences',
      icon: <PresentationChartBarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      category: 'survey'
    },
    {
      id: 'application',
      name: 'Job Application',
      description: 'Collect information from job candidates',
      icon: <ClipboardCheckIcon className="h-6 w-6 text-green-600 dark:text-green-400" />,
      category: 'application'
    },
    {
      id: 'contact',
      name: 'Contact Form',
      description: 'Allow website visitors to send you messages',
      icon: <MailIcon className="h-6 w-6 text-red-600 dark:text-red-400" />,
      category: 'contact'
    }
  ];

  // Handle blank form creation - Updated to pass state to FormBuilderPage
  const handleBlankForm = () => {
    console.log('Creating blank form');
    navigate('/form-builder', { 
      state: { 
        isNewForm: true,
        template: 'blank',
        formData: {
          title: 'Untitled Form',
          description: '',
          fields: []
        } 
      } 
    });
  };

  // Handle template selection - Updated to pass template data to FormBuilderPage
  const handleTemplateSelect = (templateId: string) => {
    console.log(`Template selected: ${templateId}`);
    
    // Generate template-specific form data
    let formData: FormData = {
      title: '',
      description: '',
      fields: []
    };
    
    switch(templateId) {
      case 'feedback':
        formData = {
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
        };
        break;
      case 'survey':
        formData = {
          title: 'Market Research Survey',
          description: 'Help us understand your preferences and market trends better.',
          fields: [
            { id: '1', type: 'text', label: 'Name', placeholder: 'John Doe', required: true },
            { id: '2', type: 'email', label: 'Email', placeholder: 'john@example.com', required: true },
            { id: '3', type: 'select', label: 'Age Group', options: ['18-24', '25-34', '35-44', '45-54', '55+'], required: true },
            { id: '4', type: 'checkbox', label: 'Which products are you interested in?', options: ['Electronics', 'Clothing', 'Home Goods', 'Books', 'Other'], required: true },
            { id: '5', type: 'radio', label: 'How often do you shop online?', options: ['Daily', 'Weekly', 'Monthly', 'Rarely', 'Never'], required: true },
            { id: '6', type: 'textarea', label: 'What factors influence your purchasing decisions?', required: false }
          ]
        };
        break;
      case 'application':
        formData = {
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
            { id: '8', type: 'file', label: 'Resume/CV', required: true, helpText: 'Upload your resume (PDF, DOC, DOCX)' }
          ]
        };
        break;
      case 'contact':
        formData = {
          title: 'Contact Form',
          description: 'Get in touch with us. We\'d love to hear from you!',
          fields: [
            { id: '1', type: 'text', label: 'Full Name', placeholder: 'John Doe', required: true },
            { id: '2', type: 'email', label: 'Email Address', placeholder: 'john@example.com', required: true },
            { id: '3', type: 'tel', label: 'Phone Number', placeholder: '+1 (555) 123-4567', required: false },
            { id: '4', type: 'select', label: 'Subject', options: ['General Inquiry', 'Support', 'Feedback', 'Partnership', 'Other'], required: true },
            { id: '5', type: 'textarea', label: 'Message', placeholder: 'Your message here...', required: true }
          ]
        };
        break;
    }
    
    navigate('/form-builder', { 
      state: { 
        isNewForm: true,
        template: templateId,
        formData: formData
      } 
    });
  };

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/forms')}
            className="mr-4 rounded-md p-1 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
            aria-label="Back to forms"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Create New Form</h1>
        </div>

        {/* Blank form option */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Start</h2>
          <div 
            onClick={handleBlankForm}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-2 border-transparent hover:border-indigo-500 max-w-md cursor-pointer transition-colors duration-200"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900">
                <DocumentTextIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Blank Form</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Start from scratch with a completely blank form</p>
              </div>
            </div>
          </div>
        </div>

        {/* Templates */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => handleTemplateSelect(template.id)}
                className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 hover:border-indigo-500"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900">
                      {template.icon}
                    </div>
                    <h3 className="ml-4 text-lg font-medium text-gray-900 dark:text-white">{template.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{template.description}</p>
                </div>
                <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-right">
                  <span className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium">
                    Use Template
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFormPage;