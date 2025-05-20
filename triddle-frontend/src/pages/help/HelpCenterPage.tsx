import React, { useState } from 'react';
import { 
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  ChatIcon,
  VideoCameraIcon,
  SearchIcon,
  ChevronRightIcon
} from '@heroicons/react/outline';

interface FAQItem {
  question: string;
  answer: string;
}

const HelpCenterPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Sample FAQ data
  const faqs: FAQItem[] = [
    {
      question: 'How do I create a new form?',
      answer: 'To create a new form, navigate to the Forms section from the sidebar and click the "Create New Form" button. You can then select a template or start from scratch.'
    },
    {
      question: 'How can I share my form with others?',
      answer: 'After creating your form, go to the form settings and click on "Share". You can generate a link, embed code, or send email invitations directly.'
    },
    {
      question: 'Can I export form responses?',
      answer: 'Yes, you can export form responses in various formats (CSV, Excel, PDF) by going to the Responses section of your form and clicking the "Export" button in the top right corner.'
    },
    {
      question: 'How do I add conditional logic to my form?',
      answer: 'When editing your form, select a question and click the "Logic" tab in the question settings panel. This allows you to create rules that show or hide questions based on previous answers.'
    },
    {
      question: 'Is there a limit to how many responses I can collect?',
      answer: 'The response limit depends on your subscription plan. Free accounts can collect up to 100 responses per form, while paid plans have higher or unlimited collection capacity.'
    },
  ];
  
  // Filter FAQs based on search query
  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Help Center</h1>
        
        {/* Search bar */}
        <div className="relative max-w-xl mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Help categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:bg-indigo-50 dark:hover:bg-gray-700 transition">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900">
                <DocumentTextIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Documentation</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Detailed guides and references</p>
              </div>
              <ChevronRightIcon className="h-5 w-5 text-gray-400 ml-auto" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:bg-indigo-50 dark:hover:bg-gray-700 transition">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                <VideoCameraIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Video Tutorials</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Step-by-step visual guides</p>
              </div>
              <ChevronRightIcon className="h-5 w-5 text-gray-400 ml-auto" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:bg-indigo-50 dark:hover:bg-gray-700 transition">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-pink-100 dark:bg-pink-900">
                <ChatIcon className="h-6 w-6 text-pink-600 dark:text-pink-400" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Contact Support</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get help from our team</p>
              </div>
              <ChevronRightIcon className="h-5 w-5 text-gray-400 ml-auto" />
            </div>
          </div>
        </div>
        
        {/* Frequently Asked Questions */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {searchQuery && filteredFAQs.length === 0 ? (
              <div className="p-6 text-center">
                <QuestionMarkCircleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No results found for "{searchQuery}"</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Try different keywords or browse the categories above</p>
              </div>
            ) : (
              filteredFAQs.map((faq, index) => (
                <details key={index} className="group">
                  <summary className="flex justify-between items-center px-6 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white">{faq.question}</h3>
                    <span className="ml-6 flex-shrink-0">
                      <ChevronRightIcon className="h-5 w-5 text-gray-400 group-open:transform group-open:rotate-90 transition-transform" />
                    </span>
                  </summary>
                  <div className="px-6 pb-4 pt-2">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{faq.answer}</p>
                  </div>
                </details>
              ))
            )}
          </div>
        </div>
        
        {/* Getting Started Guide */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Getting Started</h2>
          </div>
          <div className="p-6">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 rounded-full p-1">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-medium text-white">1</span>
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">Create your first form</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Start by navigating to the Forms section and clicking "Create New Form". Choose a template or start from scratch.
                </p>
              </div>
            </div>
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 rounded-full p-1">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-medium text-white">2</span>
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">Customize your questions</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Add various question types like text, multiple choice, rating scales, and more to gather the information you need.
                </p>
              </div>
            </div>
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 rounded-full p-1">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-medium text-white">3</span>
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">Share with respondents</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Once your form is ready, share it via link, embed code, or email invitations to start collecting responses.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 rounded-full p-1">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-medium text-white">4</span>
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">Analyze responses</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  View submissions in real-time and explore analytics to get insights from your collected data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;