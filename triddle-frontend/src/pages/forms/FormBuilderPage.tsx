import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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

interface FormSettings {
  showProgressBar: boolean;
  allowMultipleSubmissions: boolean;
  autoSave: boolean;
  submitButtonText: string;
  successMessage: string;
  redirectUrl: string;
}

interface LocationState {
  isNewForm?: boolean;
  template?: string;
  formData?: FormData;
}

// Define available field types
const FIELD_TYPES = [
  { id: 'text', name: 'Text', icon: '🔤' },
  { id: 'email', name: 'Email', icon: '✉️' },
  { id: 'tel', name: 'Phone Number', icon: '📞' },
  { id: 'textarea', name: 'Paragraph Text', icon: '📝' },
  { id: 'select', name: 'Dropdown', icon: '▼' },
  { id: 'radio', name: 'Multiple Choice', icon: '⭕' },
  { id: 'checkbox', name: 'Checkboxes', icon: '☑️' },
  { id: 'date', name: 'Date', icon: '📅' },
  { id: 'file', name: 'File Upload', icon: '📎' },
  { id: 'number', name: 'Number', icon: '🔢' }
];

const FormBuilderPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const locationState = location.state as LocationState || {};
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    fields: []
  });
  
  const [showFieldModal, setShowFieldModal] = useState(false);
  const [currentField, setCurrentField] = useState<Field | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [fieldOptions, setFieldOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState('');
  const [formSettings, setFormSettings] = useState<FormSettings>({
    showProgressBar: false,
    allowMultipleSubmissions: false,
    autoSave: true,
    submitButtonText: 'Submit',
    successMessage: 'Thank you for your submission!',
    redirectUrl: ''
  });

  // Form data for new field
  const [newField, setNewField] = useState<Field>({
    id: '',
    type: 'text',
    label: '',
    placeholder: '',
    required: false,
    helpText: ''
  });

  // Initialize form data from location state (template)
  useEffect(() => {
    if (locationState.formData) {
      console.log('Loading template data:', locationState.template);
      setFormData(locationState.formData);
    }
  }, [locationState]);

  // Handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      title: e.target.value
    });
  };

  // Handle description change
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      description: e.target.value
    });
  };

  // Handle field deletion
  const handleDeleteField = (fieldId: string) => {
    setFormData({
      ...formData,
      fields: formData.fields.filter(field => field.id !== fieldId)
    });
  };

  // Handle field edit
  const handleEditField = (field: Field) => {
    setIsEditMode(true);
    setCurrentField(field);
    setNewField({...field});
    if (field.options) {
      setFieldOptions([...field.options]);
    } else {
      setFieldOptions([]);
    }
    setShowFieldModal(true);
  };

  // Handle add field button click
  const handleAddField = () => {
    setIsEditMode(false);
    setCurrentField(null);
    setNewField({
      id: Date.now().toString(),
      type: 'text',
      label: '',
      placeholder: '',
      required: false,
      helpText: ''
    });
    setFieldOptions([]);
    setShowFieldModal(true);
  };

  // Handle field type change
  const handleFieldTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setNewField({
      ...newField,
      type: type
    });
  };

  // Handle options for select, radio, checkbox fields
  const handleAddOption = () => {
    if (newOption.trim() !== '') {
      setFieldOptions([...fieldOptions, newOption.trim()]);
      setNewOption('');
    }
  };

  const handleRemoveOption = (index: number) => {
    const updatedOptions = [...fieldOptions];
    updatedOptions.splice(index, 1);
    setFieldOptions(updatedOptions);
  };

  // Handle saving the new/edited field
  const handleSaveField = () => {
    // Validate field data
    if (!newField.label.trim()) {
      alert('Please enter a field label');
      return;
    }

    // Check if options are needed and provided
    if (['select', 'radio', 'checkbox'].includes(newField.type) && fieldOptions.length === 0) {
      alert('Please add at least one option for this field type');
      return;
    }

    // Prepare field data with options if needed
    const fieldToSave: Field = {
      ...newField
    };

    // Add options for fields that need them
    if (['select', 'radio', 'checkbox'].includes(newField.type) && fieldOptions.length > 0) {
      fieldToSave.options = [...fieldOptions];
    }

    // Update existing field or add new one
    if (isEditMode && currentField) {
      const updatedFields = formData.fields.map(field => 
        field.id === currentField.id ? fieldToSave : field
      );
      setFormData({
        ...formData,
        fields: updatedFields
      });
    } else {
      setFormData({
        ...formData,
        fields: [...formData.fields, fieldToSave]
      });
    }

    // Close modal
    setShowFieldModal(false);
  };

  // Handle save/publish
  const handleSaveForm = (isDraft: boolean) => {
    if (formData.title.trim() === '') {
      alert('Please enter a form title');
      return;
    }

    // In a real app, you would save to backend here
    alert(`Form ${isDraft ? 'saved as draft' : 'published'} successfully!`);
    
    // Navigate to forms list
    navigate('/forms');
  };

  // Handle form settings change
  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const inputElement = e.target as HTMLInputElement;
      setFormSettings({
        ...formSettings,
        [name]: inputElement.checked
      });
    } else {
      setFormSettings({
        ...formSettings,
        [name]: value
      });
    }
  };

  // Handle new field changes - FIXED for TypeScript error
  const handleNewFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const inputElement = e.target as HTMLInputElement;
      setNewField({
        ...newField,
        [name]: inputElement.checked
      });
    } else {
      setNewField({
        ...newField,
        [name]: value
      });
    }
  };

  // Handle key press in option input
  const handleOptionKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddOption();
    }
  };

  // Display field based on type
  const renderField = (field: Field, index: number) => {
    return (
      <div key={field.id} className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-md font-medium text-gray-900 dark:text-white">{field.type.charAt(0).toUpperCase() + field.type.slice(1)} Field</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => handleEditField(field)}
              className="rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Edit
            </button>
            <button 
              onClick={() => handleDeleteField(field.id)}
              className="rounded-md bg-red-100 px-2 py-1 text-xs text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
            >
              Delete
            </button>
          </div>
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {field.label}
          </label>
          {field.helpText && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {field.helpText}
            </p>
          )}
        </div>
        
        {field.type === 'text' || field.type === 'email' || field.type === 'tel' || field.type === 'number' ? (
          <input
            type={field.type}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder={field.placeholder}
            disabled
          />
        ) : field.type === 'textarea' ? (
          <textarea
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder={field.placeholder}
            disabled
          ></textarea>
        ) : field.type === 'select' ? (
          <select
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            disabled
          >
            <option>Please select</option>
            {field.options?.map(option => (
              <option key={option}>{option}</option>
            ))}
          </select>
        ) : field.type === 'radio' ? (
          <div className="mt-2 space-y-2">
            {field.options?.map(option => (
              <div key={option} className="flex items-center">
                <input
                  type="radio"
                  className="h-4 w-4 border-gray-300 bg-white text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                  disabled
                />
                <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {option}
                </label>
              </div>
            ))}
          </div>
        ) : field.type === 'checkbox' ? (
          <div className="mt-2 space-y-2">
            {field.options?.map(option => (
              <div key={option} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 bg-white text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                  disabled
                />
                <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  {option}
                </label>
              </div>
            ))}
          </div>
        ) : field.type === 'date' ? (
          <input
            type="date"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            disabled
          />
        ) : field.type === 'file' ? (
          <input
            type="file"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:file:bg-indigo-900 dark:file:text-indigo-300"
            disabled
          />
        ) : null}
        
        <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
          {field.required ? (
            <span className="mr-2 rounded-full bg-green-100 px-2 py-0.5 text-green-800 dark:bg-green-900 dark:text-green-200">
              Required
            </span>
          ) : (
            <span className="mr-2 rounded-full bg-gray-100 px-2 py-0.5 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              Optional
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Form Builder</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="mb-6 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              Form Details
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Form Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter form title"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleDescriptionChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter form description"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="mb-6 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Form Fields</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={handleAddField}
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add Field
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {formData.fields.length === 0 ? (
                <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-600">
                  <p className="text-gray-500 dark:text-gray-400">No fields added yet. Click "Add Field" to start building your form.</p>
                </div>
              ) : (
                formData.fields.map((field, index) => renderField(field, index))
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button 
                onClick={() => handleSaveForm(true)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              >
                Save as Draft
              </button>
              <button 
                onClick={() => handleSaveForm(false)}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Publish Form
              </button>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Form Settings</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center">
                  <input
                    id="showProgressBar"
                    name="showProgressBar"
                    type="checkbox"
                    checked={formSettings.showProgressBar}
                    onChange={handleSettingChange}
                    className="h-4 w-4 rounded border-gray-300 bg-white text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <label
                    htmlFor="showProgressBar"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    Show progress bar
                  </label>
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <input
                    id="allowMultipleSubmissions"
                    name="allowMultipleSubmissions"
                    type="checkbox"
                    checked={formSettings.allowMultipleSubmissions}
                    onChange={handleSettingChange}
                    className="h-4 w-4 rounded border-gray-300 bg-white text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <label
                    htmlFor="allowMultipleSubmissions"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    Allow multiple submissions from the same device
                  </label>
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <input
                    id="autoSave"
                    name="autoSave"
                    type="checkbox"
                    checked={formSettings.autoSave}
                    onChange={handleSettingChange}
                    className="h-4 w-4 rounded border-gray-300 bg-white text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <label
                    htmlFor="autoSave"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    Enable auto-save (saves every 30 seconds)
                  </label>
                </div>
              </div>
              <div>
                <label
                  htmlFor="submitButtonText"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Submit Button Text
                </label>
                <input
                  type="text"
                  id="submitButtonText"
                  name="submitButtonText"
                  value={formSettings.submitButtonText}
                  onChange={handleSettingChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Submit"
                />
              </div>
              <div>
                <label
                  htmlFor="successMessage"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Success Message
                </label>
                <textarea
                  id="successMessage"
                  name="successMessage"
                  value={formSettings.successMessage}
                  onChange={handleSettingChange}
                  rows={2}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="Thank you for your submission!"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="redirectUrl"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Redirect URL (Optional)
                </label>
                <input
                  type="text"
                  id="redirectUrl"
                  name="redirectUrl"
                  value={formSettings.redirectUrl}
                  onChange={handleSettingChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="https://example.com/thank-you"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Redirect users to this URL after form submission
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Field Modal */}
      {showFieldModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75 dark:bg-gray-900"></div>
            </div>

            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 pt-5 pb-4 dark:bg-gray-800 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                      {isEditMode ? 'Edit Field' : 'Add New Field'}
                    </h3>
                    <div className="mt-4 space-y-4">
                      {/* Field Type */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Field Type
                        </label>
                        <select
                          name="type"
                          value={newField.type}
                          onChange={handleFieldTypeChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        >
                          {FIELD_TYPES.map(type => (
                            <option key={type.id} value={type.id}>
                              {type.icon} {type.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Label */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Label
                        </label>
                        <input
                          type="text"
                          name="label"
                          value={newField.label}
                          onChange={handleNewFieldChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                          placeholder="Enter field label"
                        />
                      </div>

                      {/* Placeholder - for text, email, tel inputs */}
                      {['text', 'email', 'tel', 'textarea', 'number'].includes(newField.type) && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Placeholder
                          </label>
                          <input
                            type="text"
                            name="placeholder"
                            value={newField.placeholder || ''}
                            onChange={handleNewFieldChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            placeholder="Enter placeholder text"
                          />
                        </div>
                      )}

                      {/* Help Text */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Help Text (Optional)
                        </label>
                        <input
                          type="text"
                          name="helpText"
                          value={newField.helpText || ''}
                          onChange={handleNewFieldChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                          placeholder="Enter help text"
                        />
                      </div>

                      {/* Options - for select, radio, checkbox */}
                      {['select', 'radio', 'checkbox'].includes(newField.type) && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Options
                          </label>
                          <div className="mt-1 space-y-2">
                            {fieldOptions.map((option, index) => (
                              <div key={index} className="flex items-center">
                                <input
                                  type="text"
                                  value={option}
                                  disabled
                                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveOption(index)}
                                  className="ml-2 inline-flex items-center rounded border border-transparent bg-red-100 p-1 text-red-600 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800"
                                >
                                  &times;
                                </button>
                              </div>
                            ))}
                            <div className="flex items-center">
                              <input
                                type="text"
                                value={newOption}
                                onChange={(e) => setNewOption(e.target.value)}
                                onKeyPress={handleOptionKeyPress}
                                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                placeholder="Add option"
                              />
                              <button
                                type="button"
                                onClick={handleAddOption}
                                className="ml-2 inline-flex items-center rounded border border-transparent bg-indigo-100 px-2 py-1 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-800"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Required Toggle */}
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="required"
                          name="required"
                          checked={!!newField.required}
                          onChange={handleNewFieldChange}
                          className="h-4 w-4 rounded border-gray-300 bg-white text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <label
                          htmlFor="required"
                          className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                        >
                          Required field
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 dark:bg-gray-700 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleSaveField}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save Field
                </button>
                <button
                  type="button"
                  onClick={() => setShowFieldModal(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormBuilderPage;